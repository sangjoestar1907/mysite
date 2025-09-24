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
local VirtualUser = game:GetService("VirtualUser")
local RunService = game:GetService("RunService")
local TeleportService = game:GetService("TeleportService")

local LocalPlayer = Players.LocalPlayer
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()
local Humanoid = Character:WaitForChild("Humanoid")

print("Anti AFK ON")

--======================
-- Anti AFK
--======================
LocalPlayer.Idled:Connect(function()
    VirtualUser:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
    task.wait(0.1)
    VirtualUser:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
    print("3")
end)

task.spawn(function()
    while true do
        task.wait(300)

        if Humanoid and Humanoid.Health > 0 then
            Humanoid.Jump = true
            print("1")
        end

        if Character:FindFirstChild("HumanoidRootPart") then
            local hrp = Character.HumanoidRootPart
            local offset = Vector3.new(math.random(-2,2), 0, math.random(-2,2))
            hrp.CFrame = hrp.CFrame + offset
            print("2")
        end
    end
end)

--======================
-- Auto Rejoin (mặc định bật)
--======================
if not getgenv().rejoin then
    getgenv().rejoin = game:GetService("CoreGui").RobloxPromptGui.promptOverlay.ChildAdded:Connect(function(child)
        if child.Name == "ErrorPrompt" 
        and child:FindFirstChild("MessageArea") 
        and child.MessageArea:FindFirstChild("ErrorFrame") then
            TeleportService:Teleport(game.PlaceId)
        end
    end)
end

--======================
-- Lưu / đọc Account JSON theo tên player
--======================
local HttpService = game:GetService("HttpService")
local FolderPath = "LmsHub"
if not isfolder(FolderPath) then makefolder(FolderPath) end

local CurrentAcc = LocalPlayer.Name
local AccountFile = FolderPath.."/"..CurrentAcc..".json"

local function SaveAccount(data)
    writefile(AccountFile, HttpService:JSONEncode(data))
end

local function LoadAccount()
    if isfile(AccountFile) then
        return HttpService:JSONDecode(readfile(AccountFile))
    end
    return {}
end

local AccountData = LoadAccount()

--======================
-- Load Wazure UI
--======================
local WazureV1 = loadstring(game:HttpGet("https://raw.githubusercontent.com/sangjoestar1907/Ngu/refs/heads/main/jojolion.lua"))()

WazureV1:Notify({
    ["Title"] = "Saki-Hub",
    ["Content"] = "Loading",
    ["Logo"] = "rbxassetid://108593743519357",
    ["Time"] = 0.5,
    ["Delay"] = 5
})
task.wait(3)

local WazureGui = WazureV1:Start({
    ["Name"] = "Saki-Hub",
    ["Logo Player"] = "rbxassetid://108593743519357",
    ["Name Player"] = CurrentAcc,
    ["Tab Width"] = 120,
    ["Color"] = Color3.fromRGB(6, 141, 234), 
    ["Custom Toggle"] = false,
    ["CloseCallBack"] = function()
        WazureV1:Notify({
            ["Title"] = "Saki-Hub",
            ["Content"] = "Closed UI",
            ["Logo"] = "rbxassetid://108593743519357",
            ["Time"] = 0.5,
            ["Delay"] = 5
        })
    end
})

--======================
-- Tabs
--======================
local MainTab = WazureGui:MakeTab("Main")
local StatusTab = WazureGui:MakeTab("Status")
local SettingTab = WazureGui:MakeTab("Setting")

--======================
-- Status Label (Time in server)
--======================
local StatusLabel = StatusTab:MakeLabel("Loading...")

local joinTime = tick()

task.spawn(function()
    while true do
        task.wait(1)
        local elapsed = tick() - joinTime
        local hours = math.floor(elapsed / 3600)
        local minutes = math.floor((elapsed % 3600) / 60)
        local seconds = math.floor(elapsed % 60)
        local timeString = string.format("%02d:%02d:%02d", hours, minutes, seconds)
        StatusLabel:Set("Time in server: "..timeString)
    end
end)

--======================
-- MainTab Elements
--======================
local ToggleAutoFarm = MainTab:MakeToggle("AutoFarm", {
    ["Title"]= "Auto Farm Level",
    ["Content"] = "Enable Auto Farm",
    ["Default"] = AccountData.AutoFarm or false,
    ["Callback"] = function(Value)
        AccountData.AutoFarm = Value
        SaveAccount(AccountData)
    end
})

local ToggleAutoSaber = MainTab:MakeToggle("AutoSaber", {
    ["Title"]= "Auto Saber",
    ["Content"] = "Enable Auto Saber",
    ["Default"] = AccountData.AutoSaber or false,
    ["Callback"] = function(Value)
        AccountData.AutoSaber = Value
        SaveAccount(AccountData)
    end
})

--======================
-- SettingTab Elements
--======================
local ResetButton = SettingTab:MakeButton("ResetButton", {
    ["Title"] = "Reset Config",
    ["Content"] = "Clear all settings",
    ["Logo"] = "rbxassetid://84823400006794",
    ["Callback"] = function()
        AccountData = {}
        SaveAccount(AccountData)

        for _, tab in pairs({MainTab, SettingTab}) do
            for _, child in pairs(tab._Objects or {}) do
                if child.Type == "Toggle" then
                    child:Set(false)
                end
            end
        end

        WazureV1:Notify({
            ["Title"] = "Saki-Hub",
            ["Content"] = "Has been reset",
            ["Logo"] = "rbxassetid://108593743519357",
            ["Time"] = 0.5,
            ["Delay"] = 5
        })
    end
})
      -- Đây là chỗ bạn bỏ code UI, auto farm, ...
  `;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(script);
}
