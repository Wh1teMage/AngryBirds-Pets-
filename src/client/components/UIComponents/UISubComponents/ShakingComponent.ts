import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { TweenService, ReplicatedStorage, Players } from "@rbxts/services";

let started = false
let delta = .1

let tweenInfo = new TweenInfo(delta, Enum.EasingStyle.Linear)

let initializeShaking = () => {
    started = true

    task.spawn(() => {
        while (task.wait(delta)) {

            ShakingFabric.GetShakings().forEach((val) => {
                val.Shake()
                val.Shine()
            })

        }
    })
}

interface Attributes {}

@Component({})
export class ShakingComponent extends BaseComponent<Attributes, GuiObject> implements OnStart {

    public period = 2
    public maxAngle = 20
    public duration = .3

    public shinePeriod = 2
    public shineDuration = .8

    private _lastTriggered = os.clock()
    private _shineEffect?: UIGradient

    private _lastTriggeredShine = os.clock()

    constructor() {
        super()
    }

    onStart() {
        if (!started) { initializeShaking() }
        this.EnableShine()
    }

    public Shake() {
        if ((os.clock() - this._lastTriggered) < (this.period + this.duration * 3)) { return }
        let tinfo = new TweenInfo(this.duration, Enum.EasingStyle.Quad)
        let defaultRotation = this.instance.Rotation

        TweenService.Create(this.instance, tinfo, { 'Rotation': this.maxAngle + this.instance.Rotation }).Play()
        task.delay(tinfo.Time*1.05, () => { TweenService.Create(this.instance, tinfo, { 'Rotation': -this.maxAngle * 2 + this.instance.Rotation }).Play() })
        task.delay(tinfo.Time*2.05, () => { TweenService.Create(this.instance, tinfo, { 'Rotation': defaultRotation }).Play() })
        this._lastTriggered = os.clock()
    }

    public Shine() {
        if (!this._shineEffect) { return }
        if ((os.clock() - this._lastTriggeredShine) < (this.shinePeriod + this.shineDuration)) { return }
        let tinfo = new TweenInfo(this.shineDuration)

        let oldOffset = this._shineEffect!.Offset

        TweenService.Create(this._shineEffect, tinfo, { 'Offset': new Vector2(1, 0) }).Play()
        task.delay(tinfo.Time, () => { this._shineEffect!.Offset = oldOffset })

        this._lastTriggeredShine = os.clock()
    }

    public EnableShine() {
        let gradient = this.instance.FindFirstChildWhichIsA('UIGradient')
        if (gradient && gradient.Name === 'Shine') { this._shineEffect = gradient }
    }
}

export class ShakingFabric {

    static CreateShaking(guiobject: GuiObject) {
        if (ShakingFabric.GetShaking(guiobject)) { return ShakingFabric.GetShaking(guiobject)! }
        return Dependency<Components>().addComponent<ShakingComponent>(guiobject)
    }

    static GetShaking(guiobject: GuiObject) {
        return Dependency<Components>().getComponent<ShakingComponent>(guiobject)
    }

    static GetShakings() {
        return Dependency<Components>().getAllComponents<ShakingComponent>()
    }

}