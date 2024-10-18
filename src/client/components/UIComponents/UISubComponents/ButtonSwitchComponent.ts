import { Dependency, OnStart } from "@flamework/core";
import { Component, Components } from "@flamework/components";
import { ButtonComponent } from "../ButtonComponent";
import { TweenService } from "@rbxts/services";

interface Attributes {}

@Component({})
export class ButtonSwitchComponent extends ButtonComponent implements OnStart {

    public switchState = false

    private _bar?: Frame

    constructor() {
        super() //test if onstart is triggered by that (no)
        this._bar = this.instance.WaitForChild('Bar') as Frame
    }

    onStart() {
        
        this.maid.GiveTask(
            this.instance.MouseButton1Click.Connect(() => {
                this.switchState = !this.switchState
                this._onClick?.forEach((val) => { val(this.instance) })
                this._doSwitch()
            })
        )

        this.maid.GiveTask(
            this.instance.MouseEnter.Connect(() => {
                this._onEnter?.forEach((val) => { val(this.instance) })
            })
        )

        this.maid.GiveTask(
            this.instance.MouseLeave.Connect(() => {
                this._onLeave?.forEach((val) => { val(this.instance) })
            })
        )

        this.instance.Destroying.Connect(() => {  
            this._onLeave?.forEach((val) => { val(this.instance) })
            this.maid.DoCleaning() 
        })

    }

    public SetState(state: boolean) {
        this.switchState = state
        this._doSwitch()
    }

    private _doSwitch = () => {

        let bar = this._bar
        if (!bar) { return }
        
        if (this.switchState) {

            this.instance.GetDescendants().forEach((val) => {
                if (!val.IsA('UIGradient')) { return }
                if (val.Name === 'Shine') { return }
                if (val.Name === 'Green') { val.Enabled = true }
                else { val.Enabled = false }
            })

            TweenService.Create(bar, new TweenInfo(.1), { Position: UDim2.fromScale(0,0) }).Play()

        }
        else {

            this.instance.GetDescendants().forEach((val) => {
                if (!val.IsA('UIGradient')) { return }
                if (val.Name === 'Shine') { return }
                if (val.Name === 'Red') { val.Enabled = true }
                else { val.Enabled = false }
            })

            TweenService.Create(bar, new TweenInfo(.1), { Position: UDim2.fromScale(1-bar.Size.X.Scale,0) }).Play()

        }

    }
}

export class ButtonSwitchFabric {

    static CreateButtonSwitch(guibutton: GuiButton) {
        if (ButtonSwitchFabric.GetButtonSwitch(guibutton)) { return ButtonSwitchFabric.GetButtonSwitch(guibutton)! }
        return Dependency<Components>().addComponent<ButtonSwitchComponent>(guibutton)
    }

    static GetButtonSwitch(guibutton: GuiButton) {
        return Dependency<Components>().getComponent<ButtonSwitchComponent>(guibutton)
    }

}