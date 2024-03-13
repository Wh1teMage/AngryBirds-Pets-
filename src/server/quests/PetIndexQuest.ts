import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { PetIndexQuestsData, PetQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IDBPetData } from "shared/interfaces/PetData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('PetIndexQuest')
export class PetQuest extends PassiveClass {

    public name = 'PetIndexQuest'
    public description = 'fuck me'

    private component?: ServerPlayerComponent
    
    constructor() {
        super()
        if (!this.player) { return }
        this.component = ServerPlayerFabric.GetPlayer(this.player)
    }

    public onPetAdded = (pet: IDBPetData) => {

        if (!this.component) { return }
                     
        let profileData = this.component.profile.Data
        let sessionData = this.component.session

        PetIndexQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key)) { return }
            if (profileData.PetIndex.size() < value.requirements.get('pets')!) { return }

            profileData.CompletedQuests.push(key)
            this.component!.ApplyReward(value.reward)
        })

        this.component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)

    }

}