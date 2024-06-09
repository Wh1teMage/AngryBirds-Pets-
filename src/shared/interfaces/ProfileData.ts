import { WorldType } from "shared/enums/WorldEnums"
import { IDBPetData } from "./PetData"
import { PotionType } from "shared/enums/PotionEnum"

export interface IProfileData {
    Values: {
        StrengthVal: number
        WinsVal: number
        StarsVal: number
        RebirthsVal: number
        GemsVal: number
    }

    MaxValues: {
        StrengthMaxVal: number
        WinsMaxVal: number
        StarsMaxVal: number
        RebirthsMaxVal: number
        GemsMaxVal: number
    }

    StatValues: {
        FirstJoin: number
        LastJoined: number
        LastSpinTime: number

        LastDayTime: number
        LastDailyChestTime: number
        LastGroupChestTime: number

        DayAmount: number
        IngameTime: number
        RobuxSpent: number

        SpinCount: number
        RebirthSkips: number
        FriendsCount: number
        //EquippedPetsCount: number
        
        WasShooting: boolean
        WasTraining: boolean
        WasRebirthing: boolean

        Favorited: boolean
    }

    Multipliers: {
        StrengthMul: number
        GemsMul: number
        WinsMul: number
        StarsMul: number
        RebirthsMul: number
        HatchSpeedMul: number
        VoidMachineMul: number
    }

    Config: {
        Luck: number
        MaxPets: number
        MaxEquippedPets: number
        MaxPetsInVoidMachine: number
        MaxEquippedRelics: number
        MaxWorld: WorldType
        RebirthTitle: string
    }

    CompletedQuests: Array<string>
    Badges: Array<string>
    CurrentQuestsProgress: Map<string, Map<string, any>>

    ActiveBuffs: Array<{name: string, endTime: number, startTime: number, source: string}>
    Potions: Array<{potion: PotionType, amount: number}>

    Abilities: Array<string>
    Pets: Array<IDBPetData>
    Products: Array<string>

    PetIndex: Array<string>
    
    OwnedTools: Array<string>
    EquippedTool: string

    VoidMachine: Array<{pet: IDBPetData, endTime: number, startTime: number}>
    RedeemedCodes: Array<string>

    StoredEggs: Array<{name: string, amount: number}>

    Relics: Array<{name: string, level: number, amount: number}>
    EquippedRelics: Array<{name: string, level: number}>
    
    CONSTANTS: {
        VERSION: number
        name: string,
    }
}

export interface IOrderedData {
    StrengthVal: number
    WinsVal: number
    IngameTime: number
    RobuxSpent: number
    RebirthsVal: number
}

export interface IOrderedDataService {
    datastore?: OrderedDataStore, 
    name: string, 
    maxCount: number, 
    values: {key: string, value: unknown}[]
}