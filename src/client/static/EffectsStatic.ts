import { Players } from "@rbxts/services"
import { Events } from "client/network";
import { EffectName } from "shared/enums/EffectEnums";
import { EffectsUtilities } from "shared/utility/EffectsUtilities"
import { TweenService } from "@rbxts/services";
import { ToolOperationStatus } from "shared/interfaces/ToolData";
import { Binding } from "client/classes/BindbingValues";
import { EggBuyType } from "shared/interfaces/EggData";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { defaultGlobal } from "shared/info/DatastoreInfo";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const player = Players.LocalPlayer

const mainUI = playerGui.WaitForChild('MainUI') as ScreenGui
const circle = mainUI.WaitForChild('Templates').WaitForChild('ClickEffect') as ImageLabel

let canFireUseEvents = true

export const PlayEffect = (name: string, additional?: Map<string, any>) => {
    if (!Effects.get(name)) { warn('Effects Doesnt Exist!'); return }
    Effects.get(name)!(additional)
}

export const Effects = new Map<string, (
    additional?: Map<string, any>
) => void>([])

Effects.set('ReplicatePurchase', (additional) => {
    Events.PurchasePrompt.fire(additional?.get('productId') as number, player.UserId)
})

Effects.set('ClickSound', () => {
    EffectsUtilities.PlaySound('rbxassetid://6052548458')
})

Effects.set('HoverSound', () => {
    EffectsUtilities.PlaySound('rbxassetid://10066936758')
})

Effects.set('ClickEffect', (additional) => {
    
    let clonedCircle = circle.Clone()
    let position = additional!.get('position') as Vector2

    clonedCircle.Visible = true
    clonedCircle.Parent = mainUI
    clonedCircle.Position = UDim2.fromOffset(position.X, position.Y+100)

    TweenService.Create(clonedCircle, new TweenInfo(0.25), {'Size': UDim2.fromScale(0.15, 0.15)}).Play()
    TweenService.Create(clonedCircle, new TweenInfo(0.25), {'ImageTransparency': 1}).Play()

    task.wait(0.25)
    clonedCircle.Destroy()
    
})

Effects.set('ChangeUseStatus', (additional) => {
    canFireUseEvents = additional!.get('bool') as boolean
})

Effects.set('Click', () => {
    if (canFireUseEvents) { Events.ManageTool.fire(ToolOperationStatus.Use, 'default') } 
}) 

Effects.set('ClickBind', (additional) => {
    let bind = additional!.get('bind') as Binding<number>
    bind.set(bind.get()+math.random(10, 30)/10)
})

Effects.set('DonationStarted', () => {
    let frame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('PurchaseAttempt') as Frame

    frame.Visible = true
    frame.Transparency = 1

    TweenService.Create(frame, new TweenInfo(.1), { 'Transparency': 0.35 }).Play()

    let logo = frame.WaitForChild('Logo') as ImageLabel

    while (frame.Visible && task.wait(.1)) {
        let angle = 10 * (math.abs(math.sin(math.rad(frame.Rotation)))+1)
        TweenService.Create(logo, new TweenInfo(.1, Enum.EasingStyle.Linear), { 'Rotation': logo.Rotation + angle }).Play()
    }

})

Effects.set('DonationEnded', () => {
    let frame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('PurchaseAttempt') as Frame
    TweenService.Create(frame, new TweenInfo(.1), { 'Transparency': 1 }).Play()
    task.wait(.1)
    frame.Visible = false
})

Effects.set('SpinStarted', (additional) => {
    print(additional, 'SpinStarted')
    let spinHolder = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('WheelSpin').WaitForChild('SpinHolder') as ImageLabel

    let rewardName = additional!.get('Reward') as string
    let spinTime = additional!.get('SpinTime') as number

    let rewardsList = new Map<string, {nameUI: string, rotation: number}>([
        ['Wins1', { nameUI: '1', rotation: 0 }],
        ['Wins2', { nameUI: '1', rotation: 0 }],
    ])

    spinHolder.Rotation = 0
    
    let delta = .1
    let newSpinTime = spinTime/delta
    let maxDegree = 360*5 + rewardsList.get(rewardName)!.rotation

    let angularSpeed = maxDegree*2/newSpinTime
    let currentangularspeed = angularSpeed
    let decrease = angularSpeed/newSpinTime
    
    let i = 0

    while (i < maxDegree) {
        i += math.abs(currentangularspeed)
        i = math.clamp(math.round(i), 0, maxDegree)
        currentangularspeed -= decrease

        TweenService.Create(spinHolder, new TweenInfo(delta, Enum.EasingStyle.Linear), { 'Rotation': i }).Play()
        task.wait(delta)
    }

})

Effects.set('OpenEgg', (additional) => {
    let buyType = additional!.get('BuyType') as EggBuyType
    let billboards = BillboardFabric.GetBillboards()

    billboards.forEach((val) => {
        if (!val.instance.Enabled) { return }
        Events.BuyEgg(val.instance.Name, buyType)
    })
})

Effects.set('LimitedPets', (additional) => {
    let info = additional!.get('Info') as Map<string, number>
    print(info)
    let scrollingFrame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('Store').WaitForChild('ScrollingFrame') as ScrollingFrame
    let limitedPets = scrollingFrame.WaitForChild('LimitedPets').WaitForChild('Pets')

    let petList = new Map<string, string>([
        ['Limited1', 'LimitedPet1'],
        ['Limited2', 'LimitedPet2'],
        ['Limited3', 'LimitedPet3'],
    ])

    info.forEach((val, key) => {
        let petUI = limitedPets.WaitForChild(petList.get(key)!);
        (petUI.WaitForChild('Left') as TextLabel).Text = tostring(val)+'/'+tostring(defaultGlobal.get(key))+' Left'
    })

})