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
      local Players = game:GetService("Players")
local VirtualInputManager = game:GetService("VirtualInputManager")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Player = Players.LocalPlayer
local gui = Player:WaitForChild("PlayerGui")

local Char, HRP
local flySpeed = 70 -- tốc độ bay (studs/giây)

-- 📌 1. BlackScreen GUI + Username + Toggle
local blackGui = Instance.new("ScreenGui")
blackGui.Name = "BlackScreenGui"
blackGui.ResetOnSpawn = false
blackGui.IgnoreGuiInset = true
blackGui.Parent = gui

local blackFrame = Instance.new("Frame")
blackFrame.Name = "BlackFrame"
blackFrame.Size = UDim2.new(1, 0, 1, 0)
blackFrame.Position = UDim2.new(0, 0, 0, 0)
blackFrame.BackgroundColor3 = Color3.new(0, 0, 0)
blackFrame.BorderSizePixel = 0
blackFrame.Visible = true
blackFrame.Parent = blackGui

local usernameLabel = Instance.new("TextLabel")
usernameLabel.Name = "UsernameLabel"
usernameLabel.Size = UDim2.new(0, 400, 0, 50)
usernameLabel.Position = UDim2.new(0.5, -200, 0.5, -25)
usernameLabel.BackgroundTransparency = 1
usernameLabel.Text = Player.Name
usernameLabel.TextColor3 = Color3.new(1, 1, 1)
usernameLabel.Font = Enum.Font.SourceSansBold
usernameLabel.TextScaled = true
usernameLabel.Parent = blackFrame

local toggleButton = Instance.new("TextButton")
toggleButton.Name = "ToggleButton"
toggleButton.Size = UDim2.new(0, 80, 0, 80)
toggleButton.Position = UDim2.new(0, 20, 0.9, -40)
toggleButton.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
toggleButton.Text = ""
toggleButton.Parent = blackGui

local UICorner = Instance.new("UICorner")
UICorner.CornerRadius = UDim.new(0, 20)
UICorner.Parent = toggleButton

toggleButton.MouseButton1Click:Connect(function()
    blackFrame.Visible = not blackFrame.Visible
end)

-- 📌 2. Setup character (noclip)
local function setupCharacter(char)
    Char = char
    HRP = Char:WaitForChild("HumanoidRootPart")

    RunService.Stepped:Connect(function()
        if Char and Char:FindFirstChild("Humanoid") then
            for _, part in ipairs(Char:GetDescendants()) do
                if part:IsA("BasePart") then
                    part.CanCollide = false
                end
            end
        end
    end)
end

if Player.Character then
    setupCharacter(Player.Character)
end
Player.CharacterAdded:Connect(setupCharacter)

-- 📌 3. Tìm GUI Phone
local function findPhone()
    local deviceSelect = gui:FindFirstChild("DeviceSelect")
    local container = deviceSelect and deviceSelect:FindFirstChild("Container")
    local phone = container and container:FindFirstChild("Phone")
    if phone and phone:IsA("GuiObject") then
        print("✅ Tìm thấy Phone GUI!")
        return phone
    end
    return nil
end

-- 📌 4. Click Phone GUI
local function clickGui(guiObj)
    local absPos = guiObj.AbsolutePosition
    local absSize = guiObj.AbsoluteSize
    local x = absPos.X + absSize.X / 2
    local y = absPos.Y + absSize.Y / 2

    VirtualInputManager:SendMouseButtonEvent(x, y, 0, true, game, 0)
    task.wait(0.05)
    VirtualInputManager:SendMouseButtonEvent(x, y, 0, false, game, 0)

    print("✅ Đã click vào Phone GUI!")
end

-- 📌 5. Trigger 2 Remote
local function triggerRemotes()
    local extras = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Extras")

    extras:WaitForChild("ChangeLastDevice"):FireServer("Phone")
    print("📡 FireServer ChangeLastDevice: Phone")

    local result = extras:WaitForChild("CanChangeServerSettings"):InvokeServer()
    print("📡 InvokeServer CanChangeServerSettings →", result)
end

-- 📌 6. Bay mượt tới vị trí bằng Tween
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

-- 📌 7. Lấy tất cả coin trong map
local function getAllCoins()
    local coins = {}
    for _, obj in ipairs(workspace:GetDescendants()) do
        if obj:IsA("BasePart") and obj.Parent and obj.Parent.Name == "CoinContainer" then
            table.insert(coins, obj)
        end
    end
    return coins
end

-- 📌 8. Main
task.spawn(function()
    -- B1: click Phone + remote
    while true do
        local phoneButton = findPhone()
        if phoneButton then
            clickGui(phoneButton)
            triggerRemotes()
            break
        else
            print("⏳ Chưa thấy Phone, kiểm tra lại...")
        end
        task.wait(0.5)
    end

    -- B2: auto farm coin
    task.spawn(function()
        while task.wait(0.1) do
            if HRP then
                local coins = getAllCoins()
                if #coins > 0 then
                    for _, coin in ipairs(coins) do
                        if coin and coin.Parent and HRP then
                            flyTo(coin.Position + Vector3.new(0, 3, 0))
                            task.wait(0.3)
                        end
                    end
                end
            end
        end
    end)
end)
      -- Đây là chỗ bạn bỏ code UI, auto farm, ...
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
