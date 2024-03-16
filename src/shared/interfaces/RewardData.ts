import { PotionType } from "shared/enums/PotionEnum"
import { IDBPetData } from "./PetData"
import { WorldType } from "shared/enums/WorldEnums"

export interface IRewardData {
    Values?: {
        Strength?: number
        Wins?: number
        Stars?: number
        Rebirths?: number
        Gems?: number
    }
    Pets?: Array<{pet: IDBPetData, amount: number}>
    Potions?: Array<{potion: PotionType, amount: number}>
    Additional?: Array<{data: any, amount: number}>
    Title?: string
    
    Time?: number
    World?: WorldType
    ProductId?: number
}