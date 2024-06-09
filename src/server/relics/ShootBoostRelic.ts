import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('ShootBoostRelic')
export class ShootBoostRelic extends PassiveClass {
    public name = 'ShootBoostRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.shootboost -= .1 * this.level
    };

    public onStart = () => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.other.shootboost += .1 * this.level
    };
}