import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { EggQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('EggQuest')
export class PetQuest extends PassiveClass {

    public name = 'EggQuest'
    public description = 'fuck me'

    private component?: ServerPlayerComponent
    
    constructor() {
        super()
        if (!this.player) { return }
        this.component = ServerPlayerFabric.GetPlayer(this.player)
    }

    public onTick = () => {

        if (!this.component) { return }
        
        let profileData = this.component.profile.Data
        let sessionData = this.component.session

        EggQuestsData.forEach((value, key) => {
            if (!value.checkCallback || !value.checkCallback(this.component as IServerPlayerComponent)) { return }

            value.reward.Additional!.forEach((value) => { profileData.StatValues[value.data as keyof typeof profileData.StatValues] += value.amount })
            this.component!.ApplyReward(value.reward)
        })

        this.component.replica.SetValues('Profile.StatValues', profileData.StatValues)

    }

}