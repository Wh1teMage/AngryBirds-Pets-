import { Lighting, TweenService } from "@rbxts/services";

let blurLocked = false

export class UIAnimations {

    static defaultInfo = new TweenInfo(1)

    static TestAnimation(obj: GuiObject, info: TweenInfo, params: {position: UDim2, size: UDim2}) {
        let animation = TweenService.Create(obj, info, {'Position': params.position, 'Size': params.size})
        return animation
    }

    static TestAnimation2(obj: GuiObject) {
        TweenService.Create(obj, new TweenInfo(1, Enum.EasingStyle.Quint, Enum.EasingDirection.In), {'Position': new UDim2(1, 0, 1, 0)}).Play()
    }

    static Blur() {
        if (blurLocked) { return }
        blurLocked = true

        let effect = Lighting.WaitForChild('Blur') as BlurEffect
        let result = 0
        if (effect.Size === 0) { result = 12 }
        
        let tween = TweenService.Create(effect, new TweenInfo(.3, Enum.EasingStyle.Quint, Enum.EasingDirection.In), {'Size': result })
        tween.Play()
        tween.Completed.Connect(() => {blurLocked = false})
    }

}