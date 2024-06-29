import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('StrengthRelic')
export class StrengthRelic extends PassiveClass {
    public name = 'StrengthRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        

        let component = ServerPlayerFabric.GetPlayer(this.player)
        print('stop', info[this.level-1].stats.get('multi')! / 100, 'info[this.level-1].get(multi)! / 100', component.session.multipliers.other.strength)
        component.session.multipliers.other.strength -= info[this.level-1].stats.get('multi')! / 100
    };

    public onStart = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!
        

        let component = ServerPlayerFabric.GetPlayer(this.player)
        print('start', info[this.level-1].stats.get('multi')! / 100, 'info[this.level-1].get(multi)! / 100', component.session.multipliers.other.strength)
        component.session.multipliers.other.strength += info[this.level-1].stats.get('multi')! / 100
    };
}