import { WorldType } from "shared/enums/WorldEnums";
import { IWorldData } from "shared/interfaces/WorldData";

export const WorldsData = new Map<WorldType, IWorldData>()

WorldsData.set(WorldType.Default, {
    hitbox: game.Workspace.WaitForChild('Part1') as Part,
    teleportPart: game.Workspace.WaitForChild('Part') as Part,
    shop: ['я четырнадцати летняя проститутка из Никгура'],
    multipliers: new Map([['strength', 1]]),
    weight: 1,
    price: 1,

    reward: 100,
    length: 1000,

    gravity: 200,
    density: 100,
    shootPosition: new Vector3(0,7,0)
})

WorldsData.set(WorldType.Desert, {
    hitbox: game.Workspace.WaitForChild('Part2') as Part,
    teleportPart: game.Workspace.WaitForChild('Part2') as Part,
    shop: ['asdfgh'],
    multipliers: new Map([['strength', 1.5]]),
    weight: 2,
    price: -1,

    reward: 1000,
    length: 100,

    gravity: 500,
    density: 500,
    shootPosition: new Vector3(0,7,0)
})