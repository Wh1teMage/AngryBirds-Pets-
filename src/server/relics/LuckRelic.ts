import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('LuckRelic')
export class LuckRelic extends PassiveClass {
    public name = 'LuckRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.luck -= .1 * this.level
    };

    public onStart = () => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.luck += .1 * this.level
    };
}