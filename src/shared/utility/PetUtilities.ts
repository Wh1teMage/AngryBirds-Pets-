import { IDBPetData, IPetData, Sizes } from "shared/interfaces/PetData"
import Functions from "./LuaUtilFunctions"
import { petCallbacks } from "shared/configs/PetConfig"
import { PetsData } from "shared/info/PetInfo"
import { EggsData } from "shared/info/EggInfo"

export class PetUtilities {

    static modifyPetMultipliers(info: IPetData) {
        
        Functions.iterateObject(info.additional, (index, value) => {
            if (!petCallbacks.get(index)) { return }
            petCallbacks.get(index)!(info)
        })
    }

    static DBToPetTransfer(info: IDBPetData) {
        if (!PetsData.get(info.name)) { warn(info.name+' pet doesnt exist!'); return }

        let originalPet = PetsData.get(info.name)!
        let pet: IPetData = {
            name: originalPet.name,
            stats: originalPet.stats,
            additional: info.additional,
            multipliers: originalPet.multipliers,
            model: originalPet.model.Clone()
        }

        PetUtilities.modifyPetMultipliers(pet)

        return pet
    }

    static PetToDBTransfer(info: IPetData) {
        return {
            name: info.name,
            additional: info.additional,
        } as IDBPetData
    }

    static NameToDBPet(name: string) {
        if (!PetsData.get(name)) {return}

        let pet: IDBPetData = {
            name: name,
            additional: {
                size: Sizes.Normal
            }
        }

        return pet
    }

    static NameToDBPetWithEgg(petname: string | undefined, eggname: string) {
        if (!petname) { return }
        let pet = PetUtilities.NameToDBPet(petname)
        let egg = EggsData.get(eggname)
        
        if (egg?.exceptions?.get(petname)) { return egg?.exceptions?.get(petname) }
        return pet
    }

    static RandomWeight(chances: {weight: number, name?: string}[], luck: number) {

        let maxweight = 0
        chances.forEach((info, key) => {maxweight += info.weight})

        chances = chances.sort((n1, n2) => {
            if (n1.weight > n2.weight) { return true } 
            else { return false }
        })

        let chance = math.random(0, maxweight*100)/100/luck
        let currentWeight = maxweight
        print(chances)

        for (let i = 0; i < chances.size(); i++) {
            currentWeight -= chances[i].weight
            if (chance >= currentWeight) { return chances[i].name }
        }

        return chances[0].name

    }

    static ComparePets(pet1: IDBPetData, pet2: IDBPetData) {
        return Functions.compareObjects(pet1, pet2, true)
    }

}