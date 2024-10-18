import { ITrailData } from "shared/interfaces/TrailData";

export const TrailsData = new Map<string, ITrailData>()

TrailsData.set('Trail1', {
    price: 100,
    instance: game.Workspace.WaitForChild('TestTrail') as Trail
})