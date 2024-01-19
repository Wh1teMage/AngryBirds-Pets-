import { PotionType } from "shared/enums/PotionEnum"
import { IDBPetData } from "./PetData"

export interface IRewardData {
    Values?: {
        Strength?: number
        Wins?: number
        Stars?: number
        Rebirths?: number
    }
    Pets?: Array<{pet: IDBPetData, amount: number}>
    Potions?: Array<{potion: PotionType, amount: number}>
    Time: number
}