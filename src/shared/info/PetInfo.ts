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

// *

PetsData.set('Pink Bunny', {
    name: 'Pink Bunny',
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
    model: Pets.WaitForChild('Pink Bunny', 40) as Model
})

PetsData.set('Pink Axolotl', {
    name: 'Pink Axolotl',
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
    model: Pets.WaitForChild('Pink Axolotl', 40) as Model
})

PetsData.set('Seal', {
    name: 'Seal',
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
    model: Pets.WaitForChild('Seal', 40) as Model
})

PetsData.set('Diamond Golem', {
    name: 'Diamond Golem',
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
    model: Pets.WaitForChild('Diamond Golem', 40) as Model
})

PetsData.set('Aqua Dragon', {
    name: 'Aqua Dragon',
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
    model: Pets.WaitForChild('Aqua Dragon', 40) as Model
})

PetsData.set('Blue Something', {
    name: 'Blue Something',
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
    model: Pets.WaitForChild('Blue Something', 40) as Model
})

PetsData.set('White Bear', {
    name: 'White Bear',
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
    model: Pets.WaitForChild('White Bear', 40) as Model
})

PetsData.set('Gecon', {
    name: 'Gecon',
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
    model: Pets.WaitForChild('Gecon', 40) as Model
})

PetsData.set('Clown Doggy', {
    name: 'Clown Doggy',
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
    model: Pets.WaitForChild('Clown Doggy', 40) as Model
})

PetsData.set('The Clown', {
    name: 'The Clown',
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
    model: Pets.WaitForChild('The Clown', 40) as Model
})

PetsData.set('Polar', {
    name: 'Polar',
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
    model: Pets.WaitForChild('Polar', 40) as Model
})


PetsData.set('Red Dragon', {
    name: 'Red Dragon',
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
    model: Pets.WaitForChild('Red Dragon', 40) as Model
})

PetsData.set('WizMouse', {
    name: 'WizMouse',
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
    model: Pets.WaitForChild('WizMouse', 40) as Model
})

PetsData.set('Lily', {
   name: 'Lily',
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
    model: Pets.WaitForChild('Lily', 40) as Model
})

PetsData.set('Crystal Lord', {
    name: 'Crystal Lord',
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
    model: Pets.WaitForChild('Crystal Lord', 40) as Model
})

PetsData.set('Sus Cat', {
    name: 'Sus Cat',
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
    model: Pets.WaitForChild('Sus Cat', 40) as Model
})

PetsData.set('Ice Cream Dog', {
    name: 'Ice Cream Dog',
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
    model: Pets.WaitForChild('Ice Cream Dog', 40) as Model
})

PetsData.set('Cake', {
    name: 'Cake',
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
    model: Pets.WaitForChild('Cake', 40) as Model
})

PetsData.set('Garden Wraith', {
    name: 'Garden Wraith',
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
    model: Pets.WaitForChild('Garden Wraith', 40) as Model
})

PetsData.set('Capybara', {
    name: 'Capybara',
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
    model: Pets.WaitForChild('Capybara', 40) as Model
})

PetsData.set('Yellow Something', {
    name: 'Yellow Something',
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
    model: Pets.WaitForChild('Yellow Something', 40) as Model
})

PetsData.set('Royal Raven', {
    name: 'Royal Raven',
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
    model: Pets.WaitForChild('Royal Raven', 40) as Model
})

PetsData.set('King Ant', {
    name: 'King Ant',
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
    model: Pets.WaitForChild('King Ant', 40) as Model
})

PetsData.set('Mystery Cat', {
    name: 'Mystery Cat',
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
    model: Pets.WaitForChild('Mystery Cat', 40) as Model
})

PetsData.set('Cyber Dominus', {
    name: 'Cyber Dominus',
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
    model: Pets.WaitForChild('Cyber Dominus', 40) as Model
})

PetsData.set('Cyberpunk Dragon', {
    name: 'Cyberpunk Dragon',
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
    model: Pets.WaitForChild('Cyberpunk Dragon', 40) as Model
})

PetsData.set('Crow', {
    name: 'Crow',
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
    model: Pets.WaitForChild('Crow', 40) as Model
})

PetsData.set('Moon Bird', {
    name: 'Moon Bird',
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
    model: Pets.WaitForChild('Moon Bird', 40) as Model
})

PetsData.set('Hacked Doggy', {
    name: 'Hacked Doggy',
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
    model: Pets.WaitForChild('Hacked Doggy', 40) as Model
})

PetsData.set('Alien Bird', {
    name: 'Alien Bird',
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
    model: Pets.WaitForChild('Alien Bird', 40) as Model
})

PetsData.set('Alien Dragon', {
    name: 'Alien Dragon',
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
    model: Pets.WaitForChild('Alien Dragon', 40) as Model
})

PetsData.set('Galaxy Doggy', {
    name: 'Galaxy Doggy',
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
    model: Pets.WaitForChild('Galaxy Doggy', 40) as Model
})

PetsData.set('Dark Hydra', {
    name: 'Dark Hydra',
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
    model: Pets.WaitForChild('Dark Hydra', 40) as Model
})

PetsData.set('Mega Galaxy Doggy', {
    name: 'Mega Galaxy Doggy',
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
    model: Pets.WaitForChild('Mega Galaxy Doggy', 40) as Model
})

PetsData.set('Purple Alien Hydra', {
    name: 'Purple Alien Hydra',
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
    model: Pets.WaitForChild('Purple Alien Hydra', 40) as Model
})

PetsData.set('Ultra Alien', {
    name: 'Ultra Alien',
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
    model: Pets.WaitForChild('Ultra Alien', 40) as Model
})

PetsData.set('Nightmare Cat', {
    name: 'Nightmare Cat',
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
    model: Pets.WaitForChild('Nightmare Cat', 40) as Model
})

PetsData.set('Nightmare Bunny', {
    name: 'Nightmare Bunny',
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
    model: Pets.WaitForChild('Nightmare Bunny', 40) as Model
})

PetsData.set('Nightmare Yeti', {
    name: 'Nightmare Yeti',
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
    model: Pets.WaitForChild('Nightmare Yeti', 40) as Model
})

PetsData.set('Devil Spider', {
    name: 'Devil Spider',
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
    model: Pets.WaitForChild('Devil Spider', 40) as Model
})

PetsData.set('Observer', {
    name: 'Observer',
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
    model: Pets.WaitForChild('Observer', 40) as Model
})

PetsData.set('Confetti Balloon', {
    name: 'Confetti Balloon',
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
    model: Pets.WaitForChild('Confetti Balloon', 40) as Model
})

PetsData.set('Party Goblin', {
    name: 'Party Goblin',
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
    model: Pets.WaitForChild('Party Goblin', 40) as Model
})

PetsData.set('Swaggy Songbird', {
    name: 'Swaggy Songbird',
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
    model: Pets.WaitForChild('Swaggy Songbird', 40) as Model
})

PetsData.set('DJ Demon', {
    name: 'DJ Demon',
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
    model: Pets.WaitForChild('DJ Demon', 40) as Model
})

PetsData.set('Shadow Chameleon', {
    name: 'Shadow Chameleon',
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
    model: Pets.WaitForChild('Shadow Chameleon', 40) as Model
})

PetsData.set('Shadow Butterfly', {
    name: 'Shadow Butterfly',
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
    model: Pets.WaitForChild('Shadow Butterfly', 40) as Model
})

PetsData.set('Shadow Ghost', {
    name: 'Shadow Ghost',
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
    model: Pets.WaitForChild('Shadow Ghost', 40) as Model
})

PetsData.set('Shadow Star', {
    name: 'Shadow Star',
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
    model: Pets.WaitForChild('Shadow Star', 40) as Model
})

// *Gifts & Daily & Chest Rewards

PetsData.set('The Ultra Banana Split', {
    name: 'The Ultra Banana Split',
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
    model: Pets.WaitForChild('The Ultra Banana Split', 40) as Model
})

PetsData.set('Star Spike', {
    name: 'Star Spike',
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
    model: Pets.WaitForChild('Star Spike', 40) as Model
})

PetsData.set('Nightmare Spirit', {
    name: 'Nightmare Spirit',
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
    model: Pets.WaitForChild('Nightmare Spirit', 40) as Model
})

PetsData.set('Flame Pixie', {
    name: 'Flame Pixie',
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
    model: Pets.WaitForChild('Flame Pixie', 40) as Model
})

PetsData.set('Shadow Demon', {
    name: 'Shadow Demon',
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
    model: Pets.WaitForChild('Shadow Demon', 40) as Model
})

PetsData.set('Pixie', {
    name: 'Pixie',
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
    model: Pets.WaitForChild('Pixie', 40) as Model
})

PetsData.set('Midnight', {
    name: 'Midnight',
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
    model: Pets.WaitForChild('Midnight', 40) as Model
})

PetsData.set('Leek Cat', {
    name: 'Leek Cat',
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
    model: Pets.WaitForChild('Leek Cat', 40) as Model
})

// *Spin

PetsData.set('Red Devil', {
    name: 'Red Devil',
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
    model: Pets.WaitForChild('Red Devil', 40) as Model
})

// *Bundles

PetsData.set('Magma Doggy', {
    name: 'Magma Doggy',
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
    model: Pets.WaitForChild('Magma Doggy', 40) as Model
})

PetsData.set('Soul Golem', {
    name: 'Soul Golem',
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
    model: Pets.WaitForChild('Soul Golem', 40) as Model
})

// *Limeted

PetsData.set('Ultra Capybara', {
    name: 'Ultra Capybara',
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
    model: Pets.WaitForChild('Ultra Capybara', 40) as Model
})

PetsData.set('Psycho', {
    name: 'Psycho',
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
    model: Pets.WaitForChild('Psycho', 40) as Model
})

PetsData.set('Devils Soul', {
    name: 'Devils Soul',
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
    model: Pets.WaitForChild('Devils Soul', 40) as Model
})

// !!GigaRacoon!!
PetsData.set('GigaRacoon', {
    name: 'GigaRacoon',
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
    model: Pets.WaitForChild('GigaRacoon', 40) as Model
})
// !!GigaRacoon!!