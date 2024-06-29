import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
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

        let info = RelicsInfo.get(this.name)!
        let component = ServerPlayerFabric.GetPlayer(this.player)

        let chance = math.random(1, 100)

        if (chance < info[this.level-1].stats.get('chance')!) {
            component.SetWins(component.profile.Data.Values.WinsVal + egg.price * amount * info[this.level-1].stats.get('multi')! / 100 )
        }

    }
}