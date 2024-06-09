import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { ToolsData } from "shared/info/ToolInfo";
import { EggBuyType, IEggData } from "shared/interfaces/EggData";

@PassiveDecorator('DuplicateEggRelic')
export class DuplicateEggRelic extends PassiveClass {
    public name = 'DuplicateEggRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEggOpened = (egg: IEggData, amount: number, buytype: EggBuyType) => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)

        let chance = math.random(1, 100)

        if (chance > this.level + 100) { return }

        component.OpenEggBypass(egg.name, buytype, true)
    }
}