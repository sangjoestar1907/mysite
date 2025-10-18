// BIẾN LƯU TRỮ DỮ LIỆU THẬT
let realServers = {
  fullmoon: [], nearfullmoon: [], mysticisland: [], 
  ripindra: [], doughking: [], darkbeard: [], cursedcaptain: []
};

// Xóa server cũ (5 phút)
function cleanup(eventType) {
  const now = new Date();
  realServers[eventType] = realServers[eventType].filter(server => {
    return (now - new Date(server.timestamp)) / (1000 * 60) < 5;
  });
}

export default async function handler(req, res) {
  const { event } = req.query;
  
  if (!realServers[event]) {
    return res.status(404).json({ 
      success: false, 
      error: 'Event not found',
      available: Object.keys(realServers)
    });
  }

  // GET - Lấy server
  if (req.method === 'GET') {
    cleanup(event);
    res.json({
      success: true,
      event: event,
      servers: realServers[event],
      total: realServers[event].length,
      updated: new Date().toISOString()
    });
  }
  
  // POST - Thêm server
  else if (req.method === 'POST') {
    try {
      const data = req.body;
      cleanup(event);
      
      const existing = realServers[event].findIndex(s => s.job_id === data.job_id);
      
      if (existing >= 0) {
        realServers[event][existing] = {
          ...realServers[event][existing],
          players: data.players,
          wait: data.wait || "0s",
          timestamp: new Date().toISOString()
        };
      } else {
        realServers[event].push({
          job_id: data.job_id,
          players: data.players,
          wait: data.wait || "0s",
          world: data.world || "World 3",
          timestamp: new Date().toISOString()
        });
      }
      
      res.json({ 
        success: true, 
        message: `Data received for ${event}`,
        total: realServers[event].length
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } 
  
  else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
