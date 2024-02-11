import { Players } from "@rbxts/services"

export class EffectsUtilities {

    public static PlaySound(soundobj: string | Sound) {

        if (!Players.LocalPlayer.Character?.FindFirstChild('Head')) { return }

        if (typeOf(soundobj) === 'string') {
            let sound = new Instance('Sound')
            sound.SoundId = soundobj as string
            sound.PlayOnRemove = true
            sound.Parent = Players.LocalPlayer.Character?.WaitForChild('Head')
            sound.Destroy()

            return
        }
        
        let sound = (soundobj as Sound).Clone()

        sound.PlayOnRemove = true
        sound.Parent = Players.LocalPlayer.Character?.WaitForChild('Head')
        sound.Destroy()

    } 
    
}