
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { PlayerController } from "./PlayerController";
import { Players, Workspace, RunService, SocialService, TweenService, ReplicatedStorage, UserInputService, TeleportService, Lighting, GuiService } from "@rbxts/services";
import { FrameComponent, FrameFabric } from "../components/UIComponents/FrameComponent";
import { ButtonComponent, ButtonFabric } from "../components/UIComponents/ButtonComponent";
import { Binding } from "client/classes/BindbingValues";
import { IButton, IGUIData, IMenu, IShop } from "shared/interfaces/GUIData";
import { UIAnimations } from "shared/utility/UIAnimations";
import { ComponentsInitializer, IPathObject } from "client/classes/ComponentsInitializer";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { SurfaceComponent, SurfaceFabric } from "client/components/UIComponents/SurfaceComponent";
import { Evolutions, IDBPetData, IPetData, Mutations, PetOperationStatus, Rarities, Sizes } from "shared/interfaces/PetData";
import { Components } from "@flamework/components";
import { PetPerkNames, PetPerksInfo, PetsData } from "shared/info/PetInfo";
import { Events } from "client/network";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { DynamicText, StrokeInfo } from "client/classes/DynamicText";
import { GUIUtilities } from "client/classes/GUIUtilities";
import { ToolOperationStatus, ToolValueType } from "shared/interfaces/ToolData";
import { IWorldData, WorldOperationStatus } from "shared/interfaces/WorldData";
import { WorldType } from "shared/enums/WorldEnums";
import { WorldsData } from "shared/info/WorldInfo";
import { PetUtilities } from "shared/utility/PetUtilities";
import { ImageComponent, ImageFabric } from "client/components/UIComponents/ImageComponent";
import { Effects, PlayEffect } from "client/static/EffectsStatic";
import { petUpgradeConfig } from "shared/configs/PetConfig";
import Functions from "shared/utility/LuaUtilFunctions";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { GroupPopUpFabric } from "client/components/UIComponents/GroundPopUpComponent";
import { ToolsData } from "shared/info/ToolInfo";
import { EggQuestsData, FriendQuestsData, PetIndexQuestsData, PetQuestsData, RelicQuestsData } from "shared/info/QuestInfo";
import { IQuestData } from "shared/interfaces/QuestData";
import { SessionData } from "shared/interfaces/SessionData";
import { DailyRewardsData, GetNextBar, GetNextRebirth, RebirthTitles, SelectSessionReward, SessionRewardsData } from "shared/info/RewardInfo";
import { RewardType } from "shared/enums/RewardEnums";
import { FlyingObjectStatus } from "shared/enums/FlyingObjectEnums";
import { PotionType } from "shared/enums/PotionEnum";
import { PotionOperationStatus } from "shared/interfaces/PotionData";
import { EggBuyType } from "shared/interfaces/EggData";
import { BattlefieldOperationStatus, ReplicationOperationStatus } from "shared/enums/ReplicationEnums";
import LuaUtilFunctions from "shared/utility/LuaUtilFunctions";
import { EggsData } from "shared/info/EggInfo";
import { UIControllerSetup } from "./UIControllerSetup";
import { RelicOperationStatus } from "shared/enums/RelicEnums";
import { RelicPassiveNames, RelicsInfo } from "shared/info/RelicsInfo";
import { UIRelicController } from "./UIMethods/UIRelicController";
import { LocationsData } from "shared/info/Locations";
import { ButtonSwitchFabric } from "client/components/UIComponents/UISubComponents/ButtonSwitchComponent";
import { ShakingFabric } from "client/components/UIComponents/UISubComponents/ShakingComponent";
import { SpinnerFabric } from "client/components/UIComponents/UISubComponents/SpinnerComponent";
import { FollowingWindowFabric } from "client/components/UIComponents/FollowingWindowComponent";
import { UIPetsController } from "./UIMethods/UIPetsController";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainUI   = playerGui.WaitForChild('MainUI') as ScreenGui
const templates =  mainUI.WaitForChild('Templates') as Folder

const camera = Workspace.CurrentCamera!

const defaultPet = PetUtilities.PetToDBTransfer(PetsData.get('Cat')!)!

@Controller({})
export class UIController implements OnStart, OnInit {

    public _playerController: PlayerController
    public _uiControllerSetup: UIControllerSetup
    public UIPath!: IPathObject // = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    public giftingToUserId?: number
    public giftsReady = new Map<number, number>()
    public minGiftTime = 100000

    public autoTrain: boolean = false
    public autoShoot: boolean = false
    public autoRebirth: boolean = false

    public isFlying = false
    public battleGuiWaiting = true

    public currentGiftTime = new Binding<number>(0)
    public currentDailyTime = new Binding<number>(0)

    public ownedTools: string[] = []
    public equippedTool?: string

    public creationId: number = 0

    public worldPurchaseTime = 0
    public lastRebirthNotify = 0

    public selectedMergeRelic?: {name: string, level: number}

    private UIRelicController = new UIRelicController()
    private UIPetsController = new UIPetsController()

    public disableOthersPets: boolean = false
    public disableYourPets: boolean = false

    constructor(playerController: PlayerController, uiControllerSetup: UIControllerSetup) {
        this._playerController = playerController
        this._uiControllerSetup = uiControllerSetup
    }

    public setupPetOverlay() {
        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance
        let mouse = this._playerController.component.instance.GetMouse()

        let YOffset = GuiService.GetGuiInset()[0].Y

        task.spawn(() => {
            while (task.wait()) {
                if (!petOverlay.Visible) { continue }
                let udim2 = UDim2.fromOffset(mouse.X, mouse.Y + YOffset)
                petOverlay.Position = petOverlay.Position.Lerp(udim2, .5)

                //petOverlay.Position = petOverlay.Position.Lerp(UDim2.fromOffset(mouse.X+50, mouse.Y+100), .5)
            }
        })
    }

    public setupPetBackpackPasses() {
        let profileData = this._playerController.replica.Data.Profile
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let amountInfo = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo') as Frame

        ButtonFabric.CreateButton(amountInfo.WaitForChild('Backpack').WaitForChild('Plus') as ImageButton).BindToClick(() => {
            if (!profileData.Products.includes('100storage')) { Events.PurchasePrompt(891321914); return }
            if (!profileData.Products.includes('50storage')) { Events.PurchasePrompt(891709004); return }
        })

        ButtonFabric.CreateButton(amountInfo.WaitForChild('Equip').WaitForChild('Plus') as ImageButton).BindToClick(() => {
            if (!profileData.Products.includes('2equipped')) { Events.PurchasePrompt(891581551); return }
        })
    }

    public setupPotionInfo() {
        let potionFrame = this.UIPath.Potions.get<ImageComponent>().instance
        let potionInfo = this.UIPath.PotionInfo.get<ImageComponent>().instance
        let mouse = this._playerController.component.instance.GetMouse()

        let sessionData = this._playerController.replica.Data.Session
        let profileData = this._playerController.replica.Data.Profile

        let boostList = new Map<string, string>([
            ['PremiumBoost', '+10% Strength For Premium'],
            ['LocationBoost', 'Location Boost ( +x% x )'],
            ['FriendBoost', 'Friend Boost ( +0% Strength )'],
            ['GameBoost', 'Game Boost ( +0% Strength )'],
            ['RobuxBoost', 'Robux Boost ( +0% Strength )'],
        ])

        task.spawn(() => {

            let YOffset = GuiService.GetGuiInset()[0].Y
            let mouse = Players.LocalPlayer.GetMouse()

            while (task.wait()) {
                if (!potionInfo.Visible) { continue }

                let udim2 = UDim2.fromOffset(mouse.X, mouse.Y + YOffset)

                potionInfo.Position = potionInfo.Position.Lerp(udim2, .5)
            }
        })

        for (let obj of potionFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }

            let button = ButtonFabric.CreateButton(obj)

            button.BindToEnter(() => { 

                if (obj.Name === 'LocationBoost') {
                    boostList.set(obj.Name, `Location Boost ( +${(sessionData.multipliers.location.strength-1)*100}% Strength )` || 'None')
                }

                if (obj.Name === 'FriendBoost') {
                    boostList.set(obj.Name, `+${math.round((sessionData.multipliers.friends.strength-1)*100)}% Strength From Friends` || 'None')
                }

                if (obj.Name === 'RobuxBoost') {
                    boostList.set(obj.Name, 
                        `+${math.round((sessionData.multipliers.robuxboost.strength-1)*100)}% for ${GUIUtilities.getSIPrefixSymbol(profileData.StatValues.RobuxSpent)} Robux Spent` || 'None')
                }

                if (obj.Name === 'GameBoost') {
                    boostList.set(obj.Name, `+1% Strength Boost in ${60-(sessionData.sessionTime%60)}s` || 'None')
                }

                potionInfo.Visible = true; 
                (potionInfo.WaitForChild('TextLabel') as TextLabel).Text = boostList.get(obj.Name)! 
            })
            button.BindToLeave(() => { potionInfo.Visible = false })
        }

    }

    public setupAutoTrain() {
        task.spawn(() => {

            while (task.wait()) { // maybe change to runservice
                if (!this.autoTrain) { continue }
                PlayEffect('Click')
            }

        })
    }

    public setupGifts() {
        
        let gifts = this.UIPath.Gifts.get<ImageComponent>().instance

        this.giftsReady = new Map()

        for (let gift of gifts.WaitForChild('Rewards').GetDescendants()) {
            if (!gift.IsA('ImageButton')) { continue }

            this.makeGift(gift, WorldType.Cave)
        }

        //this.makeGift(gifts.WaitForChild('Pet') as ImageButton)
    }

    public setupDaily() {

        let daily = this.UIPath.DailyRewards.get<ImageComponent>().instance
        let dailyAmount = this.UIPath.RightList.Daily.get<ButtonComponent>().instance.WaitForChild('DailyAmount') as Frame

        let visibility = false

        this.currentDailyTime.AddCallback((val) => { visibility = false })

        for (let reward of daily.WaitForChild('GiftsList').GetChildren()) {
            if (!reward.IsA('GuiButton')) { continue }

            let dailyData = DailyRewardsData[reward.LayoutOrder-1]
            let timer = reward.WaitForChild('TimerFrame').WaitForChild('Timer') as TextLabel

            if (!dailyData) { continue } 
            
            ButtonFabric.CreateButton(reward).BindToClick(()=> {
                //print('Clicked', RewardType.Daily)
                Events.ClaimReward.fire(RewardType.Daily, 'nil') //some sort of bug here
            })

            this.currentDailyTime.AddCallback((val) => {

                let index = (reward as GuiButton).LayoutOrder-(val%DailyRewardsData.size()+1) //((reward as Frame).LayoutOrder-val-1)%DailyRewardsData.size()

                timer.Text = tostring(index) + ' Days Left'

                let delta = this._playerController.replica.Data.Profile.StatValues.LastDayTime + 24*60*60 - os.time()

                dailyAmount.Visible = visibility
                print(visibility, 'visibility')

                if ((reward as GuiButton).LayoutOrder === (val%DailyRewardsData.size()+1)) { //&& (delta >= 10) //
                    if (delta > 0) { timer.Text = GUIUtilities.GuiTimeFormatter(delta); return }
                    (reward.WaitForChild('TimerFrame') as Frame).Visible = false;
                    (reward.WaitForChild('ClaimFrame') as Frame).Visible = true;
                    (reward.WaitForChild('ClaimFrame').WaitForChild('Timer') as TextLabel).Text = 'Claim!';
                    visibility = true
                    dailyAmount.Visible = visibility
                    print(visibility, 'visibility2')
                    return
                }

                if ((reward as GuiButton).LayoutOrder < (val%DailyRewardsData.size()+1)) {  //24*60*60
                    (reward.WaitForChild('TimerFrame') as Frame).Visible = false;
                    (reward.WaitForChild('ClaimFrame') as Frame).Visible = true;
                    (reward.WaitForChild('ClaimFrame').WaitForChild('Timer') as TextLabel).Text = 'Claimed!';
                    return
                }

            })

        }

    }

    public setupDonations() {

        let accuracylist = new Map<string, number>([
            ['1', 1907108594],
            ['2', 1907109345],
            ['3', 1907109494],
            ['4', 1907109773],
            ['5', 1907110711],
            ['6', 1907110840],
            ['7', 1907110973]
        ])

        let gemslist = new Map<string, number>([
            ['1', 1907111627],
            ['2', 1907111788],
            ['3', 1907111941],
            ['4', 1907112107],
            ['5', 1907112245],
            ['6', 1907112416],
            ['7', 1907112582]
        ])

        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')
        let accuracyFrame = storeFrame.WaitForChild('Accuracy').WaitForChild('AccuracyList')
        let gemsFrame = storeFrame.WaitForChild('Gems').WaitForChild('GemsList')

        for (let obj of accuracyFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!accuracylist.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(accuracylist.get(obj.Name)!, this.giftingToUserId)
            })
        }

        for (let obj of gemsFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!gemslist.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(gemslist.get(obj.Name)!, this.giftingToUserId)
            })
        }

        ButtonFabric.CreateButton(accuracyFrame.Parent!.WaitForChild('Huge Pack') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(accuracylist.get('7')!, this.giftingToUserId)
        })

        ButtonFabric.CreateButton(gemsFrame.Parent!.WaitForChild('Huge Pack') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(gemslist.get('7')!, this.giftingToUserId)
        })

    }

    public setupStoreUpperButtons() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame

        let scrollList = new Map<string, number>([
            ['1', 0.001],
            ['2', 875/2800],
            ['5', 1475/2800],
            ['6', 1985/2800],
            ['8', 2435/2800],
        ])

        let otherList = new Map<string, string>([
            ['Accuracy', '6'],
            ['Wins', '7'],
            ['Gems', '5'],
        ])

        let offset = storeFrame.AbsoluteCanvasSize.X - storeFrame.AbsoluteWindowSize.X

        for (let obj of storeFrame.Parent!.WaitForChild('Buttons').GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!scrollList.get(obj.Name)) { return }
                TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2(scrollList.get(obj.Name)!*offset, 0) }).Play()
            })
        }

        ButtonFabric.CreateButton(storeFrame.Parent!.WaitForChild('Pet') as GuiButton).BindToClick(() => {
            TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2(scrollList.get('4')!*offset, 0) }).Play()
        })

    }

    public updateLowerFrame() {
        let itemFrame = this.UIPath.LowerList.Item.get<ButtonComponent>().instance as ImageButton

        let profileData = this._playerController.replica.Data.Profile
        let ownedTool = ToolsData.get(profileData.EquippedTool)!;

        (itemFrame.WaitForChild('ItemImage') as ImageLabel).Image = (ownedTool.model.WaitForChild('ItemImage') as ImageLabel).Image;
        (itemFrame.WaitForChild('Value') as TextLabel).Text = '+'+GUIUtilities.getSIPrefixSymbol(ownedTool.addition)+'/Tap'
    }

    public setupStoreGamepasses() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let passAds = this.UIPath.ProductsAds.get<FrameComponent>().instance
        let instaReplica = Workspace.WaitForChild('InstaReplica') as Folder
        //let rightFrame = this.UIPath.RightList.get<FrameComponent>().instance.WaitForChild('Passes') as Frame


        let passList = new Map<string, number>([
            ['+100Storage', 891321914],
            ['+50Storage', 891709004],
            ['+2Equip', 891581551],
            ['AutoRebirth', 891574490],
            ['DoubleAccuracy', 891361917],
            ['DoubleGems', 891643068],
            ['FastSwing', 891504714],
            ['TripleHatch', 891593436],

            ['AccuracyDev1', 1907108594],
            ['AccuracyDev2', 1907109345],
            ['AccuracyDev3', 1907109494],
            ['AccuracyDev4', 1907109773],
            ['AccuracyDev5', 1907110711],
            ['AccuracyDev6', 1907110840],
            ['AccuracyDevHuge Pack', 1907110973],

            ['GemsDev1', 1907111627],
            ['GemsDev2', 1907111788],
            ['GemsDev3', 1907111941],
            ['GemsDev4', 1907112107],
            ['GemsDev5', 1907112245],
            ['GemsDev6', 1907112416],
            ['GemsDevHuge Pack', 1907112582],

            ['PotionBoostHugePack', 1907117405],
            ['PotionBoost2x Gems', 1907113307],
            ['PotionBoost3x Gems', 1907113417],
            ['PotionBoost2x Strength', 1907112938],
            ['PotionBoost3x Strength', 1907113096],

            ['NightmareEgg', 1907106907],
            ['PartyEgg', 1907108173],
        ])

        for (let obj of storeFrame.WaitForChild('Passes').WaitForChild('PassList')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!passList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(passList.get(obj.Name)!, this.giftingToUserId)
            })
        }

        ButtonFabric.CreateButton(storeFrame.WaitForChild('GamepassBundle').WaitForChild('Buy') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(1907117658, this.giftingToUserId)
        })

        ButtonFabric.CreateButton(storeFrame.WaitForChild('wingslightsaber').WaitForChild('Buy') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(1907114211, this.giftingToUserId)
        })

        ButtonFabric.CreateButton(storeFrame.WaitForChild('doublelightsaber').WaitForChild('Buy') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(1907114568, this.giftingToUserId)
        })

        instaReplica.GetChildren().forEach((val) => {
            if (!val.IsA('Model')) { return }
            if (val.Name !== 'DonateSign') { return }
            if (!val.PrimaryPart) { return }

            ButtonFabric.CreateButton(val.PrimaryPart!.WaitForChild('SurfaceGui').WaitForChild('Ranks').WaitForChild('Buy') as GuiButton).BindToClick(() => {
                Events.PurchasePrompt(891593436)
            }) 
        })


        let period = 60*3

        task.spawn(() => {
            let uigradient = passAds.WaitForChild('UIStroke').WaitForChild('Rainbow') as UIGradient

            while (task.wait(3)) {
                TweenService.Create(uigradient, new TweenInfo(3, Enum.EasingStyle.Linear), {Rotation: 180 + uigradient.Rotation}).Play()
            }
        })


        task.spawn(() => {
            let randomList: string[] = []
            let selectedPass = 0

            passList.forEach((val, key) => { randomList.push(key) });

            ButtonFabric.CreateButton(passAds.WaitForChild('RightSide').WaitForChild('Yes') as ImageButton).BindToClick(() => {
                Events.PurchasePrompt(selectedPass)
                passAds.Visible = false
            })

            ButtonFabric.CreateButton(passAds.WaitForChild('RightSide').WaitForChild('Loser') as ImageButton).BindToClick(() => {
                passAds.Visible = false
            })

            while (task.wait(period)) {

                let name = randomList[math.random(0, randomList.size()-1)]
                let pass = passList.get(name)
                if (!pass) { continue }
                if (passAds.Visible) { continue }

                let selectedUI = storeFrame.FindFirstChild(name, true)

                if (name.find('AccuracyDev')[0]) { selectedUI = storeFrame.WaitForChild('Accuracy').FindFirstChild(name.split('AccuracyDev')[1], true) }
                if (name.find('GemsDev')[0]) { selectedUI = storeFrame.WaitForChild('Gems').FindFirstChild(name.split('GemsDev')[1], true) }
                if (name.find('PotionBoost')[0]) { selectedUI = storeFrame.WaitForChild('Boosts').FindFirstChild(name.split('PotionBoost')[1], true) }

                if (!selectedUI) { continue }

                passAds.Visible = true

                selectedPass = pass;

                let icon = ''

                selectedUI.GetChildren().forEach((val) => {
                    if (!val.IsA('ImageLabel')) { return }
                    if (val.Name.find('Icon')[0]) { icon = val.Image }
                });

                (passAds.WaitForChild('LeftSide').WaitForChild('PassIcon') as ImageLabel).Image = icon;
                (passAds.WaitForChild('LeftSide').WaitForChild('TextLabel') as TextLabel).Text = (selectedUI.WaitForChild('Title') as TextLabel).Text;

            }
        })

        /*
        for (let obj of rightFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!passList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(passList.get(obj.Name)!, this.giftingToUserId)
            })
        }
        */

    }

    public setupStorePotions() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let potionsFrame = storeFrame.WaitForChild('Boosts')

        let potionList = new Map<string, number>([
            ['2x Strength', 1907112938],
            ['3x Strength', 1907113096],
            ['2x Gems', 1907113307],
            ['3x Gems', 1907113417],
            ['HugePack', 1907117405],
        ])

        let potionUseList = new Map<string, PotionType>([
            ['2x Strength', PotionType.StrengthPotion2],
            ['3x Strength', PotionType.StrengthPotion3],
            ['2x Gems', PotionType.GemsPotion2],
            ['3x Gems', PotionType.GemsPotion3],
        ])

        for (let obj of potionsFrame.WaitForChild('BoostList').GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            let buyButton = obj.WaitForChild('Buy') as GuiButton
            let useButton = obj.WaitForChild('Use') as GuiButton

            ButtonFabric.CreateButton(buyButton).BindToClick(() => {
                if (!potionList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(potionList.get(obj.Name)!, this.giftingToUserId)
            })

            ButtonFabric.CreateButton(useButton).BindToClick(() => {
                if (!potionUseList.get(obj.Name)) { return }
                Events.ManagePotion.fire(PotionOperationStatus.Use, potionUseList.get(obj.Name)!)
            })

        }

        ButtonFabric.CreateButton(potionsFrame.WaitForChild('HugePack') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(potionList.get('HugePack')!, this.giftingToUserId)
        })

    }

    public setupLimitedPets() {
        /*
        let profileData = this._playerController.replica.Data.Profile
        let scrollingFrame = this.UIPath.Store.get<ImageComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let limitedPets = scrollingFrame.WaitForChild('LimitedPets').WaitForChild('Pets')

        let petList = new Map<string, number>([
            ['LimitedPet1', 1779420282],
            ['LimitedPet2', 1779420957],
            ['LimitedPet3', 1779421279],
            ['LimitedPet4', 1854949901],
        ])

        for (let obj of limitedPets.GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            if (!petList.get(obj.Name)) { continue }

            ButtonFabric.CreateButton(obj.WaitForChild('Buy') as TextButton).BindToClick(() => {
                Events.PurchasePrompt.fire(petList.get(obj.Name)!)
            })
        }
            */
    }
    
    public makeGift(gift: ImageButton, world: WorldType) {
        let index = gift.LayoutOrder-1

        let claimedRewards = this._playerController.replica.Data.Session.claimedRewards
        let giftData = SelectSessionReward(index, world) //SessionRewardsData[gift.LayoutOrder-1]
        let timer = gift.WaitForChild('TimerFrame').WaitForChild('Timer') as TextLabel

        let giftAmount = this.UIPath.RightList.get<FrameComponent>().instance.WaitForChild('Gifts').WaitForChild('GiftAmount') as Frame
        let giftText = this.UIPath.RightList.get<FrameComponent>().instance.WaitForChild('Gifts').WaitForChild('Value') as TextLabel

        if (!giftData) { return }

        ButtonFabric.CreateButton(gift).BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Session, index)
        })

        this.currentGiftTime.AddCallback((val) => {
            //if (!(gift.Parent!.Parent! as Frame).Visible) { return }

            timer.Text = GUIUtilities.GuiTimeFormatter(giftData.Time! - val)

            if ((giftData.Time! - val) < 0) {
                (gift.WaitForChild('TimerFrame') as Frame).Visible = false;
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true
                this.giftsReady.set(index, 1)
            }

            if (this._playerController.replica.Data.Session.claimedRewards.includes(index)) {
                (gift.WaitForChild('TimerFrame') as Frame).Visible = false;
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true;
                (gift.WaitForChild('ClaimFrame').WaitForChild('Timer') as TextLabel).Text = 'Claimed!'
                this.giftsReady.set(index, 0)
            };

            let giftTime = giftData.Time! - val;

            if (giftTime >= -1) {
                this.minGiftTime = math.min(giftTime, this.minGiftTime)
            }
            
            giftAmount.Visible = false

            if ((giftData.Time! - val) < 0 && (giftData.Time! - val) > -2) {
                PlayEffect('Notify', new Map([['Message', '🎁 Gift Is Ready!'], ['Image', 'NewGift']]))
            }

            let amount = 0

            this.giftsReady.forEach((val) => { amount += val })

            if (amount > 0) {
                giftAmount.Visible = true;
                (giftAmount.WaitForChild('Value') as TextLabel).Text = tostring(amount)
                giftText.Text = 'Claim Gift!'
            } 
            else {
                print(this.minGiftTime)
                giftText.Text = 'Rewards'
                //giftText.Text = 'CLAIM GIFT'
                //giftText.Text = 'REWARD IN: '+GUIUtilities.GuiTimeFormatter(this.minGiftTime)
                if (this.minGiftTime <= -1) { this.minGiftTime = 10000000 }
            }

        })

    }

    public updateRebirth() {

        let profileData = this._playerController.replica.Data.Profile

        let rebirthUI = this.UIPath.Rebirth.get<ImageComponent>().instance 
        let rebirthSign = this.UIPath.LeftList.Rebirth.get<ButtonComponent>().instance.WaitForChild('RebirthNotification') as Frame
        let currentRebirth = GetNextRebirth(profileData.Values.RebirthsVal)
        let strength = rebirthUI.WaitForChild('Strength') as ImageLabel

        let strengthValue = profileData.Values.StrengthVal
        let val = strengthValue/currentRebirth.Additional!.get('Strength')!;

        (strength.WaitForChild('Value') as TextLabel).Text = 
            GUIUtilities.getSIPrefixSymbol(strengthValue)+'/'+GUIUtilities.getSIPrefixSymbol(currentRebirth.Additional!.get('Strength')!)

        TweenService.Create(strength.WaitForChild('stroke') as ImageLabel, new TweenInfo(.1), { 'Size': UDim2.fromScale(math.min(1, val), 1) }).Play()

        if (val >= 1) {

            this.updateGradient(rebirthUI.WaitForChild('RebirthButton') as GuiObject, mainUI.WaitForChild('Templates').WaitForChild('Green') as UIGradient)
            rebirthSign.Visible = true
            /*
            rebirthUI.WaitForChild('RebirthButton').GetDescendants().forEach((val) => {
                if (!val.IsA('UIGradient')) { return }
                if (val.Name === 'Green') { val.Enabled = true; return }
                val.Enabled = false
            })
            */
        }
        else {

            this.updateGradient(rebirthUI.WaitForChild('RebirthButton') as GuiObject, mainUI.WaitForChild('Templates').WaitForChild('Gray') as UIGradient)
            rebirthSign.Visible = false

            /*
            rebirthUI.WaitForChild('RebirthButton').GetDescendants().forEach((val) => {
                if (!val.IsA('UIGradient')) { return }
                if (val.Name === 'Gray') { val.Enabled = true; return }
                val.Enabled = false
            })
            */
        }

        let selectedName = 'Rokie'
        let selectedId = ''
        let maxWeight = 0

        RebirthTitles.forEach((val, name) => {
            if ((profileData.Values.RebirthsVal+1 >= val.goal) && (val.goal > maxWeight)) {
                maxWeight = val.goal
                selectedName = name
                selectedId = val.id
            }
        });

        (rebirthUI.WaitForChild('RankInfo').WaitForChild('NextRank').WaitForChild('TextLabel') as TextLabel).Text = selectedName;
        (rebirthUI.WaitForChild('RankInfo').WaitForChild('NextRank').WaitForChild('ImageLabel') as ImageLabel).Image = selectedId;

        if ((val >= 1) && (os.time() - this.lastRebirthNotify > 60)) {
            this.lastRebirthNotify = os.time()
            PlayEffect('Notify', new Map([['Message', '💎 Rebirth Is Ready!'], ['Image', 'RebirthPossible']]))
        }

        /*
        let currentRebirthData = RebirthsRewardsData[this._playerController.replica.Data.Profile.Values.RebirthsVal]
        let nextRebirthData = RebirthsRewardsData[this._playerController.replica.Data.Profile.Values.RebirthsVal+1]

        if (!nextRebirthData) { nextRebirthData = currentRebirthData }

        
        let additional = new Map<string, number>()
        nextRebirthData.Additional!.forEach((value, key) => { additional.set(key, value) })

        let currentAdditional = new Map<string, number>()
        currentRebirthData.Additional!.forEach((value, key) => { currentAdditional.set(key, value) });
        
        let gems = this._playerController.replica.Data.Profile.Values.GemsVal
        let wins = this._playerController.replica.Data.Profile.Values.WinsVal
        let newGems = gems+(nextRebirthData.Values!.Gems || 0)*this._playerController.replica.Data.Profile.Multipliers.GemsMul
        let holder = rebirthUI.WaitForChild('StatsHolder');


        let newWins = math.max(0, wins-(nextRebirthData.Additional!.get('Wins') || 0));
        //print(GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!), );

        (holder.WaitForChild('Stats1').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!*100)+'%';
        (holder.WaitForChild('Stats1').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(gems);
        (holder.WaitForChild('Stats1').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins);

        (holder.WaitForChild('Stats2').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(additional.get('Multiplier')!*100)+'%';
        (holder.WaitForChild('Stats2').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newGems);
        (holder.WaitForChild('Stats2').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newWins);

        (rebirthUI.WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins)+'/'+GUIUtilities.getSIPrefixSymbol(additional.get('Wins')!)
        TweenService.Create(rebirthUI.WaitForChild('Wins').WaitForChild('stroke') as ImageLabel, new TweenInfo(.1), { 'Size': UDim2.fromScale(math.min(1, wins/additional.get('Wins')!), 1) }).Play()
        */

    }

    public updateStoreBillboards() {

        let profileData = this._playerController.replica.Data.Profile
        let maxSlingshot = 'Slingshot1W1'

        profileData.OwnedTools.forEach((val, index) => {
            if (ToolsData.get(val)!.valuetype === ToolValueType.VBugs) { return }
            if (ToolsData.get(val)!.addition > ToolsData.get(maxSlingshot)!.addition) {
                maxSlingshot = val
            }
        })

        let world1 = [
            'Slingshot1W1',
            'Slingshot2W1',
            'Slingshot3W1',
            'Slingshot4W1',
            'Slingshot5W1',
        ]

        let world2 = [
            'Slingshot1W2',
            'Slingshot2W2',
            'Slingshot3W2',
            'Slingshot4W2',
            'Slingshot5W2',
            'Slingshot6W2',
        ]

        let world3 = [
            'Slingshot1W3',
            'Slingshot2W3',
            'Slingshot3W3',
            'Slingshot4W3',
            'Slingshot5W3',
            'Slingshot6W3',
        ]

        let world4 = [
            'Slingshot1W4',
            'Slingshot2W4',
            'Slingshot3W4',
            'Slingshot4W4',
            'Slingshot5W4',
            'Slingshot6W4',
        ]

        let shops = new Map<string, string[]>([
            ['BowShopPart', world1],
            ['BowShopPart2', world2],
            ['BowShopPart3', world3],
            ['BowShopPart4', world4],
        ])
        
        shops.forEach((slingshots, name) => {
            let shop = game.Workspace.WaitForChild('InstaReplica').WaitForChild(name)
            let billboard = shop.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
            let description = billboard.WaitForChild('Frame').WaitForChild('Description') as TextLabel

            let addition = 1

            slingshots.sort((a, b) => {
                return ToolsData.get(a)!.addition < ToolsData.get(b)!.addition 
            })

            let index = slingshots.indexOf(maxSlingshot)

            slingshots.forEach((val, sindex) => {
                if (sindex <= index+1) { return }
                if (profileData.Values.StrengthVal < ToolsData.get(slingshots[sindex-1])!.price) { return }
                addition += 1
            })

            //if (index < 0) { description.Text = 'Claimed All'; return }
            if (!ToolsData.get(slingshots[index+addition])) { description.Text = 'Claimed All'; return }
            let info = ToolsData.get(slingshots[index+addition])!

            if (profileData.Values.StrengthVal >= info.price) { description.Text = 'Claimed All'; return }
            description.Text = GUIUtilities.getSIPrefixSymbol(math.min(info.price, profileData.Values.StrengthVal))+'/'+GUIUtilities.getSIPrefixSymbol(info.price)
        })
        
    }
    
    public updateSlingshots(world: IWorldData) {

        /*

        let obj = this.UIPath.SlingshotStore.get<ImageComponent>().instance
        let store = obj.WaitForChild('ScrollingFrame') as ScrollingFrame;

        let selectedStore: Frame | undefined;

        for (let storeFrame of store.GetChildren()) {
            if (!storeFrame.IsA('Frame')) { continue }
            if (storeFrame.Name !== world.shopName) { storeFrame.Visible = false; continue }
            storeFrame.Visible = true
            selectedStore = storeFrame
        }

        if (!selectedStore) { return }

        for (let button of selectedStore.GetDescendants()) {
            if (!button.IsA('GuiButton')) { continue }
            let slingshotFrame = button.Parent!

            if (!slingshotFrame.FindFirstChild('Pointer')) { continue }
            let toolName = (slingshotFrame.WaitForChild('Pointer') as StringValue).Value;

            let tool = ToolsData.get(toolName)
            if (!tool) { continue };

            let equipFrame = (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Equip') as Frame)

            if (this.ownedTools.includes(toolName)) { equipFrame.Visible = true; (equipFrame.WaitForChild('Equip') as TextLabel).Text = 'Equip' }
            if (this.equippedTool === toolName) { (equipFrame.WaitForChild('Equip') as TextLabel).Text = 'Equipped' }
        }

        */

    }

    public updateGradient(parent: GuiObject, gradient: UIGradient) {
        for (let obj of parent.GetDescendants()) {
            if (!obj.FindFirstChildWhichIsA('UIGradient')) { continue }
            ////print(obj)
            obj.FindFirstChildWhichIsA('UIGradient')!.Destroy()
            gradient.Clone().Parent = obj
        }

        parent.FindFirstChildWhichIsA('UIGradient')!.Destroy()
        gradient.Clone().Parent = parent
    }

    public updateStorePacks() {
        let profileData = this._playerController.replica.Data.Profile
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')

        let world = this._playerController.replica.Data.Profile.Config.MaxWorld
        let worldData = WorldsData.get(world)

        if (!worldData) { return }

        let accuracyList = [2.5, 6.5, 22.5, 44.5, 90, 120, 150]
        let winsList = [5, 13, 45, 89, 180, 240, 300]

        for (let obj of storeFrame.GetDescendants()) {
            if (obj.Name !== 'ChangableValue') { continue }
            if (!obj.IsA('IntValue')) { continue }

            let label = obj.Parent!.WaitForChild('Amount') as TextLabel
            let name = obj.Parent!.Parent!.Parent!.Name
            let index = 0

            if (obj.Parent!.Name === 'Huge Pack') { name = obj.Parent!.Parent!.Name; index = 6 }
            else { index = tonumber(obj.Parent!.Name)!-1 }

            let val = obj.Value

            //if (name === 'Wins') { val = math.max(val, profileData.MaxValues.WinsMaxVal * winsList[index]/100) }
            if (name === 'Accuracy') { val = math.max(val, profileData.MaxValues.StrengthMaxVal * accuracyList[index]/100) }

            label.Text = '+'+GUIUtilities.getSIPrefixSymbol(math.round(val))+' '+name
        }

    }

    public updateStoreLuck() {
        /*
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')
        let luckFrame = storeFrame.WaitForChild('EggLuckPasses').WaitForChild('Passes')

        let luckList = new Map<string, string>([
            ['luck1', 'Lucky2'],
            ['luck2', 'Lucky3'],
        ])

        for (let pass of this._playerController.replica.Data.Profile.Products) {
            if (!luckList.get(pass)) { continue }

            for (let obj of luckFrame.GetChildren()) {
                if (!obj.IsA('ImageLabel')) { continue }
                if (obj.Name !== luckList.get(pass)) { continue }
                (obj.WaitForChild('Locked') as Frame).Visible = false
            }

        }
        */
    }


    public updateStoreGamepasses() {
        let profileData = this._playerController.replica.Data.Profile
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let potionFrame = this.UIPath.Potions.get<FrameComponent>().instance
        let lowerFrame = this.UIPath.LowerList.get<FrameComponent>().instance

        let passList = new Map<string, string>([
            ['+100Storage', '100storage'],
            ['+50Storage', '50storage'],
            ['+2Equip', '2equipped'],
            ['AutoRebirth', 'autorebirth'],
            ['DoubleAccuracy', 'doubleaccuracy'],
            ['DoubleGems', 'doublegems'],
            ['FastSwing', 'fastswing'],
            ['TripleHatch', '3egghatch'],
        ])

        for (let obj of storeFrame.WaitForChild('Passes').WaitForChild('PassList')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            if (!passList.get(obj.Name)) { continue }
            if (!profileData.Products.includes(passList.get(obj.Name)!)) { continue }

            (obj.WaitForChild('PriceFrame').WaitForChild('Price') as TextLabel).Text = 'Owned!'
        }

        if (profileData.Products.includes('bundle')) {
            (storeFrame.WaitForChild('GamepassBundle').WaitForChild('Buy').WaitForChild('Price') as TextLabel).Text = 'Owned!'
        }

        if (profileData.Products.includes('wingslightsaber')) {
            (storeFrame.WaitForChild('wingslightsaber').WaitForChild('Buy').WaitForChild('Price') as TextLabel).Text = 'Owned!';
            (lowerFrame.WaitForChild('Wings Lightsaber') as ImageButton).Visible = true
        }

        if (profileData.Products.includes('doublelightsaber')) {
            (storeFrame.WaitForChild('doublelightsaber').WaitForChild('Buy').WaitForChild('Price') as TextLabel).Text = 'Owned!'
        }

        if (profileData.Products.includes('RobloxPremium')) {
            (potionFrame.WaitForChild('PremiumBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        }
    }

    public updatePotionBoosts() {
        let profileData = this._playerController.replica.Data.Profile
        let sessionData = this._playerController.replica.Data.Session

        let potionFrame = this.UIPath.Potions.get<FrameComponent>().instance

        if (profileData.Products.includes('RobloxPremium')) {
            (potionFrame.WaitForChild('PremiumBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        };

        (potionFrame.WaitForChild('LocationBoost').WaitForChild('Timer') as TextLabel).Text = `${(sessionData.multipliers.location.strength-1)*100}%`;
        (potionFrame.WaitForChild('FriendBoost').WaitForChild('Timer') as TextLabel).Text = `${math.round((sessionData.multipliers.friends.strength-1)*100)}%`;
        (potionFrame.WaitForChild('RobuxBoost').WaitForChild('Timer') as TextLabel).Text = `${math.round((sessionData.multipliers.robuxboost.strength-1)*100)}%`;
        (potionFrame.WaitForChild('GameBoost').WaitForChild('Timer') as TextLabel).Text = `${math.round((sessionData.multipliers.gameboost.strength-1)*200)}%`

        /*
        if (profileData.RedeemedCodes.includes('FollowCode')) {
            (potionFrame.WaitForChild('XBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        };

        let maxWorldMulti = worldBoostList.get(this._playerController.replica.Data.Profile.Config.MaxWorld) || 'None';
        (potionFrame.WaitForChild('WorldBoost').WaitForChild('Timer') as TextLabel).Text = maxWorldMulti
        */
    }

    public updateEggsUI() {

        let profileData = this._playerController.replica.Data.Profile
        let sessionData = this._playerController.replica.Data.Session

        let world = WorldsData.get(profileData.Config.MaxWorld)!
        let eggs = this.UIPath.Eggs.get<ImageComponent>().instance

        eggs.WaitForChild('ScrollingFrame')!.GetChildren().forEach((obj) => {
            if (!obj.IsA('ImageLabel')) { return }

            let eggData = EggsData.get(obj.Name)
            print(eggData, 'eggdata', obj.Name)
            if (!eggData) { return }
            let selectedWorld = WorldsData.get(eggData.world)!
            let lock = obj.WaitForChild('Locked') as Frame

            print(world.weight, selectedWorld.weight)

            if (world.weight >= selectedWorld.weight) { lock.Visible = false; return }

            lock.Visible = true;
            (lock.WaitForChild('TextLabel') as TextLabel).Text = `${selectedWorld.price} Rebirths to unlock!`
        })
    }

    public updateGiftRewards() {
        let world = this._playerController.replica.Data.Profile.Config.MaxWorld
        let gifts = this.UIPath.Gifts.get<ImageComponent>().instance

        for (let obj of gifts.WaitForChild('Rewards')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            if (obj.Name !== world) { obj.Visible = false; continue }
            obj.Visible = true;
        }
    }

    public updatePotions() {
        
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let potionsBoostsFrame = storeFrame.WaitForChild('Boosts').WaitForChild('BoostList')
        let profileData = this._playerController.replica.Data.Profile

        let potionUIList = new Map<PotionType, string>([
            [PotionType.StrengthPotion2, '2x Strength'],
            [PotionType.StrengthPotion3, '3x Strength'],
            [PotionType.GemsPotion2, '2x Gems'],
            [PotionType.GemsPotion3, '3x Gems']
        ])

        for (let potionInfo of profileData.Potions) {
            if (!potionUIList.get(potionInfo.potion)) { continue }

            let potionImage = potionsBoostsFrame.WaitForChild(potionUIList.get(potionInfo.potion)!) as ImageLabel;
            (potionImage.WaitForChild('Use').WaitForChild('Price') as TextLabel).Text = 'Use ('+GUIUtilities.getSIPrefixSymbol(potionInfo.amount)+')'
        }
        
    }

    public updatePlayerGiftFrame() {
        let storeFrame = this.UIPath.Store.get<ImageComponent>().instance
        let giftFrame = this.UIPath.GiftPlayerList.get<ImageComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let giftButton = this.UIPath.Store.Gift.get<ButtonComponent>().instance
        let passListUI = storeFrame.WaitForChild('ScrollingFrame').WaitForChild('Passes').WaitForChild('PassList')

        let template = giftFrame.Parent!.WaitForChild('Template').WaitForChild('PlayerTemplate') as GuiButton

        for (let obj of giftFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            obj.Destroy()
        }

        let passList = new Map<string, number>([
            ['+100Storage', 199],
            ['+50Storage', 99],
            ['+2Equip', 399],
            ['AutoRebirth', 499],
            ['DoubleAccuracy', 299],
            ['DoubleGems', 349],
            ['FastSwing', 699],
            ['TripleHatch', 399],
        ])

        for (let player of Players.GetPlayers()) {
            if (player.UserId === this._playerController.component.instance.UserId) { continue }

            let frame = template.Clone();
            (frame.WaitForChild('DisplayName') as TextLabel).Text = player.DisplayName;
            (frame.WaitForChild('Nickname') as TextLabel).Text = '@'+player.Name;

            task.spawn(() => {
                (frame.WaitForChild('PlayerIcon') as ImageLabel).Image = Players.GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)[0]
            })

            frame.Visible = true
            frame.Parent = giftFrame

            ButtonFabric.CreateButton(frame).BindToClick(() => {
                this.UIPath.GiftPlayerList.get<ImageComponent>().Close();
                this.UIPath.Store.get<ImageComponent>().Open();

                (giftButton.WaitForChild('Value') as TextLabel).Text = 'Cancel'
                this.updateGradient(giftButton, mainUI.WaitForChild('Templates').WaitForChild('Red') as UIGradient)

                this.giftingToUserId = player.UserId;
                (storeFrame.WaitForChild('GiftingTo') as TextLabel).Text = 'Gifting to: '+player.Name;
                (storeFrame.WaitForChild('GiftingTo') as TextLabel).Visible = true

                passListUI.GetChildren().forEach((val) => {
                    if (!val.IsA('ImageButton')) { return }
                    (val.WaitForChild('PriceFrame').WaitForChild('Price') as TextLabel).Text = ''+tostring( passList.get(val.Name)! )
                })


            })
        }

    }

    public updateWheelSpin() {
        let wheel = this.UIPath.WheelSpin.get<ImageComponent>().instance as Instance
        let wheelButton = this.UIPath.Wheel.Wheel.get<ImageComponent>().instance as Instance
        let profileData = this._playerController.replica.Data.Profile;

        let timeLeft = profileData.StatValues.LastSpinTime+24*60*60-os.time();

        (wheel.WaitForChild('Spin2').WaitForChild('Amount') as TextLabel).Text = 'x'+tostring(profileData.StatValues.SpinCount);
        (wheelButton.WaitForChild('Timer') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(math.max(0, timeLeft));

        //if (timeLeft <= 0) { (wheelButton.WaitForChild('Timer') as TextLabel).Text = 'Claim' }

        let wheelImage = wheelButton.WaitForChild('Image') as ImageButton
        TweenService.Create(wheelImage, new TweenInfo(1, Enum.EasingStyle.Linear), { 'Rotation': 10 + wheelImage.Rotation }).Play()

        if (profileData.StatValues.SpinCount < 1) {
            (wheelButton.WaitForChild('Count') as Frame).Visible = false
            return
        }

        (wheelButton.WaitForChild('Count') as Frame).Visible = true;
        (wheelButton.WaitForChild('Count').WaitForChild('Count') as TextLabel).Text = tostring(profileData.StatValues.SpinCount);
    }

    public updateSpins() {

        /*
        let rightList = this.UIPath.RightList.get<FrameComponent>().instance
        let leftList = this.UIPath.LeftList.get<FrameComponent>().instance

        let vip = leftList.WaitForChild('VIP') as GuiButton
        let limited = rightList.WaitForChild('Limited') as GuiButton

        let effect1Image = limited.WaitForChild('Effect1') as ImageLabel
        let effect2Image = limited.WaitForChild('Effect2') as ImageLabel

        let effectVip = vip.WaitForChild('ImageLabel').WaitForChild('Effect') as ImageLabel

        TweenService.Create(effect1Image, new TweenInfo(1, Enum.EasingStyle.Linear), { 'Rotation': 10 + effect1Image.Rotation }).Play()
        TweenService.Create(effect2Image, new TweenInfo(1, Enum.EasingStyle.Linear), { 'Rotation': 10 + effect2Image.Rotation }).Play()
        TweenService.Create(effectVip, new TweenInfo(1, Enum.EasingStyle.Linear), { 'Rotation': 10 + effectVip.Rotation }).Play()
        */

    }

    public updateStats() {

        let profileData = this._playerController.replica.Data.Profile
        let stats = this.UIPath.Stats.get<ImageComponent>().instance as Instance

        let frame = stats.WaitForChild('ScrollingFrame') as ScrollingFrame;

        (frame.WaitForChild('Strength').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.Values.StrengthVal);
        (frame.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.Values.GemsVal);
        (frame.WaitForChild('Rebirth').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.Values.RebirthsVal);
        (frame.WaitForChild('Kills').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.StatValues.KillsVal);
        (frame.WaitForChild('Ingame').WaitForChild('Value') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(profileData.StatValues.IngameTime);
        (frame.WaitForChild('ArenaWins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(profileData.StatValues.BattleWins);
       
    }

    public updateDailyChestBillboard() {
        let profileData = this._playerController.replica.Data.Profile;
        let instaReplica = Workspace.WaitForChild('InstaReplica') as Folder

        instaReplica.GetChildren().forEach((val) => {
            if (!val.IsA('BasePart')) { return }
            if (val.Name !== 'DailyChest') { return }

            let dailyChestPart = val

            let dailyBillboard = dailyChestPart.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
            let timer = dailyBillboard.WaitForChild('Frame').WaitForChild('Timer') as TextLabel
    
            let timeLeft = profileData.StatValues.LastDailyChestTime+(24*60*60)-os.time();
            
            timer.Text = GUIUtilities.GuiTimeFormatter(math.max(0, timeLeft));
    
            if (timeLeft <= 0) { timer.Text = 'CLAIM!' }
        })


    }

    public updateGroupChestBillboard() {
        let profileData = this._playerController.replica.Data.Profile;
        let instaReplica = Workspace.WaitForChild('InstaReplica') as Folder

        instaReplica.GetChildren().forEach((val) => {
            if (!val.IsA('BasePart')) { return }
            if (val.Name !== 'GroupChest') { return }

            let groupChestPart = val

            let groupBillboard = groupChestPart.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
            let timer = groupBillboard.WaitForChild('Frame').WaitForChild('Timer') as TextLabel
    
            let timeLeft = profileData.StatValues.LastGroupChestTime+(24*60*60)-os.time();
            
            timer.Text = GUIUtilities.GuiTimeFormatter(math.max(0, timeLeft));
    
            if (timeLeft <= 0) { timer.Text = 'CLAIM!' }
        })

    }

    public updatePotionBuffs() {
        let profileData = this._playerController.replica.Data.Profile

        let potionsFrame = this.UIPath.Potions.get<FrameComponent>().instance
        let potionInfo = this.UIPath.PotionInfo.get<ImageComponent>().instance
        //let potionInfo = potionsFrame.WaitForChild('Templates').WaitForChild('PotionInfo') as Frame

        let template = potionsFrame.WaitForChild('Templates').WaitForChild('Potion') as ImageButton

        let buffList = new Map<string, string>([
            ['StrengthPotion2Buff', 'rbxassetid://16775681520'],
            ['StrengthPotion3Buff', 'rbxassetid://16775681520'],
            ['StrengthPotion4Buff', 'rbxassetid://16775681520'],
            ['GemsPotion2Buff', 'rbxassetid://18648933965'],
            ['GemsPotion3Buff', 'rbxassetid://18648933965'],
            ['GemsPotion4Buff', 'rbxassetid://18648933965'],
        ])

        let boostList = new Map<string, string>([
            ['StrengthPotion2Buff', 'Strength Boost x2'],
            ['StrengthPotion3Buff', 'Strength Boost x3'],
            ['StrengthPotion4Buff', 'Strength Boost x2'],
            ['GemsPotion2Buff', 'Gems Boost x2'],
            ['GemsPotion3Buff', 'Gems Boost x3'],
            ['GemsPotion4Buff', 'Gems Boost x2'],
        ])

        for (let obj of potionsFrame.GetChildren()) { 
            if (!buffList.get(obj.Name)) { continue }
            obj.Destroy()
        }

        profileData.ActiveBuffs.forEach((value) => {
            //print(value.endTime - profileData.StatValues.IngameTime)
            if (!buffList.get(value.name)) { return }

            let UIobject = potionsFrame.FindFirstChild(value.name) as ImageButton

            if (!UIobject) {
                UIobject = template.Clone()
                UIobject.Name = value.name
                UIobject.Image = buffList.get(value.name)!
                UIobject.Visible = true
                UIobject.Parent = potionsFrame
            }

            let delta = (value.endTime - profileData.StatValues.IngameTime);

            (UIobject.WaitForChild('Timer') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(delta-1)

            if (delta <= 1) { UIobject.Destroy(); return };
            
            if (ButtonFabric.GetButton(UIobject)) { return }

            let button = ButtonFabric.CreateButton(UIobject)

            button.BindToEnter(() => { potionInfo.Visible = true; (potionInfo.WaitForChild('TextLabel') as TextLabel).Text = boostList.get(UIobject.Name)! })
            button.BindToLeave(() => { potionInfo.Visible = false })

        })

    }

    public updateLocations() {

        let profileData = this._playerController.replica.Data.Profile

        LocationsData.forEach((val) => {
            if (!val.gui) { return }

            let requirements = val.requirements

            if (!requirements) { return }

            let uiValue = val.gui.WaitForChild('Frame').WaitForChild('Need').WaitForChild('Value') as TextLabel
            let passed = true
                
            if ((requirements.get('strength')) && (requirements.get('strength')! > profileData.Values.StrengthVal)) { passed = false }
            if ((requirements.get('rebirth')) && (requirements.get('rebirth')! > profileData.Values.RebirthsVal)) { passed = false }
            
            if (!passed) { uiValue.TextColor3 = Color3.fromRGB(255, 0, 0); return }
            
            uiValue.TextColor3 = Color3.fromRGB(60, 255, 0)

        })

    }

    public replicateValue(name: string, newvalue: number, oldvalue: number) {

        let statsFrame = this.UIPath.StatsInfo.get<FrameComponent>().instance
        let boostFrame = this.UIPath.BoostInfo.get<FrameComponent>().instance
        
        let info = statsFrame.WaitForChild('Templates').WaitForChild(name) as Frame
        let accuracyLabel = boostFrame.WaitForChild('Holder') as Frame

        if (!info) { return }
        if (oldvalue >= newvalue) { return }

        let clonnedInfo = info.Clone()

        let positionList = new Map<string, {pos: UDim2, label: Frame}>([
            ['AccuracyInfo', {pos: UDim2.fromScale(0.5 , -0.3), label: accuracyLabel}],
        ])

        let tweenInfo = new TweenInfo(1, Enum.EasingStyle.Quad)
        let tweenInfo2 = new TweenInfo(.4, Enum.EasingStyle.Quad)

        let delta = math.round(newvalue - oldvalue);
        (clonnedInfo.WaitForChild('Value') as TextLabel).Text = '+'+GUIUtilities.getSIPrefixSymbol(delta)

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
        
    }

    public updateBoostBar() {

        let profileData = this._playerController.replica.Data.Profile

        let boostFrame = this.UIPath.BoostInfo.get<FrameComponent>().instance
        let holder = boostFrame.WaitForChild('Holder') as Frame
        let bar = holder.WaitForChild('Bar') as Frame

        let currentBar = GetNextBar(profileData.StatValues.BarLevel)

        let scale = profileData.Values.StrengthVal/currentBar.Additional!.get('Strength')

        TweenService.Create(bar, new TweenInfo(.1), { Size: UDim2.fromScale(math.min(scale, 1), 1) }).Play();
        (holder.WaitForChild('TextLabel') as TextLabel).Text = 
            GUIUtilities.getSIPrefixSymbol(profileData.Values.StrengthVal) + '/' + GUIUtilities.getSIPrefixSymbol(currentBar.Additional!.get('Strength'));

        if (profileData.Values.StrengthVal > currentBar.Additional!.get('Strength') * 1.05) {
            (holder.WaitForChild('TextLabel') as TextLabel).Text = 'MAX'
        }

        (boostFrame.WaitForChild('TextLabel') as TextLabel).Text = 
            `💪 Lightsaber Boost: ${GUIUtilities.getSIPrefixSymbol(profileData.AdditionValues.StrengthAdditionVal*100)}%`

    }

    public updateShadowQuest() {

        let profileData = this._playerController.replica.Data.Profile

        let eggsFrame = this.UIPath.Eggs.get<FrameComponent>().instance
        let shadowEgg = eggsFrame.WaitForChild('ScrollingFrame').WaitForChild('Shadow');

        (shadowEgg.WaitForChild('Kills') as Frame).GetChildren().forEach((val) => {
            if (!val.IsA('ImageLabel')) { return };
            (val.WaitForChild('Check') as ImageLabel).Visible = false
        })

        if (!profileData.CurrentQuestsProgress.get('Shadow')) { return }

        for (let i = 0; i <= profileData.CurrentQuestsProgress.get('Shadow')!.get('kills'); i++) {
            let image = shadowEgg.WaitForChild('Kills').FindFirstChild('Kill'+tostring(i))
            if (!image) { continue }
            (image.WaitForChild('Check') as ImageLabel).Visible = true
        }
        
        profileData.StoredEggs.forEach((val) => {
            if (val.name !== 'ShadowStored') { return }
            (shadowEgg.WaitForChild('Stored1').WaitForChild('Amount') as TextLabel).Text = 'x'+tostring(val.amount)
        })

    }

    public updateKatanaQuest() {
        let profileData = this._playerController.replica.Data.Profile

        let eventFrame = this.UIPath.KatanaEvent.get<ImageComponent>().instance
        let dailyBar = eventFrame.WaitForChild('DaysProgress');
        let hoursBar = eventFrame.WaitForChild('HoursProgress');

        (dailyBar.WaitForChild('Progress') as TextLabel).Text = tostring(math.min(2, profileData.StatValues.DayAmount))+'/2';
        (hoursBar.WaitForChild('Progress') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(math.min(8*60*60, profileData.StatValues.IngameTime));

        let dailyProgress = math.min(1, profileData.StatValues.DayAmount/2)
        let hoursProgress = math.min(1, profileData.StatValues.IngameTime/(60*60*8));

        if ((dailyProgress >= 1) && (hoursProgress >= 1) && (!profileData.Products.includes('cartoonkatana'))) {
            this.updateGradient(eventFrame.WaitForChild('Claim') as GuiButton, mainUI.WaitForChild('Templates').WaitForChild('Green') as UIGradient)
        }
        else {
            this.updateGradient(eventFrame.WaitForChild('Claim') as GuiButton, mainUI.WaitForChild('Templates').WaitForChild('Gray') as UIGradient)
        }

        TweenService.Create(dailyBar.WaitForChild('stroke') as ImageLabel, new TweenInfo(1), { Size: UDim2.fromScale(dailyProgress, 1) }).Play();
        TweenService.Create(hoursBar.WaitForChild('stroke') as ImageLabel, new TweenInfo(1), { Size: UDim2.fromScale(hoursProgress, 1) }).Play();
    }

    public setupPetDisable() {
        task.spawn(() => {
            let petsFolder = game.Workspace.WaitForChild('Pets', 60) as Folder

            let terrainFolder = new Instance('Folder')
            terrainFolder.Name = 'DisabledPets'
            terrainFolder.Parent = ReplicatedStorage

            if (!petsFolder) { return }

            let id = tostring(this._playerController.component.instance.UserId)

            petsFolder.ChildAdded.Connect((child) => {

                if (this.disableYourPets && child.Name === id) {
                    task.wait(.1)
                    child.Parent = terrainFolder
                }

                if (this.disableOthersPets && child.Name !== id) {
                    task.wait(.1)
                    child.Parent = terrainFolder
                }
            })
        })
    }

    public setupStoreBuyablePets() {

        let store = this.UIPath.Store.get<ImageComponent>().instance
        let storeFrame = store.WaitForChild('ScrollingFrame') as ScrollingFrame
        let eggs = storeFrame.WaitForChild('ExclusiveEggs')

        let petRarities = ReplicatedStorage.WaitForChild('PetRarities') as Folder;
        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;

        let nightmareList = new Map([
            ['Buy1', 1907106335],
            ['Buy3', 1907106907],
            ['Buy10', 1907107398],
        ])

        let partyList = new Map([
            ['Buy1', 1907107991],
            ['Buy3', 1907108173],
            ['Buy10', 1907108348],
        ])

        let shadowList = new Map([
            ['Buy1', 1763283579],
            ['Buy3', 1763283812],
            ['Buy10', 1763283954],
        ])

        let nightmatePets = new Map([
            ['NightmareBunny', PetsData.get('Nightmare Bunny')],
            ['NightmareCat', PetsData.get('Nightmare Cat')],
            ['NightmareYeti', PetsData.get('Nightmare Yeti')],
            ['DevilSpider', PetsData.get('Devil Spider')], 
            ['Observer', PetsData.get('Observer')],
        ])

        let partyPets = new Map([
            ['ConfettiBalloon', PetsData.get('Confetti Balloon')],
            ['DJDemon', PetsData.get('DJ Demon')],
            ['PartyGoblin', PetsData.get('Party Goblin')],
            ['SwaggySongbird', PetsData.get('Swaggy Songbird')],
        ])

        let shadowPets = new Map([
            ['ShadowButterfly', PetsData.get('Shadow Butterfly')],
            ['ShadowChameleon', PetsData.get('Shadow Chameleon')],
            ['ShadowGhost', PetsData.get('Shadow Ghost')],
            ['ShadowStar', PetsData.get('Shadow Star')],
        ])

        let relicsEvent = new Map([
            ['CommonDice', {name: 'Dice of Power', level: 1, amount: 1}],
            ['CashbackTicket', {name: 'Cashback Ticket', level: 1, amount: 1}],
            ['LegendaryDice', {name: 'Dice of Power', level: 5, amount: 1}],
            ['MythicDice', {name: 'Dice of Power', level: 6, amount: 1}],
        ])

        let nightmateChances: Map<string, number> = new Map([['Sum', 0]])
        let partyChances: Map<string, number> = new Map([['Sum', 0]])
        let shadowChances: Map<string, number> = new Map([['Sum', 0]])

        EggsData.get('Nightmare')!.petchances.forEach((val) => { 
            nightmateChances.set(val.name!, val.weight), 
            nightmateChances.set('Sum', nightmateChances.get('Sum')! + val.weight) 
        })

        EggsData.get('Party')!.petchances.forEach((val) => { 
            partyChances.set(val.name!, val.weight) 
            partyChances.set('Sum', partyChances.get('Sum')! + val.weight) 
        })

        EggsData.get('Shadow')!.petchances.forEach((val) => { 
            shadowChances.set(val.name!, val.weight) 
            shadowChances.set('Sum', shadowChances.get('Sum')! + val.weight) 
        })

        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance
        let stats = petOverlay.WaitForChild('Stats') as Frame
        let scale = petOverlay.WaitForChild('Scale') as Frame

        for (let obj of eggs.WaitForChild('NightmareEgg')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => { Events.PurchasePrompt(nightmareList.get(obj.Name)!) })
        }

        for (let obj of eggs.WaitForChild('PartyEgg')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => { Events.PurchasePrompt(partyList.get(obj.Name)!) })
        }

        for (let obj of eggs.WaitForChild('NightmareEgg')!.WaitForChild('Pets')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            let frame = FrameFabric.CreateFrame(obj)
            
            //print(nightmatePets.get(obj.Name), obj.Name, nightmateChances)
            let pet = nightmatePets.get(obj.Name)!
            let newPet = PetUtilities.DBToPetTransfer(pet, true)
            let chanceLabel = obj.WaitForChild('TextLabel') as TextLabel

            chanceLabel.Text = tostring(math.round(nightmateChances.get(pet.name)!/nightmateChances.get('Sum')!*100*10)/10)+'%'

            if (!newPet) { continue }

            let gradient = petRarities.WaitForChild(newPet.stats.rarity) as UIGradient
            if (gradient) { gradient.Clone().Parent = obj }

            frame.BindToEnter(() => { 
                petOverlay.Visible = true;
                stats.Visible = true;
                scale.Visible = false;
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                //(stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                //(stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                (stats.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet!.stats.rarity;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';

                if (!newPet!.additional.perks) { return }

                let perkIndex = -1
                newPet!.additional.perks?.forEach((val, index) => { if (val.name === 'Extra Power') { perkIndex = index } })
                
                if (perkIndex < 0) { return }
    
                let selectedPerk = newPet!.additional.perks[perkIndex]
    
                stats.Visible = false
                scale.Visible = true;
    
                (scale.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                (scale.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet!.stats.rarity;
                (scale.WaitForChild('Boost') as TextLabel).Text = PetPerksInfo.get(PetPerkNames.get(selectedPerk.name)!)![selectedPerk.level-1].desc

                //(stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                //(stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;
            })
            frame.BindToLeave(() => { petOverlay.Visible = false;  });
        }

        for (let obj of eggs.WaitForChild('PartyEgg')!.WaitForChild('Pets')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            let frame = FrameFabric.CreateFrame(obj)

            //print(partyPets.get(obj.Name), obj.Name)
            let pet = partyPets.get(obj.Name)!
            let newPet = PetUtilities.DBToPetTransfer(pet, true)
            let chanceLabel = obj.WaitForChild('TextLabel') as TextLabel

            chanceLabel.Text = tostring(math.round(partyChances.get(pet.name)!/partyChances.get('Sum')!*100*10)/10)+'%'

            if (!newPet) { continue }

            let gradient = petRarities.WaitForChild(newPet.stats.rarity) as UIGradient
            if (gradient) { gradient.Clone().Parent = obj }

            frame.BindToEnter(() => { 
                petOverlay.Visible = true;
                stats.Visible = true;
                scale.Visible = false;
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                //(stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                //(stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                (stats.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet!.stats.rarity;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';

                if (!newPet!.additional.perks) { return }

                let perkIndex = -1
                newPet!.additional.perks?.forEach((val, index) => { if (val.name === 'Extra Power') { perkIndex = index } })
                
                if (perkIndex < 0) { return }
    
                let selectedPerk = newPet!.additional.perks[perkIndex]
    
                stats.Visible = false
                scale.Visible = true;
    
                (scale.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
                (scale.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet!.stats.rarity;
                (scale.WaitForChild('Boost') as TextLabel).Text = PetPerksInfo.get(PetPerkNames.get(selectedPerk.name)!)![selectedPerk.level-1].desc


                //(stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                //(stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;
            })
            frame.BindToLeave(() => { petOverlay.Visible = false;  });
        }

    }

    public setupFavorites() {

        let tries = 0
        let result: Enum.AvatarPromptResult = Enum.AvatarPromptResult.Failed
        let maxWorld = WorldsData.get(this._playerController.replica.Data.Profile.Config.MaxWorld)!

        if (this._playerController.replica.Data.Profile.StatValues.Favorited) { return }
        if (maxWorld.weight > 1) { return }

        task.spawn(() => {
            while ((result !== Enum.AvatarPromptResult.Success) && (tries < 3)) {
                task.wait(60)
                tries += 1
                result = LuaUtilFunctions.checkFavorite()
                task.wait(10*60-60)
            }

            Events.ReplicateValues.fire(ReplicationOperationStatus.Favorite, true)
        })

    }

    public setupTutorial() {
        let profileData = this._playerController.replica.Data.Profile

        if (profileData.StatValues.IngameTime > 30) { return }

        let tutorial = this.UIPath.Tutorial.get<ImageComponent>().instance

        this.UIPath.Tutorial.get<ImageComponent>().Open()

        let dynamicCodesText1 = new DynamicText(
            tutorial.WaitForChild('Info') as TextLabel, 
            '💪  Train your strength by clicking with your lightsaber',
            new Map<number, StrokeInfo>([[200, {Speed: 70}]])
        )

        let dynamicCodesText2 = new DynamicText(
            tutorial.WaitForChild('Info') as TextLabel, 
            '📈  Evolve your lightsaber to get more strength',
            new Map<number, StrokeInfo>([[200, {Speed: 70}]])
        )

        let dynamicCodesText3 = new DynamicText(
            tutorial.WaitForChild('Info') as TextLabel, 
            '💰  Rebirth to earn gems and strength multiplier',
            new Map<number, StrokeInfo>([[200, {Speed: 70}]])
        )

        let codes = [
            dynamicCodesText1,
            dynamicCodesText2,
            dynamicCodesText3
        ];

        let pointer = 0

        ButtonFabric.CreateButton(tutorial.WaitForChild('Next') as GuiButton).BindToClick(() => {
            if (!codes[pointer]) { this.UIPath.Tutorial.get<ImageComponent>().Close(); return }

            codes[pointer].Start()
            pointer += 1
        })
    }


    public setupButtonSwitch(button: GuiButton, start: boolean, callback: (bool: boolean) => boolean) {

        let obj = ButtonFabric.CreateButton(button)

        let switched = start
        let bar = button.WaitForChild('Bar') as Frame

        let switchFunction = () => {

            if (switched) {

                button.GetDescendants().forEach((val) => {
                    if (!val.IsA('UIGradient')) { return }
                    if (val.Name === 'Green') { val.Enabled = true }
                    else { val.Enabled = false }
                })

                TweenService.Create(bar, new TweenInfo(.1), { Position: UDim2.fromScale(0,0) }).Play()

            }
            else {

                button.GetDescendants().forEach((val) => {
                    if (!val.IsA('UIGradient')) { return }
                    if (val.Name === 'Red') { val.Enabled = true }
                    else { val.Enabled = false }
                })

                TweenService.Create(bar, new TweenInfo(.1), { Position: UDim2.fromScale(1-button.Size.X.Scale,0) }).Play()

            }

        }

        switchFunction()
        
        obj.BindToClick(() => {
            switched = !switched
            let res = callback(switched)
            if (!res) { return }
            switchFunction()
        })


        return obj

    }
    
    public setupSettings() {

        let settings = this.UIPath.Settings.get<ImageComponent>().instance
        let rebirth = this.UIPath.Rebirth.get<ImageComponent>().instance
        let frame = settings.WaitForChild('ScrollingFrame') as ScrollingFrame

        let id = tostring(this._playerController.component.instance.UserId)
        let profileData = this._playerController.replica.Data.Profile

        this.setupButtonSwitch(
            frame.WaitForChild('HideOtherPets')!.WaitForChild('Button')! as GuiButton,
            false,
            (bool) => {
                this.disableOthersPets = bool

                if (bool) {
                    for (let folder of game.Workspace.WaitForChild('Pets').GetChildren()) {
                        if (folder.Name === id) { continue }
                        folder.Parent = ReplicatedStorage.WaitForChild('DisabledPets')
                    }
                    return true
                }

                for (let folder of ReplicatedStorage.WaitForChild('DisabledPets').GetChildren()) {
                    if (folder.Name === id) { continue }
                    folder.Parent = game.Workspace.WaitForChild('Pets')
                }

                return true

            }
        )  

        this.setupButtonSwitch(
            frame.WaitForChild('HideYourPets')!.WaitForChild('Button')! as GuiButton,
            false,
            (bool) => {
                this.disableYourPets = bool

                if (bool) {
                    for (let folder of game.Workspace.WaitForChild('Pets').GetChildren()) {
                        if (folder.Name !== id) { continue }
                        folder.Parent = ReplicatedStorage.WaitForChild('DisabledPets')
                    }
                    return true
                }

                for (let folder of ReplicatedStorage.WaitForChild('DisabledPets').GetChildren()) {
                    if (folder.Name !== id) { continue }
                    folder.Parent = game.Workspace.WaitForChild('Pets')
                }

                return true
            }
        )  

        this.setupButtonSwitch(
            frame.WaitForChild('Notify')!.WaitForChild('Button')! as GuiButton,
            true,
            (bool) => {
                PlayerController.enabledNotifications = bool
                return true
            }
        )  

        this.setupButtonSwitch(
            frame.WaitForChild('Sound')!.WaitForChild('Button')! as GuiButton,
            true,
            (bool) => {
                PlayerController.enabledSFX = bool
                return true
            }
        )  

        this.setupButtonSwitch( //indev (i mean it works but with bugs)
            frame.WaitForChild('VFX')!.WaitForChild('Button')! as GuiButton,
            true,
            (bool) => {
                PlayerController.enabledVFX = bool

                if (bool) {
                    for (let player of Players.GetPlayers()) {
                        let character = player.Character
                        if (!character) { continue }
                        character.GetDescendants().forEach((val) => {
                            if (val.IsA('ParticleEmitter')) { val.Enabled = true }
                        })
                    }
                    return true
                }

                for (let player of Players.GetPlayers()) {
                    let character = player.Character
                    if (!character) { continue }
                    character.GetDescendants().forEach((val) => {
                        if (val.IsA('ParticleEmitter')) { val.Enabled = false }
                    })
                }

                return true

            }
        )  

        this.setupButtonSwitch(
            frame.WaitForChild('Music')!.WaitForChild('Button')! as GuiButton,
            true,
            (bool) => {

                if (bool) { (game.Workspace.WaitForChild('GameMusic') as Sound).Play(); return true }
                (game.Workspace.WaitForChild('GameMusic') as Sound).Stop()
                return true
            }
        )  

        this.setupButtonSwitch(
            rebirth.WaitForChild('AutoRebirth')!.WaitForChild('Button')! as GuiButton,
            false,
            (bool) => {
                if (!profileData.Products.includes('autorebirth')) { Events.PurchasePrompt(891574490); return false }
                this.autoRebirth = bool
                return true
            }
        )  

        let respawn = true

        this.setupButtonSwitch(
            frame.WaitForChild('MaxWorld')!.WaitForChild('Button')! as GuiButton,
            true,
            (bool) => {
                respawn = !respawn
                Events.ReplicateValues.fire(ReplicationOperationStatus.LastWorldRespawn, respawn)
                return true
            }
        )  

    }

    public setupLowerSwords() {

        let lowerlist = this.UIPath.LowerList.get<ImageComponent>().instance

        let profileData = this._playerController.replica.Data.Profile

        let donateKatanas = new Map([
            ['Wings Lightsaber', 'wingslightsaber'],
            ['Double Lightsaber', 'doublelightsaber'],
        ])

        let productIds = new Map([
            ['Wings Lightsaber', 1907114211],
            ['Double Lightsaber', 1907114568],
        ])
        
        lowerlist.GetChildren().forEach((val) => {
            if (!val.IsA('GuiButton')) { return }
            if (val.Name === 'Dash') { 
                ButtonFabric.CreateButton(val).BindToClick(() => {
                    PlayEffect('Dash')
                })
                return 
            }
            let mark = val.WaitForChild('Mark') as ImageLabel

            let autofarmUI = val.WaitForChild('Auto') as GuiButton
            let disableAuto = autofarmUI.WaitForChild('Disable') as GuiButton

            let button = ButtonFabric.CreateButton(val)

            button.BindToClick(() => {

                if (donateKatanas.get(val.Name) && !profileData.Products.includes(donateKatanas.get(val.Name)!)) {
                    Events.PurchasePrompt(productIds.get(val.Name)!)
                    return 
                }
                
                let slot = true

                lowerlist.GetChildren().forEach((value) => {
                    if (!value.IsA('GuiButton')) { return }
                    if (value.Name === 'Dash') { return };
                    (value.WaitForChild('Mark') as ImageLabel).Visible = false;
                    (value.WaitForChild('Auto') as GuiButton).Visible = false;
                    slot = slot || (value.WaitForChild('Auto').WaitForChild('Disable') as GuiButton).Visible;
                    (value.WaitForChild('Auto').WaitForChild('Disable') as GuiButton).Visible = false
                })

                mark.Visible = true
                autofarmUI.Visible = true
                disableAuto.Visible = slot
                this.autoTrain = !slot

                Events.ManageTool(ToolOperationStatus.Equip, val.Name)
            })

            ButtonFabric.CreateButton(autofarmUI).BindToClick(() => {
                this.autoTrain = false
                disableAuto.Visible = true
            })
            
            ButtonFabric.CreateButton(disableAuto).BindToClick(() => {
                this.autoTrain = true
                disableAuto.Visible = false
            })

        })

    }

    public setupWorldTeleports() {

        let intro = this.UIPath.TeleportIntro.Frame.get<FrameComponent>().instance

        WorldsData.forEach((val) => {
            if (val.nextWorldTeleport) {
                let proximity = val.nextWorldTeleport.WaitForChild('ProximityPrompt') as ProximityPrompt

                let selectedWorld = WorldType.Cave

                WorldsData.forEach((world, name) => {
                    if (world.weight === (val.weight + 1)) { selectedWorld = name }
                })

                proximity.Triggered.Connect(() => {
                    intro.Transparency = 0
                    intro.Size = UDim2.fromScale(0,0)
                    TweenService.Create(intro, new TweenInfo(.5), { Size: UDim2.fromScale(3,3) }).Play()
                    task.wait(.5)
                    Events.ManageWorld.fire(WorldOperationStatus.Teleport, selectedWorld)
                    task.wait(.5)
                    TweenService.Create(intro, new TweenInfo(.5), { Transparency: 1 }).Play()
                })
            }

            if (val.previousWorldTeleport) {
                let proximity = val.previousWorldTeleport.WaitForChild('ProximityPrompt') as ProximityPrompt

                let selectedWorld = WorldType.Cave

                WorldsData.forEach((world, name) => {
                    if (world.weight === (val.weight - 1)) { selectedWorld = name }
                })

                proximity.Triggered.Connect(() => {
                    intro.Transparency = 0
                    intro.Size = UDim2.fromScale(0,0)
                    TweenService.Create(intro, new TweenInfo(.5), { Size: UDim2.fromScale(3,3) }).Play()
                    task.wait(.5)
                    Events.ManageWorld.fire(WorldOperationStatus.Teleport, selectedWorld)
                    task.wait(.5)
                    TweenService.Create(intro, new TweenInfo(.5), { Transparency: 1 }).Play()
                })
            }
        })

    }

    public updateBattleInvite() {
        this.UIPath.ArenaNotify.get<FrameComponent>().instance.Visible = true

        task.delay(10, () => {
            this.UIPath.ArenaNotify.get<FrameComponent>().instance.Visible = false
        })
    }

    public startCountdown() {
        let status = this.UIPath.ArenaStatus.get<FrameComponent>().instance;
        
        this.battleGuiWaiting = false
        for (let v of ['3', '2', '1', 'Start!']) {
            (status.WaitForChild('Status') as TextLabel).Text = v
            task.wait(1)
        }
        this.battleGuiWaiting = true

        PlayEffect('ChangeUseStatus', new Map([['bool', false]]))
        
        status.Visible = false;
        (status.WaitForChild('Status') as TextLabel).Text = 'Waiting players.'
    }

    public failedToStartBattle() {
        PlayEffect('ChangeUseStatus', new Map([['bool', true]]))
        let status = this.UIPath.ArenaStatus.get<FrameComponent>().instance;

        this.battleGuiWaiting = false;
        (status.WaitForChild('Status') as TextLabel).Text = 'Arena canceled, reason: not enough players'
        task.delay(2, () => {
            status.Visible = false;
            (status.WaitForChild('Status') as TextLabel).Text = 'Waiting players.'
        })
    }

    public declareBattleWinners(additional: Map<string, any>) {
        PlayEffect('ChangeUseStatus', new Map([['bool', true]]))
        let winnersUI = this.UIPath.ArenaWinners.get<FrameComponent>().instance;
        let players = additional.get('Players') as string[]

        let uiList = winnersUI.WaitForChild('Winners').WaitForChild('UIListLayout') as UIListLayout
        let line = winnersUI.WaitForChild('Line') as Frame

        winnersUI.Visible = true

        for (let i = 0; i < 3; i++) {
            if (!players[i]) { continue }
            let player = Players.FindFirstChild(players[i]) as Player
            if (!player) { continue };

            (winnersUI.WaitForChild('Winners').WaitForChild(tostring(i+1)).WaitForChild('WinnerSkin') as ImageLabel).Image = 
                Players.GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size150x150)[0]
        }

        TweenService.Create(winnersUI, new TweenInfo(1), { Position: UDim2.fromScale(0.5, 0.175) }).Play()

        task.wait(.6)

        TweenService.Create(uiList, new TweenInfo(1), { Padding: new UDim(0.15, 0) }).Play()
        TweenService.Create(line, new TweenInfo(5), { Size: UDim2.fromScale(.8, 0.039) }).Play()


        task.wait(5)

        TweenService.Create(winnersUI, new TweenInfo(1), { Position: UDim2.fromScale(0.5, -0.25) }).Play()

        task.wait(1)

        winnersUI.Visible = false

        uiList.Padding = new UDim(1, 0)
        line.Size = UDim2.fromScale(0, 0.039)
    }

    //public setupRelics = () => { return this.UIRelicController.setupRelics() }
    //public setupEquippedRelics = () => { return this.UIRelicController.setupEquippedRelics() }
    //public setupRelicsMerge = () => { return this.UIRelicController.setupRelicsMerge() }
    //public updateRelicPasses = () => { return this.UIRelicController.updateRelicPasses() }
    //public setupRelicsEvent = () => { return this.UIRelicController.setupRelicsEvent() }
    //public updateRelicMerge = (name: string, level: number, image: ImageLabel) => { return this.UIRelicController.updateRelicMerge(name, level, image) }

    public createPetExample = (pet: IDBPetData, callback: (pet: IDBPetData, obj: GuiButton) => void) => { return this.UIPetsController.createPetExample(pet, callback) }
    public createPetExamples = (parent: Instance, callback: (pet: IDBPetData, obj: GuiButton) => void) => { return this.UIPetsController.createPetExamples(parent, callback) }
    public updatePetSearch = () => { return this.UIPetsController.updatePetSearch() }
    public appendPetInventory = (pets: IDBPetData[]) => { return this.UIPetsController.appendPetInventory(pets) }
    public removePetInventory = (pets: IDBPetData[]) => { return this.UIPetsController.removePetInventory(pets) }
    public updatePetInventory = (pets: IDBPetData[]) => { return this.UIPetsController.updatePetInventory(pets) }
    public updatePets = () => { return this.UIPetsController.updatePets() }
    public clearPets = (parent: Instance, filter?: keyof Instances) => { return this.UIPetsController.clearPets(parent, filter) }
    public setupPets = () => { return this.UIPetsController.setupPets() }
    public displayPet = (pet: IDBPetData | undefined, object?: GuiObject, ignore?: boolean, artificial?: boolean) => { return this.UIPetsController.displayPet(pet, object, ignore, artificial) }
    public setupInventoryButtons = () => { return this.UIPetsController.setupInventoryButtons() }
    public setupMassLock = () => { return this.UIPetsController.setupMassLock() }
    public setupMassLockFrame = () => { return this.UIPetsController.setupMassLockFrame() }
    public displayLockPet = (pet: IDBPetData, object: GuiButton) => { return this.UIPetsController.displayLockPet(pet, object) }
    public updateMassLock = () => { return this.UIPetsController.updateMassLock() }
    public setupMassDelete = () => { return this.UIPetsController.setupMassDelete() }
    public setupMassDeleteFrame = () => { return this.UIPetsController.setupMassDeleteFrame() }
    public updateMassDelete = () => { return this.UIPetsController.updateMassDelete() }
    public displayDeletePet = (pet: IDBPetData, object: GuiButton) => { return this.UIPetsController.displayDeletePet(pet, object) }
    public getEquippedPets = (pets: IDBPetData[]) => { return this.UIPetsController.getEquippedPets(pets) }
    
    onInit() {
        //print('Waiting')
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }
        //print('Loading GUI')

        //GUIUtilities.InitializeGuiTimer(testing, 10)
        //GUIUtilities.InitializeGuiWheel(testing, 10, 5)

        //let currentlyShooting: Part | undefined = undefined

        this._playerController.component.instance.CharacterAdded.Connect(() => {
            PlayEffect('ChangeUseStatus', new Map([['bool', true]]))
        })

        this.UIPath = this._uiControllerSetup.UIPath//ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)
        let replicaData = this._playerController.replica.Data

        //print(this.UIPath, 'this.UIPaththis.UIPath', this._uiControllerSetup.UIPath)

        this.UIRelicController.setupData(this.UIPath, this._playerController)
        this.UIPetsController.setupData(this.UIPath, this._playerController)

        this.setupAutoTrain()


        //print(this._playerController.replica.Data.Session.claimedRewards.size(), 'Size')

        /*
        let enableNotifications = this.UIPath.Settings.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('Notify').WaitForChild('Enable') as GuiButton
        let disableNotifications = enableNotifications.WaitForChild('Disable') as GuiButton

        ButtonFabric.CreateButton(enableNotifications).BindToClick(() => {
            PlayerController.enabledNotifications = false
            disableNotifications.Visible = true
        })

        ButtonFabric.CreateButton(disableNotifications).BindToClick(() => {
            PlayerController.enabledNotifications = true
            disableNotifications.Visible = false
        })

        let enablePetsButton = this.UIPath.Settings.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('HidePets').WaitForChild('Enable') as GuiButton
        let disablePetsButton = enablePetsButton.WaitForChild('Disable') as GuiButton

        ButtonFabric.CreateButton(enablePetsButton).BindToClick(() => {
            disablePetsButton.Visible = true
            this.disablePets = true

            for (let folder of game.Workspace.WaitForChild('Pets').GetChildren()) {
                folder.Parent = ReplicatedStorage.WaitForChild('DisabledPets')
            }
        })

        ButtonFabric.CreateButton(disablePetsButton).BindToClick(() => {
            disablePetsButton.Visible = false
            this.disablePets = false

            for (let folder of ReplicatedStorage.WaitForChild('DisabledPets').GetChildren()) {
                folder.Parent = game.Workspace.WaitForChild('Pets')
            }
        })

        let enableMusicButton = this.UIPath.Settings.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('Music').WaitForChild('Enable') as GuiButton
        let disableMusicButton = enableMusicButton.WaitForChild('Disable') as GuiButton

        ButtonFabric.CreateButton(enableMusicButton).BindToClick(() => {
            disableMusicButton.Visible = true;
            (game.Workspace.WaitForChild('GameMusic') as Sound).Stop()
        })

        ButtonFabric.CreateButton(disableMusicButton).BindToClick(() => {
            disableMusicButton.Visible = false;
            (game.Workspace.WaitForChild('GameMusic') as Sound).Play()
        })

        */

        let instaReplica = game.Workspace.WaitForChild('InstaReplica')

        instaReplica.GetChildren().forEach((val) => {
            if (!val.IsA('BasePart')) { return }

            if (val.Name === 'DailyChest') {
                let dailyChest = GroupPopUpFabric.CreateGroupPopUp(val)
                dailyChest.radius = 16
                dailyChest.BindToEnter(() => { Events.ClaimReward(RewardType.DailyChest, 'nil') }) 
            }

            if (val.Name === 'GroupChest') {
                let dailyChest = GroupPopUpFabric.CreateGroupPopUp(val)
                dailyChest.radius = 16
                dailyChest.BindToEnter(() => { Events.ClaimReward(RewardType.GroupChest, 'nil') }) 
            }

            if (val.Name === 'Spin') {
                let spinpart1 = GroupPopUpFabric.CreateGroupPopUp(val)
                spinpart1.radius = 10
                spinpart1.BindToEnter(() => { this.UIPath.WheelSpin.get<ImageComponent>().Open() })
                spinpart1.BindToLeave(() => { this.UIPath.WheelSpin.get<ImageComponent>().Close() })
            }

            if (val.Name === 'Proximity1') {
                (val.WaitForChild('ProximityPrompt') as ProximityPrompt).Triggered.Connect(() => { Events.PurchasePrompt(1907114869) })
            }

            if (val.Name === 'Proximity2') {
                (val.WaitForChild('ProximityPrompt') as ProximityPrompt).Triggered.Connect(() => { Events.PurchasePrompt(1907114731) })
            }


        });

        //(instaReplica.WaitForChild('Proximity1').WaitForChild('ProximityPrompt') as ProximityPrompt).Triggered.Connect(() => { Events.PurchasePrompt(1907114869) });
        //(instaReplica.WaitForChild('Proximity2').WaitForChild('ProximityPrompt') as ProximityPrompt).Triggered.Connect(() => { Events.PurchasePrompt(1907114731) })

        //let inviteButton = ButtonFabric.CreateButton(this.UIPath.Invite.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('Main').WaitForChild('Button') as GuiButton) 
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        //let inviteFrame = this.UIPath.Invite.get<ImageComponent>().instance.WaitForChild('ScrollingFrame')
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        ////print(CreationUtilities.getSIPrefixSymbol(1550), 'TestNumber')
        ////print(CreationUtilities.getSIPrefixSymbol(1230000), 'TestNumber')
        //print(GUIUtilities.getSIPrefixSymbol(10667865604675647), 'TestNumber')

        /*
        ButtonFabric.CreateButton(inviteFrame.WaitForChild('Main').WaitForChild('Button') as GuiButton).BindToClick(() => {
            //roblox invite later on
        })

        inviteButton.BindToClick(() => { pcall(() => { SocialService.PromptGameInvite(this._playerController.component.instance) }) })
        */

        ButtonFabric.CreateButton(this.UIPath.KatanaEvent.get<ImageComponent>().instance.WaitForChild('Buy') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(1907114211)
        })

        ButtonFabric.CreateButton(this.UIPath.KatanaEvent.get<ImageComponent>().instance.WaitForChild('Claim') as GuiButton).BindToClick(() => {
            Events.ClaimReward.fire(RewardType.WeaponQuest, 'nil')
        })

        this.UIPath.List.Invite.get<ButtonComponent>().BindToClick(() => {
            pcall(() => { SocialService.PromptGameInvite(this._playerController.component.instance) })
        })

        this.UIPath.WheelSpin.Spin2.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.SpinWheel, 'nil')
        })

        this.UIPath.WheelSpin.SpinButton.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.SpinWheel, 'nil')
        })

        this.UIPath.WheelSpin.Buy1.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1907117854) })
        this.UIPath.WheelSpin.Buy10.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1907117995) })
        this.UIPath.WheelSpin.Buy50.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1907118126) })
        this.UIPath.WheelSpin.Buy100.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1907118276) })

        this.UIPath.PetInventory.PetInfo.Equip.get<ButtonComponent>().BindToClick(() => {
            if (!this.UIPetsController.selectedPet) { return }
            Events.ManagePet(this.UIPetsController.selectedPetStatus, this.UIPetsController.selectedPet)
        })

        this.UIPath.PetInventory.PetInfo.Lock.get<ButtonComponent>().BindToClick(() => {
            if (!this.UIPetsController.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.Lock, this.UIPetsController.selectedPet)
            //this.UIPetsController.selectedPet.locked = !this.UIPetsController.selectedPet.locked
        })

        this.UIPath.PetInventory.PetInfo.Delete.get<ButtonComponent>().BindToClick(() => {
            if (!this.UIPetsController.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.Delete, this.UIPetsController.selectedPet)
        })

        this.UIPath.PetInventory.PetInfo.CraftFrame.Craft.get<ButtonComponent>().BindToClick(() => {
            if (!this.UIPetsController.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.CraftSize, this.UIPetsController.selectedPet)
        })

        this.UIPath.Store.Gift.get<ButtonComponent>().BindToClick(() => {

            let storeFrame = this.UIPath.Store.get<ImageComponent>().instance
            let giftFrame = this.UIPath.GiftPlayerList.get<ImageComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
            let giftButton = this.UIPath.Store.Gift.get<ButtonComponent>().instance

            if (this.giftingToUserId) { 
                this.giftingToUserId = undefined; 
                (storeFrame.WaitForChild('GiftingTo') as TextLabel).Visible = false;
                (giftButton.WaitForChild('Value') as TextLabel).Text = 'Gift'
                this.updateGradient(giftButton, mainUI.WaitForChild('Templates').WaitForChild('Blue') as UIGradient)
                this.updateStoreGamepasses()
                return 
            };

            this.updatePlayerGiftFrame()
            this.UIPath.GiftPlayerList.get<ImageComponent>().Open()
        })

        this.UIPath.GiftPlayerList.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.GiftPlayerList.get<ImageComponent>().Close()
            this.UIPath.Store.get<ImageComponent>().Open()
        })

        this.UIPath.Rebirth.RebirthButton.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Rebirth, 'nil')
        })

        this.UIPath.Codes.Redeem.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Code, (this.UIPath.Codes.get<ImageComponent>().instance.WaitForChild('Code').WaitForChild('Value') as TextBox).Text)
        })

        this.UIPath.ArenaNotify.Buttons.No.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.ArenaNotify.get<FrameComponent>().instance.Visible = false
        })

        this.UIPath.ArenaNotify.Buttons.Yes.get<ButtonComponent>().BindToClick(() => {
            Events.ManageBattlefield.fire(BattlefieldOperationStatus.AcceptInvite)
            this.UIPath.ArenaNotify.get<FrameComponent>().instance.Visible = false

            let status = this.UIPath.ArenaStatus.get<FrameComponent>().instance
            status.Visible = true;
            (status.WaitForChild('Status') as TextLabel).Text = 'Waiting players.'
        })

        task.spawn(() => {
            let status = this.UIPath.ArenaStatus.get<FrameComponent>().instance
            let step = 0

            let dots = ['.', '..', '...']

            while (task.wait(1)) {
                if (!status.Visible || !this.battleGuiWaiting) { continue }
                step += 1;
                (status.WaitForChild('Status') as TextLabel).Text = 'Waiting players'+dots[(step%3)]
            }
        })

        this._playerController.replica.ListenToChange('Profile.Pets', (newValue, oldValue) => {
            //let pets: IPetData[] = []
            //newValue.forEach((val) => { pets.push(PetUtilities.DBToPetTransfer(val)!) })

            
            let start = os.clock()

            this.UIPetsController.Pets = newValue

            //print('pass1', os.clock()-start)
            this.UIPetsController.Pets.sort((a, b) => {
                let vala = PetUtilities.DBToPetTransfer(a, true)!
                let valb = PetUtilities.DBToPetTransfer(b, true)!

                return vala.multipliers!.get('strength')! < valb.multipliers!.get('strength')!
            })
            
            //print('pass2', os.clock()-start)

            let appendValues: IDBPetData[] = []
            let removeValues: IDBPetData[] = []
            let updateValues: IDBPetData[] = []

            if (newValue.size() !== oldValue.size()) {
                newValue.forEach((value, index) => {
                    let pass = false
                    this.UIPetsController.petInventory.forEach((oldval) => { if (value.id === oldval.id) { pass = true } })
                    if (!pass) { appendValues.push(value) }
                })
                
                this.UIPetsController.petInventory.forEach((value, index) => {
                    let pass = false
                    newValue.forEach((newval) => { if (newval.id && (value.id === newval.id)) { pass = true } })
                    if (!pass) { removeValues.push(value) }
                })
            }

            newValue.forEach((value, index) => {
                let pass = false
                this.UIPetsController.petInventory.forEach((oldval) => {if (!Functions.compareObjects(value, oldval) && (value.id === oldval.id)) { pass = true } })
                if (pass) { updateValues.push(value) }
            })

            //print('pass3', os.clock()-start)

            let test: string[] = []
            newValue.forEach((newval) => { if (test.includes(newval.id!)) {  } else { test.push(newval.id!) }})

            ////print(updateValues, appendValues, removeValues, oldValue, newValue, this.petInventory)

            if (appendValues.size() > 0) { this.appendPetInventory(appendValues) }
            if (removeValues.size() > 0) { this.removePetInventory(removeValues) }
            if (updateValues.size() > 0) { this.updatePetInventory(this.UIPetsController.Pets) }
            
            //print('pass4', os.clock()-start)

            appendValues.clear()
            removeValues.clear()
            updateValues.clear()

            //print('PetsChanged')
            let newEquippedPets = this.getEquippedPets(this.UIPetsController.Pets)
            this.UIPetsController.EquippedPets = newEquippedPets

            this.updatePets()

            //print('pass5', os.clock()-start)

            if (this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance.Visible) {
                

                /*
                if (newEquippedPets.size() > this.EquippedPets.size()) {
                    this.UIPetsController.selectedPetStatus = PetOperationStatus.Unequip
                    if (this.UIPetsController.selectedPet) { this.UIPetsController.selectedPet.equipped = true }
                    PlayEffect('EquipSound')
                }
    
                if (this.EquippedPets.size() > newEquippedPets.size()) {
                    this.UIPetsController.selectedPetStatus = PetOperationStatus.Equip
                    if (this.UIPetsController.selectedPet) { this.UIPetsController.selectedPet.equipped = false }
                    PlayEffect('EquipSound')
                }
                */
    
                
                //
                //print(this.selectedUIObject, this.UIPetsController.selectedPet)
            }
            else {
                //this.setupMassDeleteFrame()
            }

            /*
            if (goldCircle.enabled) { 
                this.setupGoldenGui() 
                this.setupVoidPets()
                return
            }

            this.setupMutationGui()
            this.setupCleanseGui()
            this.setupVoidPets()
            */

        })

        this._playerController.replica.ListenToChange('Profile.Values.StrengthVal', (newValue, oldValue) => {
            //task.delay(1, () => { accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue) } ) 
            //this.updateStoreBillboards()
            this.replicateValue('AccuracyInfo', newValue, oldValue)
            PlayEffect('EarnSound')
            this.updateBoostBar()
            this.updateRebirth()
        })

        this._playerController.replica.ListenToChange('Profile.Values.RebirthsVal', (newValue, oldValue) => {
            this.updateRebirth()
            this.updateBoostBar()
        })

        /*
        this._playerController.replica.ListenToChange('Profile.Values.StarsVal', (newValue, oldValue) => {
            task.delay(1, () => { starsLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue) } )
            this.replicateValue('StarsInfo', newValue, oldValue)
            PlayEffect('EarnSound')
        })

        this._playerController.replica.ListenToChange('Profile.Values.WinsVal', (newValue, oldValue) => {
            task.delay(1, () => { winsLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue) } )
            this.replicateValue('WinsInfo', newValue, oldValue)
            PlayEffect('EarnSound')
            this.updateRebirth()
        })
        */

        this._playerController.replica.ListenToChange('Profile.CurrentQuestsProgress', () => {
            this.updateShadowQuest()
        })

        this._playerController.replica.ListenToChange('Profile.StoredEggs', () => {
            this.updateShadowQuest()
        })

        this._playerController.replica.ListenToChange('Profile.Values.GemsVal', (newValue, oldValue) => {
            let val = GUIUtilities.getSIPrefixSymbol(newValue)
            //task.delay(1, () => { gemsLabel.Text = val } );
            //this.replicateValue('GemsInfo', newValue, oldValue)
            PlayEffect('EarnSound')
            this.updateRebirth()
        })

        this._playerController.replica.ListenToChange('Profile.Config.MaxWorld', (newValue, oldValue) => {
            //this.updateStorePacks()
            this.updateGiftRewards()
            this.updatePotionBoosts()
            this.updateEggsUI()

            this.worldPurchaseTime = os.time()
        })

        this._playerController.replica.ListenToChange('Session.currentWorld', (newValue, oldValue) => {
            let world = WorldsData.get(newValue)
            if (!world) { return }
            //this.updateSlingshots(world)
            //this.updateStoreBillboards()
        })

        this._playerController.replica.ListenToChange('Profile.EquippedTool', (newValue) => {
            this.equippedTool = newValue
            //this.updateSlingshots(WorldsData.get(replicaData.Session.currentWorld)!)
            //this.updateLowerFrame()
        })

        this._playerController.replica.ListenToChange('Profile.OwnedTools', (newValue) => {
            this.ownedTools = newValue
            //this.updateSlingshots(WorldsData.get(replicaData.Session.currentWorld)!)
            //this.updateStoreBillboards()
        })

        this._playerController.replica.ListenToChange('Session.sessionTime', (newValue) => {
            //this.giftsReady = new Map()
            //print(this.giftsReady)
            this.currentGiftTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.StatValues.DayAmount', (newValue) => {
            this.currentDailyTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Products', (newValue) => {
            this.updateStoreLuck()
            this.updateStoreGamepasses()
            this.updatePotionBoosts()
            //this.updateRelicPasses()
        })

        this._playerController.replica.ListenToChange('Profile.RedeemedCodes', (newValue) => {
            //this.updatePotions()
            this.updatePotionBoosts()
        })

        this._playerController.replica.ListenToChange('Profile.Potions', (newValue) => {
            this.updatePotions()
        })

        this._playerController.replica.ListenToChange('Profile.StatValues.LastSpinTime', (newValue) => {
            this.updateWheelSpin()
        })

        this._playerController.replica.ListenToChange('Profile.StatValues.SpinCount', (newValue) => {
            this.updateWheelSpin()
        })

        this._playerController.replica.ListenToChange('Profile.ActiveBuffs', () => {
            this.updatePotionBuffs()
        })

        this._playerController.replica.ListenToChange('Profile.Config.MaxEquippedPets', () => {
            this.updatePets()
        })

        this._playerController.replica.ListenToChange('Profile.Config.MaxPets', () => {
            this.updatePets()
        })

        this._playerController.replica.ListenToChange('Profile.Relics', () => {
            let t = os.clock()
            //this.setupRelics()
            //print(os.clock()-t, 'os.clock()-t')
        })

        this._playerController.replica.ListenToChange('Profile.EquippedRelics', () => {
            //this.setupEquippedRelics()
        })

        this.UIPath.Verify.VerifyInfo.Redeem.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Code, 
                (this.UIPath.Verify.VerifyInfo.get<FrameComponent>().instance.WaitForChild('Code').WaitForChild('Value') as TextBox).Text)
        })

        //accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StrengthVal )
        //starsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StarsVal )
        //winsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.WinsVal )
        //gemsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.GemsVal );

        //let pets: IPetData[] = []
        //replicaData.Profile.Pets.forEach((val) => { pets.push(PetUtilities.DBToPetTransfer(val)!) })

        this.UIPetsController.Pets = replicaData.Profile.Pets
        this.UIPetsController.EquippedPets = this.getEquippedPets(this.UIPetsController.Pets)

        this.UIPetsController.Pets.sort((a, b) => {
            let vala = PetUtilities.DBToPetTransfer(a)!
            let valb = PetUtilities.DBToPetTransfer(b)!

            return vala.multipliers!.get('strength')! < valb.multipliers!.get('strength')!
        })

        this.equippedTool = replicaData.Profile.EquippedTool
        this.ownedTools = replicaData.Profile.OwnedTools

        this.setupGifts()
        this.setupDaily()
        this.setupPets()
        this.setupDonations()
        this.setupStoreUpperButtons()
        this.setupStorePotions()
        this.setupStoreGamepasses()
        this.setupInventoryButtons()
        this.setupMassDelete()
        //this.setupLimitedPets()
        this.setupPetOverlay()
        this.setupPotionInfo()
        this.setupPetDisable()
        this.setupMassLock()
        this.setupStoreBuyablePets()
        this.setupFavorites()
        this.setupPetBackpackPasses()
        //this.setupRelics()
        //this.setupEquippedRelics()
        //this.setupRelicsMerge()
        //this.setupRelicsEvent()
        this.setupSettings()
        this.setupLowerSwords()
        this.setupWorldTeleports()
        this.setupTutorial()

        this.updateShadowQuest()
        this.updateGiftRewards()
        this.updateStoreLuck()
        this.updateRebirth()
        this.updatePotions()
        this.updatePlayerGiftFrame()
        //this.updateStorePacks()
        this.updatePets()
        this.updateWheelSpin()
        //this.updateStoreBillboards()
        this.updateStoreGamepasses()
        //this.updateLowerFrame()
        this.updatePotionBuffs()
        //this.updateRelicPasses()
        this.updateStats()
        this.updateBoostBar()
        this.updatePotionBoosts();
        this.updateEggsUI()
        this.updateLocations()
        this.updateKatanaQuest()

        this.currentGiftTime.set(replicaData.Session.sessionTime)

        //(game.Workspace.WaitForChild('GameMusic') as Sound).Play()

        let replica = this._playerController.replica

        this.autoShoot = replica.Data.Profile.StatValues.WasShooting
        this.autoTrain = replica.Data.Profile.StatValues.WasTraining
        this.autoRebirth = replica.Data.Profile.StatValues.WasRebirthing

        //this.UIPath.UpdateLog.get<ImageComponent>().Open()

        task.spawn(() => {

            let prevAutoShoot = this.autoShoot
            let prevAutoTrain = this.autoTrain
            let prevAutoRebirth = this.autoRebirth

            while (task.wait(1)) {

                Events.ManageWorld.fire(WorldOperationStatus.BuyAll)
                if (this.autoRebirth) { Events.ClaimReward.fire(RewardType.Rebirth, 'nil') }

                this.updateSpins()
                this.updateWheelSpin()
                this.updateDailyChestBillboard()
                this.updateGroupChestBillboard()
                this.updatePotionBuffs()
                //this.updateStorePacks()
                this.updateStats()
                this.updatePotionBoosts()
                this.updateLocations()
                this.updateKatanaQuest()

                this.currentDailyTime.set(this._playerController.replica.Data.Profile.StatValues.DayAmount)

                if (replica.Data.Session.currentWorld === replica.Data.Profile.Config.MaxWorld && os.time() - this.worldPurchaseTime < 5*60) {
                    this.worldPurchaseTime = 0
                }

                switch (replica.Data.Session.currentWorld) {
                    case WorldType.Space:
                        //TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 23}).Play() 
                        break;
                    case WorldType.NeonCity:
                        //TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 20}).Play() 
                        break
                    case WorldType.Backrooms:
                        //TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 23}).Play() 
                        break
                    default:
                        //TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 13}).Play()
                        break;
                }
                
                if (prevAutoShoot !== this.autoShoot) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoShoot, this.autoShoot) }
                if (prevAutoTrain !== this.autoTrain) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoTrain, this.autoTrain) }
                if (prevAutoRebirth !== this.autoRebirth) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoRebirth, this.autoRebirth) }

                prevAutoShoot = this.autoShoot
                prevAutoTrain = this.autoTrain
                prevAutoRebirth = this.autoRebirth

                /*
                if (PlayerController.autoEgg) {
                    let billboards = BillboardFabric.GetBillboards()
                    let buyType = EggBuyType.Single

                    if (this._playerController.replica.Data.Profile.Products.includes('3egghatch')) {
                        buyType = EggBuyType.Triple
                    }

                    let pressed = false
                    billboards.forEach((val) => {
                        if (!val.instance.Enabled) { return }
                        pressed = true
                        Events.BuyEgg(val.instance.Name, buyType)
                    })

                    if (!pressed) { PlayerController.autoEgg = false }
                }
                */

                if ((os.time() - PlayerController.lastClick) > 15*60) { TeleportService.Teleport(game.PlaceId, this._playerController.component.instance) }

                //PlayEffect('Notify', new Map([['Message', 'Im gay']]))

                if (os.time()%10 === 0) {
                    let label = this.UIPath.LeftList.Store.get<ImageComponent>().instance.WaitForChild('ImageLabel') as ImageLabel
                    let tinfo = new TweenInfo(.3)

                    TweenService.Create(label, tinfo, { 'Rotation': 20 }).Play()
                    task.delay(tinfo.Time, () => { TweenService.Create(label, tinfo, { 'Rotation': -20 }).Play() })
                    task.delay(tinfo.Time*2, () => { TweenService.Create(label, tinfo, { 'Rotation': 0 }).Play() })
                }

                let voidTime = (this.UIPetsController.stopVoidTime - this.UIPetsController.startVoidTime)
                    *this._playerController.replica.Data.Profile.Multipliers.VoidMachineMul;

                let currentVoidTime = this.UIPetsController.startVoidTime+voidTime-os.time();

                this.UIPetsController.currentVoidTime = currentVoidTime;

            }

        })
        
    }

    onStart() {
        
    }
}