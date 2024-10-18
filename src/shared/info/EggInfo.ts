import { Workspace } from "@rbxts/services";
import { WorldType } from "shared/enums/WorldEnums";
import { EggValueType, IEggData } from "shared/interfaces/EggData";

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
    valuetype: EggValueType.Gems,
    petchances: transferPercantages([
        { chance: 1/10**12, name: 'Cat'},
        { chance: .63, name: 'Cat'},
        { chance: 30, name: 'Cat'},
        { chance: 15, name: 'Cat'},
    ]),

    productidx3: 1782683273,
    productid: 1762884433,
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})
*/

EggsData.set('Starter', {
    name: 'Starter',
    price: 250,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 300, name: 'Cat' }, //! fix
        { weight: 300, name: 'Dog' },
        { weight: 150, name: 'White Bunny' },
        { weight: 150, name: 'Elephant' },
        { weight: 100, name: 'Butterfly' },
    ],

    productid: 1888599290,

    image: 'rbxassetid://18560118502',
    world: WorldType.Cave
})

EggsData.set('Beach', {
    name: 'Beach',
    price: 1000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 300, name: 'Fox'},
        { weight: 300, name: 'Monkey' },
        { weight: 150, name: 'Dragon' },
        { weight: 150, name: 'Raccoon' },
        { weight: 100, name: 'CandyCane Unicorn' },
    ],

    productid: 1888599428,

    image: 'rbxassetid://18635594226',
    world: WorldType.Cave
})

EggsData.set('Sea', {
    name: 'Sea',
    price: 2500,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 300, name:  'Cow'},
        { weight: 300, name:  'Pig'},
        { weight: 150, name: 'Fish' },
        { weight: 150, name: 'Crab' },
        { weight: 100, name: 'Peacock' },
    ],

    productid: 1888599796,

    image: 'rbxassetid://18635609748',
    world: WorldType.Cave
})

EggsData.set('Sakura', {
    name: 'Sakura',
    price: 5000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 500, name:  'Pink Bunny'},
        { weight: 250, name:  'Pink Axolotl'},
        { weight: 100,name: 'Seal' },
        { weight: 100, name: 'Diamond Golem' },
        { weight: 50 , name: 'Aqua Dragon' },
    ],

    productid: 1888600133,

    image: 'rbxassetid://18635627541',
    world: WorldType.NeonCity
})

EggsData.set('Flower', {
    name: 'Flower',
    price: 10000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 500, name:  'Blue Slime'},
        { weight: 250, name:  'White Bear'},
        { weight: 100, name: 'Gecon' },
        { weight: 100, name: 'Clown Doggy' },
        { weight: 50 , name: 'The Clown' },
    ],

    productid: 1888600307,

    image: 'rbxassetid://18635645570',
    world: WorldType.NeonCity
})

EggsData.set('Mountain', {
    name: 'Mountain',
    price: 25000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 400, name:  'Polar'},
        { weight: 400, name:  'Red Dragon'},
        { weight: 100, name: 'WizMouse' },
        { weight: 70, name: 'Lily' },
        { weight: 30, name: 'Crystal Lord' },
    ],

    image: 'rbxassetid://18635666651',
    world: WorldType.NeonCity
})

EggsData.set('Futuristic', {
    name: 'Futuristic',
    price: 50000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 400, name:  'Owl'},
        { weight: 400, name:  'Pink Slime'},
        { weight: 100, name: 'Plant' },
        { weight: 70, name: 'Hat Trick Dragon' },
        { weight: 30, name: 'Mega Demon' },
    ],

    image: 'rbxassetid://18820405957',
    world: WorldType.Backrooms
})

EggsData.set('Night', {
    name: 'Night',
    price: 75000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 400, name:  'Flamingo'},
        { weight: 400, name:  'MailCat'},
        { weight: 100, name: 'Cake' },
        { weight: 70, name: 'King Slime' },
        { weight: 30, name: 'Ruby Spider' },
    ],

    image: 'rbxassetid://18820413073',
    world: WorldType.Backrooms
})

EggsData.set('Hacker', {
    name: 'Hacker',
    price: 100000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 400, name:  'Hacked Doggy'},
        { weight: 400, name:  'Alien Bird'},
        { weight: 100, name: 'Alien Dragon' },
        { weight: 70, name: 'Galaxy Doggy' },
        { weight: 30, name: 'Dark Hydra' },
    ],

    image: 'rbxassetid://18820417071',
    world: WorldType.Backrooms
})


EggsData.set('Nightmare', {
    name: 'Nightmare',
    price: 0,
    valuetype: EggValueType.VBugs, 
    petchances: [
        { weight: 500, name:  'Nightmare Cat'},
        { weight: 400, name:  'Nightmare Bunny'},
        { weight: 60, name: 'Nightmare Yeti' },
        { weight: 30, name: 'Devil Spider' },
        { weight: 10, name: 'Observer' },
    ],

    image: 'rbxassetid://14061866897',
    world: WorldType.Cave
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})

EggsData.set('Party', {
    name: 'Party',
    price: 0,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 500, name:  'Confetti Balloon'},
        { weight: 400, name:  'Party Goblin'},
        { weight: 90, name: 'Swaggy Songbird' },
        { weight: 10, name: 'DJ Demon' },
    ],

    image: 'rbxassetid://14029637911',
    world: WorldType.Cave
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})

EggsData.set('Shadow', {
    name: 'Shadow',
    price: 25000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 50000, name:  'Shadow Chameleon'},
        { weight: 30000, name:  'Shadow Butterfly'},
        { weight: 15000, name: 'Shadow Ghost' },
        { weight: 5000, name: 'Shadow Star' },
        { weight: 40, name: 'Shadow Owl' },
        { weight: 10, name: 'Shadow Dragon' },
    ],

    productid: 1907118477,

    image: 'http://www.roblox.com/asset/?id=14254306466',
    world: WorldType.Cave
})

EggsData.set('ShadowStored', {
    name: 'ShadowStored',
    price: 1,
    valuetype: EggValueType.Stored,
    petchances: [
        { weight: 50000, name:  'Shadow Chameleon'},
        { weight: 30000, name:  'Shadow Butterfly'},
        { weight: 15000, name: 'Shadow Ghost' },
        { weight: 5000, name: 'Shadow Star' },
        { weight: 40, name: 'Shadow Owl' },
        { weight: 10, name: 'Shadow Dragon' },
    ],

    image: 'http://www.roblox.com/asset/?id=14254306466',
    world: WorldType.Cave
})

/*
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

    image: '1',
    world: WorldType.Cave
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})
*/

/*
EggsData.set('Stone', {
    name: 'Stone',
    price: 5,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 420, name: 'Cat' },
        { weight: 310, name: 'Dog' },
        { weight: 180, name: 'White Bunny' },
        { weight: 90, name: 'Elephant' },
        { weight: 8, name: 'Butterfly' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
})

EggsData.set('Ore', {
    name: 'Ore',
    price: 50,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 440, name: 'Fox'},
        { weight: 310, name: 'Monkey' },
        { weight: 170, name: 'Dragon' },
        { weight: 80, name: 'Raccoon' },
        { weight: 8, name: 'CandyCane Unicorn' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('OreEgg') as IEgg//model,
    rotationOffset: CFrame.Angles(0, 0, 0)
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})

EggsData.set('Rail', {
    name: 'Rail',
    price: 250,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 460, name:  'Cow'},
        { weight: 310, name:  'Pig'},
        { weight: 160, name: 'Fish' },
        { weight: 70, name: 'Crab' },
        { weight: 7, name: 'Peacock' },
    ],
    //model: Workspace.WaitForChild('World1').WaitForChild('RailEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
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
    //model: Workspace.WaitForChild('World1').WaitForChild('DiamondEgg') as IEgg//model,
    
    productidx3: 1782683273,
    productid: 1762884433,
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})
// !World 1 /\

// !World 2 \/
EggsData.set('Pink', {
    name: 'Pink',
    price: 2500,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 460, name:  'Pink Bunny'},
        { weight: 310, name:  'Pink Axolotl'},
        { weight: 160,name: 'Seal' },
        { weight: 70, name: 'Diamond Golem' },
        { weight: 7, name: 'Aqua Dragon' },
    ],
    //model: Workspace.WaitForChild('Pink Egg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
})

EggsData.set('Cat', {
    name: 'Cat',
    price: 10000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 480, name:  'Blue Slime'},
        { weight: 320, name:  'White Bear'},
        { weight: 150, name: 'Gecon' },
        { weight: 50, name: 'Clown Doggy' },
        { weight: 7, name: 'The Clown' },
    ],
    //model: Workspace.WaitForChild('Cat Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(0, 0, 0)
})

EggsData.set('Forcefield', {
    name: 'Forcefield',
    price: 50000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 500, name:  'Polar'},
        { weight: 330, name:  'Red Dragon'},
        { weight: 140, name: 'WizMouse' },
        { weight: 30, name: 'Lily' },
        { weight: 0.6, name: 'Crystal Lord' },
    ],
    //model: Workspace.WaitForChild('Forcefield Egg') as IEgg//model

})

EggsData.set('Rich', {
    name: 'Rich',
    price: 250000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 69, name:  'Sus Cat'},
        { weight: 30, name:  'Ice Cream Dog'},
        { weight: 1, name: 'Cake' },
    ],
    //model: Workspace.WaitForChild('Rich Egg') as IEgg//model
})

// !World 2 /\

// !World 3 \/

EggsData.set('Bear', {
    name: 'Bear',
    price: 500000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 480, name:  'Garden Wraith'},
        { weight: 320, name:  'Capybara'},
        { weight: 140, name: 'Yellow Slime' },
        { weight: 60, name: 'Royal Raven' },
        { weight: 5, name: 'King Ant' },
    ],
    //model: Workspace.WaitForChild('Bear Egg') as IEgg//model
})

EggsData.set('Flower', {
    name: 'Flower',
    price: 2500000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 500, name:  'Mystery Cat'},
        { weight: 330, name:  'Cyber Dominus'},
        { weight: 130, name: 'Cyberpunk Dragon' },
        { weight: 40, name: 'Crow' },
        { weight: 4, name: 'Moon Bird' },
    ],
    //model: Workspace.WaitForChild('Flower Egg') as IEgg//model
})

EggsData.set('Sun', {
    name: 'Sun',
    price: 10000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 520, name:  'Hacked Doggy'},
        { weight: 340, name:  'Alien Bird'},
        { weight: 120, name: 'Alien Dragon' },
        { weight: 20, name: 'Galaxy Doggy' },
        { weight: 3, name: 'Dark Hydra' },
    ],
    //model: Workspace.WaitForChild('Sun Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(0,0,0)
})

EggsData.set('Cursed', {
    name: 'Cursed',
    price: 40000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 750, name:  'Mega Galaxy Doggy'},
        { weight: 250, name:  'Purple Alien Hydra'},
        { weight: 5, name: 'Ultra Alien' },
    ],
    //model: Workspace.WaitForChild('Cursed Egg') as IEgg//model
})

// !World 3 /\

// !World 4 \/

EggsData.set('Entity', {
    name: 'Entity',
    price: 80000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 500, name:  'Devil Golem'},
        { weight: 330, name:  'Darkness Shark'},
        { weight: 120, name: 'Darkness Parrot' },
        { weight: 50, name: 'Darkness Dragon' },
        { weight: 3, name: 'Darkness Steampunk' },
    ],
    
    //model: Workspace.WaitForChild('World4').WaitForChild('Entity Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(-math.rad(90), 0, 0),
    rotationAxis: new Vector3(0, 0, 1)
})

EggsData.set('Confusion', {
    name: 'Confusion',
    price: 400000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 520, name:  'Darkness Flower Power'},
        { weight: 340, name:  'Darkness Horse'},
        { weight: 110, name: 'Darkness Happy Demon' },
        { weight: 30, name: 'Darkness Spider' },
        { weight: 2, name: 'Darkness' },
    ],

    //model: Workspace.WaitForChild('Confusion Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(-math.rad(90), 0, 0),
    rotationAxis: new Vector3(0, 0, 1)
})

EggsData.set('Eyes', {
    name: 'Eyes',
    price: 2000000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 540, name:  'Sinister Pumpkin'},
        { weight: 350, name:  'Darkness Robux'},
        { weight: 100, name: 'Matrix Dog' },
        { weight: 10, name: 'Matrix Kitty' },
        { weight: 1, name: 'Skeletal Samurai' },
    ],

    //model: Workspace.WaitForChild('Eyes Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(-math.rad(90), 0, 0),
    rotationAxis: new Vector3(0, 0, 1)
})

EggsData.set('Observer', {
    name: 'Observer',
    price: 8000000000,
    valuetype: EggValueType.Gems,
    petchances: [
        { weight: 790, name:  'Skeletal Demon'},
        { weight: 210, name:  'Pink Fury'},
        { weight: 1, name: 'Darkness Alien' },
    ],

    //model: Workspace.WaitForChild('Observer Egg') as IEgg//model,
    rotationOffset: CFrame.Angles(-math.rad(90), 0, 0),
    rotationAxis: new Vector3(0, 0, 1)
})

// !World 4 /\

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
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
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
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
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
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
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
    ////model: Workspace.WaitForChild('World1').WaitForChild('StoneEgg') as IEgg//model
    ////model: Workspace.WaitForChild('TestEgg') as IEgg//model
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