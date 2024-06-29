import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('WalkspeedRelic')
export class WalkspeedRelic extends PassiveClass {
    public name = 'WalkspeedRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.character!.Humanoid.WalkSpeed /= (1+(info[this.level-1].stats.get('multi')! / 100))
    };

    public onStart = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.character!.Humanoid.WalkSpeed *= (1+(info[this.level-1].stats.get('multi')! / 100))
    };
}