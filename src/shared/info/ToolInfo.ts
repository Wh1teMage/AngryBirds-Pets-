import { IToolData, ToolValueType } from "shared/interfaces/ToolData"

export const ToolsData = new Map<string, IToolData>()

ToolsData.set('Default', {
    model: game.Workspace.WaitForChild('Enot') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Default2', {
    model: game.Workspace.WaitForChild('Enot') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default2',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})

ToolsData.set('Default3', {
    model: game.Workspace.WaitForChild('Enot') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default3',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})