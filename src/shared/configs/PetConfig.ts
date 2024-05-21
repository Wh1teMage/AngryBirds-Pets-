import { Workspace } from "@rbxts/services"
import { Evolutions, IPetData, Rarities, Sizes } from "shared/interfaces/PetData"

export const multipliersConfig = {
    
    size: {
        Baby: 1,
        Big: 1.5,
        Huge: 2,
    },
    evolution: {
        Normal: 1,
        Gold: 1.5,
        Void: 2,
    },
    mutation: {
        Default: 1,
        Primordial: 1.2,
        Majestic: 1.4,
        Elder: 2,
        Sacred: 3,
    }
}

export const petUpgradeConfig = {

    SizeUpgrades: {
        Baby: { requirements: new Map<Sizes, number>([[Sizes.Baby, 3]]), nextSize: Sizes.Big },
        Big: { requirements: new Map<Sizes, number>([[Sizes.Big, 3]]), nextSize: Sizes.Huge },
        Huge: { requirements: new Map<Sizes, number>([[Sizes.Huge, 999]]), nextSize: undefined },
    },
    EvolutionUpgrades: {
        Normal: { requirements: undefined, nextEvolution: Evolutions.Gold },
        Gold: { requirements: { time: 2*60*60 }, nextEvolution: Evolutions.Void },
        Void: { requirements: undefined, nextEvolution: undefined },
    },
    MutationUpgrades: {
        Primordial: { requirements: { weight: 600 } },
        Majestic: { requirements: { weight: 275 } },
        Elder: { requirements: { weight: 80 } },
        Sacred: { requirements: { weight: 20 } },
    }

    //Huge: { requirements: { Normal: 10 }, oldValues: { size: Sizes.Normal } }
}

export const petCallbacks = new Map<string, (info: IPetData) => void>()

petCallbacks.set('evolution', (info: IPetData) => {
    info.multipliers.set('strength', info.multipliers.get('strength')!*multipliersConfig.evolution[info.additional.evolution])
})

petCallbacks.set('size', (info: IPetData) => {
    info.multipliers.set('strength', info.multipliers.get('strength')!*multipliersConfig.size[info.additional.size])
})

petCallbacks.set('mutation', (info: IPetData) => {
    info.multipliers.set('strength', info.multipliers.get('strength')!*multipliersConfig.mutation[info.additional.mutation])
})

//try to make shared petservice ig ( i have no idea how to make it better and readable )