import { WorldType } from "shared/enums/WorldEnums"
import { IMultipliers } from "./SessionData"

export interface ISpecialLocation {
    hitbox: Part
    multipliers: Map<keyof IMultipliers, number>
    requirements?: Map<string, number>
    world: WorldType,
    gui?: BillboardGui
}
