import { ReplicatedStorage } from "@rbxts/services";
import { WorldType } from "shared/enums/WorldEnums";
import { IWorldData } from "shared/interfaces/WorldData";

export const WorldsData = new Map<WorldType, IWorldData>()

let instaReplica = game.Workspace.WaitForChild('InstaReplica')

WorldsData.set(WorldType.Cave, {
    hitbox: instaReplica.WaitForChild('Part1') as Part,
    teleportPart: instaReplica.WaitForChild('Part4') as Part,
    slingshotPart: game.Workspace.WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W1', 'Slingshot2W1', 'Slingshot3W1', 'Slingshot4W1', 'Slingshot5W1', 'SlingshotD1W1'],
    shopName: 'World1',
    worldIcon: 'rbxassetid://16290423194',

    multipliers: new Map([['strength', 1]]),
    weight: 1,
    price: 1,

    maxClicks: 100,
    reward: 250,
    starsReward: 10,

    gravity: 10,
    density: 435, //250

    startingPosition: new Vector3(-5, 40, 314.3),
    endingPosition: new Vector3(0, 28, -3733),

    minY: 30,
    angle: 10,
    energyLoss: 70,

    maxPower: 80000*15,
})

WorldsData.set(WorldType.NeonCity, {
    hitbox: instaReplica.WaitForChild('Part2') as Part,
    teleportPart: instaReplica.WaitForChild('CyberPart') as Part,
    slingshotPart: game.Workspace.WaitForChild('World2').WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W2', 'Slingshot2W2', 'Slingshot3W2', 'Slingshot4W2', 'Slingshot5W2', 'Slingshot6W2', 'SlingshotD1W2'], //['я четырнадцати летняя проститутка из Никгура'],
    shopName: 'World2',
    worldIcon: 'rbxassetid://16290423194',

    multipliers: new Map([['strength', 1]]),
    weight: 2,
    price: 100,

    maxClicks: 100,
    reward: 28000,
    starsReward: 10,

    gravity: 10,
    density: 190907,

    startingPosition: new Vector3(-3469.713, -115.327, 1036.427),
    endingPosition: new Vector3(-3470.269, -130, -3060.84),

    minY: -130,
    angle: 10,
    energyLoss: 70,

    maxPower: 35000000*15,
})

WorldsData.set(WorldType.Space, {
    hitbox: instaReplica.WaitForChild('Part3') as Part,
    teleportPart: instaReplica.WaitForChild('ZVpart') as Part,
    slingshotPart: game.Workspace.WaitForChild('World3').WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W3', 'Slingshot2W3', 'Slingshot3W3', 'Slingshot4W3', 'Slingshot5W3', 'Slingshot6W3', 'SlingshotD1W3'],
    shopName: 'World3',
    worldIcon: 'rbxassetid://16290423194',
    
    multipliers: new Map([['strength', 1]]),
    weight: 3,
    price: 200,

    maxClicks: 100,
    reward: 2800000,
    starsReward: 10,

    gravity: 10,
    density: 100818181,
    
    startingPosition: new Vector3(-1550.3, 633, 7517.118),
    endingPosition: new Vector3(-1549.756, 626, 3400.771),

    minY: 626,
    angle: 10,
    energyLoss: 70,

    maxPower: 4*10**9*5,
})