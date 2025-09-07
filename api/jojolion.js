export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  // Nếu không phải Roblox thì chặn
  if (!ua.includes("Roblox")) {
    res.status(403).send("Are You Skider?");
    return;
  }

  // Code script Roblox của bạn
  const script = `
      print("Saki-Hub")
      local Players = game:GetService("Players")
local VirtualInputManager = game:GetService("VirtualInputManager")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local gui = player:WaitForChild("PlayerGui")

--===== TÌM & CLICK PHONE GUI =====--
local function findPhone()
    local deviceSelect = gui:FindFirstChild("DeviceSelect")
    local container = deviceSelect and deviceSelect:FindFirstChild("Container")
    local phone = container and container:FindFirstChild("Phone")
    if phone and phone:IsA("GuiObject") then
        return phone
    end
    return nil
end

local function clickGui(guiObj)
    local absPos = guiObj.AbsolutePosition
    local absSize = guiObj.AbsoluteSize
    local x = absPos.X + absSize.X / 2
    local y = absPos.Y + absSize.Y / 2

    VirtualInputManager:SendMouseButtonEvent(x, y, 0, true, game, 0)
    task.wait(0.05)
    VirtualInputManager:SendMouseButtonEvent(x, y, 0, false, game, 0)
end

local function triggerRemotes()
    local extras = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Extras")
    extras:WaitForChild("ChangeLastDevice"):FireServer("Phone")
    extras:WaitForChild("CanChangeServerSettings"):InvokeServer()
end

task.spawn(function()
    while true do
        local phoneButton = findPhone()
        if phoneButton then
            clickGui(phoneButton)
            triggerRemotes()
            break
        end
        task.wait(0.5)
    end
end)

--===== AUTO FARM COIN =====--
local flySpeed = 70
local HRP, Char

RunService.Stepped:Connect(function()
    if Char and Char:FindFirstChild("Humanoid") then
        for _, part in ipairs(Char:GetDescendants()) do
            if part:IsA("BasePart") then
                part.CanCollide = false
            end
        end
    end
end)

local function setupCharacter(char)
    Char = char
    HRP = Char:WaitForChild("HumanoidRootPart")
end

if player.Character then
    setupCharacter(player.Character)
end
player.CharacterAdded:Connect(setupCharacter)

local function flyTo(pos)
    if not HRP then return end
    local dist = (HRP.Position - pos).Magnitude
    local time = math.max(0.05, dist / flySpeed)

    local tween = TweenService:Create(
        HRP,
        TweenInfo.new(time, Enum.EasingStyle.Linear),
        {CFrame = CFrame.new(pos)}
    )
    tween:Play()
    tween.Completed:Wait()
end

local function getAllCoins()
    local coins = {}
    for _, obj in ipairs(workspace:GetDescendants()) do
        if obj:IsA("BasePart") and obj.Parent and obj.Parent.Name == "CoinContainer" then
            table.insert(coins, obj)
        end
    end
    return coins
end

--===== GUI HIỂN THỊ =====--
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "SakiHubGui"
screenGui.ResetOnSpawn = false
screenGui.IgnoreGuiInset = true
screenGui.Parent = gui

local uiContainer = Instance.new("Frame")
uiContainer.Size = UDim2.new(1, 0, 1, 0)
uiContainer.BackgroundColor3 = Color3.new(0, 0, 0)
uiContainer.BorderSizePixel = 0
uiContainer.Visible = true
uiContainer.Parent = screenGui

-- Saki-Hub
local titleLabel = Instance.new("TextLabel")
titleLabel.Size = UDim2.new(1, 0, 0, 60)
titleLabel.Position = UDim2.new(0, 0, 0.45, -60)
titleLabel.BackgroundTransparency = 1
titleLabel.Text = "Saki-Hub"
titleLabel.TextColor3 = Color3.new(1, 1, 1)
titleLabel.Font = Enum.Font.SourceSansBold
titleLabel.TextScaled = true
titleLabel.ZIndex = 2
titleLabel.Parent = uiContainer

-- Username
local usernameLabel = Instance.new("TextLabel")
usernameLabel.Size = UDim2.new(1, 0, 0, 60)
usernameLabel.Position = UDim2.new(0, 0, 0.45, 0)
usernameLabel.BackgroundTransparency = 1
usernameLabel.Text = "Username: " .. player.Name
usernameLabel.TextColor3 = Color3.new(1, 1, 1)
usernameLabel.Font = Enum.Font.SourceSansBold
usernameLabel.TextScaled = true
usernameLabel.ZIndex = 2
usernameLabel.Parent = uiContainer

-- Status
local statusLabel = Instance.new("TextLabel")
statusLabel.Name = "StatusLabel"
statusLabel.Size = UDim2.new(1, 0, 0, 60)
statusLabel.Position = UDim2.new(0, 0, 0.45, 60)
statusLabel.BackgroundTransparency = 1
statusLabel.Text = "Status: Đang rảnh"
statusLabel.TextColor3 = Color3.new(1, 1, 1)
statusLabel.Font = Enum.Font.SourceSansBold
statusLabel.TextScaled = true
statusLabel.ZIndex = 2
statusLabel.Parent = uiContainer

--===== NÚT TOGGLE ON/OFF (HÌNH VUÔNG, MÀU ĐEN) =====--
local toggleButton = Instance.new("TextButton")
toggleButton.Size = UDim2.new(0, 80, 0, 80) -- hình vuông
toggleButton.Position = UDim2.new(0, 20, 0.9, -40) -- dịch sang phải
toggleButton.BackgroundColor3 = Color3.fromRGB(0, 0, 0) -- màu đen sì
toggleButton.Text = "ON"
toggleButton.TextColor3 = Color3.new(1, 1, 1)
toggleButton.Font = Enum.Font.SourceSansBold
toggleButton.TextScaled = true
toggleButton.Parent = screenGui

local UICorner = Instance.new("UICorner")
UICorner.CornerRadius = UDim.new(0, 10)
UICorner.Parent = toggleButton

toggleButton.MouseButton1Click:Connect(function()
    uiContainer.Visible = not uiContainer.Visible
    toggleButton.Text = uiContainer.Visible and "ON" or "OFF"
end)

--===== LOOP AUTO COIN + STATUS CHÍNH XÁC =====--
task.spawn(function()
    while task.wait(0.1) do
        if HRP then
            local coins = getAllCoins()
            local isCollecting = false

            if #coins > 0 then
                for _, coin in ipairs(coins) do
                    if coin and coin.Parent and HRP then
                        statusLabel.Text = "Status: Đang nhặt coin"
                        isCollecting = true
                        flyTo(coin.Position + Vector3.new(0, 3, 0))
                        task.wait(0.1)
                    end
                end
            end

            if not isCollecting then
                statusLabel.Text = "Status: Đang rảnh"
            end
        end
    end
end)
      -- Đây là chỗ bạn bỏ code UI, auto farm, ...
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
