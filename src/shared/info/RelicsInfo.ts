import { Workspace } from "@rbxts/services";
import { RewardType } from "shared/enums/RewardEnums"
import { Rarities } from "shared/interfaces/PetData"
import { IRelicData, IRelicCaseData, RelicCaseType } from "shared/interfaces/RelicData"

export const RelicPassiveNames = new Map<string, string>([
    ['BonusShotRelic', 'BonusShotRelic'],
    ['FreeEggRelic', 'FreeEggRelic'],

    ['Cashback Ticket', 'CashbackRelic'],
    ['Mystic Clover', 'LuckRelic'],
    ['Pets Wings', 'ShootBoostRelic'],
    ['Dice of Power', 'BonusShotRelic'], //this is BonusShotRelic  //StrengthRelic
    ['Mobility Shoes', 'WalkspeedRelic'],
    ['Medal of Trophies', 'WinsRelic'],
    ['Speed Fire', 'AttackSpeedRelic'],
    ['Mysterious Paw', 'EquipSlotRelic'],
    ['Golden Egg', 'DuplicateEggRelic'],
])

export const RelicsInfo = new Map<string, Array<IRelicData>>([
    ['BonusShotRelic', [
        {stats: new Map([['chance', 2], ['multi', 2]]), desc: '2x gaining Accuracy with a 2% chance', rarity: Rarities.Common},
        {stats: new Map([['chance', 6], ['multi', 2]]), desc: '2x gaining Accuracy with a 6% chance', rarity: Rarities.Uncommon},
        {stats: new Map([['chance', 10], ['multi', 2]]), desc: '2x gaining Accuracy with a 10% chance', rarity: Rarities.Rare},
        {stats: new Map([['chance', 10], ['multi', 3]]), desc: '3x gaining Accuracy with a 10% chance', rarity: Rarities.Epic},
        {stats: new Map([['chance', 4], ['multi', 10]]), desc: '10x gaining Accuracy with a 4% chance', rarity: Rarities.Legendary},
        {stats: new Map([['chance', 2], ['multi', 100]]), desc: '100x gaining Accuracy with a 2% chance', rarity: Rarities.Mythic}
    ]],

    ['CashbackRelic', [
        {stats: new Map([['chance', 5], ['multi', 5]]), desc: 'Returns 5% Wins with each open egg with a 5% chance', rarity: Rarities.Common},
        {stats: new Map([['chance', 7], ['multi', 10]]), desc: 'Returns 10% Wins with each open egg with a 7% chance', rarity: Rarities.Uncommon},
        {stats: new Map([['chance', 10], ['multi', 15]]), desc: 'Returns 15% Wins with each open egg with a 10% chance', rarity: Rarities.Rare},
        {stats: new Map([['chance', 15], ['multi', 25]]), desc: 'Returns 25% Wins with each open egg with a 15% chance', rarity: Rarities.Epic},
        {stats: new Map([['chance', 15], ['multi', 50]]), desc: 'Returns 50% Wins with each open egg with a 15% chance', rarity: Rarities.Legendary},
    ]],

    ['ShootBoostRelic', [
        {stats: new Map([['multi', 5]]), desc: 'Increases pet`s flying power by +5%', rarity: Rarities.Common},
        {stats: new Map([['multi', 10]]), desc: 'Increases pet`s flying power by +10%', rarity: Rarities.Uncommon},
        {stats: new Map([['multi', 20]]), desc: 'Increases pet`s flying power by +20%', rarity: Rarities.Rare},
        {stats: new Map([['multi', 35]]), desc: 'Increases pet`s flying power by +35%', rarity: Rarities.Epic},
        {stats: new Map([['multi', 50]]), desc: 'Increases pet`s flying power by +50%', rarity: Rarities.Legendary},
    ]],

    ['WinsRelic', [
        {stats: new Map([['multi', 3]]), desc: 'Increases the number of Wins received by +3%', rarity: Rarities.Common},
        {stats: new Map([['multi', 5]]), desc: 'Increases the number of Wins received by +5%', rarity: Rarities.Uncommon},
        {stats: new Map([['multi', 10]]), desc: 'Increases the number of Wins received by +10%', rarity: Rarities.Rare},
        {stats: new Map([['multi', 20]]), desc: 'Increases the number of Wins received by +20%', rarity: Rarities.Epic},
        {stats: new Map([['multi', 30]]), desc: 'Increases the number of Wins received by +30%', rarity: Rarities.Legendary},
    ]],

    ['WalkspeedRelic', [
        {stats: new Map([['multi', 4]]), desc: 'Increases your speed by +4%', rarity: Rarities.Common},
        {stats: new Map([['multi', 6]]), desc: 'Increases your speed by +6%', rarity: Rarities.Uncommon},
        {stats: new Map([['multi', 8]]), desc: 'Increases your speed by +8%', rarity: Rarities.Rare},
        {stats: new Map([['multi', 15]]), desc: 'Increases your speed by +15%', rarity: Rarities.Epic},
        {stats: new Map([['multi', 25]]), desc: 'Increases your speed by +25%', rarity: Rarities.Legendary},
    ]],

    ['LuckRelic', [
        {stats: new Map([['multi', 5]]), desc: 'Increases the luck for getting the best rarity pets by +5%', rarity: Rarities.Common},
        {stats: new Map([['multi', 10]]), desc: 'Increases the luck for getting the best rarity pets by +10%', rarity: Rarities.Uncommon},
        {stats: new Map([['multi', 15]]), desc: 'Increases the luck for getting the best rarity pets by +15%', rarity: Rarities.Rare},
        {stats: new Map([['multi', 20]]), desc: 'Increases the luck for getting the best rarity pets by +20%', rarity: Rarities.Epic},
        {stats: new Map([['multi', 30]]), desc: 'Increases the luck for getting the best rarity pets by +30%', rarity: Rarities.Legendary},
    ]],

    ['StrengthRelic', [
        {stats: new Map([['multi', 5]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 10]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 15]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 20]]), desc: 'test', rarity: Rarities.Common},
    ]],

    ['DuplicateEggRelic', [ //кинь айди
        {stats: new Map([['chance', 0.5]]), desc: 'Double your eggs for free with 0.5% chance', rarity: Rarities.Common},
        {stats: new Map([['chance', 1]]), desc: 'Double your eggs for free with 1% chance', rarity: Rarities.Uncommon},
        {stats: new Map([['chance', 2]]), desc: 'Double your eggs for free with 2% chance', rarity: Rarities.Rare},
        {stats: new Map([['chance', 3]]), desc: 'Double your eggs for free with 3% chance', rarity: Rarities.Epic},
	    {stats: new Map([['chance', 5]]), desc: 'Double your eggs for free with 5% chance', rarity: Rarities.Legendary},
    ]],

    ['FreeEggRelic', [
        {stats: new Map([['multi', 5]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 10]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 15]]), desc: 'test', rarity: Rarities.Common},
        {stats: new Map([['multi', 20]]), desc: 'test', rarity: Rarities.Common},
    ]],

    ['AttackSpeedRelic', [
        {stats: new Map([['multi', 5]]), desc: 'Increases the Slingshot`s firing speed by +5%', rarity: Rarities.Common},
        {stats: new Map([['multi', 10]]), desc: 'Increases the Slingshot`s firing speed by +10%', rarity: Rarities.Uncommon},
        {stats: new Map([['multi', 18]]), desc: 'Increases the Slingshot`s firing speed by +18%', rarity: Rarities.Rare},
        {stats: new Map([['multi', 25]]), desc: 'Increases the Slingshot`s firing speed by +25%', rarity: Rarities.Epic},
        {stats: new Map([['multi', 35]]), desc: 'Increases the Slingshot`s firing speed by +35%', rarity: Rarities.Legendary},
    ]],

    ['EquipSlotRelic', [
        {stats: new Map([['amount', 1]]), desc: 'Gives an additional +1 to Pet Equipped', rarity: Rarities.Mythic},
    ]],
])

export const RelicsCases = new Map<string, IRelicCaseData>()

RelicsCases.set('EventTest', {
    name: 'EventTest',
    description: 'EventTest',

    price: 1,
    valuetype: RelicCaseType.Stored,

    reward: {
        Chances: [
            {weight: 370, name: 'Gems1', reward: {
                Values: { Gems: 1 }
            }},
            {weight: 330, name: 'CommonDice', reward: {
                Relics: [{name: 'Dice of Power', level: 1, amount: 1}]
            }},
            {weight: 290, name: 'CashbackTicket', reward: {
                Relics: [{name: 'Cashback Ticket', level: 1, amount: 1}]
            }},
            {weight: 10, name: 'LegendaryDice', reward: {
                Relics: [{name: 'Dice of Power', level: 5, amount: 1}]
            }},
            {weight: 1, name: 'MythicDice', reward: {
                Relics: [{name: 'Dice of Power', level: 6, amount: 1}]
            }}
        ]
    }

})

RelicsCases.set('Case1', {
    name: 'Case1',
    description: 'Case1',

    price: 1,
    valuetype: RelicCaseType.Gems,

    reward: {
        Chances: [
            {weight: 360, name: 'MobilityShoes', reward: {
                Relics: [{name: 'Mobility Shoes', level: 1, amount: 1}]
            }},
            {weight: 280, name: 'MedalofTrophies', reward: {
                Relics: [{name: 'Medal of Trophies', level: 1, amount: 1}]
            }},
            {weight: 240, name: 'PetsWings', reward: {
                Relics: [{name: 'Pets Wings', level: 1, amount: 1}]
            }},
            {weight: 120, name: 'MysticClover', reward: {
                Relics: [{name: 'Mystic Clover', level: 1, amount: 1}]
            }},
            {weight: 10, name: 'GoldenEgg', reward: {
                Relics: [{name: 'Golden Egg', level: 4, amount: 1}]
            }}
        ]
    },

    part: Workspace.WaitForChild('World2').WaitForChild('RelicCasePart1') as BasePart
})

RelicsCases.set('Case2', {
    name: 'Case2',
    description: 'Case2',

    price: 1,
    valuetype: RelicCaseType.Gems,

    reward: {
        Chances: [
            {weight: 300, name: 'MobilityShoes', reward: {
                Relics: [{name: 'Mobility Shoes', level: 2, amount: 1}]
            }},
            {weight: 300, name: 'MedalofTrophies', reward: {
                Relics: [{name: 'Medal of Trophies', level: 1, amount: 1}]
            }},
            {weight: 260, name: 'PetsWings', reward: {
                Relics: [{name: 'Pets Wings', level: 1, amount: 1}]
            }},
            {weight: 140, name: 'MysticClover', reward: {
                Relics: [{name: 'Mystic Clover', level: 1, amount: 1}]
            }},
            {weight: 5, name: 'SpeedFire', reward: {
                Relics: [{name: 'Speed Fire', level: 5, amount: 1}]
            }}
        ]
    },

    part: Workspace.WaitForChild('World3').WaitForChild('RelicCasePart1') as BasePart
})

RelicsCases.set('Case3', {
    name: 'Case3',
    description: 'Case3',

    price: 2,
    valuetype: RelicCaseType.Gems,

    reward: {
        Chances: [
            {weight: 250, name: 'MobilityShoes', reward: {
                Relics: [{name: 'Mobility Shoes', level: 3, amount: 1}]
            }},
            {weight: 250, name: 'MedalofTrophies', reward: {
                Relics: [{name: 'Medal of Trophies', level: 2, amount: 1}]
            }},
            {weight: 250, name: 'PetsWings', reward: {
                Relics: [{name: 'Pets Wings', level: 1, amount: 1}]
            }},
            {weight: 250, name: 'MysticClover', reward: {
                Relics: [{name: 'Mystic Clover', level: 1, amount: 1}]
            }},
            {weight: 1, name: 'MysteriousPaw', reward: {
                Relics: [{name: 'Mysterious Paw', level: 1, amount: 1}]
            }}
        ]
    },

    part: Workspace.WaitForChild('World4').WaitForChild('RelicCasePart1') as BasePart
})