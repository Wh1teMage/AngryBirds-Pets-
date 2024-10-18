import { Controller, OnStart, OnInit } from "@flamework/core";
import { GUIUtilities } from "client/classes/GUIUtilities";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { Events } from "client/network";
import { EggsData } from "shared/info/EggInfo";
import { PetsData } from "shared/info/PetInfo";
import { EggBuyType, EggValueType, IEggData, IEggModel } from "shared/interfaces/EggData";
import { PlayerController } from "./PlayerController";
import { FrameFabric } from "client/components/UIComponents/FrameComponent";
import { ImageComponent, ImageFabric } from "client/components/UIComponents/ImageComponent";
import { UIAnimations } from "shared/utility/UIAnimations";
import { StarterGui, ReplicatedStorage } from "@rbxts/services";
import { PetOperationStatus } from "shared/interfaces/PetData";
import { RelicPassiveNames, RelicsCases, RelicsInfo } from "shared/info/RelicsInfo";
import { UIControllerSetup } from "./UIControllerSetup";
import { GroupPopUpFabric } from "client/components/UIComponents/GroundPopUpComponent";
import { RelicOperationStatus } from "shared/enums/RelicEnums";

//basically initializer

@Controller({})
export class RelicCasesController implements OnStart, OnInit {

    private _playerController: PlayerController
    private _UIControllerSetup: UIControllerSetup

    constructor(UIControllerSetup: UIControllerSetup) {
        this._UIControllerSetup = UIControllerSetup
        this._playerController = UIControllerSetup._playerController
    }

    onInit() {
        
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }

        /*
        let profileData = this._playerController.replica.Data.Profile
        let UIPath = this._UIControllerSetup.UIPath

        let relicGui = UIPath.RelicOpen.get<ImageComponent>()

        let buttons = relicGui.instance.WaitForChild('Buttons') as Frame
        let relics = relicGui.instance.WaitForChild('Relics') as Frame
        let templates = relicGui.instance.WaitForChild('Template') as Frame

        let caseName = relicGui.instance.WaitForChild('EggName') as TextLabel

        let relicUITemplate = templates.WaitForChild('RelicExample');

        let selectedRelic: string | undefined = undefined;

        ButtonFabric.CreateButton(buttons.WaitForChild('Buy1') as ImageButton).BindToClick(() => {
            if (!selectedRelic) { return }
            Events.ManageRelic.fire(RelicOperationStatus.OpenCase, selectedRelic, 1)
        })

        ButtonFabric.CreateButton(buttons.WaitForChild('Buy3') as ImageButton).BindToClick(() => {
            if (!selectedRelic) { return }
            Events.ManageRelic.fire(RelicOperationStatus.OpenCase, selectedRelic, 3)
        })

        ButtonFabric.CreateButton(buttons.WaitForChild('Buy10') as ImageButton).BindToClick(() => {
            if (!selectedRelic) { return }
            if (!profileData.Products.includes('10relics')) { Events.PurchasePrompt(1854974372); return }
            Events.ManageRelic.fire(RelicOperationStatus.OpenCase, selectedRelic, 10)
        })

        this._playerController.replica.ListenToChange('Profile.Values.GemsVal', (newval) => {
            (relicGui.instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newval)
        });

        (relicGui.instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.Values.GemsVal);

        let relicOverlay = UIPath.RelicOverlay.get<ImageComponent>().instance

        for (let relicCase of RelicsCases) {
            let data = relicCase[1]
            
            let part = data.part

            if (!part) { continue }

            let caseCircle = GroupPopUpFabric.CreateGroupPopUp(part)

            caseCircle.radius = 10

            let images = new Map<string, string>([
                ['BonusShotRelic', 'rbxassetid://17812159995'],
                ['FreeEggRelic', 'rbxassetid://17812159995'],

                ['Cashback Ticket', 'rbxassetid://17809152780'],
                ['Mystic Clover', 'rbxassetid://17809347283'],
                ['Pets Wings', 'rbxassetid://17809109428'],
                ['Dice of Power', 'rbxassetid://17812159995'],
                ['Mobility Shoes', 'rbxassetid://17809246321'],
                ['Medal of Trophies', 'rbxassetid://17809328465'],
                ['Mysterious Paw', 'rbxassetid://17809379160'],
                ['Speed Fire', 'rbxassetid://18259615397'],
                ['Golden Egg', 'rbxassetid://18260072723'],
            ])
    
            caseCircle.BindToEnter(() => { 

                selectedRelic = data.name
                caseName.Name = data.name

                relics.GetChildren().forEach((val) => {
                    if (val.IsA('ImageButton')) { val.Destroy() }
                })

                let overallWeight = 0

                data.reward.Chances?.forEach((val) => {
                    overallWeight += val.weight
                })

                data.reward.Chances?.forEach((val) => {
                    if (!val.reward.Relics) { return }
                    let randomRelic = val.reward.Relics[0]
                    let relicUI = relicUITemplate.Clone() as ImageButton;

                    print(randomRelic.name);

                    (relicUI.WaitForChild('Percent') as TextLabel).Text = tostring(math.round(val.weight/overallWeight*100*100)/100)+'%';
                    (relicUI.WaitForChild('RelicName') as TextLabel).Text = randomRelic.name;
                    (relicUI.WaitForChild('ImageLabel') as ImageLabel).Image = images.get(randomRelic.name)!;

                    relicUI.Visible = true
                    relicUI.Parent = relics

                    let relicButton = ButtonFabric.CreateButton(relicUI)

                    let info = RelicsInfo.get(RelicPassiveNames.get(randomRelic.name)!)![randomRelic.level-1]!
                    let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(info.rarity) as UIGradient

                    (relicUI.WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;

                    let stats = relicOverlay.WaitForChild('Stats') as Frame;

                    relicButton.BindToEnter(() => {
                        relicOverlay.Visible = true;
    
                        (relicOverlay.WaitForChild('RelicName') as TextLabel).Text = randomRelic.name;
                        (stats.WaitForChild('RelicBuff') as TextLabel).Text = info.desc;
                        (stats.WaitForChild('RelicRarity').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                        (stats.WaitForChild('RelicRarity').WaitForChild('Text') as TextLabel).Text = info.rarity;
                    })

                    relicButton.BindToLeave(() => {
                        relicOverlay.Visible = false
                    })
                });

                (buttons.WaitForChild('Buy1').WaitForChild('Price') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(data.price);
                (buttons.WaitForChild('Buy3').WaitForChild('Price') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(data.price*3);
                (buttons.WaitForChild('Buy10').WaitForChild('Price') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(data.price*10);

                relicGui.Open() 
            })

            caseCircle.BindToLeave(() => { relicGui.Close() })
            
        }
        */

    }

    onStart() {
        
    }
}