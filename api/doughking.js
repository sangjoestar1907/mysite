// api/doughking.js
let servers = [];

function cleanup() {
  const now = new Date();
  servers = servers.filter(server => {
    return (now - new Date(server.timestamp)) / (1000 * 60) < 5;
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    cleanup();
    res.json({
      success: true,
      event: "Dough King",
      servers: servers,
      total_servers: servers.length,
      last_updated: new Date().toISOString()
    });
  }
  else if (req.method === 'POST') {
    try {
      const data = req.body;
      const existing = servers.findIndex(s => s.job_id === data.job_id);
      
      if (existing >= 0) {
        servers[existing] = { ...servers[existing], ...data, timestamp: new Date().toISOString() };
      } else {
        servers.push({ ...data, timestamp: new Date().toISOString() });
      }
      
      cleanup();
      res.json({ success: true, message: "Dough King data received", total_servers: servers.length });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
