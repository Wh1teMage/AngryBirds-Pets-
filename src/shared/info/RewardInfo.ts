import { PotionType } from "shared/enums/PotionEnum";
import { WorldType } from "shared/enums/WorldEnums";
import { EggBuyType } from "shared/interfaces/EggData";
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
    Time: 60/10,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 20
    },
    Time: 60*3,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Strength: 1000
    },
    Time: 60*5,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.LuckPotion, amount: 1}],
    Time: 60*7,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Flame Pixie",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*10,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Strength: 2000
    },
    Time: 60*15,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Gems: 1
    },
    Time: 60*20,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 300
    },
    Time: 60*30,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Gems: 2
    },
    Time: 60*45,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Shadow Demon",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*60,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.WinsPotion, amount: 2}],
    Time: 60*90,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Wins: 500
    },
    Time: 60*120,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Values: {
        Gems: 3
    },
    Time: 60*180,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.GoldPotion, amount: 1}],
    Time: 60*240,
    World: WorldType.Cave,
})

SessionRewardsData.push({
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
    Time: 60*360,
    World: WorldType.Cave,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Midnight",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*720,
    World: WorldType.Cave,
})

// ! world 2 \/

SessionRewardsData.push({
    Values: {
        Strength: 500000
    },
    Time: 10,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Wins: 500
    },
    Time: 60*3,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Strength: 1000000
    },
    Time: 60*5,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.LuckPotion, amount: 1}],
    Time: 60*7,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Flame Pixie",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*10,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Strength: 1500000
    },
    Time: 60*15,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Gems: 1
    },
    Time: 60*20,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Wins: 3000
    },
    Time: 60*30,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Gems: 2
    },
    Time: 60*45,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Shadow Demon",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*60,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.WinsPotion, amount: 2}],
    Time: 60*90,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Wins: 5000
    },
    Time: 60*120,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Values: {
        Gems: 3
    },
    Time: 60*180,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.GoldPotion, amount: 1}],
    Time: 60*240,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
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
    Time: 60*360,
    World: WorldType.NeonCity,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Midnight",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*720,
    World: WorldType.NeonCity,
})

// ! world 3\/

SessionRewardsData.push({
    Values: {
        Strength: 50000000
    },
    Time: 10,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Wins: 100000
    },
    Time: 60*3,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Strength: 100000000
    },
    Time: 60*5,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.LuckPotion, amount: 1}],
    Time: 60*7,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Flame Pixie",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*10,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Strength: 150000000
    },
    Time: 60*15,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Gems: 1
    },
    Time: 60*20,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Wins: 300000
    },
    Time: 60*30,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Gems: 2
    },
    Time: 60*45,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Shadow Demon",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*60,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.WinsPotion, amount: 2}],
    Time: 60*90,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Wins: 500000
    },
    Time: 60*120,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Values: {
        Gems: 3
    },
    Time: 60*180,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Potions: [{potion: PotionType.GoldPotion, amount: 1}],
    Time: 60*240,
    World: WorldType.Space,
})

SessionRewardsData.push({
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
    Time: 60*360,
    World: WorldType.Space,
})

SessionRewardsData.push({
    Pets: [{pet: {
        name: "Midnight",
        locked: false,
        equipped: false,
        additional: {
            size: Sizes.Baby,
            evolution: Evolutions.Normal,
            mutation: Mutations.Default,
        }
    }, amount: 1}],
    Time: 60*720,
    World: WorldType.Space,
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
    Values: {},
    Potions: [{potion: PotionType.WinsPotion, amount: 5}],
    Time: 9
})

DailyRewardsData.push({
    Values: {},
    Eggs: [{egg: 'Party', amount: 1, type: EggBuyType.Triple}],
    Time: 10
})

DailyRewardsData.push({
    Values: {
        Gems: 20
    },
    Time: 11
})

DailyRewardsData.push({
    Values: {},
    Eggs: [{egg: 'Party', amount: 1, type: EggBuyType.Single}],
    Time: 12
})

DailyRewardsData.push({
    Values: {
        Gems: 20
    },
    Time: 13
})

DailyRewardsData.push({
    Values: {},
    Eggs: [{egg: 'Nightmare', amount: 1, type: EggBuyType.Triple}],
    Time: 14
})


CodesRewardsData.set('testcode', {
    Values: {
        Strength: 10
    },
    Time: 1
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test',
    Additional: new Map([['Wins', 100], ['Multiplier', .1]]) //[{data: 'Wins', amount: 10}, {data: 'Multiplier', amount: .1}],
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test2',
    Additional: new Map([['Wins', 250], ['Multiplier', .2]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test3',
    Additional: new Map([['Wins', 1000], ['Multiplier', .3]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test4',
    Additional: new Map([['Wins', 2000], ['Multiplier', .4]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test5',
    Additional: new Map([['Wins', 5000], ['Multiplier', .5]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test6',
    Additional: new Map([['Wins', 10000], ['Multiplier', .6]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test7',
    Additional: new Map([['Wins', 20000], ['Multiplier', .7]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test8',
    Additional: new Map([['Wins', 50000], ['Multiplier', .8]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test9',
    Additional: new Map([['Wins', 100000], ['Multiplier', .9]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test10',
    Additional: new Map([['Wins', 200000], ['Multiplier', 1]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test11',
    Additional: new Map([['Wins', 400000], ['Multiplier', 1.1]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test12',
    Additional: new Map([['Wins', 800000], ['Multiplier', 1.2]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test13',
    Additional: new Map([['Wins', 1200000], ['Multiplier', 1.3]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test14',
    Additional: new Map([['Wins', 1800000], ['Multiplier', 1.4]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test15',
    Additional: new Map([['Wins', 2700000], ['Multiplier', 1.5]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test16',
    Additional: new Map([['Wins', 4090000], ['Multiplier', 1.6]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test17',
    Additional: new Map([['Wins', 6100000], ['Multiplier', 1.7]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test18',
    Additional: new Map([['Wins', 9100000], ['Multiplier', 1.8]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test19',
    Additional: new Map([['Wins', 14000000], ['Multiplier', 1.9]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test20',
    Additional: new Map([['Wins', 21000000], ['Multiplier', 2]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test21',
    Additional: new Map([['Wins', 31000000], ['Multiplier', 2.1]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test22',
    Additional: new Map([['Wins', 46000000], ['Multiplier', 2.2]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test23',
    Additional: new Map([['Wins', 69000000], ['Multiplier', 2.3]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test24',
    Additional: new Map([['Wins', 100000000], ['Multiplier', 2.4]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test25',
    Additional: new Map([['Wins', 160000000], ['Multiplier', 2.5]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test26',
    Additional: new Map([['Wins', 230000000], ['Multiplier', 2.6]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test27',
    Additional: new Map([['Wins', 350000000], ['Multiplier', 2.7]])
})

RebirthsRewardsData.push({
    Values: { Gems: 1 },
    Title: 'Test28',
    Additional: new Map([['Wins', 530000000], ['Multiplier', 2.8]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test29',
    Additional: new Map([['Wins', 790000000], ['Multiplier', 2.9]])
})

RebirthsRewardsData.push({
    Values: { Gems: 0 },
    Title: 'Test30',
    Additional: new Map([['Wins', 1200000000], ['Multiplier', 3]])
})

export const SpinRewardData: IRewardData = {
    Chances: [
        {weight: 1, name: 'Pet', reward: {
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
        {weight: 150, name: 'Potion', reward: {
            Potions: [{potion: PotionType.WinsPotion, amount: 1}],
        }},
        {weight: 349, name: 'Wins1', reward: {
            Values: {
                Wins: 10,
            }
        }},
        {weight: 50, name: 'Gems', reward: {
            Values: {
                Gems: 1,
            }
        }},
        {weight: 250, name: 'Wins2', reward: {
            Additional: new Map([['tinypackwins', 1]]),
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
        {weight: 30, name: 'Wins', reward: {
            Values: {
                Wins: 1000,
            }
        }},
        {weight: 25, name: 'PotinonGiren', reward: {
            Potions: [{potion: PotionType.LuckPotion, amount: 1}],
        }},
        {weight: 20, name: 'PotinonRad', reward: {
            Potions: [{potion: PotionType.WinsPotion, amount: 1}],
        }},
        {weight: 15, name: 'PotinonYalov', reward: {
            Potions: [{potion: PotionType.GoldPotion, amount: 1}],
        }},
        {weight: 9, name: 'PotinonPyprel', reward: {
            Potions: [{potion: PotionType.VoidPotion, amount: 1}],
        }},
        {weight: 1, name: 'Pet', reward: {
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
        
    ]
}

export const GroupChestRewardData: IRewardData = {
    Chances: [
        {weight: 50, name: 'Wins1', reward: {
            Values: {
                Wins: 1000,
            }
        }},
        {weight: 46, name: 'PotinonGiren', reward: {
            Potions: [{potion: PotionType.LuckPotion, amount: 1}],
        }},
        {weight: 3, name: 'Egg', reward: {
            Eggs: [{egg: 'Party', amount: 1, type: EggBuyType.Single}],
        }},
        {weight: 1, name: 'Pet', reward: {
            Pets: [{pet: {
                name: "Star Spike",
                locked: false,
                equipped: false,
                additional: {
                    size: Sizes.Baby,
                    evolution: Evolutions.Normal,
                    mutation: Mutations.Default,
                }
            }, amount: 1}],
        }}
    ]
} 

export const FollowCodeRewardData: IRewardData = {
    Values: {},
    Additional: new Map([['StrengthMul', .1]]),
} 