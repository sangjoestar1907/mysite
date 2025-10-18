import realServers from './events/[event].js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  const allData = {};
  Object.keys(realServers).forEach(event => {
    allData[event] = {
      servers: realServers[event],
      total: realServers[event].length
    };
  });
  
  res.json({ success: true, events: allData });
}
