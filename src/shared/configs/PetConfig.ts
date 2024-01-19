import { Workspace } from "@rbxts/services"
import { Evolutions, IPetData, Rarities, Sizes } from "shared/interfaces/PetData"

export const multipliersConfig = {
    
    size: {
        Normal: 1,
        Huge: 2,
    },
    evolution: {
        Normal: 1,
        Gold: 1.5,
        Void: 2,
    }
}

export const petUpgradeConfig = {

    SizeUpgrades: {
        Normal: { requirements: new Map<Sizes, number>([[Sizes.Normal, 4]]), nextSize: Sizes.Huge },
        Huge: { requirements: new Map<Sizes, number>([[Sizes.Huge, 999]]), nextSize: undefined },
    },
    EvolutionUpgrades: {
        Normal: { requirements: undefined, nextEvolution: Evolutions.Gold },
        Gold: { requirements: { time: 1 }, nextEvolution: Evolutions.Void },
        Void: { requirements: undefined, nextEvolution: undefined },
    },

    //Huge: { requirements: { Normal: 10 }, oldValues: { size: Sizes.Normal } }
}

export const petCallbacks = new Map<string, (info: IPetData) => void>()

petCallbacks.set('evolution', (info: IPetData) => {
    info.multipliers.set('strength', info.multipliers.get('strength')!*multipliersConfig.evolution[info.additional.evolution])
})

petCallbacks.set('size', (info: IPetData) => {
    info.multipliers.set('strength', info.multipliers.get('strength')!*multipliersConfig.size[info.additional.size])
})

//try to make shared petservice ig ( i have no idea how to make it better and readable )