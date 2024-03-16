import { WorldType } from "shared/enums/WorldEnums";
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
        Strength: 100
    },
    Time: 1,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 100
    },
    Time: 2,
    World: WorldType.Default,
})

SessionRewardsData.push({
    Values: {
        Strength: 100
    },
    Time: 1,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Strength: 100
    },
    Time: 20,
    World: WorldType.Space,
})



DailyRewardsData.push({
    Values: {
        Strength: 10
    },
    Time: 1
})

DailyRewardsData.push({
    Values: {
        Strength: 10
    },
    Time: 2
})

DailyRewardsData.push({
    Values: {
        Strength: 10
    },
    Time: 3
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
    Additional: [{data: 'Wins', amount: 10}, {data: 'Multiplier', amount: .1}],
})