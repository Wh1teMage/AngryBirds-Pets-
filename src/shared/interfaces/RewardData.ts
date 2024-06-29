import { PotionType } from "shared/enums/PotionEnum"
import { IDBPetData } from "./PetData"
import { WorldType } from "shared/enums/WorldEnums"
import { EggBuyType, EggValueType } from "./EggData"

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
    Relics?: Array<{name: string, level: number, amount: number}>
    Eggs?: Array<{egg: string, amount: number, type: EggBuyType}>
    Additional?: Map<string, any>
    Chances?: Array<{weight: number, name: string, reward: IRewardData}>
    Title?: string
    
    Time?: number
    World?: WorldType
    ProductId?: number
}