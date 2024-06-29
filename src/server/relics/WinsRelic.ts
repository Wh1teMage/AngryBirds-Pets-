import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('WinsRelic')
export class WinsRelic extends PassiveClass {
    public name = 'WinsRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.wins -= info[this.level-1].stats.get('multi')! / 100
    };

    public onStart = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.wins += info[this.level-1].stats.get('multi')! / 100
    };
}