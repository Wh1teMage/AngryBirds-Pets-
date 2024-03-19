import { IDBPetData, IPetData } from "./PetData"

export enum EggValueType {
    VBugs = 'VBugs',
    Wins = 'Wins',
    Stored = 'Stored',
}

export enum EggBuyType {
    Single = 'Single',
    Triple = 'Triple',
}

export interface IEggData {
    name: string
    price: number
    valuetype: EggValueType
    petchances: {weight: number, name?: string}[]//Map<string, number>

    productid?: number
    model?: IEggModel
    exceptions?: Map<string, IDBPetData>
}

export interface IEggModel extends Model {
    Platform: Part & {
        BillboardGui: BillboardGui & {
            Main: Frame & {
                Pets: Frame
                Price: TextLabel
                Buy: TextButton
            }
        }
    }
    // add gui, etc
}

// johan & johny