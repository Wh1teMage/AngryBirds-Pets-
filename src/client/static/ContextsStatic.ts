import { Players } from "@rbxts/services"
import { PlayerController } from "client/controllers/PlayerController"
import { Events } from "client/network"

const player = Players.LocalPlayer

export const Contexts = new Map<string, {obj: Enum.KeyCode | Enum.UserInputType | Enum.PlayerActions | string, state?: Enum.UserInputState, callback: () => void}>

Contexts.set('test', {obj: Enum.KeyCode.R, state: Enum.UserInputState.Begin, callback: () => {
    print('Send Input')
    Events.RegisterInput.fire('test', Enum.UserInputState.Begin)
}})