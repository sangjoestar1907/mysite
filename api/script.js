export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  // Nếu không phải Roblox thì chặn
  if (!ua.includes("Roblox")) {
    res.status(403).send("Access Denied ❌");
    return;
  }

  // Code script Roblox của bạn
  const script = `
      print("Hello từ API riêng của bạn!")
      print("Hello")
      -- Bạn có thể đặt UI, auto farm, key system... ở đây
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
