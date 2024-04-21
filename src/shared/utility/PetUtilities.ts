import { Evolutions, IDBPetData, IPetData, Mutations, Sizes } from "shared/interfaces/PetData"
import Functions from "./LuaUtilFunctions"
import { petCallbacks } from "shared/configs/PetConfig"
import { PetsData } from "shared/info/PetInfo"
import { EggsData } from "shared/info/EggInfo"
import { CreationUtilities } from "./CreationUtilities"

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
            locked: info.locked,
            equipped: info.equipped,
            stats: table.clone( originalPet.stats ),
            additional: table.clone( info.additional ),
            multipliers: table.clone( originalPet.multipliers ),
            model: originalPet.model.Clone()
        }

        PetUtilities.modifyPetMultipliers(pet)

        return table.clone(pet)
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
            locked: false,
            equipped: false,
            additional: {
                size: Sizes.Baby,
                evolution: Evolutions.Normal,
                mutation: Mutations.Default,
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

    static GenerateUniqueEquipId(usedIDs: number[]) {
        let id = math.random(-10e6, 10e6)
        while (usedIDs.includes(id)) {
            id = math.random(-10e6, 10e6)
        }
        return id
    }

    static GetWeldedPetModel(model: Model) {
        let primary = model.PrimaryPart!
        primary.Anchored = true
        primary.CanCollide = false

        for (let obj of model.GetDescendants()) {
            if (!obj.IsA('BasePart')) { continue }
            obj.Anchored = false
            obj.CanCollide = false
            CreationUtilities.Weld(primary, obj)
        }

        return model
    }

}