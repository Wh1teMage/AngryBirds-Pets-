import { Service, OnStart, OnInit } from "@flamework/core";
import { Players, RunService, Workspace, TweenService } from "@rbxts/services";
import { ActivePetPlayers, PetModelManager } from "server/classes/PetModelClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";


const PET_CYCLE_UPDATE = 3
const PETS_PER_LINE = 10
const SMOOTHNESS = .1

const OFFSET_CONFIG = {
    front: 4,
    right: 4,
    up: 2,
}


@Service({})
export class PetModelService implements OnStart, OnInit {

    private _renderPets = () => {

        let petsFolder = Workspace.FindFirstChild('Pets')
        if (!petsFolder) { return }
        
        ActivePetPlayers.forEach((value, userid) => {

            let player = Players.GetPlayerByUserId(userid)
            if (!player) { PetModelManager.RemovePlayer(userid); return }

            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { PetModelManager.RemovePlayer(userid); return }

            let character = playerComp.session.character
            if (!character || !character.PrimaryPart) { return }

            /*
            let humanoid = character!.WaitForChild('Humanoid') as Humanoid

            let currentRow = 0
            let currentLine = 0

            let maxLineLength = math.min(PETS_PER_LINE, value.size())

            let isMoving = false
            if (humanoid.MoveDirection.Magnitude > 0 && humanoid.FloorMaterial !== Enum.Material.Air) { isMoving = true }

            value.forEach((pet, index) => {
                currentRow = math.floor(index/PETS_PER_LINE) 
                currentLine = index % PETS_PER_LINE

                let front = character!.PrimaryPart!.CFrame.LookVector.mul(-1 * OFFSET_CONFIG.front * (currentRow + 1))
                let right = character!.PrimaryPart!.CFrame.RightVector.mul(OFFSET_CONFIG.right * ( -(maxLineLength/2-.5)+currentLine ))
                
                let changedCFrame = (character!.PrimaryPart!.CFrame.add(front).add(right)).mul(pet.Pet.stats.rotationOffset)

                let params = new RaycastParams()
                params.AddToFilter([pet.Pet.model, character!, petsFolder!])

                let ray = Workspace.Raycast(changedCFrame.Position, new Vector3(0, -2000, 0), params)
                let height = changedCFrame.Position.Y
                if (ray) { height = ray.Position.Y }

                //if (isMoving) { height += math.abs(math.sin(os.clock()*10))*4 }
                //height += math.abs(math.sin(os.clock()*10))*4

                // try to do smthing with that

                let modifiedPosition = changedCFrame.Position.mul(new Vector3(1, 0, 1)).add(new Vector3(0, height + OFFSET_CONFIG.up + pet.Pet.stats.sizeOffset.Y, 0))
                let modifiedCFrame = new CFrame(modifiedPosition, modifiedPosition.add(changedCFrame.LookVector))

                if ( (pet.Pet.model.GetPivot().sub(new Vector3())).Position.Magnitude < 5 ) {
                    pet.Pet.model.PivotTo(modifiedCFrame)
                    return
                }

                //TweenService.Create(pet.Pet.model.PrimaryPart!, new TweenInfo(PET_CYCLE_UPDATE*1.1, Enum.EasingStyle.Linear), { 'CFrame': modifiedCFrame }).Play()
                pet.Pet.model.PivotTo(pet.Pet.model.GetPivot().Lerp(modifiedCFrame, SMOOTHNESS))
            })
            */
    
        })
    
    }

    onInit() {

        task.spawn(() => {
        
            while (task.wait(PET_CYCLE_UPDATE)) { 
                this._renderPets()
            }
        
        })
        
    }

    onStart() {
        
    }
}