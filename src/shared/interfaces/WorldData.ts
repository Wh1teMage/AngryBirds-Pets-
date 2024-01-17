import { IMultipliers } from "./SessionData"

export interface IWorldData {
    hitbox: Part
    shop: Array<string>
    multipliers: Map<keyof IMultipliers, number>
    weight: number // to detect max world
    price: number
}