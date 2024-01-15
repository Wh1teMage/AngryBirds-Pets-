import { Workspace } from "@rbxts/services";
import { IDBPetData, IPetData } from "shared/interfaces/PetData";
import Functions from "shared/utility/LuaUtilFunctions";
import { PetUtilities } from "shared/utility/PetUtilities";

export const ActivePetPlayers = new Map<number, {Pet: IPetData, DB: IDBPetData}[]>()

export class PetModelManager {

    static AddPlayer(player: Player) {
        ActivePetPlayers.set(player.UserId, [])

        if (!Workspace.FindFirstChild('Pets')) { 
            let folder = new Instance('Folder', Workspace)
            folder.Name = 'Pets'
         }

         let playerFolder = new Instance('Folder', Workspace.FindFirstChild('Pets'))
         playerFolder.Name = tostring(player.UserId) 
    }

    static RemovePlayer(player: Player | number) { // in case player left
        let id = player as number
        if (typeOf(player) !== 'number') { id = (player as Player).UserId }
        let folder = Workspace.FindFirstChild('Pets')!.FindFirstChild(id)

        if (folder) { folder.Destroy() }
        ActivePetPlayers.delete(id)
    }
    
    static GetPlayer(player: Player) {
        return ActivePetPlayers.get(player.UserId)
    }

    static AddPet(player: Player, pet: IDBPetData) {
        if (!PetModelManager.GetPlayer(player)) { PetModelManager.AddPlayer(player) }

        let newPet = PetUtilities.DBToPetTransfer(pet) as IPetData
        newPet.model.Parent = Workspace.FindFirstChild('Pets')!.WaitForChild(player.UserId)
        newPet.model.PivotTo(new CFrame(0,0,0))

        PetModelManager.GetPlayer(player)!.push({Pet: newPet, DB: pet})
    }

    static RemovePet(player: Player, pet: IDBPetData) {
        if (!PetModelManager.GetPlayer(player)) { return }

        let petIndex = -1
        PetModelManager.GetPlayer(player)!.forEach((value, index) => { if (Functions.compareObjects(value.DB, pet)) { petIndex = index } })
        print(petIndex)
        if (petIndex < 0) { return }

        PetModelManager.GetPlayer(player)![petIndex].Pet.model.Destroy()
        PetModelManager.GetPlayer(player)!.remove(petIndex)
    }

}