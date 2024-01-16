import { IToolData, ToolValueType } from "shared/interfaces/ToolData"

export const ToolsData = new Map<string, IToolData>()

ToolsData.set('Default', {
    model: game.Workspace.WaitForChild('Enot') as Model,

    name: 'Default',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Default2', {
    model: game.Workspace.WaitForChild('Enot') as Model,

    name: 'Default2',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})