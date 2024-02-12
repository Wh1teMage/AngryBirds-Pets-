
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { PlayerController } from "./PlayerController";
import { Players, Workspace, RunService } from "@rbxts/services";
import { FrameComponent, FrameFabric } from "../components/UIComponents/FrameComponent";
import { ButtonComponent, ButtonFabric } from "../components/UIComponents/ButtonComponent";
import { Binding } from "client/classes/BindbingValues";
import { IButton, IGUIData, IMenu, IShop } from "shared/interfaces/GUIData";
import { UIAnimations } from "shared/utility/UIAnimations";
import { ComponentsInitializer } from "client/classes/ComponentsInitializer";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { SurfaceComponent, SurfaceFabric } from "client/components/UIComponents/SurfaceComponent";
import { IDBPetData, IPetData, PetOperationStatus, Sizes } from "shared/interfaces/PetData";
import { Components } from "@flamework/components";
import { PetsData } from "shared/info/PetInfo";
import { Events } from "client/network";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { DynamicText, StrokeInfo } from "client/classes/DynamicText";
import { GUIUtilities } from "client/classes/GUIUtilities";
import { ToolOperationStatus } from "shared/interfaces/ToolData";
import { WorldOperationStatus } from "shared/interfaces/WorldData";
import { WorldType } from "shared/enums/WorldEnums";
import { WorldsData } from "shared/info/WorldInfo";
import { PetUtilities } from "shared/utility/PetUtilities";
import { ImageComponent, ImageFabric } from "client/components/UIComponents/ImageComponent";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainUI   = playerGui.WaitForChild('MainUI') as ScreenGui

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
        {name: 'CleanseMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'ClickForPower', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Codes', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'DailyRewards', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Event', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Follow', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'GiftPlayerList', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Gifts', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'GoldMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
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
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'MutationMachine', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'PetInventory', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'},
            {name: 'Info', objComponent: 'Button'}
        ]},
        {name: 'Quest', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Rebirth', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Settings', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'SlingshotStore', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'StarterPack', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'Store', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
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
            {name: 'Close', objComponent: 'Button'}
        ]},
        {name: 'WheelSpin', objComponent: 'Image'},
    ]


@Controller({})
export class UIController implements OnStart, OnInit {

    private _playerController: PlayerController
    private UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    private Pets: IDBPetData[] = []
    private EquippedPets: IDBPetData[] = []

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    private clearPets() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        
        for (let obj of petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame').GetChildren()) {
            if (!obj.IsA('GuiButton')) continue
            obj.Destroy()
        }
    }

    private updatePets() {
        this.clearPets()

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        
        for (let pet of this.Pets) {
            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!;
            obj.Visible = true;

            (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (obj.WaitForChild('Equip') as TextLabel).Visible = false;

            let button = ButtonFabric.CreateButton(obj)
            button.BindToClick(() => { this.displayPet(pet) })
        }

        for (let pet of this.EquippedPets) {
            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!;
            obj.Visible = true;

            (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (obj.WaitForChild('Equip') as TextLabel).Visible = true;

            let button = ButtonFabric.CreateButton(obj)
            button.BindToClick(() => { this.displayPet(pet) })
        }

    }

    private displayPet(pet: IDBPetData) {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        let formattedPet = PetUtilities.DBToPetTransfer(pet);
        if (!formattedPet) { return }

        (petInfo.WaitForChild('Stats').WaitForChild('Boost') as TextLabel).Text = tostring(formattedPet.multipliers.get('strength'));
        (petInfo.WaitForChild('PetName') as TextLabel).Text = formattedPet.name;
    }

    onInit() {
        print('Waiting')
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }
        print('Loading GUI')

        //GUIUtilities.InitializeGuiTimer(testing, 10)
        //GUIUtilities.InitializeGuiWheel(testing, 10, 5)

        //let currentlyShooting: Part | undefined = undefined
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

        // this.UIPath.VIP.get<ImageComponent>().BindToClose((obj) => {
        //     UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        // })

        // this.UIPath.VIP.get<ImageComponent>().BindToOpen((obj) => {
        //     UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        // })

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

        this.UIPath.Quest.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.Quest.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.UpdateLog.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.UpdateLog.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })






        this.UIPath.RightList.Buttons.Codes.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Change()
        })

        this.UIPath.Codes.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Close()
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





        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        this._playerController.replica.ListenToChange('Profile.EquippedPets', (newValue, oldValue) => {
            this.EquippedPets = newValue
            this.updatePets()
        })

        this._playerController.replica.ListenToChange('Profile.Pets', (newValue, oldValue) => {
            this.Pets = newValue
            this.updatePets()
        })

        this.EquippedPets = replicaData.Profile.EquippedPets
        this.Pets = replicaData.Profile.Pets
        this.updatePets()

    }

    onStart() {
        
    }
}