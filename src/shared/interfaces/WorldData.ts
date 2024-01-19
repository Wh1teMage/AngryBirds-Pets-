import { IMultipliers } from "./SessionData"

export interface IWorldData {
    hitbox: Part
    teleportPart: Part
    shop: Array<string>
    multipliers: Map<keyof IMultipliers, number>
    weight: number // to detect max world
    price: number
}

export enum WorldOperationStatus {
    Buy   = 'Buy'
}