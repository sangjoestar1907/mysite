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
      -- Tạo ScreenGui
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "RadiantHubUI"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Làm mờ nền
local Lighting = game:GetService("Lighting")
local Blur = Instance.new("BlurEffect")
Blur.Size = 20
Blur.Parent = Lighting

-- Frame chính
local MainFrame = Instance.new("Frame")
MainFrame.Size = UDim2.new(0, 400, 0, 300)
MainFrame.AnchorPoint = Vector2.new(0.5, 0.5)
MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
MainFrame.BackgroundTransparency = 1
MainFrame.Visible = getgenv().Config.Farm.Ui -- hiện/ẩn theo config
MainFrame.Parent = ScreenGui

-- Logo
local Image = Instance.new("ImageLabel")
Image.Size = UDim2.new(0, 80, 0, 80)
Image.Position = UDim2.new(0.5, -40, 0, 10)
Image.BackgroundTransparency = 1
Image.Image = "rbxassetid://87227333785040"
Image.Parent = MainFrame

-- Text: Radiant Hub Free
local Title = Instance.new("TextLabel")
Title.Size = UDim2.new(1, 0, 0, 50)
Title.Position = UDim2.new(0, 0, 0.45, 0)
Title.BackgroundTransparency = 1
Title.Text = "Radiant Hub Free"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.Font = Enum.Font.SourceSansBold
Title.TextSize = 40
Title.TextStrokeTransparency = 0.2
Title.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
Title.TextXAlignment = Enum.TextXAlignment.Center
Title.TextYAlignment = Enum.TextYAlignment.Center
Title.Parent = MainFrame

-- Text: Bounty/Honor
local Bounty = Instance.new("TextLabel")
Bounty.Size = UDim2.new(1, 0, 0, 40)
Bounty.Position = UDim2.new(0, 0, 0.7, 0)
Bounty.BackgroundTransparency = 1
Bounty.Text = "Bounty/Honor : 3985988"
Bounty.TextColor3 = Color3.fromRGB(255, 255, 255)
Bounty.Font = Enum.Font.SourceSansBold
Bounty.TextSize = 30
Bounty.TextStrokeTransparency = 0.2
Bounty.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
Bounty.TextXAlignment = Enum.TextXAlignment.Center
Bounty.TextYAlignment = Enum.TextYAlignment.Center
Bounty.Parent = MainFrame

-- Text: discord
local Discord = Instance.new("TextLabel")
Discord.Size = UDim2.new(1, 0, 0, 25)
Discord.Position = UDim2.new(0, 0, 0.9, 0)
Discord.BackgroundTransparency = 1
Discord.Text = "discord.gg/radianthubv2"
Discord.TextColor3 = Color3.fromRGB(255, 255, 255)
Discord.Font = Enum.Font.SourceSans
Discord.TextSize = 20
Discord.TextStrokeTransparency = 0.2
Discord.TextStrokeColor3 = Color3.fromRGB(0, 0, 0)
Discord.TextXAlignment = Enum.TextXAlignment.Center
Discord.TextYAlignment = Enum.TextYAlignment.Center
Discord.Parent = MainFrame

-- Blur theo config
Blur.Enabled = getgenv().Config.Farm.Ui

-- Toggle UI bằng phím RightShift
local UserInputService = game:GetService("UserInputService")
local isOpen = getgenv().Config.Farm.Ui

UserInputService.InputBegan:Connect(function(input, gp)
    if gp then return end
    if input.KeyCode == Enum.KeyCode.RightShift then
        isOpen = not isOpen
        MainFrame.Visible = isOpen
        Blur.Enabled = isOpen
        getgenv().Config.Farm.Ui = isOpen
    end
end)
      -- Đây là chỗ bạn bỏ code UI, auto farm, ...
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
