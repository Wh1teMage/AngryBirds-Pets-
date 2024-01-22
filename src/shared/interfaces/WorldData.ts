import { IMultipliers } from "./SessionData"

export interface IWorldData {
    hitbox: Part
    teleportPart: Part
    shop: Array<string>
    multipliers: Map<keyof IMultipliers, number>
    weight: number // to detect max world
    price: number

    reward: number,
    length: number,

    gravity: number,
    density: number,
    shootPosition: Vector3
}

export enum WorldOperationStatus {
    Buy   = 'Buy'
}