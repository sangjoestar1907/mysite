export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "e8f9a0b1-235d-6f7a-8b9c-3d4e5f6a7b8c",
        players: "4/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      },
      {
        job_id: "f9a0b1c2-346e-7a8b-9c0d-4e5f6a7b8c9d",
        players: "6/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Darkbeard",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
