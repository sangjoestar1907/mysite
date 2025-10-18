import realServers from './events/[event].js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  
  const stats = {};
  let total = 0;
  
  Object.keys(realServers).forEach(event => {
    const count = realServers[event].length;
    stats[event] = count;
    total += count;
  });
  
  res.json({ success: true, stats, total_servers: total });
}
