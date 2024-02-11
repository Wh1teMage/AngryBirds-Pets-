import { Lighting, TweenService } from "@rbxts/services";

let blurLocked = false
let fovLocked = false
let defaultFOV = 70

export class UIAnimations {

    static defaultInfo = new TweenInfo(1)

    static TestAnimation(obj: GuiObject, info: TweenInfo, params: {position: UDim2, size: UDim2}) {
        let animation = TweenService.Create(obj, info, {'Position': params.position, 'Size': params.size})
        return animation
    }

    static TestAnimation2(obj: GuiObject) {
        TweenService.Create(obj, new TweenInfo(1, Enum.EasingStyle.Quint, Enum.EasingDirection.In), {'Position': new UDim2(1, 0, 1, 0)}).Play()
    }

    static MainFrameAnimationOpen(obj: GuiObject, params: {position: UDim2, size: UDim2}) {
        let animation = TweenService.Create(obj, new TweenInfo(.3, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {'Position': params.position, 'Size': params.size})
        animation.Play()
        animation.Completed.Wait()
        return animation
    }

    static MainFrameAnimationClose(obj: GuiObject, params: {position: UDim2, size: UDim2}) {
        let animation = TweenService.Create(obj, new TweenInfo(.3, Enum.EasingStyle.Back, Enum.EasingDirection.In), {'Position': params.position, 'Size': params.size})
        animation.Play()
        animation.Completed.Wait()
        return animation
    }

    static BlurSwitch(result: number) {
        if (blurLocked) { return }
        blurLocked = true

        let effect = Lighting.WaitForChild('Blur') as BlurEffect
        
        let tween = TweenService.Create(effect, new TweenInfo(.2, Enum.EasingStyle.Quint, Enum.EasingDirection.In), {'Size': result })
        tween.Play()
        tween.Completed.Connect(() => { blurLocked = false })
    }

    static Zoom(targetFOV: number) {
        if (fovLocked) { return }
        fovLocked = true

        if (targetFOV === 0) { targetFOV = defaultFOV }
        let camera = game.Workspace.CurrentCamera!

        let tween = TweenService.Create(camera, new TweenInfo(.2, Enum.EasingStyle.Linear), {'FieldOfView': targetFOV})
        tween.Play()
        tween.Completed.Connect(() => { fovLocked = false })
    }

}