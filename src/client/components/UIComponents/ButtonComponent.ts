import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { PlayEffect } from "client/static/EffectsStatic";
import { EffectName } from "shared/enums/EffectEnums";

interface Attributes {}

@Component({})
export class ButtonComponent extends BaseComponent<Attributes, GuiButton> implements OnStart { 
    //requires futher investigation with maid, signal deletion, component deletion after instance deletion

    private _onClick?: Array<(arg: GuiButton) => void> = []
    private _onEnter?: Array<(arg: GuiButton) => void> = []
    private _onLeave?: Array<(arg: GuiButton) => void> = []

    private _defaultClick(arg: GuiButton) {
        PlayEffect('ClickSound' as EffectName)
    }

    private _defaultEnter(arg: GuiButton) {}

    private _defaultLeave(arg: GuiButton) {}

    constructor() {
        super()

        this.BindToClick((arg: GuiButton) => this._defaultClick(arg))
        this.BindToEnter((arg: GuiButton) => this._defaultEnter(arg))
        this.BindToLeave((arg: GuiButton) => this._defaultLeave(arg))
    }

    onStart() {
        
        this.instance.MouseButton1Click.Connect(() => {
            this._onClick?.forEach((val) => { val(this.instance) })
        })

        this.instance.MouseEnter.Connect(() => {
            this._onEnter?.forEach((val) => { val(this.instance) })
        })

        this.instance.MouseLeave.Connect(() => {
            this._onLeave?.forEach((val) => { val(this.instance) })
        })

    }

    public BindToClick(clickcallback: (arg: GuiButton) => void) {
        this._onClick?.push(clickcallback)
    }

    public BindToEnter(entercallback: (arg: GuiButton) => void) {
        this._onEnter?.push(entercallback)
    }

    public BindToLeave(leavecallback: (arg: GuiButton) => void) {
        this._onLeave?.push(leavecallback)
    }

    public UnbindAll() {
        this._onClick = []
        this._onEnter = []
        this._onLeave = []
    }


}

export class ButtonFabric {

    static CreateButton(guibutton: GuiButton) {
        return Dependency<Components>().addComponent<ButtonComponent>(guibutton)
    }

}