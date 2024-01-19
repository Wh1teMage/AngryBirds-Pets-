import { IRewardData } from "shared/interfaces/RewardData";

export const SessionRewardsData = new Array<IRewardData>()
export const DailyRewardsData = new Array<IRewardData>()
export const CodesRewardsData = new Map<string, IRewardData>()

export const SelectDailyReward = (time: number) => {
    let selectedReward: IRewardData | undefined;
    DailyRewardsData.forEach((value) => { if (value.Time === time) { selectedReward = value } })
    return selectedReward
}

export const SelectSessionReward = (rewardIndex: number) => {
    let sortedRewards = SessionRewardsData.sort((a, b) => a.Time < b.Time)
    return sortedRewards[rewardIndex]
}

SessionRewardsData.push({
    Values: {
        Strength: 1
    },
    Time: 1
})

DailyRewardsData.push({
    Values: {
        Strength: 10
    },
    Time: 1
})

CodesRewardsData.set('testcode', {
    Values: {
        Strength: 10
    },
    Time: 1
})