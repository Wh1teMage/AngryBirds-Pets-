import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players } from "@rbxts/services";

const BILLBOARD_RADIUS = 100

let updateBillboards = (primaryPart: BasePart) => {
    for (let v of BillboardFabric.GetBillboards()) {

        if (!v.instance.Parent) { continue }

        let currentDistance = ((v.instance.Parent as BasePart).Position.sub(primaryPart.Position)).Magnitude

        if (currentDistance > v.radius && v.instance.Enabled) { v.Leave(); v.instance.Enabled = false; continue }
        if (currentDistance <= v.radius && !v.instance.Enabled) { v.Enter(); v.instance.Enabled = true }

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
            updateBillboards(primaryPart)
        }
    
    })    
}


interface Attributes {}

@Component({})
export class BillboardComponent extends BaseComponent<Attributes, BillboardGui> implements OnStart {
    public radius = BILLBOARD_RADIUS

    private _onEnter?: Array<(arg: BillboardGui) => void> = []
    private _onLeave?: Array<(arg: BillboardGui) => void> = []

    private _defaultEnter(arg: BillboardGui) {}
    private _defaultLeave(arg: BillboardGui) {}

    onStart() {
        activateRender()

        this.BindToEnter((arg: BillboardGui) => this._defaultEnter(arg))
        this.BindToLeave((arg: BillboardGui) => this._defaultLeave(arg))
    }

    public Enter() {
        this._onLeave?.forEach((val) => { val(this.instance) })
    }

    public Leave() {
        this._onLeave?.forEach((val) => { val(this.instance) })
    }

    public BindToEnter(entercallback: (arg: BillboardGui) => void) {
        this._onEnter?.push(entercallback)
    }

    public BindToLeave(leavecallback: (arg: BillboardGui) => void) {
        this._onLeave?.push(leavecallback)
    }

}

export class BillboardFabric {

    static CreateBillboard(billboard: BillboardGui) {
        return Dependency<Components>().addComponent<BillboardComponent>(billboard)
    }

    static GetBillboards() {
        return Dependency<Components>().getAllComponents<BillboardComponent>()
    }

}