import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";

@PassiveDecorator('EquipSlotRelic')
export class EquipSlotRelic extends PassiveClass {
    public name = 'EquipSlotRelic'
    public description = 'test'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onEnd = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.UnequipAll()
        component.profile.Data.Config.MaxEquippedPets -= info[this.level-1].stats.get('amount')!

        component.replica.SetValue('Profile.Config.MaxEquippedPets', component.profile.Data.Config.MaxEquippedPets)
    };

    public onLeft = this.onEnd

    public onStart = () => {
        if (!this.player) { return }

        let info = RelicsInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.profile.Data.Config.MaxEquippedPets += info[this.level-1].stats.get('amount')!

        component.replica.SetValue('Profile.Config.MaxEquippedPets', component.profile.Data.Config.MaxEquippedPets)
    };
}