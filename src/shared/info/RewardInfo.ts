import { WorldType } from "shared/enums/WorldEnums";
import { Evolutions, Mutations, Sizes } from "shared/interfaces/PetData";
import { IRewardData } from "shared/interfaces/RewardData";

export const SessionRewardsData = new Array<IRewardData>()
export const DailyRewardsData = new Array<IRewardData>()
export const RebirthsRewardsData = new Array<IRewardData>()
export const CodesRewardsData = new Map<string, IRewardData>()

export const SelectDailyReward = (time: number) => {
    let selectedReward: IRewardData | undefined;
    DailyRewardsData.forEach((value) => { if (value.Time === time) { selectedReward = value } })
    return selectedReward
}

export const SelectSessionReward = (rewardIndex: number, world: WorldType) => {
    let selectedWorldRewards: IRewardData[] = []
    SessionRewardsData.forEach((value) => { if (value.World === world) { selectedWorldRewards.push(value) } })

    let sortedRewards = selectedWorldRewards.sort((a, b) => a.Time! < b.Time!)
    return sortedRewards[rewardIndex]
}


SessionRewardsData.push({
    Values: {
        Strength: 500
    },
    Time: 1,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 20
    },
    Time: 2,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 1000
    },
    Time: 3,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 4,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 5,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 2000
    },
    Time: 6,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 7,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 300
    },
    Time: 8,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 9,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 10,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 11,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 500
    },
    Time: 12,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 13,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 14,
    World: WorldType.Default,
})

// ! world 2 \/

SessionRewardsData.push({
    Values: {
        Strength: 500000
    },
    Time: 1,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 500
    },
    Time: 2,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 1000000
    },
    Time: 3,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 4,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 5,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 1500000
    },
    Time: 6,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 7,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 3000
    },
    Time: 8,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 9,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 10,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 11,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 5000
    },
    Time: 12,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 13,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 14,
    World: WorldType.Default,
})

// ! world 3\/

SessionRewardsData.push({
    Values: {
        Strength: 50000000
    },
    Time: 1,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 100000
    },
    Time: 2,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 100000000
    },
    Time: 3,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 4,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 5,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 150000000
    },
    Time: 6,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Strength: 1000
    },
    Time: 7,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 300000
    },
    Time: 8,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 9,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 10,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 11,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Wins: 500000
    },
    Time: 12,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 13,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        //! Wins: 300
    },
    Time: 14,
    World: WorldType.Default,
})



DailyRewardsData.push({
    Values: {
        Wins: 10
    },
    Time: 1
})

DailyRewardsData.push({
    Values: {},
    Pets: [{pet: {
        name: "Pixie",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 2
})

DailyRewardsData.push({
    Values: {},
    Additional: new Map([['MaxEquippedPets', 1]]),
    Time: 3
})

DailyRewardsData.push({
    Values: {},
    Additional: new Map([['MaxPets', 1]]),
    Time: 4
})

DailyRewardsData.push({
    Values: {
        Gems: 10
    },
    Time: 5
})

DailyRewardsData.push({
    Values: {
        Wins: 100000
    },
    Time: 6
})

DailyRewardsData.push({
    Values: {},
    Pets: [{pet: {
        name: "The Ultra Banana Split",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 7
})

DailyRewardsData.push({
    Values: {},
    Additional: new Map([['SpinCount', 5]]),
    Time: 8
})

DailyRewardsData.push({
    Values: {
        //! Wins: 100000
    },
    Time: 9
})

DailyRewardsData.push({
    Values: {
        //! Wins: 100000
    },
    Time: 10
})

DailyRewardsData.push({
    Values: {
        Gems: 20
    },
    Time: 11
})

DailyRewardsData.push({
    Values: {
        //! Gems: 20
    },
    Time: 12
})

DailyRewardsData.push({
    Values: {
        Gems: 20
    },
    Time: 13
})

DailyRewardsData.push({
    Values: {
        //! Gems: 20
    },
    Time: 14
})


CodesRewardsData.set('testcode', {
    Values: {
        Strength: 10
    },
    Time: 1
})

RebirthsRewardsData.push({
    Values: {
        Gems: 10
    },
    Title: 'Test',
    Additional: new Map([['Wins', 10], ['Multiplier', .1]]) //[{data: 'Wins', amount: 10}, {data: 'Multiplier', amount: .1}],
})

RebirthsRewardsData.push({
    Values: {
        Gems: 10
    },
    Title: 'Test2',
    Additional: new Map([['Wins', 10], ['Multiplier', .2]]) //[{data: 'Wins', amount: 10}, {data: 'Multiplier', amount: .2}],
})