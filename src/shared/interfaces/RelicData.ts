import { Rarities } from "./PetData"
import { IRewardData } from "./RewardData"

export interface IRelicData {
    stats: Map<string, number>
    desc: string
    rarity: Rarities
}

export enum RelicCaseType {
    VBugs = 'VBugs',
    Gems = 'Gems',
    Stored = 'Stored',
}

export interface IRelicCaseData {
    name: string,
    description: string,

    price: number
    valuetype: RelicCaseType

    reward: IRewardData
    part?: BasePart

    //relicchances: {weight: number, name?: string}[]//Map<string, number>
}