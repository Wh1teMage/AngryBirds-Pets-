import { ReplicatedStorage } from "@rbxts/services";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData"

export const ToolsData = new Map<string, IToolData>()

// World 1
ToolsData.set('Slingshot1W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default1',
    addition: 2,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 0,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default2',
    addition: 3,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 600,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default3',
    addition: 5,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 3000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default4',
    addition: 8,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 10000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default5',
    addition: 12,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 20000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W1', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World1').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default6',
    addition: 50,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})

// ! World 2
ToolsData.set('Slingshot1W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default1',
    addition: 18,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 0,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default2',
    addition: 27,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 150000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default3',
    addition: 40,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 400000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default4',
    addition: 60,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 1200000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default5',
    addition: 90,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 4000000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot6W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Mythical') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'я четырнадцати летняя проститутка из Никгура',
    addition: 140,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 12000000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W2', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World2').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default6',
    addition: 550,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})


// !World 3
ToolsData.set('Slingshot1W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Common') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default1',
    addition: 200,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 0,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot2W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Uncommon') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default2',
    addition: 300,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 50000000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot3W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Rare') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default3',
    addition: 450,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 200000000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot4W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Epic') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default4',
    addition: 650,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 700000000,
    valuetype: ToolValueType.Strength
})


ToolsData.set('Slingshot5W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Legendary') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default5',
    addition: 950,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 3000000000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('Slingshot6W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Mythical') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'я четырнадцати летняя проститутка из Никгура',
    addition: 1400,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 10000000000,
    valuetype: ToolValueType.Strength
})

ToolsData.set('SlingshotD1W3', {
    model: ReplicatedStorage.WaitForChild('Slingshots').WaitForChild('World3').WaitForChild('Paid') as Model,
    sizeOffset: new Vector3(0,0,0),
    rotationOffset: CFrame.Angles(0,0,math.rad(90)),

    name: 'Default6',
    addition: 5500,
    firerate: 1/1,
    effectname: 'Shoot',

    price: 100,
    valuetype: ToolValueType.VBugs,
    productid: 123
})