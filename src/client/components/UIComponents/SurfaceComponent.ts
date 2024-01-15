import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players } from "@rbxts/services";

const SURFACE_RADIUS = 100

let updateSurfaces = (primaryPart: BasePart) => {
    for (let v of SurfaceFabric.GetSurfaces()) {

        if (!v.instance.Parent) { continue }

        let currentDistance = ((v.instance.Parent as BasePart).Position.sub(primaryPart.Position)).Magnitude

        if (currentDistance > v.radius && v.instance.Enabled) { v.instance.Enabled = false; continue }
        if (currentDistance <= v.radius && !v.instance.Enabled) { v.instance.Enabled = true }

    }
}

let active = false
let activateRender = () => {
    if (active) {return}

    task.spawn(() => {
    
        while (task.wait(3)) {
            let character = Players.LocalPlayer.Character
            if (!character || !character.FindFirstChild('HumanoidRootPart')) { continue }
    
            let primaryPart = character.WaitForChild('HumanoidRootPart') as BasePart
            updateSurfaces(primaryPart)
        }
    
    })    
}


interface Attributes {}

@Component({})
export class SurfaceComponent extends BaseComponent<Attributes, SurfaceGui> implements OnStart {
    public radius = SURFACE_RADIUS

    onStart() {
        activateRender()
    }
}

export class SurfaceFabric {

    static CreateSurface(surface: SurfaceGui) {
        return Dependency<Components>().addComponent<SurfaceComponent>(surface)
    }

    static GetSurfaces() {
        return Dependency<Components>().getAllComponents<SurfaceComponent>()
    }

}