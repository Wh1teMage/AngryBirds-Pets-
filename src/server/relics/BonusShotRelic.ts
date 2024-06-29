import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('BonusShotRelic')
export class BonusShotRelic extends PassiveClass {
    public name = 'BonusShotRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onShoot = () => {
        if (!this.player) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        let profileData = component.profile.Data

        let chance = math.random(1, 100)

        let info = RelicsInfo.get(this.name)!

        let toolInfo = ToolsData.get(profileData.EquippedTool)!
        let value = toolInfo.addition * component.CalculateMultiplier('strength') * info[this.level-1].stats.get('multi')!

        if (chance < info[this.level-1].stats.get('chance')!) {
            component.SetStrength(profileData.Values.StrengthVal + value)
        }
    };

}