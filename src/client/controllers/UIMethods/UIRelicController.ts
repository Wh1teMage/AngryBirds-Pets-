import { Controller, OnStart, OnInit } from "@flamework/core";
import { PlayerController } from "../PlayerController";
import { UIControllerSetup } from "../UIControllerSetup";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { ImageComponent } from "client/components/UIComponents/ImageComponent";
import { RelicOperationStatus } from "shared/enums/RelicEnums";
import { RelicPassiveNames, RelicsInfo } from "shared/info/RelicsInfo";
import { Events } from "client/network";
import { Players, Workspace, RunService, SocialService, TweenService, MarketplaceService, ReplicatedStorage, UserInputService, TeleportService, Lighting } from "@rbxts/services";
import { IPathObject } from "client/classes/ComponentsInitializer";

export class UIRelicController {

    private UIPath!: IPathObject
    private _playerController!: PlayerController

    constructor() {}

    public setupData(UIPath: IPathObject, PlayerController: PlayerController) {
        this.UIPath = UIPath
        this._playerController = PlayerController
    }

    public setupRelics() {
        let relics = this.UIPath.Relics.get<ImageComponent>().instance

        let playerRelics = relics.WaitForChild('PlayerRelics') as Frame
        let relicsFrame = relics.WaitForChild('RelicsFrame').WaitForChild('ScrollingFrame') as ScrollingFrame

        let relicOverlay = this.UIPath.RelicOverlay.get<ImageComponent>().instance

        let template = relics.WaitForChild('Template').WaitForChild('RelicExample') as ImageButton
        let imageTemplates = relics.WaitForChild('Icons') as Folder
        
        let icons = new Map<string, ImageLabel>([])

        imageTemplates.GetChildren().forEach((val) => {
            if (!val.IsA('ImageLabel')) { return }
            icons.set(val.Name, val)
        })

        relicsFrame.GetChildren().forEach((val) => {
            if (val.IsA('GuiButton')) { ButtonFabric.GetButton(val)?.UnbindAll(); val.Destroy() }
        })

        //print(this._playerController.replica.Data.Profile.Relics)

        ButtonFabric.CreateButton(playerRelics.WaitForChild('Buy') as ImageButton).BindToClick(() => {
            Events.PurchasePrompt(1854795275)
        })

        this._playerController.replica.Data.Profile.Relics.forEach((val) => {

            let relicUI = template.Clone()
            relicUI.Parent = relicsFrame;

            if (!icons.get(RelicPassiveNames.get(val.name)!)) { return }

            (relicUI.WaitForChild('Amount') as TextLabel).Text = tostring(val.amount);
            (relicUI.WaitForChild('ImageLabel') as ImageLabel).Destroy()

            let icon = icons.get(RelicPassiveNames.get(val.name)!)!.Clone()

            icon.Visible = true
            icon.Parent = relicUI

            relicUI.Name = tostring(val.name)
            relicUI.Visible = true

            let info = RelicsInfo.get(RelicPassiveNames.get(val.name)!)![val.level-1]!
            //print(info.rarity, info, val.name)
            let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(info.rarity) as UIGradient;

            (relicUI.WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;

            let component = ButtonFabric.CreateButton(relicUI)

            component.BindToClick(() => {
                if (playerRelics.Visible) {
                    Events.ManageRelic(RelicOperationStatus.Equip, val.name, val.level)
                }
                else {
                    this.updateRelicMerge(val.name, val.level, icon)
                }
            })

            let stats = relicOverlay.WaitForChild('Stats') as Frame;

            component.BindToEnter(() => {
                //print('Enter')

                relicOverlay.Visible = true;

                //print(relicOverlay.Visible)
                
                (relicOverlay.WaitForChild('RelicName') as TextLabel).Text = val.name;
                (stats.WaitForChild('RelicBuff') as TextLabel).Text = info.desc;
                (stats.WaitForChild('RelicRarity').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                (stats.WaitForChild('RelicRarity').WaitForChild('Text') as TextLabel).Text = info.rarity;
            })

            component.BindToLeave(() => {
                relicOverlay.Visible = false
            })
        });

    }

    public setupRelicsEvent() {
        let relicsEvent = this.UIPath.RelicsEvent.get<ImageComponent>().instance
        let relics = this.UIPath.Relics.get<ImageComponent>().instance

        let player = this._playerController.component.instance

        ButtonFabric.CreateButton(relicsEvent.WaitForChild('Quests').WaitForChild('Claim') as ImageButton).BindToClick(() => {
            Events.ManageRelic(RelicOperationStatus.OpenCase, 'EventTest', 1)
        })


        pcall(() => {
            let image = Players.GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.AvatarBust, Enum.ThumbnailSize.Size150x150);
            (relics.WaitForChild('PlayerRelics').WaitForChild('CharacterIcon') as ImageLabel).Image = image[0]
        })

    }

    public setupEquippedRelics() {
        
        let relics = this.UIPath.Relics.get<ImageComponent>().instance
        let playerRelics = relics.WaitForChild('PlayerRelics') as Frame

        let template = relics.WaitForChild('Template').WaitForChild('RelicExample').WaitForChild('ImageLabel') as ImageLabel
        let imageTemplates = relics.WaitForChild('Icons') as Folder
        
        let icons = new Map<string, ImageLabel>([])

        imageTemplates.GetChildren().forEach((val) => {
            if (!val.IsA('ImageLabel')) { return }
            icons.set(val.Name, val)
        })

        let relicSlots: ImageButton[] = []

        for (let v of ['RelicsSlotsLeft', 'RelicsSlotsRight', 'RelicsSlotsRobux']) {
            playerRelics.WaitForChild(v).GetChildren().forEach((val) => {
                if (!val.IsA('ImageButton')) { return }
                if (val.FindFirstChildWhichIsA('ImageLabel')) { val.FindFirstChildWhichIsA('ImageLabel')?.Destroy() }
                val.FindFirstChildWhichIsA('UIGradient')?.Destroy()
                if (ButtonFabric.GetButton(val)) { ButtonFabric.GetButton(val)?.UnbindAll() };
    
                (val.WaitForChild('TextLabel') as TextLabel).Visible = true
    
                relicSlots.push(val)
            })
        }

        //print(this._playerController.replica.Data.Profile.EquippedRelics)

        this._playerController.replica.Data.Profile.EquippedRelics.forEach((val, index) => {
            let selectedSlot = relicSlots[index]
            if (!selectedSlot) { return }

            let relicImage = icons.get(RelicPassiveNames.get(val.name)!)!.Clone()

            relicImage.Visible = true
            relicImage.Parent = selectedSlot;

            let info = RelicsInfo.get(RelicPassiveNames.get(val.name)!)![val.level-1]!
            let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(info.rarity) as UIGradient;

            gradient.Clone().Parent = selectedSlot;

            (selectedSlot.WaitForChild('TextLabel') as TextLabel).Visible = false;

            ButtonFabric.CreateButton(selectedSlot).BindToClick(() => {
                Events.ManageRelic(RelicOperationStatus.Unequip, val.name, val.level)
            })
        })
        
    }

    public setupRelicsMerge() {
        
        let relics = this.UIPath.Relics.get<ImageComponent>().instance
        let merge = relics.WaitForChild('Merge') as Frame
        let playerRelics = relics.WaitForChild('PlayerRelics') as Frame

        ButtonFabric.CreateButton(playerRelics.WaitForChild('Merge') as ImageButton).BindToClick((val) => {
            playerRelics.Visible = false
            merge.Visible = true
        })

        ButtonFabric.CreateButton(merge.WaitForChild('Back') as ImageButton).BindToClick((val) => {
            playerRelics.Visible = true
            merge.Visible = false
        })

        ButtonFabric.CreateButton(merge.WaitForChild('Merge') as ImageButton).BindToClick((val) => {
            if (!this._playerController.selectedMergeRelic) { return } //make properties into player

            let count = 0;

            (merge.WaitForChild('Buttons') as Frame).GetChildren().forEach((val) => {
                if (val.FindFirstChildWhichIsA('ImageLabel')) { count += 1 }
            });

            if (count < 3) { return }

            Events.ManageRelic(RelicOperationStatus.Merge, this._playerController.selectedMergeRelic.name, this._playerController.selectedMergeRelic.level)
        });


        (merge.WaitForChild('Buttons') as Frame).GetChildren().forEach((val) => {
            if (!val.IsA('ImageButton')) { return }

            ButtonFabric.CreateButton(val).BindToClick(() => {

                let count = 0;

                (merge.WaitForChild('Buttons') as Frame).GetChildren().forEach((val) => {
                    if (val.FindFirstChildWhichIsA('ImageLabel')) { count += 1 }
                });

                (val.WaitForChild('TextLabel') as TextLabel).Visible = true;
                if (val.FindFirstChildWhichIsA('ImageLabel')) { val.FindFirstChildWhichIsA('ImageLabel')?.Destroy() }
                val.FindFirstChildWhichIsA('UIGradient')?.Destroy()

                if (!val.Parent!.FindFirstChildWhichIsA('ImageLabel') && count === 1) {
                    this._playerController.selectedMergeRelic = undefined;
                    (merge.WaitForChild('RelicExample') as ImageLabel).FindFirstChildWhichIsA('ImageLabel')!.Destroy();
                    (merge.WaitForChild('RelicExample') as ImageLabel).FindFirstChildWhichIsA('UIGradient')?.Destroy();
                }
            })

        });

        ButtonFabric.CreateButton(merge.WaitForChild('RelicExample').WaitForChild('Delete') as ImageButton).BindToClick(() => {

            (merge.WaitForChild('Buttons') as Frame).GetChildren().forEach((val) => {
                if (!val.IsA('ImageButton')) { return }

                (val.WaitForChild('TextLabel') as TextLabel).Visible = true;
                val.FindFirstChildWhichIsA('ImageLabel')?.Destroy()
                val.FindFirstChildWhichIsA('UIGradient')?.Destroy()
            });

            this._playerController.selectedMergeRelic = undefined;
            (merge.WaitForChild('RelicExample') as ImageLabel).FindFirstChildWhichIsA('ImageLabel')?.Destroy();
            (merge.WaitForChild('RelicExample') as ImageLabel).FindFirstChildWhichIsA('UIGradient')?.Destroy();
        })

        let relicOverlay = this.UIPath.RelicOverlay.get<ImageComponent>().instance
        let mouse = this._playerController.component.instance.GetMouse()

        task.spawn(() => {
            while (task.wait()) {
                if (!relicOverlay.Visible) { continue }
                relicOverlay.Position = relicOverlay.Position.Lerp(UDim2.fromOffset(mouse.X+50, mouse.Y+100), .5)
            }
        })
        
    }

    public updateRelicMerge(name: string, level: number, image: ImageLabel) {
        
        let relics = this.UIPath.Relics.get<ImageComponent>().instance
        let merge = relics.WaitForChild('Merge') as Frame
        let playerRelics = relics.WaitForChild('PlayerRelics') as Frame

        if (!this._playerController.selectedMergeRelic) {
            this._playerController.selectedMergeRelic = {name: name, level: level}
            image.Clone().Parent = (merge.WaitForChild('RelicExample') as ImageLabel);

            (merge.WaitForChild('RelicExample') as ImageLabel).FindFirstChildWhichIsA('UIGradient')?.Destroy()

            let info = RelicsInfo.get(RelicPassiveNames.get(name)!)![level-1]!

            if (level < RelicsInfo.get(RelicPassiveNames.get(name)!)!.size()) {
                info = RelicsInfo.get(RelicPassiveNames.get(name)!)![level]!
            }

            let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(info.rarity) as UIGradient;

            gradient.Clone().Parent = (merge.WaitForChild('RelicExample') as ImageLabel);
        }
        else {
            if ((name !== this._playerController.selectedMergeRelic.name) || (level !== this._playerController.selectedMergeRelic.level)) { return }
        }

        let claimed = false;

        (merge.WaitForChild('Buttons') as Frame).GetChildren().forEach((val) => {
            if (!val.IsA('ImageButton')) { return }
            if (val.FindFirstChildWhichIsA('ImageLabel')) { return }
            if (claimed) { return }

            claimed = true

            image.Clone().Parent = val

            val.FindFirstChildWhichIsA('UIGradient')?.Destroy()

            let info = RelicsInfo.get(RelicPassiveNames.get(name)!)![level-1]!
            let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(info.rarity) as UIGradient;

            gradient.Clone().Parent = val;
        })
        
    }

    public updateRelicPasses() {
        
        let relics = this.UIPath.Relics.get<ImageComponent>().instance
        let profileData = this._playerController.replica.Data.Profile
        let playerRelics = relics.WaitForChild('PlayerRelics') as Frame

        if (profileData.Products.includes('5equippedrelics')) {
            playerRelics.WaitForChild('RelicsSlotsRobux').GetChildren().forEach((val) => {
                if (!val.IsA('ImageButton')) { return }
                val.FindFirstChild('Locked')?.Destroy()
            })
        }

    }

}