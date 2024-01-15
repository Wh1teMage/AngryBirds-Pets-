import { ServerPlayerComponent } from "server/components/PlayerComponent";
import { BuyType } from "shared/interfaces/EggData";

export const MarketCallbacks = new Map<string, (player: ServerPlayerComponent) => void>([])

MarketCallbacks.set('test', (player) => {
    print('Purchased!')
    player.OpenEggBypass('Donate', BuyType.Single)
    print(player.profile.Data)
})