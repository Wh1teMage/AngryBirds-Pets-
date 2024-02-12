import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { UIAnimations } from "shared/utility/UIAnimations";

interface Attributes {}

let IsOpenLocked = false // to prevent 2 windows openning at the exact time

@Component({})
export class ImageComponent extends BaseComponent<Attributes, ImageLabel> implements OnStart {

    onStart() {
        
        this.BindToOpen(() => { UIAnimations.BlurSwitch(16); UIAnimations.Zoom(80); this.instance.Visible = true; if (this.CanCloseOthers) { this.CloseOthers() } })
        this.BindToClose(() => { UIAnimations.BlurSwitch(0); UIAnimations.Zoom(0); task.delay(.3, () =>  this.instance.Visible = false) })

    }

    public IsOpened = false
    public CanBeClosedByOthers = true
    public CanCloseOthers = true

    private _locked = false

    private _onOpen: Array<(arg: ImageLabel) => void> = []
    private _onClose: Array<(arg: ImageLabel) => void> = []

    public BindToOpen(opencallback: (arg: ImageLabel) => void) {
        this._onOpen?.push(opencallback)
    }

    public BindToClose(closecallback: (arg: ImageLabel) => void) {
        this._onClose.push(closecallback)
    }

    public Open() {
        if (!this._onOpen || this._locked || IsOpenLocked || this.IsOpened) {return}
        this._locked = true
        IsOpenLocked = true
        this._onOpen.forEach((val) => { val(this.instance) })
        this._locked = false
        IsOpenLocked = false
        this.IsOpened = true
    }

    public Close() {
        if (!this._onClose || this._locked  || !this.IsOpened) {return}
        this._locked = true
        this._onClose.forEach((val) => { val(this.instance) })
        this._locked = false
        this.IsOpened = false
    }

    public Change() {
        if (this.IsOpened) this.Close()
        else this.Open()
    }

    public CloseOthers() {
        let components = Dependency<Components>().getAllComponents<ImageComponent>()

        for (let component of components) {
            if (!component.CanBeClosedByOthers) continue
            if (component === this) continue
            component.Close()
        }
    }

}

export class ImageFabric {

    static CreateImage(image: ImageLabel) {
        return Dependency<Components>().addComponent<ImageComponent>(image)
    }

}