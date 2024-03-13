
export enum ToolValueType {
    VBugs    = 'VBugs',
    Strength = 'Strength',
}

export interface IToolData {
    model:          Model
    sizeOffset:     Vector3
    rotationOffset: CFrame

    name:       string
    addition:   number
    firerate:   number
    effectname: string

    price:      number
    valuetype:  ToolValueType
    productid?: number
}

export enum ToolOperationStatus {
    Equip = 'Equip',
    Buy   = 'Buy',
    Use   = 'Use',
}