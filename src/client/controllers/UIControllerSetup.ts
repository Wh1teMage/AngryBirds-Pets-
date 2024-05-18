import { Controller, OnStart, OnInit } from "@flamework/core";
import { ComponentsInitializer } from "client/classes/ComponentsInitializer";
import { Players, Workspace, RunService, SocialService, TweenService, MarketplaceService, ReplicatedStorage, UserInputService, TeleportService, Lighting } from "@rbxts/services";
import { ButtonComponent } from "client/components/UIComponents/ButtonComponent";
import { ImageComponent } from "client/components/UIComponents/ImageComponent";
import { FrameComponent } from "client/components/UIComponents/FrameComponent";
import { UIAnimations } from "shared/utility/UIAnimations";
import { DynamicText, StrokeInfo } from "client/classes/DynamicText";
import { PlayerController } from "./PlayerController";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainUI   = playerGui.WaitForChild('MainUI') as ScreenGui
const templates =  mainUI.WaitForChild('Templates') as Folder

const camera = Workspace.CurrentCamera!

const mainUIInterface = 
    [   {name: 'UpperList', objComponent: 'Frame', children: [
            {name: 'Accuracy', objComponent: 'Image'},
            {name: 'Gems', objComponent: 'Image'},
            {name: 'Stars', objComponent: 'Image'},
            {name: 'Wins', objComponent: 'Image'},
        ]},

        {name: 'RightList', objComponent: 'Frame', children: [
            {name: 'Buttons', objComponent: 'Frame', children: [
                {name: 'Codes', objComponent: 'Button'},
                {name: 'Daily', objComponent: 'Button'},
                {name: 'Settings', objComponent: 'Button'},
            ]},
            {name: 'Bundles', objComponent: 'Frame', children: [
                {name: 'StarterPack', objComponent: 'Button'},
            ]},
            {name: 'AutoShoot', objComponent: 'Button'},
            {name: 'AutoTrain', objComponent: 'Button'},
            {name: 'Event', objComponent: 'Button'},
            {name: 'Gifts', objComponent: 'Button'},
            {name: 'Limited', objComponent: 'Button'},
            {name: 'Premium', objComponent: 'Button'},
            {name: 'Quest', objComponent: 'Button'},
            {name: 'UpdateLog', objComponent: 'Button'},
            {name: 'Wheel', objComponent: 'Image', children:[
                {name: 'Image', objComponent: 'Button'},
            ]},
        ]},

        {name: 'LeftList', objComponent: 'Frame', children: [
            {name: 'Invite', objComponent: 'Button'},
            {name: 'Pets', objComponent: 'Button'},
            {name: 'Rebirth', objComponent: 'Button'},
            {name: 'Relics', objComponent: 'Button'},
            {name: 'Store', objComponent: 'Button'},
            {name: 'Teleport', objComponent: 'Button'},
            {name: 'Trade', objComponent: 'Button'},
            {name: 'VIP', objComponent: 'Button'},
        ]},

        {name: 'LowerList', objComponent: 'Frame', children: [
            {name: 'Item', objComponent: 'Button'},
            {name: 'Road', objComponent: 'Image', children: [
                {name: 'Final', objComponent: 'Image', children: [
                    {name: 'InstantPower', objComponent: 'Button'}
                ]}
            ]},
        ]},

        {name: 'CleanseMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'CleanseInfo', objComponent: 'Frame', children:[
                {name: 'Cleanse', objComponent: 'Button'},
            ]},
            {name: 'PetsFrame', objComponent: 'Frame'},
        ]},
        {name: 'ClickForPower', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Codes', objComponent: 'Image', children:[
            {name: 'Redeem', objComponent: 'Button'},
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'DailyRewards', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Event', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Claim', objComponent: 'Button'}
        ]},
        {name: 'Follow', objComponent: 'Image', children:[
            {name: 'Redeem', objComponent: 'Button'},
            {name: 'Close', objComponent: 'Button'},
        ]},
        {name: 'GiftPlayerList', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Gifts', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'UnlockAll', objComponent: 'Button'}
        ]},
        {name: 'GoldMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'GoldenInfo', objComponent: 'Frame', children: [
                {name: 'GoldenHolder', objComponent: 'Frame', children: [
                    {name: 'Make', objComponent: 'Button'},
                ]},
                {name: 'PetsHolder', objComponent: 'Frame'},
            ]}
        ]},
        {name: 'Guide', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Index', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Invite', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Limited', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
        ]},
        {name: 'MutationMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'MutationInfo', objComponent: 'Frame', children:[
                {name: 'Buttons', objComponent: 'Frame', children:[
                    {name: 'Plus', objComponent: 'Button'},
                    {name: 'Minus', objComponent: 'Button'},
                ]},
                {name: 'Enchant', objComponent: 'Button'},
            ]},
            {name: 'PetsFrame', objComponent: 'Frame'},
        ]},
        {name: 'PetInventory', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Info', objComponent: 'Button'},
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
                {name: 'CraftAll', objComponent: 'Button'},
                {name: 'Search', objComponent: 'Frame'},
            ]},
            {name: 'Search', objComponent: 'Frame', children: [
                {name: 'Search', objComponent: 'Frame'},
            ]}
        ]},
        {name: 'Quest', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Rebirth', objComponent: 'Image', children:[
            {name: 'RebirthButton', objComponent: 'Button'},
            {name: 'AutoRebirth', objComponent: 'Button'},
            {name: 'Skip', objComponent: 'Button'},
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Settings', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'SlingshotStore', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'StarterPack', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Buy', objComponent: 'Button'}
        ]},
        {name: 'Store', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Gift', objComponent: 'Button'},
            {name: 'Pet', objComponent: 'Button'}
        ]},
        {name: 'Teleport', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Trade', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'TradePlayerList', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'TradeRequest', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'UpdateLog', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'VoidMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'CraftInfo', objComponent: 'Frame', children:[
                {name: 'Button', objComponent: 'Button'}
            ]},
            {name: 'PetsFrame', objComponent: 'Frame'},
        ]},
        {name: 'WheelSpin', objComponent: 'Image', children:[
            {name: 'SpinButton', objComponent: 'Button'},
            {name: 'Spin2', objComponent: 'Button'},
            {name: 'Buy1', objComponent: 'Button'},
            {name: 'Buy10', objComponent: 'Button'},
            {name: 'Buy100', objComponent: 'Button'},
        ]},
        {name: 'CavePack', objComponent: 'Image'},
        {name: 'NeonPack', objComponent: 'Image'},
        {name: 'SpacePack', objComponent: 'Image'},

        {name: 'Potions', objComponent: 'Frame', children: [
            {name: 'FriendBoost', objComponent: 'Button'},
            {name: 'PremiumBoost', objComponent: 'Button'},
            {name: 'XBoost', objComponent: 'Button'},
        ]},

        {name: 'StatsInfo', objComponent: 'Frame'},
        {name: 'PetOverlay', objComponent: 'Image'},
        {name: 'SpeedLines', objComponent: 'Frame'}
    ]


@Controller({})
export class UIControllerSetup implements OnStart, OnInit {
    
    private _playerController: PlayerController
    public UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    onInit() {
        
        this.UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)
        let replicaData = this._playerController.replica.Data
        print(this.UIPath)
        let dynamicCodesText = new DynamicText(
            this.UIPath.Codes.get<ImageComponent>().instance.WaitForChild('Info') as TextLabel, 
            '<stroke color="#163542" joins="miter" thickness="2.5" transparency="0">Follow <font color="rgb(255, 0, 0)">@StudioBosses</font>, <font color="rgb(237,0,203)">@4upahero</font> and <font color="rgb(89, 255, 29)">@KetwilDev</font> for powerful codes!</stroke>',
            new Map<number, StrokeInfo>([[200, {Speed: 70}]])
        )

        this.UIPath.Codes.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.512*3), size: obj.Size })
        })

        this.UIPath.Codes.get<ImageComponent>().BindToOpen((obj) => {
            dynamicCodesText.Start()
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.512), size: obj.Size })
        })

        this.UIPath.Follow.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.512*3), size: obj.Size })
        })

        this.UIPath.Follow.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.512), size: obj.Size })
        })

        this.UIPath.Settings.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Settings.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Store.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Store.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Invite.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Invite.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.PetInventory.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.PetInventory.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Rebirth.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Rebirth.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.TradePlayerList.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.TradePlayerList.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Teleport.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Teleport.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.DailyRewards.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.DailyRewards.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Limited.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Limited.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Guide.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Guide.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Guide.get<ImageComponent>().CanBeClosedByOthers = false

        this.UIPath.WheelSpin.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.WheelSpin.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Event.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Event.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Index.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.475*3), size: obj.Size })
        })

        this.UIPath.Index.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.475), size: obj.Size })
        })

        this.UIPath.Quest.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Quest.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.UpdateLog.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Gifts.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.Gifts.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.UpdateLog.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.VoidMachine.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.VoidMachine.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.MutationMachine.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.CleanseMachine.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.SlingshotStore.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.456*3), size: obj.Size })
        })

        this.UIPath.SlingshotStore.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.456), size: obj.Size })
        })

        this.UIPath.CavePack.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.CavePack.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.NeonPack.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.NeonPack.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.SpacePack.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.SpacePack.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.GiftPlayerList.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.497, 0.522*3), size: obj.Size })
        })

        this.UIPath.GiftPlayerList.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.497, 0.522), size: obj.Size })
        })

        this.UIPath.GoldMachine.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.StarterPack.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.StarterPack.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
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

        this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.get<FrameComponent>().BindToOpen((obj) => {
            obj.Visible = true
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(0.641, 0), size: UDim2.fromScale(0.357, 0.995) }).Play()
        })
        
        this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(1, 0), size: UDim2.fromScale(0, 0.995) }).Play()
            task.wait(.2)
            obj.Visible = false
        })

        this.UIPath.VoidMachine.CraftInfo.get<FrameComponent>().BindToOpen((obj) => {
            obj.Visible = true
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(0.641, 0), size: UDim2.fromScale(0.357, 0.995) }).Play()
        })
        
        this.UIPath.VoidMachine.CraftInfo.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(1, 0), size: UDim2.fromScale(0, 0.995) }).Play()
            task.wait(.2)
            obj.Visible = false
        })

        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().BindToOpen((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.621, 0.675) }).Play()
        })
        
        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.935, 0.675) }).Play()
        })

        this.UIPath.GoldMachine.GoldenInfo.PetsHolder.get<FrameComponent>().BindToOpen((obj) => { 
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.645, 0.996) }).Play()
        })
        
        this.UIPath.GoldMachine.GoldenInfo.PetsHolder.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.994, 0.996) }).Play()
        })

        this.UIPath.MutationMachine.MutationInfo.get<FrameComponent>().BindToOpen((obj) => {
            obj.Visible = true
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: UDim2.fromScale(0.641, 0.132), size: UDim2.fromScale(0.348, 0.793) }).Play()
        })
        
        this.UIPath.MutationMachine.MutationInfo.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(1, 0.132), size: UDim2.fromScale(0, 0.793) }).Play()
            obj.Visible = false
        })
        
        this.UIPath.MutationMachine.PetsFrame.get<FrameComponent>().BindToOpen((obj) => { 
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.587, 0.697) }).Play()
        })
        
        this.UIPath.MutationMachine.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.94, 0.697) }).Play()
        })

        this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().BindToOpen((obj) => {
            obj.Visible = true
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: UDim2.fromScale(0.641, 0.132), size: UDim2.fromScale(0.348, 0.793) }).Play()
        })
        
        this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: UDim2.fromScale(1, 0.132), size: UDim2.fromScale(0, 0.793) }).Play()
            obj.Visible = false
        })
        
        this.UIPath.CleanseMachine.PetsFrame.get<FrameComponent>().BindToOpen((obj) => { 
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.587, 0.697) }).Play()
        })
        
        this.UIPath.CleanseMachine.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.94, 0.697) }).Play()
        })


        this.UIPath.VoidMachine.PetsFrame.get<FrameComponent>().BindToOpen((obj) => { 
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.587, 0.697) }).Play()
        })
        
        this.UIPath.VoidMachine.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.947, 0.697) }).Play()
        })

        this.UIPath.Potions.PremiumBoost.get<ButtonComponent>().BindToClick(() => {
            MarketplaceService.PromptPremiumPurchase(this._playerController.component.instance)
        })

        this.UIPath.RightList.Premium.get<ButtonComponent>().BindToClick(() => {
            MarketplaceService.PromptPremiumPurchase(this._playerController.component.instance)
        })

        this.UIPath.RightList.Buttons.Codes.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Change()
        })

        this.UIPath.Potions.XBoost.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Follow.get<ImageComponent>().Change()
        })

        this.UIPath.Potions.FriendBoost.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Invite.get<ImageComponent>().Change()
        })

        this.UIPath.GoldMachine.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.GoldMachine.get<ImageComponent>().Close()
        })

        this.UIPath.SlingshotStore.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.SlingshotStore.get<ImageComponent>().Close()
        })

        this.UIPath.Codes.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Close()
        })

        this.UIPath.Follow.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Follow.get<ImageComponent>().Close()
        })

        this.UIPath.Index.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Index.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Buttons.Settings.get<ButtonComponent>().BindToClick(() => {
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

        this.UIPath.LeftList.Invite.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Invite.get<ImageComponent>().Change()
        })

        this.UIPath.Invite.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Invite.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Pets.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.PetInventory.get<ImageComponent>().Change()
        })

        this.UIPath.PetInventory.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.PetInventory.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Rebirth.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Rebirth.get<ImageComponent>().Change()
        })

        // ! НИЖЕ БОГА НЕТ
        // !! ДО РЕЛИЗА НЕ ТРОГАТЬ !!
        // this.UIPath.Rebirth.Close.get<ButtonComponent>().BindToClick(() => {
        //     this.UIPath.Rebirth.get<ImageComponent>().Close()
        // })
        // !! ДО РЕЛИЗА НЕ ТРОГАТЬ !!
        // ! ВЫШЕ БОГА НЕТ


        this.UIPath.StarterPack.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.StarterPack.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Trade.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.TradePlayerList.get<ImageComponent>().Change()
        })

        this.UIPath.TradePlayerList.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.TradePlayerList.get<ImageComponent>().Close()
        })

        this.UIPath.LeftList.Teleport.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Teleport.get<ImageComponent>().Change()
        })

        this.UIPath.Teleport.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Teleport.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Buttons.Daily.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.DailyRewards.get<ImageComponent>().Change()
        })

        this.UIPath.DailyRewards.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.DailyRewards.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Gifts.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Gifts.get<ImageComponent>().Change()
        })

        this.UIPath.Gifts.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Gifts.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Limited.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Limited.get<ImageComponent>().Change()
        })

        this.UIPath.Limited.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Limited.get<ImageComponent>().Close()
        })

        this.UIPath.PetInventory.Info.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Guide.get<ImageComponent>().Change()
        })

        this.UIPath.Guide.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Guide.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Wheel.Image.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.WheelSpin.get<ImageComponent>().Change()
        })

        this.UIPath.RightList.Event.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Event.get<ImageComponent>().Change()
        })

        this.UIPath.Event.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Event.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.Quest.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Quest.get<ImageComponent>().Change()
        })

        this.UIPath.Quest.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Quest.get<ImageComponent>().Close()
        })

        this.UIPath.RightList.UpdateLog.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.UpdateLog.get<ImageComponent>().Change()
        })

        this.UIPath.UpdateLog.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.UpdateLog.get<ImageComponent>().Close()
        })
    }

    onStart() {
        
    }
}