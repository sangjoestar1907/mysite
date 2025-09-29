// api/check.js
export default function handler(req, res) {
  // Lấy key từ query (?key=...)
  const key = (req.query.key || "").trim();

  // Key hợp lệ (bạn có thể thay bằng danh sách key trong DB hoặc env)
  const validKeys = ["sang123", "vipkey456"];

  if (!key) {
    return res.status(400).json({ valid: false, msg: "No key provided" });
  }

  const ok = validKeys.includes(key);
  return res.status(200).json({ valid: ok, msg: ok ? "OK" : "Invalid key" });
}
