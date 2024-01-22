import { WorldType } from "shared/enums/WorldEnums"
import { IDBPetData } from "./PetData"
import { PotionType } from "shared/enums/PotionEnum"

export interface IProfileData {
    Values: {
        StrengthVal: number
        WinsVal: number
        StarsVal: number
        RebirthsVal: number
    }

    StatValues: {
        FirstJoin: number
        LastJoined: number
        LastDayTime: number

        DayAmount: number
        IngameTime: number
        RobuxSpent: number
    }

    Multipliers: {
        StrengthMul: number
        WinsMul: number
        StarsMul: number
        RebirthsMul: number
        VoidMachineMul: number
    }

    Config: {
        Luck: number
        MaxPets: number
        MaxEquippedPets: number
        MaxPetsInVoidMachine: number
        MaxWorld: WorldType
    }

    ActiveBuffs: Array<{name: string, endTime: number, startTime: number, source: string}>
    Potions: Array<{potion: PotionType, amount: number}>

    Abilities: Array<string>
    Pets: Array<IDBPetData>
    EquippedPets: Array<IDBPetData>
    Products: Array<string>

    PetIndex: Array<string>
    
    OwnedTools: Array<string>
    EquippedTool: string

    VoidMachine: Array<{pet: IDBPetData, endTime: number, startTime: number}>
    RedeemedCodes: Array<string>

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