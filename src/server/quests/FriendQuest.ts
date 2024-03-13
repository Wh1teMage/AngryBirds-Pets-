import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { FriendQuestsData } from "shared/info/QuestInfo";
import { IQuestData } from "shared/interfaces/QuestData";
import { IRewardData } from "shared/interfaces/RewardData";


@PassiveDecorator('FriendQuest')
export class FriendQuest extends PassiveClass  {

    public name = 'FriendQuest'
    public description = 'fuck me'
    
    public onFriendsChanged = () => {
        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        sessionData.multipliers.friends.wins = 1+sessionData.friendList.size()/10

        component.replica.SetValues('Session.multipliers.friends', sessionData.multipliers.friends)

        FriendQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key) || sessionData.friendList.size() < value.requirements.get('friends')) { return }
            profileData.CompletedQuests.push(key)
            component.ApplyReward(value.reward)
        })

        component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
    }

}