import { Workspace } from "@rbxts/services"
import { Evolutions, IPetData, Rarities, Sizes } from "shared/interfaces/PetData"

export const PetsData = new Map<string, IPetData>()

PetsData.set('Cat', 
{
    name: 'Cat',
    locked: false,
    multipliers: new Map([['strength', 1]]),
    stats: {
        rarity: Rarities.Common,
        sizeOffset: new Vector3(0,0,0),
        rotationOffset: new CFrame(0,0,0),
    },
    additional: {
        size: Sizes.Normal,
        evolution: Evolutions.Normal
    },
    model: Workspace.WaitForChild('Enot') as Model
})