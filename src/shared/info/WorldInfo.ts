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
})

WorldsData.set(WorldType.Desert, {
    hitbox: game.Workspace.WaitForChild('Part2') as Part,
    teleportPart: game.Workspace.WaitForChild('Part2') as Part,
    shop: ['asdfgh'],
    multipliers: new Map([['strength', 1.5]]),
    weight: 2,
    price: -1,
})