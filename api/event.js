// api/events.js
let eventsDatabase = [];

export default function handler(req, res) {
  // Cho phép CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const eventData = req.body;
      console.log('📢 Nhận event từ Roblox:', eventData.event_type);
      
      const eventWithMetadata = {
        ...eventData,
        id: Date.now(),
        received_at: new Date().toISOString(),
        server_time: new Date().toLocaleString('vi-VN')
      };

      // Lưu vào database
      eventsDatabase.push(eventWithMetadata);
      
      // Giữ tối đa 50 events
      if (eventsDatabase.length > 50) {
        eventsDatabase = eventsDatabase.slice(-50);
      }

      res.status(200).json({ 
        success: true, 
        message: `Đã nhận event: ${eventData.event_type}`,
        event_id: eventWithMetadata.id
      });

    } catch (error) {
      console.error('❌ Lỗi API:', error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  } 
  else if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      events: eventsDatabase.reverse(), // Mới nhất lên đầu
      total: eventsDatabase.length,
      last_updated: new Date().toISOString()
    });
  }
  else {
    res.status(405).json({ error: 'Method không được hỗ trợ' });
  }
}
