export default function handler(req, res) {
  if (req.method === 'GET') {
    const servers = [
      {
        job_id: "f8a9b0c1-234d-5e6f-8a9b-3c4d5e6f7a8b",
        players: "7/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      },
      {
        job_id: "g9a0b1c2-345e-6f7a-9b0c-4d5e6f7a8b9c", 
        players: "5/12",
        wait: "0s",
        timestamp: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      event: "Near Full Moon",
      servers: servers,
      last_updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
