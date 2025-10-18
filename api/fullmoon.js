export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "d3d6af26-e22a-4b8c-9f5a-1c3b8e9f7a2d",
        players: "8/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      },
      {
        job_id: "ac60014b-c24e-4a7d-8b3f-2d5a9e8c1b4e", 
        players: "6/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Full Moon",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
