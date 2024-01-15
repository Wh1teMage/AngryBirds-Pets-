import { WorldType } from "shared/enums/WorldEnums"
import { IDBPetData } from "./PetData"
import { PotionType } from "shared/enums/PotionEnum"

export interface IProfileData {
    Values: {
        Strength: number
        Wins: number
        Stars: number
        Rebirths: number
    }

    StatValues: {
        DayAmount: number
        IngameTime: number
        RobuxSpent: number
    }

    Multipliers: {
        Strength: number
        Wins: number
        Stars: number
        Rebirths: number
    }

    Config: {
        Luck: number
        MaxPets: number
        MaxEquippedPets: number
        MaxWorld: WorldType
    }

    ActiveBuffs: Array<{name: string, endTime: number, source: string}>
    Potions: Array<{potion: PotionType, amount: number}>

    Abilities: Array<string>
    Pets: Array<IDBPetData>
    EquippedPets: Array<IDBPetData>
    Products: Array<string>
    
    CONSTANTS: {
        VERSION: number
        name: string,
    }
}

export interface IOrderedData {
    coins: number
}

export interface IOrderedDataService {
    datastore?: OrderedDataStore, 
    name: string, 
    maxCount: number, 
    values: {key: string, value: unknown}[]
}