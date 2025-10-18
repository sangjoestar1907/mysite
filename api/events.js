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
      console.log('🎮 Nhận event từ Roblox:', eventData.event_type);
      
      const eventWithMetadata = {
        ...eventData,
        id: Date.now(),
        received_at: new Date().toISOString()
      };

      eventsDatabase.unshift(eventWithMetadata);
      if (eventsDatabase.length > 50) eventsDatabase = eventsDatabase.slice(0, 50);

      res.status(200).json({ 
        success: true, 
        message: `Đã nhận event: ${eventData.event_type}`,
        event_id: eventWithMetadata.id
      });

    } catch (error) {
      res.status(500).json({ error: 'Lỗi server' });
    }
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
}
