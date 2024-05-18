import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { Events } from "server/network";
import { PetIndexQuestsData, PetQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IDBPetData } from "shared/interfaces/PetData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('PetIndexQuest')
export class PetIndexQuest extends PassiveClass {

    public name = 'PetIndexQuest'
    public description = 'fuck me'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onPetAdded = (pet: IDBPetData) => {

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        PetIndexQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key)) { return }
            if (profileData.PetIndex.size() < value.requirements.get('pets')!) { return }

            profileData.CompletedQuests.push(key)
            component!.ApplyReward(value.reward)

            Events.ReplicateEffect(component.instance, 'Notify', new Map([['Message', 'Pet Index Tier Completed!'], ['Image', 'Success']]))
        })

        component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)

    }

}