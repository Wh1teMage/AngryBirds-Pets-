import { ReplicatedStorage } from "@rbxts/services";
import { WorldType } from "shared/enums/WorldEnums";
import { IWorldData } from "shared/interfaces/WorldData";
import { SlidesData } from "./SlideInfo";

export const WorldsData = new Map<WorldType, IWorldData>()

let instaReplica = game.Workspace.WaitForChild('InstaReplica')

WorldsData.set(WorldType.Cave, {
    hitbox: instaReplica.WaitForChild('Part1') as Part,
    teleportPart: instaReplica.WaitForChild('Part4') as Part,

    //shop: ['ToolF1'],
    //shopName: 'World1',
    worldIcon: 'rbxassetid://16290423194',
    blockingWall: instaReplica.WaitForChild('TelProx1') as Part,

    multipliers: new Map([['strength', 1]]),
    weight: 1,
    price: 0,

    //nextWorldTeleport: instaReplica.WaitForChild('TelProx1') as Part,
    slide: SlidesData.get('Slide1')!,
})

WorldsData.set(WorldType.NeonCity, {
    hitbox: instaReplica.WaitForChild('Part2') as Part,
    teleportPart: instaReplica.WaitForChild('CyberPart') as Part,

    //shop: ['ToolF1'], 
    //shopName: 'World2',
    worldIcon: 'rbxassetid://16526402587',
    blockingWall: instaReplica.WaitForChild('TelProx1') as Part,

    multipliers: new Map([['strength', 1]]),
    weight: 2,
    price: 25,

    //previousWorldTeleport: instaReplica.WaitForChild('TelProx2') as Part,
    //nextWorldTeleport: instaReplica.WaitForChild('TelProx3') as Part,
    slide: SlidesData.get('Slide1')!,
})

WorldsData.set(WorldType.Backrooms, {
    hitbox: instaReplica.WaitForChild('FuturePart') as Part,
    teleportPart: instaReplica.WaitForChild('Part5') as Part,

    //shop: ['ToolF1'], 
    //shopName: 'World2',
    worldIcon: 'rbxassetid://16526402587',
    blockingWall: instaReplica.WaitForChild('TelProx1') as Part,

    multipliers: new Map([['strength', 1]]),
    weight: 3,
    price: 200,

    //previousWorldTeleport: instaReplica.WaitForChild('TelProx4') as Part,
    slide: SlidesData.get('Slide1')!,
})
/*
WorldsData.set(WorldType.Space, {
    hitbox: instaReplica.WaitForChild('Part3') as Part,
    teleportPart: instaReplica.WaitForChild('ZVpart') as Part,
    slingshotPart: game.Workspace.WaitForChild('World3').WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W3', 'Slingshot2W3', 'Slingshot3W3', 'Slingshot4W3', 'Slingshot5W3', 'Slingshot6W3', 'SlingshotD1W3'],
    shopName: 'World3',
    worldIcon: 'rbxassetid://16526412141',
    
    multipliers: new Map([['strength', 1.05], ['wins', 1.05]]),
    weight: 3,
    price: 10000,

    maxClicks: 100,
    reward: 2800000/2,
    starsReward: 1000,

    gravity: 10,
    density: 100818181*2,
    
    startingPosition: new Vector3(-1550.3, 633, 7517.118),
    endingPosition: new Vector3(-1549.756, 626, 3400.771),

    minY: 626,
    angle: 10,
    energyLoss: 70,
    lapEnergyLoss: 50,

    maxPower: 4*10**9*5*10000,
})

WorldsData.set(WorldType.Backrooms, {
    hitbox: instaReplica.WaitForChild('BackroomsPart') as Part,
    teleportPart: instaReplica.WaitForChild('BackroomsTPPart') as Part,
    slingshotPart: game.Workspace.WaitForChild('World4').WaitForChild('Slingshot').WaitForChild('Main') as Part,
    shop: ['Slingshot1W4', 'Slingshot2W4', 'Slingshot3W4', 'Slingshot4W4', 'Slingshot5W4', 'Slingshot6W4', 'SlingshotD1W4'],
    shopName: 'World4',
    worldIcon: 'rbxassetid://17793386718',
    
    multipliers: new Map([['strength', 1], ['wins', 1]]),
    weight: 4,
    price: 100000,

    maxClicks: 100,
    reward: 125000000*1.15,
    starsReward: 10000,

    gravity: 10,
    density: 100818181*10000/3,
    
    startingPosition: new Vector3(9102, -1317, 833),
    endingPosition: new Vector3(9102, -1317, -3136),

    minY: -1323,
    angle: 10,
    energyLoss: 70,
    lapEnergyLoss: 50,

    maxPower: 4*10**9*5*100000000000000000000000,
})
*/