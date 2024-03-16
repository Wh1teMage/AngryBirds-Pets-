import { ReplicatedStorage } from "@rbxts/services";
import { WorldType } from "shared/enums/WorldEnums";
import { IWorldData } from "shared/interfaces/WorldData";

export const WorldsData = new Map<WorldType, IWorldData>()

WorldsData.set(WorldType.Default, {
    hitbox: game.Workspace.WaitForChild('Part1') as Part,
    teleportPart: game.Workspace.WaitForChild('Part') as Part,
    slingshotPart: game.Workspace.WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W1', 'Slingshot2W1', 'Slingshot3W1', 'Slingshot4W1', 'Slingshot5W1', 'SlingshotD1W1'],
    shopName: 'World1',
    multipliers: new Map([['strength', 1]]),
    weight: 1,
    price: 1,

    maxClicks: 100,
    reward: 100,
    length: 729,

    gravity: 10*5,
    density: 10*5,
    shootPosition: new Vector3(-5, 40, 349)
})

WorldsData.set(WorldType.Cyber, {
    hitbox: game.Workspace.WaitForChild('Part2') as Part,
    teleportPart: game.Workspace.WaitForChild('Part2') as Part,
    slingshotPart: game.Workspace.WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W2', 'Slingshot2W2', 'Slingshot3W2', 'Slingshot4W2', 'Slingshot5W2', 'Slingshot6W2', 'SlingshotD1W2'], //['я четырнадцати летняя проститутка из Никгура'],
    shopName: 'World2',
    multipliers: new Map([['strength', 1.5]]),
    weight: 2,
    price: 100,

    maxClicks: 100,
    reward: 1000,
    length: 729,

    gravity: 10*15,
    density: 10*15,
    shootPosition: new Vector3(-5, 40, 349)
})

WorldsData.set(WorldType.Space, {
    hitbox: game.Workspace.WaitForChild('Part3') as Part,
    teleportPart: game.Workspace.WaitForChild('Part3') as Part,
    slingshotPart: game.Workspace.WaitForChild('Slingshot').WaitForChild('Part') as Part,
    shop: ['Slingshot1W3', 'Slingshot2W3', 'Slingshot3W3', 'Slingshot4W3', 'Slingshot5W3', 'Slingshot6W3', 'SlingshotD1W3'],
    shopName: 'World3',
    multipliers: new Map([['strength', 1.5]]),
    weight: 3,
    price: 200,

    maxClicks: 100,
    reward: 1000,
    length: 729,

    gravity: 10*15,
    density: 10*15,
    shootPosition: new Vector3(-5, 40, 349)
})