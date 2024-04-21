import { Controller, OnStart, OnInit } from "@flamework/core";
import { StarterGui, ReplicatedStorage, Workspace, Players, RunService } from "@rbxts/services";
import { PetsData } from "shared/info/PetInfo";

const PETS_PER_LINE = 5
const SMOOTHNESS = .1

const OFFSET_CONFIG = {
    front: 4,
    right: 4,
    up: 2,
}

@Controller({})
export class PetModelController implements OnStart, OnInit {

    private _renderPets = () => {

        let petsFolder = Workspace.FindFirstChild('Pets')
        if (!petsFolder) { return }

        let sin = (math.sin(15 * time() + 1.6)/.5)+1
		let cos = math.cos(7 * time() + 1)/4

        for (let folder of petsFolder.GetChildren()) {

            let currentRow = 0
            let currentLine = 0

            let player = Players.GetPlayerByUserId(tonumber(folder.Name)!) as Player
            if (!player) { continue }
    
            let character = player.Character
            if (!character || !character.PrimaryPart) { continue }
    
            let humanoid = character!.WaitForChild('Humanoid') as Humanoid
    
            let isMoving = false
            if (math.abs(humanoid.MoveDirection.X)+math.abs(humanoid.MoveDirection.Z) > 0) { isMoving = true }

            let maxLineLength = math.min(PETS_PER_LINE, folder.GetChildren().size())

            let index = 0

            for (let pet of folder.GetChildren()) {
                let petModel = pet as Model
                let petStats = PetsData.get(petModel.Name)!

                currentRow = math.floor(index/PETS_PER_LINE) 
                currentLine = index % PETS_PER_LINE

                let front = character!.PrimaryPart!.CFrame.LookVector.mul(-1 * OFFSET_CONFIG.front * (currentRow + 1))
                let right = character!.PrimaryPart!.CFrame.RightVector.mul(OFFSET_CONFIG.right * ( -(maxLineLength/2-.5)+currentLine ))
                
                let changedCFrame = (character!.PrimaryPart!.CFrame.add(front).add(right)).mul(petStats.stats.rotationOffset)

                let params = new RaycastParams()
                params.AddToFilter([petModel, character!, petsFolder!])

                let ray = Workspace.Raycast(changedCFrame.Position, new Vector3(0, -2000, 0), params)
                let height = changedCFrame.Position.Y
                if (ray) { height = ray.Position.Y }

                //if (isMoving) { height += math.abs(math.sin(os.clock()*10))*4 }
                //height += math.abs(math.sin(os.clock()*10))*4

                // try to do smthing with that

                let modifiedPosition = changedCFrame.Position.mul(new Vector3(1, 0, 1)).add(new Vector3(0, height + OFFSET_CONFIG.up + petStats.stats.sizeOffset.Y, 0))
                let modifiedCFrame = new CFrame(modifiedPosition, modifiedPosition.add(changedCFrame.LookVector))

                if (isMoving) { modifiedCFrame = modifiedCFrame.add(new Vector3(0, sin, 0)).mul(CFrame.fromEulerAnglesXYZ(0,0,cos)) }

                if ( (petModel.GetPivot().sub(new Vector3())).Position.Magnitude < 5 ) {
                    petModel.PivotTo(modifiedCFrame)
                    continue
                }

                //TweenService.Create(pet.Pet.model.PrimaryPart!, new TweenInfo(PET_CYCLE_UPDATE*1.1, Enum.EasingStyle.Linear), { 'CFrame': modifiedCFrame }).Play()
                petModel.PivotTo(petModel.GetPivot().Lerp(modifiedCFrame, SMOOTHNESS))

                index += 1
            }

        }
    
    }

    onInit() {
        
        RunService.RenderStepped.Connect(() => {
            this._renderPets()
        })
        
    }

    onStart() {
        
    }
}