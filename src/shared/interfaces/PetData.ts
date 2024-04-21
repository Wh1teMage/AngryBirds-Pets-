import { IMultipliers } from "./SessionData"

export interface IPetData {

    name: string
    model: Model

    locked: boolean,
    equipped: boolean,
    multipliers: Map<keyof IMultipliers, number>

    stats: {
        rarity: Rarities
        sizeOffset: Vector3,
        rotationOffset: CFrame,
    }

    additional: IDBPetData['additional'],
}

export interface IDBPetData {
    name: string,
    locked: boolean,
    equipped: boolean,
    additional: {
        size: Sizes
        evolution: Evolutions
        mutation: Mutations
        limit?: number
        perks?: Array<string>
    },
}

export enum Rarities {
    Common = 'Common',
    Uncommon = 'Uncommon',
    Rare = 'Rare',
    Epic = 'Epic',
    Legendary = 'Legendary',
    Mythic = 'Mythic',
    Secret = 'Secret',
    Exclusive = 'Exclusive',
    Limited = 'Limited',
}

export enum Sizes {
    Baby = 'Baby',
    Big = 'Big',
    Huge = 'Huge',
}

export enum Evolutions {
    Normal = 'Normal',
    Gold = 'Gold',
    Void = 'Void',
}

export enum Mutations {
    Default = 'Default',
    Primordial = 'Primordial',
    Majestic = 'Majestic',
    Elder = 'Elder',
    Sacred = 'Sacred',
}

export enum PetOperationStatus {
    Equip = 'Equip',
    Unequip = 'Unequip',
    Lock = 'Lock',
    Delete = 'Delete',
    CraftSize = 'CraftSize',
    Evolve = 'Evolve',
    Mutate = 'Mutate',
    SkipVoid = 'SkipVoid',
    ClaimVoid = 'ClaimVoid',
    RemoveMutation = 'RemoveMutation',

    MultiDelete = 'MultiDelete',
    MultiLock = 'MultiLock',
    MultiUnlock = 'MultiUnlock',
    EquipBest = 'EquipBest',
    UnequipAll = 'UnequipAll',
    CraftAll = 'CraftAll',
    SessionAutoDelete = 'SessionAutoDelete',
}

//'Cat|Huge|Void|56'