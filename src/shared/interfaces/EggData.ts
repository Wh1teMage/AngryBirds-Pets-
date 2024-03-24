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
    Floor: Part & {
        EggPrice: Attachment & {
            BillboardGui: BillboardGui & {
                Frame: Frame & {
                    Price: TextLabel
                }
            }
        }
        EggUI: Attachment & {
            BillboardGui: BillboardGui & {
                EggFrame: ImageLabel & {
                    Passes: Frame
                    Pets: Frame
                    Wins: ImageLabel
                    EggName: TextLabel
                    Buttons: Frame & {
                        E: ImageButton
                        R: ImageButton
                        T: ImageButton
                    }
                }
            }
        }
        SurfaceGui: SurfaceGui
        Examples: Folder & {
            PetExample: ImageButton & {
                PetName: TextLabel
                Percent: TextLabel
                ViewportFrame: ViewportFrame
            }
        }
    }
    // add gui, etc
}

// johan & johny