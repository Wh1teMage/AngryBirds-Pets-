import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { Events } from "server/network";
import { EggQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('EggQuest')
export class EggQuest extends PassiveClass {

    public name = 'EggQuest'
    public description = 'fuck me'

    private component?: ServerPlayerComponent

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onTick = () => {
        if (!this.player) { return }
        
        let component = ServerPlayerFabric.GetPlayer(this.player)
        if (!component) { return }
        
        let profileData = component.profile.Data
        let sessionData = component.session

        EggQuestsData.forEach((value, key) => {

            if (value.checkCallback) { value.checkCallback(component as IServerPlayerComponent) }
            if (!value.checkCallback || !value.checkCallback(component as IServerPlayerComponent)) { return }

            value.reward.Additional!.forEach((value2, key2) => { 

                let foundIndex = -1
                profileData.StoredEggs.forEach((val3, index3) => { if (val3.name === key2) { foundIndex = index3 } })

                if (foundIndex < 0) { 
                    profileData.StoredEggs.push({ name: key2, amount: 0 })
                    foundIndex = profileData.StoredEggs.size()-1
                }

                if (key2 === 'Shadow') {
                    Events.ReplicateEffect(component.instance, 'Notify', new Map([['Message', 'Recieved Shadow Egg!'], ['Image', 'ShadowEgg']]))
                }

                profileData.StoredEggs[foundIndex]!.amount += value2

            })
            component!.ApplyReward(value.reward)
        })

        component.replica.SetValues('Profile.StatValues', profileData.StatValues)
        component.replica.SetValue('Profile.StoredEggs', profileData.StoredEggs)

    }

}