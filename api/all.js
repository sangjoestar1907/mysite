// api/all.js
let allServers = {
  fullmoon: [],
  nearfullmoon: [],
  mysticisland: [],
  ripindra: [],
  doughking: [],
  darkbeard: [],
  cursedcaptain: []
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const result = {};
      let totalServers = 0;

      Object.keys(allServers).forEach(event => {
        // Cleanup servers cũ
        const now = new Date();
        allServers[event] = allServers[event].filter(server => {
          return (now - new Date(server.timestamp)) / (1000 * 60) < 5;
        });

        result[event] = {
          servers: allServers[event],
          total_servers: allServers[event].length
        };
        totalServers += allServers[event].length;
      });

      res.json({
        success: true,
        events: result,
        total_servers: totalServers,
        last_updated: new Date().toISOString()
      });

    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
