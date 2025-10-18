export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "a1b2c3d4-567e-8f9a-0b1c-6d7e8f9a0b1c",
        players: "2/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Cursed Captain",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
