import { Workspace } from "@rbxts/services"
import { Evolutions, IPetData, Mutations, Rarities, Sizes } from "shared/interfaces/PetData"

export const PetsData = new Map<string, IPetData>()

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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Cat') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Dog') as Model
})

PetsData.set('White Bunny', {
    name: 'White Bunny',
    locked: false,
    equipped: false,
    multipliers: new Map([['strength', 2.3]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('White Bunny') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Elephant') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Butterfly') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Fox') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Monkey') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Dragon') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Raccoon') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('CandyCane Unicorn') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Cow') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Pig') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Fish') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Crab') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Peacock') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Glacier') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Mega Amythest Dragon') as Model
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
        size: Sizes.Normal,
        evolution: Evolutions.Normal,
        mutation: Mutations.Default
    },
    model: Workspace.WaitForChild('Sinister Hydra') as Model
})
// !World 1 /\

// !World 2 \/