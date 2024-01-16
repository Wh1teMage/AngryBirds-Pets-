import { IMultipliers } from "./SessionData"

export interface IPetData {

    name: string
    model: Model

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
    additional: {
        size: Sizes
        void?: boolean
        limit?: number
    }
}

export enum Rarities {
    Common = 'Common'
}

export enum Sizes {
    Normal = 'Normal',
    Huge = 'Huge',
}

export enum PetOperationStatus {
    Equip = 'Equip',
    Unequip = 'Unequip',
}

//'Cat|Huge|Void|56'