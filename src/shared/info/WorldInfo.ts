import { WorldType } from "shared/enums/WorldEnums";
import { IWorldData } from "shared/interfaces/WorldData";

export const WorldsData = new Map<WorldType, IWorldData>()

WorldsData.set(WorldType.Default, {
    hitbox: game.Workspace.WaitForChild('TestPart') as Part,
    shop: [],
    multipliers: new Map([['strength', 1]]),
    weight: 1,
})