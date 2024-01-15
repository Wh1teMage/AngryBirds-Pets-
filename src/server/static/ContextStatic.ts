import { ServerPlayerComponent } from "server/components/PlayerComponent"
import { Events } from "server/network"
import { EffectName } from "shared/enums/EffectEnums"

export const ContextCallbacks = new Map<string, (player: ServerPlayerComponent) => void>([])

ContextCallbacks.set('test'+tostring(Enum.UserInputState.Begin), (player) => {
    print('Recieved!')
    Events.ReplicateEffect.fire(player.instance, EffectName.ClickSound)
})