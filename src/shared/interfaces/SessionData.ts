import { WorldType } from "shared/enums/WorldEnums"
import { ITradeObj } from "./TradeData"
import { IPassiveData } from "./PassiveData"

export interface ICharacter extends Model {
    PrimaryPart: Part,
    Humanoid: Humanoid,
}

export interface ISessionData {
    character?: ICharacter
    activeTrade?: ITradeObj
    currentWorld: WorldType
    sessionTime: number

    claimedRewards: Array<number>
    activePassives: Array<IPassiveData>

    multipliers: {
        other: IMultipliers
        pet: IMultipliers
        world: IMultipliers
        potion: IMultipliers
    }

    //potionmultipliers: IMultipliers
    //petmultipliers: IMultipliers
    //worldmultipliers: IMultipliers
}

export interface IMultipliers {
    strength: number
    wins: number
    stars: number
    rebirths: number
    luck: number
    product: number
    attackspeed: number
}

export const DefaultMultipliers: IMultipliers = {
    strength: 1,
    wins: 1,
    stars: 1,
    rebirths: 1,
    luck: 1,
    product: 1,
    attackspeed: 1,
}

export const SessionData: ISessionData = {
    character: undefined,
    activeTrade: undefined,
    currentWorld: WorldType.Default,
    sessionTime: 0,

    claimedRewards: [],
    activePassives: [],

    multipliers: {
        other: table.clone(DefaultMultipliers),
        pet: table.clone(DefaultMultipliers),
        world: table.clone(DefaultMultipliers),
        potion: table.clone(DefaultMultipliers),
    }

    //potionmultipliers: table.clone(DefaultMultipliers),
    //petmultipliers: table.clone(DefaultMultipliers),
    //worldmultipliers: table.clone(DefaultMultipliers),
}