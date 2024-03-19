import { Players } from "@rbxts/services"
import { Events } from "client/network";
import { EffectName } from "shared/enums/EffectEnums";
import { EffectsUtilities } from "shared/utility/EffectsUtilities"
import { TweenService } from "@rbxts/services";
import { ToolOperationStatus } from "shared/interfaces/ToolData";
import { Binding } from "client/classes/BindbingValues";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const player = Players.LocalPlayer
//const circle = playerGui.WaitForChild('TestingStuff').WaitForChild('Frame') as Frame

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
    /*
    let clonedCircle = circle.Clone()
    let position = additional!.get('position') as Vector2
    clonedCircle.Parent = playerGui.WaitForChild('TestingStuff')
    clonedCircle.Position = UDim2.fromOffset(position.X, position.Y)
    TweenService.Create(clonedCircle, new TweenInfo(0.25), {'Size': UDim2.fromScale(0.5, 0.5)}).Play()
    task.wait(0.25)
    clonedCircle.Destroy()
    */
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