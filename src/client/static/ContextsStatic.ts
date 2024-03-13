import { Players } from "@rbxts/services"
import { PlayerController } from "client/controllers/PlayerController"
import { Events } from "client/network"
import { PlayEffect } from "./EffectsStatic"

const player = Players.LocalPlayer

export const Contexts = new Map<string, {obj: Enum.KeyCode | Enum.UserInputType | Enum.PlayerActions | string, state?: Enum.UserInputState, callback: () => void}>()

Contexts.set('test', {obj: Enum.KeyCode.R, state: Enum.UserInputState.Begin, callback: () => {
    print('Send Input')
    Events.RegisterInput.fire('test', Enum.UserInputState.Begin)
}})

Contexts.set('ClickEffect', {obj: Enum.UserInputType.MouseButton1, state: Enum.UserInputState.Begin, callback: () => {
    let mouse = player.GetMouse()
    PlayEffect('ClickSound')
    PlayEffect('ClickEffect', new Map<string, any>([['position', new Vector2(mouse.X, mouse.Y)]]))
    PlayEffect('ClickBind', new Map<string, any>([['bind', PlayerController.currentClicks]]))
    PlayEffect('Click')
}})

// Contexts.set('click effect', {obj: Enum.UserInputType.Touch, state: Enum.UserInputState.Begin, callback: () => {
//     print('Send Input')
//     Events.RegisterInput.fire('test', Enum.UserInputState.Begin)
// }})