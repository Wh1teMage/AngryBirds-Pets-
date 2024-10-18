import { ReplicatedStorage } from "@rbxts/services"
import { Evolutions, IPetData, Mutations, Rarities, Sizes } from "shared/interfaces/PetData"
import { IRelicData } from "shared/interfaces/RelicData"

export const PetsData = new Map<string, IPetData>()
const Pets = ReplicatedStorage.WaitForChild('Pets') as Folder

export const PetPerkNames = new Map<string, string>([
    ['Extra Power', 'ExtraPower'],
])

export const PetPerksInfo = new Map<string, Array<IRelicData>>([
    ['ExtraPower', [
        {stats: new Map([['multi', 60]]), desc: 'Will have 60% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 70]]), desc: 'Will have 70% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 75]]), desc: 'Will have 75% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 80]]), desc: 'Will have 80% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 85]]), desc: 'Will have 85% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 90]]), desc: 'Will have 90% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 95]]), desc: 'Will have 95% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 100]]), desc: 'Will have 100% multiplier of your strongest pet', rarity: Rarities.Mythic},
        {stats: new Map([['multi', 120]]), desc: 'Will have 120% multiplier of your strongest pet', rarity: Rarities.Mythic},
    ]],
])


// !World 1 \/

// * Stone egg
PetsData.set('Cat', {
    name: 'Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Cat', 5) as Model
})

PetsData.set('Dog', {
    name: 'Dog',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Dog', 5) as Model
})

PetsData.set('White Bunny', {
    name: 'White Bunny', // чучело (ненавидим)
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('White Bunny', 5) as Model
})

PetsData.set('Elephant', {
    name: 'Elephant',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Elephant', 5) as Model
})

PetsData.set('Butterfly', {
    name: 'Butterfly',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Butterfly', 5) as Model
})

// * Ore egg

PetsData.set('Fox', {
    name: 'Fox',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Fox', 5) as Model
})

PetsData.set('Monkey', {
    name: 'Monkey',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Monkey', 5) as Model
})

PetsData.set('Dragon', {
    name: 'Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Dragon', 5) as Model
})

PetsData.set('Raccoon', {
    name: 'Raccoon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Raccoon', 5) as Model
})

PetsData.set('CandyCane Unicorn', {
    name: 'CandyCane Unicorn',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('CandyCane Unicorn', 5) as Model
})

// * Rail egg

PetsData.set('Cow', {
    name: 'Cow',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Cow', 5) as Model
})

PetsData.set('Pig', {
    name: 'Pig',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pig', 5) as Model
})

PetsData.set('Fish', {
    name: 'Fish',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Fish', 5) as Model
})

PetsData.set('Crab', {
    name: 'Crab',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Crab', 5) as Model
})

PetsData.set('Peacock', {
    name: 'Peacock',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Peacock', 5) as Model
})

// * Diamond egg (donat)

PetsData.set('Glacier', {
    name: 'Glacier',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Glacier', 5) as Model
})

PetsData.set('Mega Amythest Dragon', {
    name: 'Mega Amythest Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 10]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Mega Amythest Dragon', 5) as Model
})

PetsData.set('Sinister Hydra', {
    name: 'Sinister Hydra',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 20]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Sinister Hydra', 5) as Model
})
// !World 1 /\

// !World 2 \/

// *

PetsData.set('Pink Bunny', {
    name: 'Pink Bunny',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pink Bunny', 5) as Model
})

PetsData.set('Pink Axolotl', {
    name: 'Pink Axolotl',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pink Axolotl', 5) as Model
})

PetsData.set('Seal', {
    name: 'Seal',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Seal', 5) as Model
})

PetsData.set('Diamond Golem', {
    name: 'Diamond Golem',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Diamond Golem', 5) as Model
})

PetsData.set('Aqua Dragon', {
    name: 'Aqua Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Aqua Dragon', 5) as Model
})

// *

PetsData.set('Blue Slime', {
    name: 'Blue Slime',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Blue Slime', 5) as Model
})

PetsData.set('White Bear', {
    name: 'White Bear',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('White Bear', 5) as Model
})

PetsData.set('Gecon', {
    name: 'Gecon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Gecon', 5) as Model
})

PetsData.set('Clown Doggy', {
    name: 'Clown Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Clown Doggy', 5) as Model
})

PetsData.set('The Clown', {
    name: 'The Clown',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('The Clown', 5) as Model
})

// *

PetsData.set('Polar', {
    name: 'Polar',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Polar', 5) as Model
})


PetsData.set('Red Dragon', {
    name: 'Red Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Red Dragon', 5) as Model
})

PetsData.set('WizMouse', {
    name: 'WizMouse',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
        additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('WizMouse', 5) as Model
})

PetsData.set('Lily', {
   name: 'Lily',
   locked: false,
   equipped: false,
   multipliers: new Map([['strength', 6.6]]),
   stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
   additional: {
       size: Sizes.Baby,
       evolution: Evolutions.Normal,
       mutation: Mutations.Default
   },
    model: Pets.WaitForChild('Lily', 5) as Model
})

PetsData.set('Crystal Lord', {
    name: 'Crystal Lord',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
   additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Crystal Lord', 5) as Model
})

// *

PetsData.set('Owl', {
    name: 'Owl',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Owl', 5) as Model
})

PetsData.set('Pink Slime', {
    name: 'Pink Slime',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pink Slime', 5) as Model
})

PetsData.set('Plant', {
    name: 'Plant',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Plant', 5) as Model
})

PetsData.set('Hat Trick Dragon', {
    name: 'Hat Trick Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Hat Trick Dragon', 5) as Model
})

PetsData.set('Mega Demon', {
    name: 'Mega Demon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Mega Demon', 5) as Model
})

// *

PetsData.set('Flamingo', {
    name: 'Flamingo',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Flamingo', 5) as Model
})

PetsData.set('MailCat', {
    name: 'MailCat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('MailCat', 5) as Model
})

PetsData.set('Cake', {
    name: 'Cake',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Cake', 5) as Model
})

PetsData.set('King Slime', {
    name: 'King Slime',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('King Slime', 5) as Model
})

PetsData.set('Ruby Spider', {
    name: 'Ruby Spider',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Ruby Spider', 5) as Model
})

// *

PetsData.set('Hacked Doggy', {
    name: 'Hacked Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Hacked Doggy', 5) as Model
})

PetsData.set('Alien Bird', {
    name: 'Alien Bird',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9.2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Alien Bird', 5) as Model
})

PetsData.set('Alien Dragon', {
    name: 'Alien Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9.4]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Alien Dragon', 5) as Model
})


PetsData.set('Galaxy Doggy', {
    name: 'Galaxy Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9.6]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Galaxy Doggy', 5) as Model
})

PetsData.set('Dark Hydra', {
    name: 'Dark Hydra',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9.8]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Dark Hydra', 5) as Model
})

// *

PetsData.set('Shadow Chameleon', {
    name: 'Shadow Chameleon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.2*2]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Shadow Chameleon', 5) as Model
})

PetsData.set('Shadow Butterfly', {
    name: 'Shadow Butterfly',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.8*2]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Shadow Butterfly', 5) as Model
})

PetsData.set('Shadow Ghost', {
    name: 'Shadow Ghost',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.6*2]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Shadow Ghost', 5) as Model
})

PetsData.set('Shadow Star', {
    name: 'Shadow Star',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.8*2]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Shadow Star', 5) as Model
})

PetsData.set('Shadow Owl', {
    name: 'Shadow Owl',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 1}]
    },
    model: Pets.WaitForChild('Shadow Owl', 5) as Model
})

PetsData.set('Shadow Dragon', {
    name: 'Shadow Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 9}]
    },
    model: Pets.WaitForChild('Shadow Dragon', 5) as Model
})

// *

PetsData.set('Sus Cat', {
    name: 'Sus Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 40]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
   },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Sus Cat', 5) as Model
})

PetsData.set('Ice Cream Dog', {
    name: 'Ice Cream Dog',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 80]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Ice Cream Dog', 5) as Model
})

// !

PetsData.set('Garden Wraith', {
    name: 'Garden Wraith',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 50]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Garden Wraith', 5) as Model
})

PetsData.set('Capybara', {
    name: 'Capybara',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 62]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Capybara', 5) as Model
})

PetsData.set('Yellow Slime', {
    name: 'Yellow Slime',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 78]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Yellow Slime', 5) as Model
})

PetsData.set('Royal Raven', {
    name: 'Royal Raven',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 97]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Royal Raven', 5) as Model
})

PetsData.set('King Ant', {
    name: 'King Ant',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 195]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('King Ant', 5) as Model
})

PetsData.set('Kitsune', {
    name: 'Kitsune',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 20]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Kitsune', 5) as Model
})


// *

PetsData.set('Mystery Cat', {
    name: 'Mystery Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 85]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Mystery Cat', 5) as Model
})

PetsData.set('Cyber Dominus', {
    name: 'Cyber Dominus',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 106]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Cyber Dominus', 5) as Model
})

PetsData.set('Cyberpunk Dragon', {
    name: 'Cyberpunk Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 132]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Cyberpunk Dragon', 5) as Model
})

PetsData.set('Crow', {
    name: 'Crow',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 166]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Crow', 5) as Model
})

PetsData.set('Moon Bird', {
    name: 'Moon Bird',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 332]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Moon Bird', 5) as Model
})

// *

// *

PetsData.set('Mega Galaxy Doggy', {
    name: 'Mega Galaxy Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 420]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Mega Galaxy Doggy', 5) as Model
})

PetsData.set('Purple Alien Hydra', {
    name: 'Purple Alien Hydra',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 525]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Purple Alien Hydra', 5) as Model
})

PetsData.set('Ultra Alien', {
    name: 'Ultra Alien',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1050]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Ultra Alien', 5) as Model
})

PetsData.set('Nightmare Cat', {
    name: 'Nightmare Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 15]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 2}]
    },
    model: Pets.WaitForChild('Nightmare Cat', 5) as Model
})

PetsData.set('Nightmare Bunny', {
    name: 'Nightmare Bunny',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 30]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 4}]
    },
    model: Pets.WaitForChild('Nightmare Bunny', 5) as Model
})

PetsData.set('Nightmare Yeti', {
    name: 'Nightmare Yeti',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 55]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 6}]
    },
    model: Pets.WaitForChild('Nightmare Yeti', 5) as Model
})

PetsData.set('Devil Spider', {
    name: 'Devil Spider',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 150]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 7}]
    },
    model: Pets.WaitForChild('Devil Spider', 5) as Model
})

PetsData.set('Observer', {
    name: 'Observer',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 750]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 8}]
    },
    model: Pets.WaitForChild('Observer', 5) as Model
})

PetsData.set('Confetti Balloon', {
    name: 'Confetti Balloon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 7.5]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 1}]
    },
    model: Pets.WaitForChild('Confetti Balloon', 5) as Model
})

PetsData.set('Party Goblin', {
    name: 'Party Goblin',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 15.5]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 3}]
    },
    model: Pets.WaitForChild('Party Goblin', 5) as Model
})

PetsData.set('Swaggy Songbird', {
    name: 'Swaggy Songbird',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 60]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 5}]
    },
    model: Pets.WaitForChild('Swaggy Songbird', 5) as Model
})

PetsData.set('DJ Demon', {
    name: 'DJ Demon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 200]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default,
        perks: [{name: 'Extra Power', level: 8}]
    },
    model: Pets.WaitForChild('DJ Demon', 5) as Model
})

// !

// *Gifts & Daily & Chest Rewards

PetsData.set('The Ultra Banana Split', {
    name: 'The Ultra Banana Split',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 30]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('The Ultra Banana Split', 5) as Model
})

PetsData.set('Star Spike', {
    name: 'Star Spike',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 150]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Star Spike', 5) as Model
})

PetsData.set('Nightmare Spirit', {
    name: 'Nightmare Spirit',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 50]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Nightmare Spirit', 5) as Model
})

PetsData.set('Flame Pixie', {
    name: 'Flame Pixie',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Flame Pixie', 5) as Model
})

PetsData.set('Shadow Demon', {
    name: 'Shadow Demon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 25]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Shadow Demon', 5) as Model
})

PetsData.set('Pixie', {
    name: 'Pixie',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 20]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pixie', 5) as Model
})

PetsData.set('Midnight', {
    name: 'Midnight',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 70]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Midnight', 5) as Model
})

PetsData.set('Leek Cat', {
    name: 'Leek Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 200]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Leek Cat', 5) as Model
})

// *Spin

PetsData.set('Red Devil', {
    name: 'Red Devil',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 30]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Red Devil', 5) as Model
})

// *Bundles

PetsData.set('Magma Doggy', {
    name: 'Magma Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 10]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Magma Doggy', 5) as Model
})

PetsData.set('Soul Golem', {
    name: 'Soul Golem',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 15]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Soul Golem', 5) as Model
})

// *Limeted

PetsData.set('Ultra Capybara', {
    name: 'Ultra Capybara',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 600]]),
    stats: {
        rarity: Rarities.Limited,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Ultra Capybara', 5) as Model
})

PetsData.set('Psycho', {
    name: 'Psycho',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1500]]),
    stats: {
        rarity: Rarities.Limited,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Psycho', 5) as Model
})

PetsData.set('Devils Soul', {
    name: 'Devils Soul',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 10000]]),
    stats: {
        rarity: Rarities.Limited,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Devils Soul', 5) as Model
})

// *World4

PetsData.set('Devil Golem', {
    name: 'Devil Golem',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 500]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Devil Golem', 5) as Model
})

PetsData.set('Darkness Shark', {
    name: 'Darkness Shark',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 625]]),
    stats: {
        rarity: Rarities.Uncommon,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Shark', 5) as Model
})

PetsData.set('Darkness Parrot', {
    name: 'Darkness Parrot',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 781]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Parrot', 5) as Model
})

PetsData.set('Darkness Dragon', {
    name: 'Darkness Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 976]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Dragon', 5) as Model
})

PetsData.set('Darkness Steampunk', {
    name: 'Darkness Steampunk',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1950]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Steampunk', 5) as Model
})

PetsData.set('Darkness Flower Power', {
    name: 'Darkness Flower Power',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 800]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Flower Power', 5) as Model
})

PetsData.set('Darkness Horse', {
    name: 'Darkness Horse',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1000]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Horse', 5) as Model
})

PetsData.set('Darkness Happy Demon', {
    name: 'Darkness Happy Demon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1250]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Happy Demon', 5) as Model
})

PetsData.set('Darkness Spider', {
    name: 'Darkness Spider',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1560]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Spider', 5) as Model
})

PetsData.set('Darkness', {
    name: 'Darkness',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3120]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness', 5) as Model
})

PetsData.set('Sinister Pumpkin', {
    name: 'Sinister Pumpkin',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1350]]),
    stats: {
        rarity: Rarities.Rare,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Sinister Pumpkin', 5) as Model
})

PetsData.set('Darkness Robux', {
    name: 'Darkness Robux',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1680]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Robux', 5) as Model
})

PetsData.set('Matrix Dog', {
    name: 'Matrix Dog',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2100]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Matrix Dog', 5) as Model
})

PetsData.set('Matrix Kitty', {
    name: 'Matrix Kitty',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2630]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Matrix Kitty', 5) as Model
})

PetsData.set('Skeletal Samurai', {
    name: 'Skeletal Samurai',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5270]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Skeletal Samurai', 5) as Model
})

PetsData.set('Skeletal Demon', {
    name: 'Skeletal Demon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4000]]),
    stats: {
        rarity: Rarities.Legendary,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Skeletal Demon', 5) as Model
})

PetsData.set('Pink Fury', {
    name: 'Pink Fury',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5000]]),
    stats: {
        rarity: Rarities.Mythic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Pink Fury', 5) as Model
})

PetsData.set('Darkness Alien', {
    name: 'Darkness Alien',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 9800]]),
    stats: {
        rarity: Rarities.Secret,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Darkness Alien', 5) as Model
})

PetsData.set('Backrooms Cat', {
    name: 'Backrooms Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6666]]),
    stats: {
        rarity: Rarities.Limited,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Backrooms Cat', 5) as Model
})

PetsData.set('Mega Block', {
    name: 'Mega Block',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 15]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Mega Block', 5) as Model
})

PetsData.set('Steampunk Doggy', {
    name: 'Steampunk Doggy',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 35]]),
    stats: {
        rarity: Rarities.Epic,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Steampunk Doggy', 5) as Model
})

// !!GigaRacoon!!

/*  мир уже готов */
PetsData.set('GigaRaccoon', {
    name: 'GigaRaccoon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 100000000000000]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,20,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('GigaRaccoon', 5) as Model
})

// !!GigaRacoon!!

/*

PetsData.set('Glitch Hunter', {
    name: 'Glitch Hunter',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3000]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,-1,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Glitch Hunter', 5) as Model
})

PetsData.set('Contributor', {
    name: 'Contributor',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3000]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,-1,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Glitch Hunter', 5) as Model
})

PetsData.set('Developer', {
    name: 'Developer',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3000]]),
    stats: {
        rarity: Rarities.Exclusive,
        sizeOffset: new Vector3(0,-1,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Baby,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Pets.WaitForChild('Glitch Hunter', 5) as Model
})


*/
