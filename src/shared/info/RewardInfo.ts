import { PotionType } from "shared/enums/PotionEnum";
import { WorldType } from "shared/enums/WorldEnums";
import { EggBuyType } from "shared/interfaces/EggData";
import { Evolutions, Mutations, Sizes } from "shared/interfaces/PetData";
import { IRewardData } from "shared/interfaces/RewardData";

export const SessionRewardsData = new Array<IRewardData>()
export const DailyRewardsData = new Array<IRewardData>()
export const CodesRewardsData = new Map<string, IRewardData>()
export const RebirthTitles = new Map<string, {goal: number, id: string}>()

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

export const GetNextRebirth = (rebirth: number) => {
    let rewards: IRewardData = {
        Values: {
            Wins: 250
        },
        Additional: new Map([['Strength', (rebirth+1) * 100000]])
    }

    return rewards
}

export const GetNextBar = (barlevel: number) => {

    let multipliers = [1, 3, 7, 13, 25]
    let values = [100, 300, 2000, 5000, 8000]

    let barmulti = 25*2**(barlevel-4)
    let barvalue = 20000*(2**(barlevel-5))

    if (barlevel < 5) { barmulti = multipliers[barlevel]; barvalue = values[barlevel] }
    if (barlevel > 35) { barvalue = 20000*(2**(barlevel-5))*(2**(barlevel-35)) }

    let rewards: IRewardData = {
        Additional: new Map([
            ['Strength', barvalue],
            ['Multiplier', barmulti],
        ])
    }

    return rewards
}

SessionRewardsData.push({
    Values: {
        Strength: 250
    },
    Time: 60,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 250
    },
    Time: 60*3,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 1000
    },
    Time: 60*7,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 3000
    },
    Time: 60*15,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Magma Doggy",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*30,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 10000
    },
    Time: 60*45,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 25000
    },
    Time: 60*60,
    World: WorldType.Cave,
})

SessionRewardsData.push({
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
    Time: 60*120,
    World: WorldType.Cave,
})

DailyRewardsData.push({
    Values: {
        Strength: 100
    },
    Time: 1
})

DailyRewardsData.push({
    Values: {},
    Potions: [{potion: PotionType.StrengthPotion2, amount: 5}],
    Time: 2
})

DailyRewardsData.push({
    Values: {
        Wins: 10000
    },
    Time: 3
})

DailyRewardsData.push({
    Values: {},
    Potions: [{potion: PotionType.GemsPotion2, amount: 5}],
    Time: 4
})

DailyRewardsData.push({
    Values: {},
    Potions: [{potion: PotionType.StrengthPotion3, amount: 3}],
    Time: 5
})

DailyRewardsData.push({
    Values: {
        Wins: 15000
    },
    Time: 6
})

DailyRewardsData.push({
    Values: {},
    Potions: [{potion: PotionType.GemsPotion3, amount: 3}],
    Time: 7
})

DailyRewardsData.push({
    Values: {},
    Pets: [{pet: {
        name: "Nightmare Spirit",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 8
})

CodesRewardsData.set('release', {
    Values: {
        Wins: 100
    },
    Time: 1
})

CodesRewardsData.set('ketwil', {
    Values: {},
    Potions: [
        {potion: PotionType.StrengthPotion2, amount: 1},
    ],
    Time: 1
})

CodesRewardsData.set('4upahero', {
    Values: {},
    Potions: [
        {potion: PotionType.GemsPotion2, amount: 1},
    ],
    Time: 1
})

RebirthTitles.set('Rokie', {goal: 0, id: ''})
RebirthTitles.set('Noob', {goal: 5, id: 'rbxassetid://18651947087'})
RebirthTitles.set('Guardian', {goal: 10, id: 'rbxassetid://18651948865'})
RebirthTitles.set('Ninja', {goal: 25, id: 'rbxassetid://18651947568'})
RebirthTitles.set('King', {goal: 50, id: 'rbxassetid://18651948593'})
RebirthTitles.set('Coolest Gamer', {goal: 100, id: 'rbxassetid://18651949718'})
RebirthTitles.set('Devil', {goal: 250, id: 'rbxassetid://18651949253'})
RebirthTitles.set('Survivor', {goal: 500, id: 'rbxassetid://18651945743'})
RebirthTitles.set('Psycho', {goal: 1000, id: 'rbxassetid://18651946630'})
RebirthTitles.set('Missed Person', {goal: 5000, id: 'rbxassetid://18652069707'})
RebirthTitles.set('Main Angel', {goal: 10000, id: 'rbxassetid://18651948394'})
RebirthTitles.set('Space God', {goal: 25000, id: 'rbxassetid://18651946311'})
RebirthTitles.set('Archangel', {goal: 50000, id: 'rbxassetid://18651950059'})
RebirthTitles.set('Void', {goal: 100000, id: 'rbxassetid://18651945343'})

export const SpinRewardData: IRewardData = {
    Chances: [
        {weight: 10, name: 'Pet', reward: {
            Pets: [{pet: {
                name: "Red Devil",
                locked: false,
                equipped: false,
                additional: {
                    size: Sizes.Baby,
                    evolution: Evolutions.Normal,
                    mutation: Mutations.Default,
                }
            }, amount: 1}],
        }},
        {weight: 200, name: 'StrengthPotion', reward: {
            Potions: [{potion: PotionType.StrengthPotion4, amount: 1}],
        }},
        {weight: 200, name: 'WinsPotion', reward: {
            Potions: [{potion: PotionType.GemsPotion4, amount: 1}],
        }},
        {weight: 200, name: 'Wins1', reward: {
            Values: {
                Wins: 1000,
            }
        }},
        {weight: 190, name: 'Wins2', reward: {
            Values: {
                Wins: 2500,
            }
        }},
        {weight: 200, name: 'Strength', reward: {
            Values: {
                Strength: 1000,
            }
        }},
        
    ]
} 

export const DailyChestRewardData: IRewardData = {
    Chances: [
        {weight: 100, name: 'Wins', reward: {
            Values: {
                Wins: 250
            }
        }},
    ]
}

export const GroupChestRewardData: IRewardData = {
    Chances: [
        {weight: 100, name: 'Wins', reward: {
            Values: {
                Wins: 500
            }
        }},
    ]
} 

export const FollowCodeRewardData: IRewardData = {
    Values: {},
    Additional: new Map([['StrengthMul', .1]]),
} 