import { ReplicatedStorage } from "@rbxts/services";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData"

export const ToolsData = new Map<string, IToolData>()

// World 1
ToolsData.set('Slingshot1W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default1',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default2',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default3',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default4',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default5',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default6',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})

// World 2
ToolsData.set('Slingshot1W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default1',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default2',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default3',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default4',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default5',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot6W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Mythical') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default5',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default6',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})


// World 3
ToolsData.set('Slingshot1W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default1',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default2',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default3',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default4',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default5',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot6W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Mythical') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default5',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: -1,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: new CFrame(0,0,0),

    name: 'Default6',
    addition: 1,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})