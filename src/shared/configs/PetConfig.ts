import { Workspace } from "@rbxts/services"
import { IPetData, Rarities, Sizes } from "shared/interfaces/PetData"

export const multipliersConfig = {
    void: 2,
    size: {
        Normal: 1,
        Huge: 2,
    }

}

export const petUpgradeConfig = {

    SizeUpgrades: {
        Normal: { requirements: new Map<Sizes, number>([[Sizes.Normal, 4]]), nextSize: Sizes.Huge },
        Huge: { requirements: new Map<Sizes, number>([[Sizes.Huge, 999]]), nextSize: undefined },
    }

    //Huge: { requirements: { Normal: 10 }, oldValues: { size: Sizes.Normal } }
}

export const petCallbacks = new Map<string, (info: IPetData) => void>()

petCallbacks.set('void', (info: IPetData) => {
    info.multipliers.set('coins', info.multipliers.get('coins')!*multipliersConfig.void)
})

petCallbacks.set('size', (info: IPetData) => {
    info.multipliers.set('coins', info.multipliers.get('coins')!*multipliersConfig.size[info.additional.size])
})

//try to make shared petservice ig ( i have no idea how to make it better and readable )