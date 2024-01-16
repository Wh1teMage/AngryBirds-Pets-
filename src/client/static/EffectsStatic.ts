import { Players } from "@rbxts/services"
import { Events } from "client/network";
import { EffectName } from "shared/enums/EffectEnums";
import { EffectsUtilities } from "shared/utility/EffectsUtilities"

const player = Players.LocalPlayer

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
    EffectsUtilities.PlaySound('rbxassetid://7741939171')
})