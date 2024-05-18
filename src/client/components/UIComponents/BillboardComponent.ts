import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players } from "@rbxts/services";

const BILLBOARD_RADIUS = 10

let updateBillboards = (primaryPart: BasePart) => {
    for (let v of BillboardFabric.GetBillboards()) {

        if (!v.instance.Parent) { continue }

        let currentDistance = ((v.instance.Adornee!.Parent as BasePart).Position.sub(primaryPart.Position)).Magnitude

        if (v._locked) { continue }

        if (currentDistance > v.radius && v.instance.Enabled) { v.Leave(); continue } //
        if (currentDistance <= v.radius && !v.instance.Enabled) { v.Enter(); } //

    }
}

let active = false
let activateRender = () => {
    if (active) {return}

    task.spawn(() => {
    
        while (task.wait(.1)) {
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

    private _defaultEnter(arg: BillboardGui) { }
    private _defaultLeave(arg: BillboardGui) { }

    public _locked = false //private

    onStart() {
        activateRender()

        this.BindToEnter((arg: BillboardGui) => this._defaultEnter(arg))
        this.BindToLeave((arg: BillboardGui) => this._defaultLeave(arg))
    }

    public Enter() {
        if (this._locked || this.instance.Enabled) {return}

        this.instance.Enabled = true;
        this._locked = true
        //this.CloseOthers()
        this._onEnter?.forEach((val) => { val(this.instance) })
        task.wait(.3)
        this._locked = false
        
    }

    public Leave() {
        if (this._locked || !this.instance.Enabled) {return}

        this._locked = true
        print('Leave Started')
        this._onLeave?.forEach((val) => { val(this.instance) })
        print('Leave Ended')
        task.wait(.3)
        this._locked = false
        this.instance.Enabled = false;
        
    }

    public BindToEnter(entercallback: (arg: BillboardGui) => void) {
        this._onEnter?.push(entercallback)
    }

    public BindToLeave(leavecallback: (arg: BillboardGui) => void) {
        this._onLeave?.push(leavecallback)
    }

    
    public CloseOthers() {
        let components = Dependency<Components>().getAllComponents<BillboardComponent>()

        for (let component of components) {
            if (component === this) continue
            component.Leave()
        }
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