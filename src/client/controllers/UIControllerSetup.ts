import { Controller, OnStart, OnInit } from "@flamework/core";
import { ComponentsInitializer } from "client/classes/ComponentsInitializer";
import { Players, Workspace, RunService, SocialService, TweenService, MarketplaceService, ReplicatedStorage, UserInputService, TeleportService, Lighting } from "@rbxts/services";
import { ButtonComponent, ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { ImageComponent } from "client/components/UIComponents/ImageComponent";
import { FrameComponent } from "client/components/UIComponents/FrameComponent";
import { UIAnimations } from "shared/utility/UIAnimations";
import { DynamicText, StrokeInfo } from "client/classes/DynamicText";
import { PlayerController } from "./PlayerController";
import { Events } from "client/network";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainUI   = playerGui.WaitForChild('MainUI') as ScreenGui
const templates =  mainUI.WaitForChild('Templates') as Folder

const camera = Workspace.CurrentCamera!

const mainUIInterface = 
    [   

        {name: 'BoostInfo', objComponent: 'Frame', children: [

        ]},

        {name: 'StatsInfo', objComponent: 'Frame', children: [

        ]},

        {name: 'PotionInfo', objComponent: 'Image', children: [

        ]},

        {name: 'List', objComponent: 'Frame', children: [
            {name: 'Invite', objComponent: 'Button'},
            {name: 'Stats', objComponent: 'Button'},
            {name: 'Codes', objComponent: 'Button'}
        ]},

        {name: 'Potions', objComponent: 'Frame', children: [
            {name: 'PremiumBoost', objComponent: 'Button'}
        ]},

        {name: 'ProductsAds', objComponent: 'Frame', children: [

        ]},

        {name: 'Eggs', objComponent: 'Image', children: [
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'PetOverlay', objComponent: 'Image'},
        {name: 'Stats', objComponent: 'Image', children: [
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'RightList', objComponent: 'Frame', children: [
            {name: 'Daily', objComponent: 'Button'},
            {name: 'Settings', objComponent: 'Button'},
            {name: 'Gifts', objComponent: 'Button'},
            {name: 'Quest', objComponent: 'Button'},
        ]},

        {name: 'LeftList', objComponent: 'Frame', children: [
            {name: 'Eggs', objComponent: 'Button'},
            {name: 'Pets', objComponent: 'Button'},
            {name: 'Rebirth', objComponent: 'Button'},
            {name: 'Store', objComponent: 'Button'},
        ]},

        {name: 'LowerList', objComponent: 'Frame', children: [
            //{name: 'Dash', objComponent: 'Button'},
            //{name: 'Item', objComponent: 'Button'},
            //{name: 'Double Lightsaber', objComponent: 'Button'},
            //{name: 'Wings Lightsaber', objComponent: 'Button'},
        ]},

        {name: 'Verify', objComponent: 'Image', children: [
            {name: 'Close', objComponent: 'Button'},
            {name: 'VerifyInfo', objComponent: 'Frame', children: [
                {name: 'Redeem', objComponent: 'Button'},
            ]}
        ]},

        {name: 'DailyRewards', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'Gifts', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
        ]},

        {name: 'PetInventory', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'PetInfo', objComponent: 'Frame', children: [
                {name: 'Equip', objComponent: 'Button'},
                {name: 'Lock', objComponent: 'Button'},
                {name: 'Delete', objComponent: 'Button'},
                {name: 'CraftFrame', objComponent: 'Frame', children: [
                    {name: 'Craft', objComponent: 'Button'},
                ]},
            ]},
            {name: 'PetsFrame', objComponent: 'Frame'},
            {name: 'MassDeleteButtons', objComponent: 'Frame', children: [
                {name: 'Cancel', objComponent: 'Button'},
                {name: 'SelectAll', objComponent: 'Button'},
                {name: 'Delete', objComponent: 'Button'},
                {name: 'Search', objComponent: 'Frame'},
            ]},
            {name: 'Buttons', objComponent: 'Frame', children: [
                {name: 'Lock', objComponent: 'Button'},
                {name: 'Delete', objComponent: 'Button'},
                {name: 'EquipBest', objComponent: 'Button'},
                {name: 'BuyEggs', objComponent: 'Button'},
                {name: 'Search', objComponent: 'Frame'},
            ]},
            {name: 'Search', objComponent: 'Frame', children: [
                {name: 'Search', objComponent: 'Frame'},
            ]}
        ]},

        {name: 'Rebirth', objComponent: 'Image', children:[
            {name: 'RebirthButton', objComponent: 'Button'},
            {name: 'AutoRebirth', objComponent: 'Frame'},
            //{name: 'Skip', objComponent: 'Button'},
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'Settings', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'Store', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Gift', objComponent: 'Button'},
            {name: 'Pet', objComponent: 'Button'}
        ]},

        /*
        {name: 'UpdateLog', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        */

        {name: 'Tutorial', objComponent: 'Image', children:[
            {name: 'Next', objComponent: 'Button'}
        ]},

        {name: 'Codes', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Redeem', objComponent: 'Button'},
        ]},

        {name: 'WheelSpin', objComponent: 'Image', children:[
            {name: 'SpinButton', objComponent: 'Button'},
            {name: 'Spin2', objComponent: 'Button'},
            {name: 'Buy1', objComponent: 'Button'},
            {name: 'Buy10', objComponent: 'Button'},
            {name: 'Buy50', objComponent: 'Button'},
            {name: 'Buy100', objComponent: 'Button'},
            {name: 'Close', objComponent: 'Button'},
        ]},

        {name: 'Wheel', objComponent: 'Frame', children:[
            {name: 'Wheel', objComponent: 'Image', children:[
                {name: 'Image', objComponent: 'Button'}
            ]},
        ]},

        {name: 'GiftPlayerList', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'ArenaNotify', objComponent: 'Frame', children: [
            {name: 'Buttons', objComponent: 'Frame', children: [
                {name: 'Yes', objComponent: 'Button'},
                {name: 'No', objComponent: 'Button'},
            ]}
        ]},

        {name: 'ArenaStatus', objComponent: 'Frame'},
        {name: 'ArenaWinners', objComponent: 'Frame'},
        {name: 'TeleportIntro', objComponent: 'Frame', children: [
            {name: 'Frame', objComponent: 'Frame'}
        ]},

        {name: 'KatanaEvent', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},

        {name: 'FreeKatana', objComponent: 'Button'},
    ]


@Controller({})
export class UIControllerSetup implements OnStart, OnInit {
    
    public _playerController: PlayerController
    public UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    onInit() {


        this.UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

        print(this.UIPath)
        /*
        let dynamicCodesText = new DynamicText(
            this.UIPath.Codes.get<ImageComponent>().instance.WaitForChild('Info') as TextLabel, 
            '<stroke color="#163542" joins="miter" thickness="2.5" transparency="0">Follow <font color="rgb(255, 0, 0)">@StudioBosses</font>, <font color="rgb(237,0,203)">@4upahero</font> and <font color="rgb(89, 255, 29)">@KetwilDev</font> for powerful codes!</stroke>',
            new Map<number, StrokeInfo>([[200, {Speed: 70}]])
        )
        */

        this.UIPath.KatanaEvent.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.KatanaEvent.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Stats.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Stats.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Settings.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Settings.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Tutorial.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Tutorial.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Store.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Store.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.PetInventory.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.PetInventory.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Eggs.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Eggs.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Rebirth.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Rebirth.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.DailyRewards.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.DailyRewards.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.WheelSpin.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.WheelSpin.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        
        this.UIPath.Codes.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Codes.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })
        

        this.UIPath.Gifts.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Gifts.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Verify.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Verify.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })
        
        this.UIPath.GiftPlayerList.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.GiftPlayerList.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.PetInventory.PetInfo.get<FrameComponent>().BindToOpen((obj) => {
            obj.Visible = true
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(0.641, 0.132), size: UDim2.fromScale(0.348, 0.672) }).Play()
        })
        
        this.UIPath.PetInventory.PetInfo.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(1, 0.132), size: UDim2.fromScale(0, 0.672) }).Play()
            task.wait(.2)
            obj.Visible = false
        })

        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().BindToOpen((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.621, 0.675) }).Play()
        })
        
        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.935, 0.675) }).Play()
        })

        this.UIPath.Potions.PremiumBoost.get<ButtonComponent>().BindToClick(() => {
            MarketplaceService.PromptPremiumPurchase(this._playerController.component.instance)
        })

        this.UIPath.RightList.Settings.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Settings.get<ImageComponent>().Change()
        })

        this.UIPath.Settings.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Settings.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Store.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Store.get<ImageComponent>().Change()
        })

        this.UIPath.Store.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Store.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Pets.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.PetInventory.get<ImageComponent>().Change()
        })

        this.UIPath.PetInventory.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.PetInventory.get<ImageComponent>().Close()
        })

        this.UIPath.Stats.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Stats.get<ImageComponent>().Close()
        })

        this.UIPath.Verify.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Verify.get<ImageComponent>().Close()
        })

        this.UIPath.WheelSpin.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.WheelSpin.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Rebirth.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Rebirth.get<ImageComponent>().Change()
        })

        // ! НИЖЕ БОГА НЕТ

        this.UIPath.Rebirth.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Rebirth.get<ImageComponent>().Close()
        })

        // ! ВЫШЕ БОГА НЕТ

        this.UIPath.RightList.Daily.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.DailyRewards.get<ImageComponent>().Change()
        })

        this.UIPath.DailyRewards.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.DailyRewards.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Gifts.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Gifts.get<ImageComponent>().Change()
        })

        this.UIPath.List.Codes.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Change()
        })

        this.UIPath.List.Stats.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Stats.get<ImageComponent>().Change()
        })

        this.UIPath.Gifts.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Gifts.get<ImageComponent>().Close()
        })

        this.UIPath.Eggs.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Eggs.get<ImageComponent>().Close()
        })

        this.UIPath.Wheel.Wheel.Image.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.WheelSpin.get<ImageComponent>().Change()
        })

        this.UIPath.PetInventory.Buttons.BuyEggs.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Eggs.get<ImageComponent>().Change()
        })

        this.UIPath.RightList.Quest.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Verify.get<ImageComponent>().Change()
        })

        this.UIPath.LeftList.Eggs.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Eggs.get<ImageComponent>().Change()
        })

        this.UIPath.Codes.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Close()
        })

        this.UIPath.KatanaEvent.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.KatanaEvent.get<ImageComponent>().Change()
        })

        this.UIPath.FreeKatana.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.KatanaEvent.get<ImageComponent>().Change()
        })

        this.UIPath.Eggs.get<ImageComponent>().Close()
        this.UIPath.Stats.get<ImageComponent>().Close()
        this.UIPath.Verify.get<ImageComponent>().Close()
        this.UIPath.DailyRewards.get<ImageComponent>().Close()
        this.UIPath.Gifts.get<ImageComponent>().Close()
        this.UIPath.PetInventory.get<ImageComponent>().Close()
        this.UIPath.Rebirth.get<ImageComponent>().Close()
        this.UIPath.Settings.get<ImageComponent>().Close()
        this.UIPath.Store.get<ImageComponent>().Close()
        this.UIPath.Codes.get<ImageComponent>().Close()
        this.UIPath.WheelSpin.get<ImageComponent>().Close()
        this.UIPath.GiftPlayerList.get<ImageComponent>().Close()

    }

    onStart() {
        
    }
}