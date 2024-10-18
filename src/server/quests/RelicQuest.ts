import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { Events } from "server/network";
import { RelicQuestsData, PetQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IDBPetData } from "shared/interfaces/PetData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";

@PassiveDecorator('RelicQuest')
export class RelicQuest extends PassiveClass {

    public name = 'RelicQuest'
    public description = 'fuck me'

    public setOwner = (player: Player) => {
        this.player = player
    };

    private counter = 0

    private giveReward = () => {

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        RelicQuestsData.forEach((value, key) => {

            //if (value.checkCallback) { value.checkCallback(component as IServerPlayerComponent) }
            //if (!value.checkCallback || !value.checkCallback(component as IServerPlayerComponent)) { return }

            value.reward.Additional!.forEach((value2, key2) => { 

                let foundIndex = -1
                profileData.StoredRelicCases.forEach((val3, index3) => { if (val3.name === key2) { foundIndex = index3 } })

                if (foundIndex < 0) { 
                    profileData.StoredRelicCases.push({ name: key2, amount: 0 })
                    foundIndex = profileData.StoredRelicCases.size()-1
                }

                if (key2 === 'RelicQuest1') {
                    Events.ReplicateEffect(component.instance, 'Notify', new Map([['Message', 'Recieved Event Test!'], ['Image', 'EventTest']]))
                }

                profileData.StoredRelicCases[foundIndex]!.amount += value2

            })
            component!.ApplyReward(value.reward)
        })

        component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
        component.replica.SetValue('Profile.StoredRelicCases', profileData.StoredRelicCases)

    }

    public onShoot = () => {
        this.counter += 1

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }

        let profileData = component.profile.Data
        let sessionData = component.session

        let progress = profileData.CurrentQuestsProgress

        progress.set('RelicQuest1', new Map( 
            [['time', sessionData.sessionTime%(20*60)], ['count', this.counter%(800)]]
        ))

        component.replica.SetValue('Profile.CurrentQuestsProgress', progress)

        print(progress.get('RelicQuest1')!.get('count'), progress.get('RelicQuest1')!.get('time'))

        if ((progress.get('RelicQuest1')!.get('time') !== 0) && (progress.get('RelicQuest1')!.get('count') === 0)) {
            this.giveReward()
        }

    }

    public onTick = () => {

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }

        let profileData = component.profile.Data
        let sessionData = component.session

        let progress = profileData.CurrentQuestsProgress

        progress.set('RelicQuest1', new Map( 
            [['time', sessionData.sessionTime%(20*60)], ['count', this.counter%(800)]]
        ))

        component.replica.SetValue('Profile.CurrentQuestsProgress', progress)

        if ((progress.get('RelicQuest1')!.get('time') === 0) && (progress.get('RelicQuest1')!.get('count') !== 0)) {
            this.giveReward()
        }
    }

}