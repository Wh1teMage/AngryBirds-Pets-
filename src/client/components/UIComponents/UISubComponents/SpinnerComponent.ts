import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { TweenService } from "@rbxts/services";

let started = false
let delta = .1

let tweenInfo = new TweenInfo(delta, Enum.EasingStyle.Linear)

let initializeSpin = () => {
    started = true

    task.spawn(() => {
        while (task.wait(delta)) {

            SpinnerFabric.GetSpinners().forEach((val) => {
                TweenService.Create(val.instance, tweenInfo, {'Rotation' : val.instance.Rotation + val.step}).Play()
            })

        }
    })
}

interface Attributes {}

@Component({})
export class SpinnerComponent extends BaseComponent<Attributes, GuiObject> implements OnStart {

    public step = 1

    constructor() {
        super()
    }

    onStart() {
        if (!started) { initializeSpin() }
    }
}

export class SpinnerFabric {

    static CreateSpinner(guiobject: GuiObject) {
        if (SpinnerFabric.GetSpinner(guiobject)) { return SpinnerFabric.GetSpinner(guiobject)! }
        return Dependency<Components>().addComponent<SpinnerComponent>(guiobject)
    }

    static GetSpinner(guiobject: GuiObject) {
        return Dependency<Components>().getComponent<SpinnerComponent>(guiobject)
    }

    static GetSpinners() {
        return Dependency<Components>().getAllComponents<SpinnerComponent>()
    }

}