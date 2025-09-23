export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  // Nếu không phải Roblox thì chặn
  if (!ua.includes("Roblox")) {
    res.status(403).send("Are You Skider?");
    return;
  }

  // Code script Roblox của bạn
  const script = `
      print("Gei")
      -- Check Config trước khi tạo UI
if not getgenv().Config or not getgenv().Config.Farm or getgenv().Config.Farm.Ui == false then
    return warn("UI đã bị tắt qua Config")
end

-- Tiếp tục code UI bình thường
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.IgnoreGuiInset = true
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = game.CoreGui

local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 300, 0, 200)
MainFrame.Position = UDim2.new(0.5, -150, 0.5, -100)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
MainFrame.BorderSizePixel = 0
MainFrame.Parent = ScreenGui

-- Logo
local Image = Instance.new("ImageLabel")
Image.Size = UDim2.new(0, 80, 0, 80)
Image.Position = UDim2.new(0.5, -40, 0, 10)
Image.BackgroundTransparency = 1
Image.Image = "rbxassetid://87227333785040"
Image.Parent = MainFrame

-- Chữ
local Title = Instance.new("TextLabel")
Title.Text = "Radiant Hub Free"
Title.Size = UDim2.new(1, 0, 0, 50)
Title.Position = UDim2.new(0, 0, 0, 90)
Title.BackgroundTransparency = 1
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextScaled = true
Title.Font = Enum.Font.GothamBold
Title.Parent = MainFrame
      -- Đây là chỗ bạn bỏ code UI, auto farm, ...
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
