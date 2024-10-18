import { ReplicatedStorage } from "@rbxts/services";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData"

export const ToolsData = new Map<string, IToolData>()


ToolsData.set('ToolF1', {
    //model: ReplicatedStorage.WaitForChild('Tools').WaitForChild('BasicKatana1') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,0),

    name: 'Common',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 0,
    valuetype: ToolValueType.Strength,
    weight: 1,
})