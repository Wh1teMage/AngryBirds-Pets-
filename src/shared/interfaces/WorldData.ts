import { IMultipliers } from "./SessionData"
import { ISlideData } from "./SlideData"

export interface IWorldData {
    hitbox: Part
    teleportPart: Part

    //shop: Array<string>
    //shopName: string
    worldIcon: string
    slide: ISlideData
    blockingWall?: Part
    
    multipliers: Map<keyof IMultipliers, number>
    weight: number // to detect max world
    price: number

    //nextWorldTeleport?: Part
    //previousWorldTeleport?: Part
}

export enum WorldOperationStatus {
    Buy = 'Buy',
    BuyAll = 'BuyAll',
    Teleport = 'Teleport', //maybe make this one client sided
}