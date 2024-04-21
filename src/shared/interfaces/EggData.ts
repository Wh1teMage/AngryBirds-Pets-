import { IDBPetData, IPetData } from "./PetData"

export enum EggValueType {
    VBugs = 'VBugs',
    Wins = 'Wins',
    Stored = 'Stored',
}

export enum EggBuyType {
    Single = 'Single',
    Triple = 'Triple',
    Ten = 'Ten',
    Auto = 'Auto',
}

export interface IEggData {
    name: string
    price: number
    valuetype: EggValueType
    petchances: {weight: number, name?: string}[]//Map<string, number>

    productid?: number
    productidx3?: number

    model?: IEggModel
    exceptions?: Map<string, IDBPetData>

    rotationOffset?: CFrame
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
                Frame: ImageLabel & {
                    Passes: Frame & {
                        Luck: ImageButton & { Lock: ImageLabel }
                        Luck2: ImageButton & { Lock: ImageLabel }
                        Luck3: ImageButton & { Lock: ImageLabel }
                    }

                    x3Open: ImageButton

                    EggFrame: ImageLabel & {
                        Pets: Frame
                        Wins: ImageLabel & {
                            Value: TextLabel
                        }
                        EggName: TextLabel
                        Buttons: Frame & {
                            E: ImageButton
                            R: ImageButton
                            T: ImageButton
                        }
                    }
                }
            }
        }
        SurfaceGui: SurfaceGui
        /*Examples: Folder & {
            PetExample: ImageButton & {
                PetName: TextLabel
                Percent: TextLabel
                ViewportFrame: ViewportFrame
            }
        }*/
    }
    // add gui, etc
}

// johan & johny