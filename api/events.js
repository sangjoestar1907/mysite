// api/events.js
let eventsDatabase = [];

export default function handler(req, res) {
  // Cho phép CORS - quan trọng!
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Xử lý preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const eventData = req.body;
      console.log('🎮 Nhận event từ Roblox:', eventData.event_type);
      
      // Thêm metadata
      const eventWithMetadata = {
        ...eventData,
        id: Date.now(),
        received_at: new Date().toISOString(),
        server_time: new Date().toLocaleString('vi-VN')
      };

      // Lưu vào database
      eventsDatabase.unshift(eventWithMetadata);
      
      // Giới hạn 50 events
      if (eventsDatabase.length > 50) {
        eventsDatabase = eventsDatabase.slice(0, 50);
      }

      res.status(200).json({ 
        success: true, 
        message: `Đã nhận event: ${eventData.event_type}`,
        event_id: eventWithMetadata.id,
        total_events: eventsDatabase.length
      });

    } 
    else if (req.method === 'GET') {
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
  } catch (error) {
    console.error('❌ Lỗi API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
