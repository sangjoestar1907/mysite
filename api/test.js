import fs from "fs";
import path from "path";

const filePath = path.resolve("./data.json");

export default function handler(req, res) {
  let BossServers = [];

  if (fs.existsSync(filePath)) {
    BossServers = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  if (req.method === "POST") {
    const { jobId, placeId } = req.body;
    if (!jobId) return res.status(400).json({ error: "Thiếu jobId" });

    // Xóa trùng
    BossServers = BossServers.filter(s => s.jobId !== jobId);
    BossServers.push({ jobId, placeId, time: Date.now() });

    fs.writeFileSync(filePath, JSON.stringify(BossServers, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(200).json(BossServers);
}
