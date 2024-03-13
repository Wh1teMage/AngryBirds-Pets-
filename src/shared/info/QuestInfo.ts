import { IQuestData } from "shared/interfaces/QuestData";

//! MAKE UNIQUE NAMES FOR QUESTS

export const FriendQuestsData = new Map<string, IQuestData>()
export const PetIndexQuestsData = new Map<string, IQuestData>()
export const PetQuestsData = new Map<string, IQuestData>()
export const EggQuestsData = new Map<string, IQuestData>()

FriendQuestsData.set('FriendQuest1', {
    requirements: new Map([['friends', 1]]),
    reward: {
        Values: {
            Wins: 10
        }
    }
})

PetQuestsData.set('PetQuest1', {
    requirements: new Map([['strength', 10]]),
    reward: {
        Values: {
            Wins: 10
        }
    },
    checkCallback: (player) => {
        let profileData = player.profile.Data
        let progress = profileData.CurrentQuestsProgress

        progress.set('PetQuest1', new Map( // not sure abt this feature (for client updates)
            [['strength', profileData.Values.StrengthVal]]
        ))

        if (player.instance.Name === 'Icecrush121' && progress.get('PetQuest1')!.get('strength') as number > 10) {
            print('yipee')
            return true
        }
        return false
    }
})

EggQuestsData.set('TestEgg', {
    requirements: new Map([['time', 10]]),
    reward: {
        Values: {
            Wins: 10
        },
        Additional: [{
            data: 'TestEggCount',
            amount: 1,
        }]
    },
    checkCallback: (player) => {
        let profileData = player.profile.Data
        let sessionData = player.session
        let progress = profileData.CurrentQuestsProgress

        progress.set('TestEgg', new Map( 
            [['time', sessionData.sessionTime%10]]
        ))

        if (player.instance.Name === 'Icecrush121' && progress.get('TestEgg')!.get('time') === 0) {
            print('yipee2')
            return true
        }
        return false
    }
})

PetIndexQuestsData.set('PetIndexQuest1', {
    requirements: new Map<string, any>([['pets', 10], ['tier', 'Tier 1']]),
    reward: {
        Values: {
            Wins: 10
        },
    }
})
