import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";
import { EggBuyType, EggValueType, IEggData } from "shared/interfaces/EggData";

@PassiveDecorator('DuplicateEggRelic')
export class DuplicateEggRelic extends PassiveClass {
    public name = 'DuplicateEggRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEggOpened = (egg: IEggData, amount: number, buytype: EggBuyType) => {
        if (!this.player) { return }
        if (egg.valuetype === EggValueType.VBugs) { return }

        let component = ServerPlayerFabric.GetPlayer(this.player)
        let info = RelicsInfo.get(this.name)!

        let chance = math.random(1, 1000)

        if (chance > info[this.level-1].stats.get('chance')!*10) { return }

        task.delay(6, () => { component.OpenEggBypass(egg.name, buytype) })
    }
}