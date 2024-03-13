import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players } from "@rbxts/services";

const PART_RADIUS = 100

let updateBillboards = (primaryPart: BasePart) => {
    for (let v of GroupPopUpFabric.GetGroupPopUps()) {

        if (!v.instance.Parent) { continue }

        let currentDistance = (v.instance.Position.sub(primaryPart.Position)).Magnitude

        if (currentDistance > v.radius && v.enabled) { v.Leave(); v.enabled = false; continue }
        if (currentDistance <= v.radius && !v.enabled) { v.Enter(); v.enabled = true }

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
export class GroupPopUpComponent extends BaseComponent<Attributes, BasePart> implements OnStart {
    public radius = PART_RADIUS
    public enabled = false

    private _onEnter?: Array<(arg: BasePart) => void> = []
    private _onLeave?: Array<(arg: BasePart) => void> = []

    private _defaultEnter(arg: BasePart) { print('Enter') }
    private _defaultLeave(arg: BasePart) { print('Leave') }

    onStart() {
        activateRender()

        this.BindToEnter((arg: BasePart) => this._defaultEnter(arg))
        this.BindToLeave((arg: BasePart) => this._defaultLeave(arg))
    }

    public Enter() {
        this._onEnter?.forEach((val) => { val(this.instance) })
    }

    public Leave() {
        this._onLeave?.forEach((val) => { val(this.instance) })
    }

    public BindToEnter(entercallback: (arg: BasePart) => void) {
        this._onEnter?.push(entercallback)
    }

    public BindToLeave(leavecallback: (arg: BasePart) => void) {
        this._onLeave?.push(leavecallback)
    }

}

export class GroupPopUpFabric {

    static CreateGroupPopUp(part: BasePart) {
        return Dependency<Components>().addComponent<GroupPopUpComponent>(part)
    }

    static GetGroupPopUps() {
        return Dependency<Components>().getAllComponents<GroupPopUpComponent>()
    }

}