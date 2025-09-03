
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.send(`
    print(" Script từ API động đã chạy thành công!")
    game.Players.LocalPlayer:Kick("Script test đã hoạt động 🚀")
  `);
}
