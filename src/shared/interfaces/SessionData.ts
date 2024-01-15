import { WorldType } from "shared/enums/WorldEnums"
import { IDBPetData, IPetData } from "./PetData"
import { ITradeObj } from "./TradeData"

export interface ICharacter extends Model {
    PrimaryPart: Part,
    Humanoid: Humanoid,
}

export interface ISessionData {
    character?: ICharacter
    activeTrade?: ITradeObj
    currentWorld: WorldType
    sessionTime: number

    multipliers: {
        strength: number
        wins: number
        stars: number
        rebirths: number
        luck: number
    }

}

export const SessionData: ISessionData = {
    character: undefined,
    activeTrade: undefined,
    currentWorld: WorldType.Default,
    sessionTime: 0,

    multipliers: {
        strength: 1,
        wins: 1,
        stars: 1,
        rebirths: 1,
        luck: 1,
    }
}