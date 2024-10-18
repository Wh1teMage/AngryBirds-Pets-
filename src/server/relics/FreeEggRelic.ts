import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { ToolsData } from "shared/info/ToolInfo";
import { IEggData } from "shared/interfaces/EggData";

@PassiveDecorator('FreeEggRelic')
export class FreeEggRelic extends PassiveClass {
    public name = 'FreeEggRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEggOpened = (egg: IEggData, amount: number) => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)

        let chance = math.random(1, 100)

        if (chance > this.level + 100) { return }

        //component.SetGems(component.profile.Data.Values.GemsVal + egg.price * amount)
    }
}