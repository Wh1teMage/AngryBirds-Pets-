import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { PetQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('PetQuest')
export class PetQuest extends PassiveClass {

    public name = 'PetQuest'
    public description = 'fuck me'

    private component?: ServerPlayerComponent
    
    constructor() {
        super()
        if (!this.player) { return }
        this.component = ServerPlayerFabric.GetPlayer(this.player)
    }

    public onValueChanged = (value: PassiveValues) => {

        if (!this.component) { return }
                     
        let profileData = this.component.profile.Data
        let sessionData = this.component.session

        PetQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key)) { return }
            if (value.checkCallback) { value.checkCallback(this.component as IServerPlayerComponent) }
        })

        this.component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)

    }

}