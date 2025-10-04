let BossServers = []; // lưu jobId trong RAM

export default function handler(req, res) {
  const now = Date.now();

  // 🔥 B1: luôn xoá jobId quá 10 phút (600000 ms)
  BossServers = BossServers.filter(s => now - s.time < 10 * 60 * 1000);

  if (req.method === "POST") {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: "Thiếu jobId" });
    }

    // 🔥 B2: loại trùng và lưu lại jobId mới
    BossServers = BossServers.filter(s => s.jobId !== jobId);
    BossServers.push({ jobId, time: now });

    return res.status(200).json({ success: true });
  }

  // 🔥 B3: trả danh sách jobId hiện có
  res.status(200).json(BossServers);
}
