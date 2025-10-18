export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "h0b1c2d3-456f-7a8b-9c0d-5e6f7a8b9c0d",
        players: "9/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Mystic Island",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
