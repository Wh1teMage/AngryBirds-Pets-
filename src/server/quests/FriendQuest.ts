import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { FriendQuestsData } from "shared/info/QuestInfo";
import { IQuestData } from "shared/interfaces/QuestData";
import { IRewardData } from "shared/interfaces/RewardData";


@PassiveDecorator('FriendQuest')
export class FriendQuest extends PassiveClass  {

    public name = 'FriendQuest'
    public description = 'fuck me'
    
    public setOwner = (player: Player) => {
        this.player = player
    };

    public onFriendsChanged = () => {
        print('hello???hello???')

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        //sessionData.friendList

        profileData.StatValues.FriendsCount = math.max(profileData.StatValues.FriendsCount, sessionData.friendList.size())
        sessionData.multipliers.friends.wins = 1+profileData.StatValues.FriendsCount/20

        component.replica.SetValues('Session.multipliers.friends', sessionData.multipliers.friends)
        print('Changed', profileData.StatValues.FriendsCount, sessionData.multipliers.friends.wins, 'testtesttesttest')
        FriendQuestsData.forEach((value, key) => {
            print(profileData.StatValues.FriendsCount < value.requirements.get('friends'))
            if (profileData.CompletedQuests.includes(key) || (profileData.StatValues.FriendsCount < value.requirements.get('friends'))) { return }
            print(key)
            profileData.CompletedQuests.push(key)
            component.ApplyReward(value.reward)
        })

        component.replica.SetValue('Profile.StatValues.FriendsCount', profileData.StatValues.FriendsCount)
        component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
    }

}