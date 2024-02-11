import { IMultipliers } from "./SessionData"

export interface IPetData {

    name: string
    model: Model

    locked: boolean,
    multipliers: Map<keyof IMultipliers, number>

    stats: {
        rarity: Rarities
        sizeOffset: Vector3,
        rotationOffset: CFrame,
    }

    additional: IDBPetData['additional']

}

export interface IDBPetData {
    name: string,
    locked: boolean,
    additional: {
        size: Sizes
        evolution: Evolutions
        limit?: number
        perks?: Array<string>
    }
}

export enum Rarities {
    Common = 'Common'
}

export enum Sizes {
    Normal = 'Normal',
    Huge = 'Huge',
}

export enum Evolutions {
    Normal = 'Normal',
    Gold = 'Gold',
    Void = 'Void',
}

export enum PetOperationStatus {
    Equip = 'Equip',
    Unequip = 'Unequip',
}

//'Cat|Huge|Void|56'