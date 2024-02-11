
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
    [
        {name: 'RightList', objComponent: 'Frame', children: [
            {name: 'Buttons', objComponent: 'Frame', children: [
                {name: 'Codes', objComponent: 'Button'},
                {name: 'Daily', objComponent: 'Button'},
                {name: 'Settings', objComponent: 'Button'},
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
            {name: 'Close', objComponent: 'Button'}
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
        {name: 'WheelSpin', objComponent: 'Image', children:[
            {name: 'Close', objComponent: 'Button'}
        ]},
    ]


@Controller({})
export class UIController implements OnStart, OnInit {

    private _playerController: PlayerController
    private UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    private Pets: IDBPetData[] = []
    private EquippedPets: IDBPetData[] = []

    private selectedPet?: IDBPetData
    private selectedPetStatus: PetOperationStatus = PetOperationStatus.Equip

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
        
        let equipAmount = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo').WaitForChild('Equip').WaitForChild('Amount')! as TextLabel
        let backpackAmount = equipAmount.Parent!.Parent!.WaitForChild('Backpack').WaitForChild('Amount')! as TextLabel

        equipAmount.Text = tostring(this.EquippedPets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxEquippedPets)
        backpackAmount.Text = tostring(this.Pets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxPets)

        for (let pet of this.Pets) {
            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!;
            obj.Visible = true;

            (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (obj.WaitForChild('Equip') as ImageLabel).Visible = false;
            (obj.WaitForChild('Lock') as ImageLabel).Visible = false;

            if (pet.locked) { (obj.WaitForChild('Lock') as ImageLabel).Visible = true; }

            let button = ButtonFabric.CreateButton(obj)
            button.BindToClick(() => { this.displayPet(pet, false) })
        }

        for (let pet of this.EquippedPets) {
            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!;
            obj.Visible = true;

            (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (obj.WaitForChild('Equip') as TextLabel).Visible = true;
            (obj.WaitForChild('Lock') as ImageLabel).Visible = false;

            if (pet.locked) { (obj.WaitForChild('Lock') as ImageLabel).Visible = true; }

            let button = ButtonFabric.CreateButton(obj)
            button.BindToClick(() => { this.displayPet(pet, true) })
        }

    }

    private displayPet(pet: IDBPetData, equipped: boolean) {
        this.selectedPet = pet

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        let formattedPet = PetUtilities.DBToPetTransfer(pet);
        if (!formattedPet) { return }

        let mainStats = petInfo.WaitForChild('Stats').WaitForChild('Main') as Frame;

        (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = false;
        (petInfo.WaitForChild('Stats').WaitForChild('Boost') as TextLabel).Text = tostring(formattedPet.multipliers.get('strength'))+'x Boost';
        (petInfo.WaitForChild('PetName') as TextLabel).Text = formattedPet.name;
        (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Equip';
        //mainStats.Mutation // TO DO
        (mainStats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.evolution;
        (mainStats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.size;

        this.selectedPetStatus = PetOperationStatus.Equip

        if (equipped) {
            (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Unequip'
            this.selectedPetStatus = PetOperationStatus.Unequip
        }

        if (pet.additional.limit) {
            (petInfo.WaitForChild('Stats').WaitForChild('Number').WaitForChild('Text') as TextLabel).Text = tostring(pet.additional.limit);
            (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = true;
        }
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

        // this.UIPath.VIP.get<ImageComponent>().BindToClose((obj) => {
        //     UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        // })

        // this.UIPath.VIP.get<ImageComponent>().BindToOpen((obj) => {
        //     UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        // })



        this.UIPath.RightList.Buttons.Codes.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Change()
        })

        this.UIPath.RightList.Buttons.Settings.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Settings.get<ImageComponent>().Change()
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

        this.UIPath.Rebirth.Close.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Rebirth.get<ImageComponent>().Close()
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

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        this._playerController.replica.ListenToChange('Profile.EquippedPets', (newValue, oldValue) => {
            this.EquippedPets = newValue
            this.updatePets()

            if (newValue.size() > oldValue.size()) {
                if (newValue[newValue.size()-1].name !== this.selectedPet!.name) { return }
                (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Unequip'
            }

            if (oldValue.size() > newValue.size()) {
                if (oldValue[oldValue.size()-1].name !== this.selectedPet!.name) { return }
                (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Equip'
            }
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
