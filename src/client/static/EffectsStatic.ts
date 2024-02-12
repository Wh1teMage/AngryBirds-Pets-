import { Players } from "@rbxts/services"
import { Events } from "client/network";
import { EffectName } from "shared/enums/EffectEnums";
import { EffectsUtilities } from "shared/utility/EffectsUtilities"
import { TweenService } from "@rbxts/services";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const player = Players.LocalPlayer
//const circle = playerGui.WaitForChild('TestingStuff').WaitForChild('Frame') as Frame

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