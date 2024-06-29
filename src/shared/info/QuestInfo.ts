import { PotionType } from "shared/enums/PotionEnum";
import { Sizes, Evolutions, Mutations } from "shared/interfaces/PetData";
import { IQuestData } from "shared/interfaces/QuestData";

//! MAKE UNIQUE NAMES FOR QUESTS

export const FriendQuestsData = new Map<string, IQuestData>()
export const PetIndexQuestsData = new Map<string, IQuestData>()
export const PetQuestsData = new Map<string, IQuestData>()
export const EggQuestsData = new Map<string, IQuestData>()
export const RelicQuestsData = new Map<string, IQuestData>()

FriendQuestsData.set('FriendQuest1', {
    requirements: new Map([['friends', 1]]),
    reward: {
        Values: {},
        Additional: new Map([['SpinCount', 1]])
    }
})

FriendQuestsData.set('FriendQuest2', {
    requirements: new Map([['friends', 3]]),
    reward: {
        Values: {
            Gems: 3
        },
        Additional: new Map([['SpinCount', 1]])
    }
})

FriendQuestsData.set('FriendQuest3', {
    requirements: new Map([['friends', 5]]),
    reward: {
        Values: {
            Gems: 5
        },
        Potions: [
            { potion: PotionType.LuckPotion, amount: 1 }
        ],
        Additional: new Map([['SpinCount', 2]])
    }
})

FriendQuestsData.set('FriendQuest4', {
    requirements: new Map([['friends', 10]]),
    reward: {
        Values: {
            Gems: 10
        },
        Potions: [
            { potion: PotionType.WinsPotion, amount: 1 },
            { potion: PotionType.GoldPotion, amount: 1 },
        ],
        Additional: new Map([['SpinCount', 3]])
    }
})

FriendQuestsData.set('FriendQuest5', {
    requirements: new Map([['friends', 30]]),
    reward: {
        Values: {},
        Potions: [
            { potion: PotionType.WinsPotion, amount: 2 },
        ],
        Additional: new Map([['SpinCount', 6], ['MaxEquippedPets', 1]])
    }
})

FriendQuestsData.set('FriendQuest6', {
    requirements: new Map([['friends', 99]]),
    reward: {
        Values: {},
        Pets: [{
            pet: {
                name: "Leek Cat",
                locked: false,
                equipped: false,
                additional: {
                    size: Sizes.Baby,
                    evolution: Evolutions.Normal,
                    mutation: Mutations.Default,
                }
            },
            amount: 1
        }],
        Additional: new Map([['SpinCount', 20], ['MaxEquippedPets', 1]])
    }
})

PetQuestsData.set('PetQuest1', {
    requirements: new Map([['lefttofollow', 0]]),
    reward: {
        Values: {},
        Pets: [{
            pet: {
                name: "Kitsune",
                locked: false,
                equipped: false,
                additional: {
                    size: Sizes.Baby,
                    evolution: Evolutions.Normal,
                    mutation: Mutations.Default,
                }
            },
            amount: 1
        }],
    },
    checkCallback: (player) => {

        let profileData = player.profile.Data
        let sessionData = player.session

        let progress = profileData.CurrentQuestsProgress

        /*
        progress.set('PetQuest1', new Map( // not sure abt this feature (for client updates)
            [['strength', profileData.Values.StrengthVal]]
        ))

        player.replica.SetValue('Profile.CurrentQuestsProgress', progress)

        if (player.instance.Name === 'Icecrush121' && progress.get('PetQuest1')!.get('strength') as number > 10) {
            print('yipee')
            return true
        }
        */
        if (sessionData.leftToFollow.size() < 1) { return true }

        return false
    }
})

EggQuestsData.set('Shadow', {
    requirements: new Map([['time', 20*60]]),
    reward: {
        Values: {},
        Additional: new Map([['Shadow', 1]])
    },
    checkCallback: (player) => {
        let profileData = player.profile.Data
        let sessionData = player.session
        let progress = profileData.CurrentQuestsProgress

        progress.set('Shadow', new Map( 
            [['time', sessionData.sessionTime%(20*60)]]
        ))

        player.replica.SetValue('Profile.CurrentQuestsProgress', progress)

        if (progress.get('Shadow')!.get('time') === 0) {
            return true
        }
        return false
    }
})

RelicQuestsData.set('RelicQuest1', {
    requirements: new Map([['time', 20*60], ['count', 800]]),
    reward: {
        Values: {},
        Additional: new Map([['EventTest', 1]])
    },
    checkCallback: (player) => {
        let profileData = player.profile.Data
        let sessionData = player.session
        let progress = profileData.CurrentQuestsProgress

        progress.set('RelicQuest1', new Map( 
            [['time', sessionData.sessionTime%(10)]]
        ))

        player.replica.SetValue('Profile.CurrentQuestsProgress', progress)

        if (progress.get('RelicQuest1')!.get('time') === 0) {
            return true
        }
        return false
    }
})

PetIndexQuestsData.set('PetIndexQuest1', {
    requirements: new Map<string, any>([['pets', 25], ['tier', 'Tier 1']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})

PetIndexQuestsData.set('PetIndexQuest2', {
    requirements: new Map<string, any>([['pets', 50], ['tier', 'Tier 2']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})

PetIndexQuestsData.set('PetIndexQuest3', {
    requirements: new Map<string, any>([['pets', 75], ['tier', 'Tier 3']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})

PetIndexQuestsData.set('PetIndexQuest4', {
    requirements: new Map<string, any>([['pets', 100], ['tier', 'Tier 4']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})

PetIndexQuestsData.set('PetIndexQuest5', {
    requirements: new Map<string, any>([['pets', 125], ['tier', 'Tier 5']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})

PetIndexQuestsData.set('PetIndexQuest6', {
    requirements: new Map<string, any>([['pets', 150], ['tier', 'Tier 6']]),
    reward: {
        Values: {},
        Additional: new Map([['MaxEquippedPets', 1]]),
    }
})