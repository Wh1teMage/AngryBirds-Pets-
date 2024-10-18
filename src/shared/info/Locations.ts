import { ISpecialLocation } from "shared/interfaces/SpecialLocation";
import { ReplicatedStorage } from "@rbxts/services";
import { WorldType } from "shared/enums/WorldEnums";
import { IMultipliers } from "shared/interfaces/SessionData";

export const LocationsData = new Map<string, ISpecialLocation>()

let instaReplica = game.Workspace.WaitForChild('InstaReplica')!

LocationsData.set('W1KingOfTheHill', {
    hitbox: instaReplica.WaitForChild('W1King') as Part,
    multipliers: new Map([[
        'strength', 3+0
    ]]),
    world: WorldType.Cave
})

LocationsData.set('Pirate', {
    hitbox: instaReplica.WaitForChild('Pirate') as Part,
    multipliers: new Map([[
        'strength', 1+0
    ]]),
    requirements: new Map([[
        'strength', 100
    ]]),
    gui: instaReplica.WaitForChild('Pirate').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Cave
})

LocationsData.set('Beach', {
    hitbox: instaReplica.WaitForChild('BeachLocation') as Part,
    multipliers: new Map([[
        'strength', 1.5+0
    ]]),
    requirements: new Map([[
        'strength', 2500000
    ]]),
    gui: instaReplica.WaitForChild('BeachLocation').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Cave
})

LocationsData.set('Coralles', {
    hitbox: instaReplica.WaitForChild('Coralles') as Part,
    multipliers: new Map([[
        'strength', 2+0
    ]]),
    requirements: new Map([[
        'strength', 2500000000
    ]]),
    gui: instaReplica.WaitForChild('Coralles').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Cave
})

LocationsData.set('Pond', {
    hitbox: instaReplica.WaitForChild('Pond') as Part,
    multipliers: new Map([[
        'strength', 6+0
    ]]),
    requirements: new Map([[
        'rebirth', 100
    ]]),
    gui: instaReplica.WaitForChild('Pond').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.NeonCity
})

LocationsData.set('Park', {
    hitbox: instaReplica.WaitForChild('Park') as Part,
    multipliers: new Map([[
        'strength', 5+0
    ]]),
    requirements: new Map([[
        'rebirth', 50
    ]]),
    gui: instaReplica.WaitForChild('Park').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.NeonCity
})

LocationsData.set('Minka', {
    hitbox: instaReplica.WaitForChild('Minka') as Part,
    multipliers: new Map([[
        'strength', 4+0
    ]]),
    requirements: new Map([[
        'rebirth', 25
    ]]),
    gui: instaReplica.WaitForChild('Minka').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.NeonCity
})

LocationsData.set('W2KingOfTheHill', {
    hitbox: instaReplica.WaitForChild('W2King') as Part,
    multipliers: new Map([[
        'strength', 7+0
    ]]),
    world: WorldType.NeonCity
})


LocationsData.set('Parking', {
    hitbox: instaReplica.WaitForChild('Parking') as Part,
    multipliers: new Map([[
        'strength', 8+0
    ]]),
    requirements: new Map([[
        'rebirth', 200
    ]]),
    gui: instaReplica.WaitForChild('Parking').WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Backrooms
})

LocationsData.set('MiniCity', {
    hitbox: instaReplica.WaitForChild('MiniCity') as Part,
    multipliers: new Map([[
        'strength', 9+0
    ]]),
    requirements: new Map([[
        'rebirth', 300
    ]]),
    gui: instaReplica.WaitForChild('MiniCity').WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Backrooms
})

LocationsData.set('ChillZone', {
    hitbox: instaReplica.WaitForChild('ChillZone') as Part,
    multipliers: new Map([[
        'strength', 10+0
    ]]),
    requirements: new Map([[
        'rebirth', 400
    ]]),
    gui: instaReplica.WaitForChild('ChillZone').WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui,
    world: WorldType.Backrooms
})

LocationsData.set('W3KingOfTheHill', {
    hitbox: instaReplica.WaitForChild('W3King') as Part,
    multipliers: new Map([[
        'strength', 11+0
    ]]),
    world: WorldType.Backrooms
})
