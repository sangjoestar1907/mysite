export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "d7e8f9a0-124c-5e6f-8a0b-2c3d4e5f6a7b",
        players: "10/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Dough King", 
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
