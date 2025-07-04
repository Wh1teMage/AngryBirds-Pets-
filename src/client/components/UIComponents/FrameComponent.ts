import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { UIAnimations } from "shared/utility/UIAnimations";

interface Attributes {}

@Component({})
export class FrameComponent extends BaseComponent<Attributes, Frame> implements OnStart {

    onStart() {
        
        this.BindToOpen(() => { })
        this.BindToClose(() => {  })

        this.instance.MouseEnter.Connect(() => {
            this._onEnter?.forEach((val) => { val(this.instance) })
        })

        this.instance.MouseLeave.Connect(() => {
            this._onLeave?.forEach((val) => { val(this.instance) })
        })
    }

    public IsOpened = false
    public CanBeClosedByOthers = true

    private _locked = false

    private _onOpen: Array<(arg: Frame) => void> = []
    private _onClose: Array<(arg: Frame) => void> = []

    private _onEnter?: Array<(arg: Frame) => void> = []
    private _onLeave?: Array<(arg: Frame) => void> = []

    //private _onOpen?: (arg: Frame) => void = undefined
    //private _onClose?: (arg: Frame) => void = undefined

    public BindToOpen(opencallback: (arg: Frame) => void) {
        this._onOpen.push(opencallback)
    }

    public BindToClose(closecallback: (arg: Frame) => void) {
        this._onClose.push(closecallback)
    }

    public BindToEnter(entercallback: (arg: Frame) => void) {
        this._onEnter?.push(entercallback)
    }

    public BindToLeave(leavecallback: (arg: Frame) => void) {
        this._onLeave?.push(leavecallback)
    }

    public Open() {
        if (!this._onOpen || this._locked) {return}
        this._locked = true
        this._onOpen.forEach((val) => { val(this.instance) })
        this._locked = false
        this.IsOpened = true
    }

    public Close() {
        if (!this._onClose || this._locked) {return}
        this._locked = true
        this._onClose.forEach((val) => { val(this.instance) })
        this._locked = false
        this.IsOpened = false
    }

    public Change() {
        if (this.IsOpened) this.Close()
        else this.Open()
    }

}

export class FrameFabric {

    static CreateFrame(frame: Frame) {
        return Dependency<Components>().addComponent<FrameComponent>(frame)
    }

}