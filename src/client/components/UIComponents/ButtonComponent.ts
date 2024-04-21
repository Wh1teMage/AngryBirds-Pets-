import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { PlayEffect } from "client/static/EffectsStatic";
import { EffectName } from "shared/enums/EffectEnums";
import { TweenService } from "@rbxts/services";
import Maid from "@rbxts/maid";
import { ImageComponent } from "./ImageComponent";

interface Attributes {}

@Component({})
export class ButtonComponent extends BaseComponent<Attributes, GuiButton> implements OnStart { 
    //requires futher investigation with maid, signal deletion, component deletion after instance deletion

    private _onClick?: Array<(arg: GuiButton) => void> = []
    private _onEnter?: Array<(arg: GuiButton) => void> = []
    private _onLeave?: Array<(arg: GuiButton) => void> = []

    private _defaultScaleValue = 1
    private _scale?: UIScale
    private maid: Maid = new Maid()

    private _defaultClick(arg: GuiButton) {
        PlayEffect('ClickSound')
    }

    private _defaultEnter(arg: GuiButton) {
        if (!this._scale) { return }
        TweenService.Create(this._scale, new TweenInfo(.1), { 'Scale': this._defaultScaleValue * 1.1 }).Play()
        PlayEffect('HoverSound')
    }

    private _defaultLeave(arg: GuiButton) {
        if (!this._scale) { return }
        TweenService.Create(this._scale, new TweenInfo(.1), { 'Scale': this._defaultScaleValue }).Play()
    }

    constructor() {
        super()

        this.BindToClick((arg: GuiButton) => this._defaultClick(arg))
        this.BindToEnter((arg: GuiButton) => this._defaultEnter(arg))
        this.BindToLeave((arg: GuiButton) => this._defaultLeave(arg))

        if (!this.instance.FindFirstChild('UIScale')) { return }
        let scale = this.instance.WaitForChild('UIScale') as UIScale

        this._scale = scale
        this._defaultScaleValue = scale.Scale
    }

    onStart() {
        
        this.maid.GiveTask(
            this.instance.MouseButton1Click.Connect(() => {
                this._onClick?.forEach((val) => { val(this.instance) })
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
        //if (ButtonFabric.GetButton(guibutton)) { return ButtonFabric.GetButton(guibutton)! }
        return Dependency<Components>().addComponent<ButtonComponent>(guibutton)
    }

    static GetButton(guibutton: GuiButton) {
        return Dependency<Components>().getComponent<ButtonComponent>(guibutton)
    }

}