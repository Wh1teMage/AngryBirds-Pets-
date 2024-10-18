import { Players, ReplicatedStorage } from "@rbxts/services"
import { Events } from "client/network";
import { EffectName } from "shared/enums/EffectEnums";
import { EffectsUtilities } from "shared/utility/EffectsUtilities"
import { TweenService, RunService, HttpService } from "@rbxts/services";
import { ToolOperationStatus } from "shared/interfaces/ToolData";
import { Binding } from "client/classes/BindbingValues";
import { EggBuyType, IEggModel } from "shared/interfaces/EggData";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { defaultGlobal } from "shared/info/DatastoreInfo";
import { EggsData } from "shared/info/EggInfo";
import { PetsData } from "shared/info/PetInfo";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { PlayerController } from "client/controllers/PlayerController";
import { DynamicText, StrokeInfo } from "client/classes/DynamicText";
import { ImageFabric } from "client/components/UIComponents/ImageComponent";
import { Rarities } from "shared/interfaces/PetData";
import { ReplicationOperationStatus } from "shared/enums/ReplicationEnums";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const player = Players.LocalPlayer

const mainUI = playerGui.WaitForChild('MainUI', 40) as ScreenGui
const circle = mainUI.WaitForChild('Templates').WaitForChild('ClickEffect') as ImageLabel

let canFireUseEvents = true
let playingAnimation = false

let dashing = false
let lastDash = 0

export const PlayEffect = (name: string, additional?: Map<string, any>) => {
    if (!Effects.get(name)) { warn('Effects Doesnt Exist!'); return }
    Effects.get(name)!(additional)
}

export const Effects = new Map<string, (
    additional?: Map<string, any>
) => void>([])

Effects.set('ReplicatePurchase', (additional) => {
    Events.PurchasePrompt.fire(additional?.get('productId') as number, player.UserId)
})

Effects.set('ClickSound', () => {
    if (!PlayerController.enabledSFX) { return }
    EffectsUtilities.PlaySound('rbxassetid://6052548458') //46760716
})

Effects.set('HoverSound', () => {
    if (!PlayerController.enabledSFX) { return }
    EffectsUtilities.PlaySound('rbxassetid://10066936758')
})

Effects.set('EarnSound', () => {
    if (!PlayerController.enabledSFX) { return }
    EffectsUtilities.PlaySound('rbxassetid://8755719003')
})

Effects.set('EquipSound', () => {
    if (!PlayerController.enabledSFX) { return }
    EffectsUtilities.PlaySound('rbxassetid://3746956704')
})

Effects.set('ClickEffect', (additional) => {
    
    let clonedCircle = circle.Clone()
    let position = additional!.get('position') as Vector2

    clonedCircle.Visible = true
    clonedCircle.Parent = mainUI
    clonedCircle.Position = UDim2.fromOffset(position.X, position.Y+60)
    clonedCircle.Size = UDim2.fromScale(.05, .05)

    TweenService.Create(clonedCircle, new TweenInfo(0.25), {'Size': UDim2.fromScale(0.1, 0.1)}).Play()
    TweenService.Create(clonedCircle, new TweenInfo(0.25), {'ImageTransparency': 1}).Play()

    task.delay(0.25, () => { clonedCircle.Destroy() })

})

Effects.set('ChangeUseStatus', (additional) => {
    canFireUseEvents = additional!.get('bool') as boolean
})

Effects.set('Click', () => {
    PlayerController.lastClick = os.time()
    if (canFireUseEvents) { Events.ManageTool.fire(ToolOperationStatus.Use, 'default') } 
    else ( Events.ManageTool.fire(ToolOperationStatus.Use, 'restricted') )
}) 

Effects.set('ClickBind', (additional) => {
    let bind = additional!.get('bind') as Binding<number>
    bind.set(bind.get()+math.random(10, 30)/10)
})

Effects.set('DonationStarted', () => {
    let frame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('PurchaseAttempt') as Frame

    frame.Visible = true
    frame.Transparency = 1

    TweenService.Create(frame, new TweenInfo(.1), { 'Transparency': 0.35 }).Play()

    let logo = frame.WaitForChild('Logo') as ImageLabel

    while (frame.Visible && task.wait(.1)) {
        let angle = 10 * (math.abs(math.sin(math.rad(frame.Rotation)))+1)
        TweenService.Create(logo, new TweenInfo(.1, Enum.EasingStyle.Linear), { 'Rotation': logo.Rotation + angle }).Play()
    }

})

Effects.set('DonationEnded', () => {
    let frame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('PurchaseAttempt') as Frame
    TweenService.Create(frame, new TweenInfo(.1), { 'Transparency': 1 }).Play()
    task.wait(.1)
    frame.Visible = false
})

Effects.set('SpinStarted', (additional) => {
    print(additional, 'SpinStarted')
    let spinHolder = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('WheelSpin').WaitForChild('SpinHolder') as ImageLabel

    let rewardName = additional!.get('Reward') as string
    let spinTime = additional!.get('SpinTime') as number

    let rewardsList = new Map<string, {nameUI: string, rotation: number}>([
        ['StrengthPotion', { nameUI: '1', rotation: 0 }],
        ['GemsPotion', { nameUI: '2', rotation: 300 }],
        ['Gems1', { nameUI: '3', rotation: 240 }],
        ['Gems2', { nameUI: '4', rotation: 180 }],
        ['Strength', { nameUI: '5', rotation: 120 }],
        ['Pet', { nameUI: '6', rotation: 60 }],
    ])

    spinHolder.Rotation = 0
    
    let delta = .1
    let newSpinTime = (spinTime+1)/delta
    let maxDegree = 360*6 + rewardsList.get(rewardName)!.rotation + math.random(-20, 20)

    let angularSpeed = maxDegree*2/newSpinTime
    let currentangularspeed = angularSpeed
    let decrease = angularSpeed/newSpinTime
    
    let i = 0

    while (i < maxDegree) {
        i += math.abs(currentangularspeed)
        i = math.clamp(math.round(i), 0, maxDegree)
        currentangularspeed -= decrease
        print(currentangularspeed, decrease)

        TweenService.Create(spinHolder, new TweenInfo(delta, Enum.EasingStyle.Linear), { 'Rotation': i }).Play()
        task.wait(delta)
    }

})

Effects.set('Notify', (additional) => {
    let message = additional!.get('Message') as string
    let imageName = additional!.get('Image') as string

    if (!PlayerController.enabledNotifications) { return }

    let images = new Map<string, string>([
        ['Default', 'rbxassetid://16810405068'],
        ['NewGift', 'rbxassetid://16245539978'],
        ['NewWorld', 'rbxassetid://16733350897'],
        ['NewWorldBundle', 'rbxassetid://16246032112'],
        ['Success', 'rbxassetid://17183664995'],
        ['Error', 'rbxassetid://17183659033'],
        ['ShadowEgg', 'rbxassetid://14254306466'],
        ['NewSpin', 'rbxassetid://16246051452'],
        ['SuccessfulFollow', 'rbxassetid://16248802485'],
        ['RebirthPossible', 'rbxassetid://16244936352'],
        ['NewPotion', 'rbxassetid://16775664373'],

        ['Wins', 'rbxassetid://16245102737'],
        ['Accuracy', 'rbxassetid://16244326096'],
        ['Gems', 'rbxassetid://16245168238'],
        ['Stars', 'rbxassetid://16245243691'],
    ])

    if (!imageName || !images.get(imageName)) { imageName = 'Default' }

    let notifications = mainUI.WaitForChild('Notifications')
    let notifyTemplate = notifications.WaitForChild('Template').WaitForChild('Notification').Clone() as TextLabel;

    //(notifyTemplate.WaitForChild('Icon') as ImageLabel).Image = images.get(imageName)!;

    let sizeX = notifyTemplate.Size.X.Scale
    let sizeY = notifyTemplate.Size.Y.Scale

    notifyTemplate.Parent = notifications
    notifyTemplate.Size = UDim2.fromScale(sizeX, 0)
    notifyTemplate.Visible = true

    let dynamicCodesText = new DynamicText(
        notifyTemplate,
        message,
        new Map<number, StrokeInfo>([[200, {Speed: 50}]])
    )

    dynamicCodesText.Start()

    TweenService.Create(notifyTemplate, new TweenInfo(.4, Enum.EasingStyle.Quad), {'Size': UDim2.fromScale(sizeX, sizeY)}).Play()
    EffectsUtilities.PlaySound('rbxassetid://7383525713')

    task.delay(5, () => {
        TweenService.Create(notifyTemplate, new TweenInfo(.4, Enum.EasingStyle.Quad), {'Size': UDim2.fromScale(sizeX, 0)}).Play()
        task.wait(.3)
        notifyTemplate.Destroy()
    })
})

Effects.set('PlaySound', (additional) => {
    if (!PlayerController.enabledSFX) { return }
    let soundId = additional!.get('Sound') as string

    let sound = new Instance('Sound')
    sound.SoundId = soundId
    sound.Parent = game.Workspace
    sound.PlayOnRemove = true
    sound.Destroy()
})

Effects.set('Shoot', () => {
    if (!player.Character) { return }
    let humanoid = player.Character?.WaitForChild('Humanoid') as Humanoid

    if (playingAnimation) { return }
    if (!humanoid) { return }

    let animation = new Instance('Animation')
    animation.AnimationId = ['rbxassetid://18663680618', 'rbxassetid://18663686040'][math.random(0, 1)]  //16950998426
    
    playingAnimation = true

    let track = humanoid.LoadAnimation(animation)
    track.Looped = false
    track.Play()

    task.delay(.55, () => {
        track.Stop()
        playingAnimation = false
    })

    EffectsUtilities.PlaySound('rbxassetid://4374877983')
})


Effects.set('ReplicateRewards', (additional) => {
    let valueAmount = additional!.get('Amount') as number
    let repeats = additional!.get('Repeats') as number
    let imageName = additional!.get('Image') as string

    let statRewardNames = new Map<string, string>([
        ['Wins', 'WinsInfo'],
        ['Accuracy', 'AccuracyInfo'],
        ['Gems', 'GemsInfo'],
        ['Stars', 'StarsInfo'],
    ])

    let name = statRewardNames.get(imageName)!

    print(name)

    let statsFrame = mainUI.WaitForChild('StatsInfo') as Frame
    let boostFrame = mainUI.WaitForChild('BoostInfo') as Frame
    
    let info = statsFrame.WaitForChild('Templates').WaitForChild(name) as Frame
    let accuracyLabel = boostFrame.WaitForChild('Holder') as Frame

    let positionList = new Map<string, {pos: UDim2, label: Frame}>([
        ['AccuracyInfo', {pos: UDim2.fromScale(0.5 , -0.3), label: accuracyLabel}],
        ['GemsInfo', {pos: UDim2.fromScale(0.5 , -0.3), label: accuracyLabel}],
    ])

    if (!info) { return }

    let tweenInfo = new TweenInfo(1, Enum.EasingStyle.Quad)
    let tweenInfo2 = new TweenInfo(.4, Enum.EasingStyle.Quad);

    for (let i = 0; i < repeats; i++) {

        task.wait(.1)

        task.spawn(() => {

            let clonnedInfo = info.Clone();

            (clonnedInfo.WaitForChild('Value') as TextLabel).Text = '+'+tostring(valueAmount)
        
            clonnedInfo.Visible = true
            clonnedInfo.Position = UDim2.fromScale(math.random(0, 100)/100, math.random(0, 100)/100)
            clonnedInfo.Parent = statsFrame
        
            //print(clonnedInfo.Parent, delta, clonnedInfo)
        
            task.wait(.5)
        
            //TweenService.Create(clonnedInfo, tweenInfo, { 'Size': UDim2.fromScale(0,0) }).Play()
            TweenService.Create(clonnedInfo, tweenInfo, { 'Position': positionList.get(name)!.pos }).Play()
        
            TweenService.Create(clonnedInfo.WaitForChild('Value').WaitForChild('UIStroke') as UIStroke, tweenInfo2, { 'Transparency': 1 }).Play()
            TweenService.Create(clonnedInfo.WaitForChild('Value') as TextLabel, tweenInfo2, { 'TextTransparency': 1 }).Play()
        
            TweenService.Create(clonnedInfo.WaitForChild('Icon') as ImageLabel, tweenInfo, { 'ImageTransparency': 1 }).Play()
        
            task.wait(.5)
        
            TweenService.Create(positionList.get(name)!.label.WaitForChild('UIScale') as UIScale, new TweenInfo(.1), { 'Scale': 1.1 }).Play()
            task.wait(.1)
            TweenService.Create(positionList.get(name)!.label.WaitForChild('UIScale') as UIScale, new TweenInfo(.1), { 'Scale': 1 }).Play()
        
            clonnedInfo.Destroy()

        })

    }

})

Effects.set('Dash', () => {
    if (!player.Character) { return }
    let humanoid = player.Character?.WaitForChild('Humanoid') as Humanoid
    print('dashing')

    if (!humanoid) { return }
    if (dashing) { return }

    let cd = 1
    let duration = .02

    print((os.clock() - lastDash), (cd + duration))

    if ((os.clock() - lastDash) < (cd + duration)) { return }

    let dashButton = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('LowerList').WaitForChild('Dash') as GuiButton
    let cooldown = dashButton.WaitForChild('Cooldown') as Frame
    
    dashing = true

    let effects = ReplicatedStorage.WaitForChild('Templates').WaitForChild('Effects')

    let windEffect = effects.WaitForChild('Wind').Clone() as ParticleEmitter

    let velocity = new Instance('LinearVelocity')
    let attachment = new Instance('Attachment')

    let vfxAttachment = new Instance('Attachment')

    velocity.RelativeTo = Enum.ActuatorRelativeTo.Attachment0
    velocity.VectorVelocity = new Vector3(0, 0, -300/2)

    velocity.ForceLimitMode = Enum.ForceLimitMode.PerAxis
    velocity.MaxAxesForce = new Vector3(0, 0, 50000)

    vfxAttachment.Parent = player.Character.PrimaryPart!
    attachment.Parent = player.Character.PrimaryPart!
    velocity.Parent = player.Character.PrimaryPart!

    velocity.Attachment0 = attachment

    cooldown.Visible = true
    cooldown.Size = UDim2.fromScale(1,1)

    windEffect.Parent = vfxAttachment
    vfxAttachment.CFrame = vfxAttachment.CFrame.mul(CFrame.Angles(1, 0, 0))

    task.spawn(() => {
        for (let i = 0; i < 3; i++) {
            windEffect.Emit(10)
            task.wait(.1)
        }
    })

    task.delay(duration + 1, () => {
        vfxAttachment.Destroy()
    })

    let animation = new Instance('Animation')
    animation.AnimationId = 'rbxassetid://18663667691'
    
    playingAnimation = true

    let track = humanoid.LoadAnimation(animation)
    track.Looped = false
    track.Play()

    task.delay(.55, () => {
        track.Stop()
        playingAnimation = false
    })

    task.wait(duration)

    dashing = false
    lastDash = os.clock()

    attachment.Destroy()
    velocity.Destroy()

    TweenService.Create(cooldown, new TweenInfo(cd, Enum.EasingStyle.Linear), {Size: UDim2.fromScale(1, 0)}).Play()
})

Effects.set('OpenEgg', (additional) => {
    let buyType = additional!.get('BuyType') as EggBuyType
    let billboards = BillboardFabric.GetBillboards()

    if (buyType === EggBuyType.Auto) {
        PlayerController.autoEgg = !PlayerController.autoEgg
        return
    }

    billboards.forEach((val) => {
        if (!val.instance.Enabled) { return }
        Events.BuyEgg(val.instance.Name, buyType)
    })
})

Effects.set('LimitedPets', (additional) => {
    let info = additional!.get('Info') as Map<string, number>
    print(info)
    let scrollingFrame = player.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('Store').WaitForChild('ScrollingFrame') as ScrollingFrame
    let limitedPets = scrollingFrame.WaitForChild('LimitedPets').WaitForChild('Pets')

    let petList = new Map<string, string>([
        ['Limited1', 'LimitedPet1'],
        ['Limited2', 'LimitedPet2'],
        ['Limited3', 'LimitedPet3'],
        ['Limited4', 'LimitedPet4'],
    ])

    info.forEach((val, key) => {
        let petUI = limitedPets.WaitForChild(petList.get(key)!);
        (petUI.WaitForChild('Left') as TextLabel).Text = tostring(val)+'/'+tostring(defaultGlobal.get(key))+' Left'
    })

})

Effects.set('EggHatched', (additional) => {
    let hatchFrame = mainUI.WaitForChild('PetHatching') as ViewportFrame
    let hatchTemplates = hatchFrame.WaitForChild('Templates') as Frame
    let hatchTemplate = hatchTemplates.WaitForChild('Hatch') as Frame

    let bit = hatchTemplates.WaitForChild('Bit') as ImageLabel
    let beam = hatchTemplates.WaitForChild('Beam') as ImageLabel
    let glow = hatchTemplates.WaitForChild('Glow') as ImageLabel
    let background = hatchTemplates.WaitForChild('Background') as ImageLabel

    let petRarities = ReplicatedStorage.WaitForChild('PetRarities')

    let speed = additional!.get('Speed') as number
    let length = 30
    let fadeOff = 1.6/speed
    let tweenTime = .3
    let deltaPerBit = 18

    let egg = EggsData.get(additional!.get('EggName'))!
    let pets = []
    
    for (let name of additional!.get('Pets')) { pets.push(PetsData.get(name)) }

    let viewCamera = hatchFrame.FindFirstChild('Camera') as Camera

    if (!viewCamera) {
        viewCamera = new Instance('Camera')
        viewCamera.Parent = hatchFrame
    }

    viewCamera.CFrame = new CFrame(new Vector3(0,0,0), new Vector3(0,0,1))

    for (let obj of hatchFrame.WaitForChild('Hatching')!.GetChildren()) {
        if (obj.IsA('UIListLayout')) { continue }
        obj.Destroy()
    }

    hatchFrame.Transparency = 1
    hatchFrame.Visible = true
    
    TweenService.Create(hatchFrame, new TweenInfo(.3), { 'Transparency': 0.35 }).Play()

    let eggRotationOffset = CFrame.Angles(0,0,0)
    if (egg.rotationOffset) { eggRotationOffset = egg.rotationOffset }
    let count = 0

    let shopEggsFrame = mainUI.WaitForChild('Eggs') as ImageLabel
    let shopEggsFrameComponent = ImageFabric.GetImage(shopEggsFrame)

    let wasOpened = false

    if (shopEggsFrameComponent && shopEggsFrameComponent.IsOpened) { wasOpened = true; shopEggsFrameComponent.Close() }
    
    for (let pet of pets) {
        count += 1

        let clonnedHatch = hatchTemplate.Clone()
        clonnedHatch.Visible = true
        clonnedHatch.Parent = hatchFrame.WaitForChild('Hatching')

        let eggFrame = clonnedHatch.WaitForChild('Egg') as ImageLabel
        let petFrame = clonnedHatch.WaitForChild('Pet') as ViewportFrame
    
        let petName = clonnedHatch.WaitForChild('PetName') as TextLabel
        let petRarity = clonnedHatch.WaitForChild('Rarity') as TextLabel

        eggFrame.Image = egg.image
        petFrame.CurrentCamera = viewCamera

        // length/(pets.size()+1)*count - length/2
        //eggModel.Parent = eggFrame
        
        eggFrame.Visible = true

        let newGlow = glow.Clone()
        //newGlow.Position = clonnedHatch.Position
        newGlow.Visible = false
        newGlow.Parent = clonnedHatch

        let newBack = background.Clone()
        //newBack.Position = clonnedHatch.Position
        newBack.Visible = true
        newBack.Parent = clonnedHatch

        TweenService.Create(newBack, new TweenInfo(fadeOff/2, Enum.EasingStyle.Linear), { 'ImageTransparency': 0 }).Play()
        TweenService.Create(newBack, new TweenInfo(fadeOff*2, Enum.EasingStyle.Linear), { 'Rotation': 200 }).Play()

        task.spawn(() => {
            let prevCframe = viewCamera.CFrame

            let delta = .5
            let i = 0 

            let axis = egg.rotationAxis
            if (!axis) { axis = new Vector3(0,1,0) }

            while (i < 360*7) {
                i += delta
                delta += .5*speed**2

                eggFrame.Rotation = math.sin(math.rad(i))*30

                //make tween instead of this
                
                //TweenService.Create(viewCamera, new TweenInfo(.01), {'CFrame': new CFrame(viewCamera.CFrame.Position).mul(CFrame.Angles( 0, 0, math.sin(math.rad(i)) ))}).Play()

                if (math.round(delta/deltaPerBit) > 0) {
                    let count = math.round(delta/deltaPerBit) 

                    for (let j = 0; j < count; j++) {
                        let newBit = bit.Clone()
                        newBit.Size = UDim2.fromScale(math.random(5, 10)/100, math.random(5, 10)/100)
                        newBit.Visible = true
                        newBit.Parent = clonnedHatch

                        let randAngle1 = math.rad(math.random(0, 360))
                        let randAngle2 = math.rad(math.random(0, 360))

                        let position = UDim2.fromScale(3*math.cos(randAngle1)/2+0.5, 3*math.sin(randAngle2)/2+0.5)

                        TweenService.Create(newBit, new TweenInfo(3, Enum.EasingStyle.Linear), { 'Rotation': math.random(500, 700) }).Play()
                        TweenService.Create(newBit, new TweenInfo(1.5), { 'Position': position }).Play()

                        task.delay(1.5, () => { 
                            TweenService.Create(newBit, new TweenInfo(.1), { 'ImageTransparency': 1 }).Play()
                            task.wait(.1)
                            newBit.Destroy() 
                        })
                    }

                }

                task.wait()
            }            

            let finalCframe = new CFrame(viewCamera.CFrame.Position.add(viewCamera.CFrame.LookVector.mul(6))).mul(pet!.stats.rotationOffset)

            let model = pet!.model.Clone() as Model
            model.PivotTo(finalCframe.mul(CFrame.Angles(0, 2, 0)))
            model.Parent = petFrame

            newBack.Visible = false
            newGlow.Visible = true
            eggFrame.Visible = false
            petFrame.Visible = true

            petName.Text = pet!.name
            petRarity.Text = pet!.stats.rarity;

            eggFrame.Image = '';

            (petName.WaitForChild('PetNameStroke') as TextLabel).Text = pet!.name;
            (petRarity.WaitForChild('Stroek') as TextLabel).Text = pet!.stats.rarity;

            petName.Visible = true
            petRarity.Visible = true

            let rarityGradient = petRarities.WaitForChild(pet!.stats.rarity).Clone()!
            rarityGradient.Parent = petRarity

            let primaryClone = model.PrimaryPart!.Clone()
            primaryClone.CFrame = model.GetPivot()

            TweenService.Create(petName.WaitForChild('UIGradient') as UIGradient, new TweenInfo(fadeOff/2, Enum.EasingStyle.Linear), { 'Offset': new Vector2(.7, 0) }).Play()

            TweenService.Create(newGlow, new TweenInfo(fadeOff/8), { 'ImageTransparency': 0.3 }).Play()
            TweenService.Create(primaryClone, new TweenInfo(fadeOff/2, Enum.EasingStyle.Elastic), { 'CFrame': finalCframe }).Play()

            let completed = false
            primaryClone.Destroying.Connect(() => { completed = true } )

            task.spawn(() => { //cancer
                while (completed === false) {
                    task.wait()
                    model.PivotTo(primaryClone.CFrame)
                }
            })

            task.delay(fadeOff, () => {

                TweenService.Create(petRarity, new TweenInfo(tweenTime, Enum.EasingStyle.Back, Enum.EasingDirection.In), 
                    { 'Position': petRarity.Position.add(UDim2.fromScale(0, 1)) }).Play()

                TweenService.Create(petName, new TweenInfo(tweenTime, Enum.EasingStyle.Back, Enum.EasingDirection.In), 
                    { 'Position': petName.Position.add(UDim2.fromScale(0, 1)) }).Play()

                TweenService.Create(viewCamera, new TweenInfo(tweenTime, Enum.EasingStyle.Back, Enum.EasingDirection.In), 
                    { 'CFrame': viewCamera.CFrame.add(new Vector3(0, 5, 0)) }).Play()

                TweenService.Create(newGlow, new TweenInfo(tweenTime), { 'ImageTransparency': 1 }).Play()
                
                pcall(() => {
                    if (!pet) { return }
                    let rarity = pet.stats.rarity

                    let messageData = {
                        //sender: Players.LocalPlayer,
                        message: `💎 ${Players.LocalPlayer.Name} has hatched a ${pet.stats.rarity} ${pet.name}`,
                        rarity: pet.stats.rarity,
                     }
    
                    if ([Rarities.Exclusive, Rarities.Mythic, Rarities.Secret].includes(rarity)) {
                        Events.ReplicateValues(ReplicationOperationStatus.ReplicateMessage, messageData)
                    }
                })

                task.wait(tweenTime)
                primaryClone.Destroy()
                model.Destroy()
                task.wait(tweenTime/3)
                petFrame.CurrentCamera!.CFrame = prevCframe
            })
        })


        if ((count%3) === 0 && pets.size() > 3) { 
            task.wait(6/speed)

            for (let obj of hatchFrame.WaitForChild('Hatching')!.GetChildren()) {
                if (!obj.IsA('GuiObject')) { continue }
                obj.Destroy()
            }
            
        } 
    }

    task.delay(fadeOff+3.1/speed, () => {
        TweenService.Create(hatchFrame, new TweenInfo(tweenTime), { 'Transparency': 1 }).Play()
        task.wait(tweenTime)
        print('Ended')
        hatchFrame.Visible = false

        if (shopEggsFrameComponent && wasOpened) { shopEggsFrameComponent.Open() }
    })

    /*

    let hatchFrame = mainUI.WaitForChild('HatchingFrame') as ViewportFrame
    let length = 30

    if (!hatchFrame.CurrentCamera) {
        let viewCamera = new Instance('Camera')
        viewCamera.CFrame = new CFrame(new Vector3(0,0,0), new Vector3(0,0,1))
        viewCamera.Parent = hatchFrame
        hatchFrame.CurrentCamera = viewCamera
    }

    let egg = EggsData.get(additional!.get('EggName'))!
    let pets = []
    
    for (let name of additional!.get('Pets')) {
        pets.push(PetsData.get(name))
    }

    let count = 0
    
    for (let pet of pets) {
        count += 1

        let eggModel = egg.model!.Clone()
        eggModel.PrimaryPart = eggModel.WaitForChild('Egg') as BasePart

        eggModel.PivotTo(new CFrame(new Vector3(length/(pets.size()+1)*count - length/2,0,7), new Vector3(0,0,0)).mul(CFrame.Angles(math.rad(90), 0, 0)))
        eggModel.Parent = hatchFrame
        
        task.spawn(() => {
            let delta = .1
            let i = 0
            while (i < 360*10) {
                i += delta
                delta += .1
                eggModel.PivotTo(new CFrame(eggModel.GetPivot().Position).mul(CFrame.Angles(math.rad(90), math.sin(math.rad(i)), 0)))
                task.wait()
            }

            let model = pet!.model.Clone()
            model.PivotTo(new CFrame(eggModel.GetPivot().Position).mul(pet!.stats.rotationOffset))
            model.Parent = hatchFrame

            eggModel.Destroy()
            
            task.delay(5, () => {
                model.Destroy()
            })
        })
    }

    */
})