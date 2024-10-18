import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { TweenService, UserInputService, Players, GuiService } from "@rbxts/services";

let started = false
let delta = 0

let tweenInfo = new TweenInfo(delta, Enum.EasingStyle.Linear)
let YOffset = GuiService.GetGuiInset()[0].Y

let initializeWindows = () => {
    started = true

    task.spawn(() => {
        while (task.wait(delta)) {
            FollowingWindowFabric.GetFollowingWindows().forEach((val) => {
                val.UpdatePosition()
            })
        }
    })
}

interface Attributes {}

@Component({})
export class FollowingWindowComponent extends BaseComponent<Attributes, ImageLabel> implements OnStart {

    private _statsConverter = <T>(args: T) => {}
    private _mouse = Players.LocalPlayer.GetMouse()

    onStart() {
        if (!started) { initializeWindows() }
    }

    public UpdatePosition() {
        if (!this.instance.Visible) { return }

        let mouse = this._mouse
        let udim2 = UDim2.fromOffset(mouse.X, mouse.Y + YOffset)
        this.instance.Position = this.instance.Position.Lerp(udim2, .5)
        //TweenService.Create(this.instance, tweenInfo, {'Position' : udim2}).Play()
    }

    public UpdateStats(args: any) {
        this._statsConverter(args)
    }

    public BindStatsConverter(callback: <T>(args: T) => void) {
        this._statsConverter = <T>(args: T) => { callback(args) }
    }

}

export class FollowingWindowFabric {

    static CreateFollowingWindow(guiobject: GuiObject) {
        if (FollowingWindowFabric.GetFollowingWindow(guiobject)) { return FollowingWindowFabric.GetFollowingWindow(guiobject)! }
        return Dependency<Components>().addComponent<FollowingWindowComponent>(guiobject)
    }

    static GetFollowingWindow(guiobject: GuiObject) {
        return Dependency<Components>().getComponent<FollowingWindowComponent>(guiobject)
    }

    static GetFollowingWindows() {
        return Dependency<Components>().getAllComponents<FollowingWindowComponent>()
    }

}