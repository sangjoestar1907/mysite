// api/events.js
let eventsDatabase = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const eventData = req.body;
      console.log('🎮 Nhận event từ Roblox:', eventData.event_type || eventData.boss_name);
      
      const eventWithMetadata = {
        ...eventData,
        id: Date.now(),
        received_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 phút
      };

      // Xóa events cũ trước khi thêm mới
      const now = new Date();
      eventsDatabase = eventsDatabase.filter(event => new Date(event.expires_at) > now);

      // Thêm event mới
      eventsDatabase.unshift(eventWithMetadata);
      
      // Giới hạn số lượng events
      if (eventsDatabase.length > 100) {
        eventsDatabase = eventsDatabase.slice(0, 100);
      }

      res.status(200).json({ 
        success: true, 
        message: `Đã nhận event: ${eventData.event_type || eventData.boss_name}`,
        event_id: eventWithMetadata.id,
        total_events: eventsDatabase.length
      });

    } catch (error) {
      console.error('❌ Lỗi API:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  } 
  else if (req.method === 'GET') {
    // Xóa events cũ trước khi trả về
    const now = new Date();
    eventsDatabase = eventsDatabase.filter(event => new Date(event.expires_at) > now);

    res.status(200).json({
      success: true,
      events: eventsDatabase,
      total: eventsDatabase.length,
      last_updated: new Date().toISOString()
    });
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
