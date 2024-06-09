import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { ToolsData } from "shared/info/ToolInfo";
import { IEggData } from "shared/interfaces/EggData";

@PassiveDecorator('CashbackRelic')
export class CashbackRelic extends PassiveClass {
    public name = 'CashbackRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEggOpened = (egg: IEggData, amount: number) => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.SetWins(component.profile.Data.Values.WinsVal + egg.price * amount * this.level * 0.1)
    }
}