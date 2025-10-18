export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "b5c8d9e0-f12a-4c5d-8e7f-9a0b1c2d3e4f",
        players: "3/12", 
        wait: "0s",
        timestamp: new Date().toISOString()
      },
      {
        job_id: "c6d7e8f9-013b-4d6e-9f0a-1b2c3d4e5f6a",
        players: "5/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Rip Indra",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
