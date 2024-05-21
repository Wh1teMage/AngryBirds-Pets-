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
    price: 5,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 420, name: 'Cat' },
        { weight: 310, name: 'Dog' },
        { weight: 180, name: 'White Bunny' },
        { weight: 90, name: 'Elephant' },
        { weight: 8, name: 'Butterfly' },
    ],
    model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEggModel
})

EggsData.set('Ore', {
    name: 'Ore',
    price: 50,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 440, name: 'Fox'},
        { weight: 310, name: 'Monkey' },
        { weight: 170, name: 'Dragon' },
        { weight: 80, name: 'Raccoon' },
        { weight: 8, name: 'CandyCane Unicorn' },
    ],
    model: Workspace.WaitForChild('World1').WaitForChild('OreEgg') as IEggModel,
    rotationOffset: CFrame.Angles(0, 0, 0)
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Rail', {
    name: 'Rail',
    price: 250,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 460, name:  'Cow'},
        { weight: 310, name:  'Pig'},
        { weight: 160, name: 'Fish' },
        { weight: 70, name: 'Crab' },
        { weight: 7, name: 'Peacock' },
    ],
    model: Workspace.WaitForChild('World1').WaitForChild('RailEgg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Diamond', {
    name: 'Diamond',
    price: 149,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 60, name:  'Glacier'},
        { weight: 30, name:  'Mega Amythest Dragon'},
        { weight: 10, name: 'Sinister Hydra' },
    ],
    model: Workspace.WaitForChild('World1').WaitForChild('DiamondEgg') as IEggModel,
    
    productidx3: 1782683273,
    productid: 1762884433,
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})
// !World 1 /\

// !World 2 \/
EggsData.set('Pink', {
    name: 'Pink',
    price: 2500,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 460, name:  'Pink Bunny'},
        { weight: 310, name:  'Pink Axolotl'},
        { weight: 160,name: 'Seal' },
        { weight: 70, name: 'Diamond Golem' },
        { weight: 7, name: 'Aqua Dragon' },
    ],
    model: Workspace.WaitForChild('Pink Egg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Cat', {
    name: 'Cat',
    price: 10000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 480, name:  'Blue Slime'},
        { weight: 320, name:  'White Bear'},
        { weight: 150, name: 'Gecon' },
        { weight: 50, name: 'Clown Doggy' },
        { weight: 7, name: 'The Clown' },
    ],
    model: Workspace.WaitForChild('Cat Egg') as IEggModel,
    rotationOffset: CFrame.Angles(0, 0, 0)
})

EggsData.set('Forcefield', {
    name: 'Forcefield',
    price: 50000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 500, name:  'Polar'},
        { weight: 330, name:  'Red Dragon'},
        { weight: 140, name: 'WizMouse' },
        { weight: 30, name: 'Lily' },
        { weight: 0.6, name: 'Crystal Lord' },
    ],
    model: Workspace.WaitForChild('Forcefield Egg') as IEggModel

})

EggsData.set('Rich', {
    name: 'Rich',
    price: 250000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 69, name:  'Sus Cat'},
        { weight: 30, name:  'Ice Cream Dog'},
        { weight: 1, name: 'Cake' },
    ],
    model: Workspace.WaitForChild('Rich Egg') as IEggModel
})

// !World 2 /\

// !World 3 \/

EggsData.set('Bear', {
    name: 'Bear',
    price: 500000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 480, name:  'Garden Wraith'},
        { weight: 320, name:  'Capybara'},
        { weight: 140, name: 'Yellow Slime' },
        { weight: 60, name: 'Royal Raven' },
        { weight: 5, name: 'King Ant' },
    ],
    model: Workspace.WaitForChild('Bear Egg') as IEggModel
})

EggsData.set('Flower', {
    name: 'Flower',
    price: 2500000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 500, name:  'Mystery Cat'},
        { weight: 330, name:  'Cyber Dominus'},
        { weight: 130, name: 'Cyberpunk Dragon' },
        { weight: 40, name: 'Crow' },
        { weight: 4, name: 'Moon Bird' },
    ],
    model: Workspace.WaitForChild('Flower Egg') as IEggModel
})

EggsData.set('Sun', {
    name: 'Sun',
    price: 10000000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 520, name:  'Hacked Doggy'},
        { weight: 340, name:  'Alien Bird'},
        { weight: 120, name: 'Alien Dragon' },
        { weight: 20, name: 'Galaxy Doggy' },
        { weight: 3, name: 'Dark Hydra' },
    ],
    model: Workspace.WaitForChild('Sun Egg') as IEggModel,
    rotationOffset: CFrame.Angles(0,0,0)
})

EggsData.set('Cursed', {
    name: 'Cursed',
    price: 40000000,
    valuetype: EggValueType.Wins,
    petchances: [
        { weight: 750, name:  'Mega Galaxy Doggy'},
        { weight: 250, name:  'Purple Alien Hydra'},
        { weight: 5, name: 'Ultra Alien' },
    ],
    model: Workspace.WaitForChild('Cursed Egg') as IEggModel
})

// !World 3 /\

// !Other eggs \/

EggsData.set('Nightmare', {
    name: 'Nightmare',
    price: 0,
    valuetype: EggValueType.VBugs, 
    petchances: [
        { weight: 500, name:  'Nightmare Cat'},
        { weight: 250, name:  'Nightmare Bunny'},
        { weight: 150, name: 'Nightmare Yeti' },
        { weight: 50, name: 'Devil Spider' },
        { weight: 5, name: 'Observer' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Party', {
    name: 'Party',
    price: 0,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 500, name:  'Confetti Balloon'},
        { weight: 250, name:  'Party Goblin'},
        { weight: 100, name: 'Swaggy Songbird' },
        { weight: 10, name: 'DJ Demon' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('Shadow', {
    name: 'Shadow',
    price: 1,
    valuetype: EggValueType.Stored,
    petchances: [
        { weight: 500, name:  'Shadow Chameleon'},
        { weight: 250, name:  'Shadow Butterfly'},
        { weight: 100, name: 'Shadow Ghost' },
        { weight: 1, name: 'Shadow Star' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

EggsData.set('ShadowDonate', {
    name: 'ShadowDonate',
    price: 0,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 500, name:  'Shadow Chameleon'},
        { weight: 250, name:  'Shadow Butterfly'},
        { weight: 100, name: 'Shadow Ghost' },
        { weight: 1, name: 'Shadow Star' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEggModel
    //model: Workspace.WaitForChild('TestEgg') as IEggModel
})

/*
[
        { weight: 1, name: 'Cat' },
        { weight: 10, name: 'Cat' },
        { weight: 15000, name: undefined },
    ],
*/

/*
EggsData.set('Shadow', {
    name: 'Shadow',
    price: 1,
    valuetype: EggValueType.Stored,
    petchances: [
        { weight: 10, name: 'Cat' },
        { weight: 15, name: 'Cat' },
    ],
})
*/