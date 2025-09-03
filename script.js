export default function handler(req, res) {
  // Trả về code Lua nhưng không ai xem trực tiếp file gốc
  res.setHeader("Content-Type", "text/plain");

  // Đây là code Lua mà Roblox sẽ chạy
  res.send(`
    print(" Script của bạn đã được load thành công!")
    -- ví dụ: gọi file chính
    loadstring(game:HttpGet("https://saki-hub.vercel.app/mm2kaitun.lua"))()
  `);
}
