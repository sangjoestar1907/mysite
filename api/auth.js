export default function handler(req, res) {
  const key = req.query.key; // Lấy key từ query string

  if (key === "MY_SECRET_KEY") {
    // 👉 Trả script gốc (chỉ bạn mới biết key này)
    res.setHeader("Content-Type", "text/plain");
    res.send(`print("Xin chào, bạn đã vào được private hub")`);
  } else {
    // 👉 Người khác thì trả về bản obfuscate hoặc báo lỗi
    res.setHeader("Content-Type", "text/plain");
    res.send(`loadstring("OBFUSCATED_CODE")()`);
  }
}
