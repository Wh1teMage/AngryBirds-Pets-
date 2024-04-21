import { IMultipliers } from "./SessionData"

export interface IWorldData {
    hitbox: Part
    teleportPart: Part
    slingshotPart: Part

    shop: Array<string>
    shopName: string
    worldIcon: string
    
    multipliers: Map<keyof IMultipliers, number>
    weight: number // to detect max world
    price: number

    maxClicks: number
    reward: number
    starsReward: number

    gravity: number
    density: number

    startingPosition: Vector3
    endingPosition: Vector3

    minY: number
    angle: number
    energyLoss: number

    maxPower: number
}

export enum WorldOperationStatus {
    Buy = 'Buy',
    BuyAll = 'BuyAll',
    Teleport = 'Teleport', //maybe make this one client sided
}