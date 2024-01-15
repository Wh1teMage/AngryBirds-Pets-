import { Workspace } from "@rbxts/services";
import { EggValueType, IEggData, IEggModel } from "shared/interfaces/EggData";

export const EggsData = new Map<string, IEggData>()

type Chances = Array< {chance: number, name: string} >

let transferPercantages = (chances: Chances) => {
    let form: IEggData['petchances'] = []
    let maxNum = 10**100
    let freeWeight = maxNum
    chances.forEach((v) => {
        let weight = maxNum*(v.chance/100)
        form.push({ weight: weight, name: v.name })
        freeWeight -= weight
    })
    form.push({ weight: math.round(freeWeight) })
    print(form)
    return form
}

EggsData.set('Default', {
    name: 'Default',
    price: 100,
    valuetype: EggValueType.Wins,
    petchances: transferPercantages([
        { chance: 1/10**12, name: 'Cat'},
        { chance: .63, name: 'Cat'},
        { chance: 30, name: 'Cat'},
        { chance: 15, name: 'Cat'},
    ]),
    model: Workspace.WaitForChild('TestEgg') as IEggModel
})

/*
[
        { weight: 1, name: 'Cat' },
        { weight: 10, name: 'Cat' },
        { weight: 15000, name: undefined },
    ],
*/

EggsData.set('Donate', {
    name: 'Donate',
    price: 100,
    valuetype: EggValueType.VBugs,
    petchances: [
        { weight: 10, name: 'Cat' },
        { weight: 15, name: 'Cat' },
    ],

    productid: 1701055226
})