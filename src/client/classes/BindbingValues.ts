import { RunService } from "@rbxts/services"

const activeBindings: Array<Binding<any>> = []

/*
RunService.BindToRenderStep('ValuesRender', 1, () => {
    activeBindings.forEach((bind) => {
        bind.UseCallbacks()
    })
})
*/

//Maybe add this one later

export class Binding<bindtype> {
    private _value: bindtype
    private _callbacks: Array<(val: bindtype) => void> = []

    constructor(value: bindtype) {
        this._value = value
        activeBindings.push(this)
    }

    public AddCallback(callback: (val: bindtype) => void) {
        this._callbacks.push(callback)
        this.UseCallbacks()
    }

    public UseCallbacks() {
        this._callbacks.forEach((callback) => { callback(this._value) })
    }

    public RemoveCallbacks() {
        this._callbacks.clear()
    }

    public Remove() {
        activeBindings.remove(activeBindings.indexOf(this))
    }

    public set(value: bindtype) {
        this._value = value
        this.UseCallbacks()
    }

    public get() {
        return this._value
    }
}