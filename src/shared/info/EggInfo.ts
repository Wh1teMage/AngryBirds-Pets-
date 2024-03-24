import { Workspace } from "@rbxts/services";
import { EggValueType, IEggData, IEggModel } from "shared/interfaces/EggData";

export const EggsData = new Map<string, IEggData>()

type Chances = Array< {chance: number, name: string} >

let transferPercantages = (chances: Chances) => {
    let form: IEggData['petchances'] = []
    let maxNum = 10**100
    let freeWeight = maxNum
    chances.forEach((v) => {
        let weight = maxNum*(v.chance/100)
        form.push({ weight: weight, name: v.name })
        freeWeight -= weight
    })
    form.push({ weight: math.round(freeWeight) })
    print(form)
    return form
}
/*
EggsData.set('Default', {
    name: 'Default',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: transferPercantages([
        { chance: 1/10**12, name: 'Cat'},
        { chance: .63, name: 'Cat'},
        { chance: 30, name: 'Cat'},
        { chance: 15, name: 'Cat'},
    ]),
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})
*/
EggsData.set('Stone', {
    name: 'Stone',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name: 'Cat' },
        { weight: 10, name: 'Dog' },
        { weight: 10, name: 'White Bunny' },
        { weight: 10, name: 'Elephant' },
        { weight: 10, name: 'Butterfly' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Ore', {
    name: 'Ore',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name: 'Fox'},
        { weight: 10, name: 'Monkey' },
        { weight: 10, name: 'Dragon' },
        { weight: 10, name: 'Raccoon' },
        { weight: 10, name: 'CandyCane Unicorn' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Rail', {
    name: 'Rail',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Cow'},
        { weight: 1, name:  'Pig'},
        { weight: 10, name: 'Fish' },
        { weight: 10, name: 'Crab' },
        { weight: 10, name: 'Peacock' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Diamond', {
    name: 'Diamond',
    price: 100,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 1, name:  'Glacier'},
        { weight: 1, name:  'Mega Amythest Dragon'},
        { weight: 10, name: 'Sinister Hydra' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})
// !World 1 /\

// !World 2 \/
EggsData.set('1', {
    name: '1',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Pink Bunny'},
        { weight: 1, name:  'Pink Axolotl'},
        { weight: 10, name: 'Seal' },
        { weight: 10, name: 'Diamond Golem' },
        { weight: 10, name: 'Aqua Dragon' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('2', {
    name: '2',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Blue Something'},
        { weight: 1, name:  'White Bear'},
        { weight: 10, name: 'Gecon' },
        { weight: 10, name: 'Clown Doggy' },
        { weight: 10, name: 'The Clown' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('3', {
    name: '3',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Polar'},
        { weight: 1, name:  'Red Dragon'},
        { weight: 10, name: 'WizMouse' },
        { weight: 10, name: 'Lily' },
        { weight: 10, name: 'Crystal Lord' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Diamond', {
    name: 'Diamond',
    price: 100,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 1, name:  'Sus Cat'},
        { weight: 1, name:  'Ice Cream Dog'},
        { weight: 10, name: 'Cake' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

// !World 2 /\

// !World 3 \/

EggsData.set('1', {
    name: '1',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Garden Wraith'},
        { weight: 1, name:  'Capybara'},
        { weight: 10, name: 'Yellow Something' },
        { weight: 10, name: 'Royal Raven' },
        { weight: 10, name: 'King Ant' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('2', {
    name: '2',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Mystery Cat'},
        { weight: 1, name:  'Cyber Dominus'},
        { weight: 10, name: 'Cyberpunk Dragon' },
        { weight: 10, name: 'Crow' },
        { weight: 10, name: 'Moon Bird' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('3', {
    name: '3',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Hacked Doggy'},
        { weight: 1, name:  'Alien Bird'},
        { weight: 10, name: 'Alien Dragon' },
        { weight: 10, name: 'Galaxy Doggy' },
        { weight: 10, name: 'Dark Hydra' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Diamond', {
    name: 'Diamond',
    price: 100,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 1, name:  'Mega Galaxy Doggy'},
        { weight: 1, name:  'Purple Alien Hydra'},
        { weight: 10, name: 'Ultra Alien' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})
// !World 3 /\

// !Other eggs \/

EggsData.set('Nightmare', {
    name: 'Nightmare',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Nightmare Cat'},
        { weight: 1, name:  'Nightmare Bunny'},
        { weight: 10, name: 'Nightmare Yeti' },
        { weight: 10, name: 'Devil Spider' },
        { weight: 10, name: 'Observer' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Party', {
    name: 'Party',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Confetti Balloon'},
        { weight: 1, name:  'Party Goblin'},
        { weight: 10, name: 'Swaggy Songbird' },
        { weight: 10, name: 'DJ Demon' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Shadow', {
    name: 'Shadow',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 1, name:  'Shadow Chameleon'},
        { weight: 1, name:  'Shadow Butterfly'},
        { weight: 10, name: 'Shadow Ghost' },
        { weight: 10, name: 'Shadow Star' },
    ],
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})



/*
[
        { weight: 1, name: 'Cat' },
        { weight: 10, name: 'Cat' },
        { weight: 15000, name: undefined },
    ],
*/

EggsData.set('Donate', {
    name: 'Donate',
    price: 100,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 10, name: 'Cat' },
        { weight: 15, name: 'Cat' },
    ],

    productid: 1701055226
})

EggsData.set('Shadow', {
    name: 'Shadow',
    price: 1,
    valuetype: EggValueType.Stored,
    petchances: [
        { weight: 10, name: 'Cat' },
        { weight: 15, name: 'Cat' },
    ],
})