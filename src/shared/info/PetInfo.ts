import { ReplicatedStorage } from "@rbxts/services"
import { Evolutions, IPetData, Mutations, Rarities, Sizes } from "shared/interfaces/PetData"

export const PetsData = new Map<string, IPetData>()
const Pets = ReplicatedStorage.WaitForChild('Pets') as Folder

// !World 1 \/

// * Stone egg
PetsData.set('Cat', {
    name: 'Cat',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.4]]),
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
    model: Pets.WaitForChild('Cat', 40) as Model
})

PetsData.set('Dog', {
    name: 'Dog',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 1.9]]),
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
    model: Pets.WaitForChild('Dog', 40) as Model
})

PetsData.set('White Bunny', {
    name: 'White Bunny', // чучело (ненавидим)
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.3]]),
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
    model: Pets.WaitForChild('White Bunny', 40) as Model
})

PetsData.set('Elephant', {
    name: 'Elephant',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.1]]),
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
    model: Pets.WaitForChild('Elephant', 40) as Model
})

PetsData.set('Butterfly', {
    name: 'Butterfly',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6.2]]),
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
    model: Pets.WaitForChild('Butterfly', 40) as Model
})

// * Ore egg

PetsData.set('Fox', {
    name: 'Fox',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.5]]),
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
    model: Pets.WaitForChild('Fox', 40) as Model
})

PetsData.set('Monkey', {
    name: 'Monkey',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 3.3]]),
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
    model: Pets.WaitForChild('Monkey', 40) as Model
})

PetsData.set('Dragon', {
    name: 'Dragon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.1]]),
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
    model: Pets.WaitForChild('Dragon', 40) as Model
})

PetsData.set('Raccoon', {
    name: 'Raccoon',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.2]]),
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
    model: Pets.WaitForChild('Raccoon', 40) as Model
})

PetsData.set('CandyCane Unicorn', {
    name: 'CandyCane Unicorn',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 10.4]]),
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
    model: Pets.WaitForChild('CandyCane Unicorn', 40) as Model
})

// * Rail egg

PetsData.set('Cow', {
    name: 'Cow',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 4.4]]),
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
    model: Pets.WaitForChild('Cow', 40) as Model
})

PetsData.set('Pig', {
    name: 'Pig',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 5.6]]),
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
    model: Pets.WaitForChild('Pig', 40) as Model
})

PetsData.set('Fish', {
    name: 'Fish',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 6.8]]),
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
    model: Pets.WaitForChild('Fish', 40) as Model
})

PetsData.set('Crab', {
    name: 'Crab',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 8.8]]),
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
    model: Pets.WaitForChild('Crab', 40) as Model
})

PetsData.set('Peacock', {
    name: 'Peacock',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 17.6]]),
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
    model: Pets.WaitForChild('Peacock', 40) as Model
})

// * Diamond egg (donat)

PetsData.set('Glacier', {
    name: 'Glacier',
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
    model: Pets.WaitForChild('Glacier', 40) as Model
})

PetsData.set('Mega Amythest Dragon', {
    name: 'Mega Amythest Dragon',
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
    model: Pets.WaitForChild('Mega Amythest Dragon', 40) as Model
})

PetsData.set('Sinister Hydra', {
    name: 'Sinister Hydra',
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
    model: Pets.WaitForChild('Sinister Hydra', 40) as Model
})
// !World 1 /\

// !World 2 \/