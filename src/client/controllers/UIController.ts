
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
        {name: 'CleanseMachine', objComponent: 'Image'},
        {name: 'ClickForPower', objComponent: 'Image'},
        {name: 'Codes', objComponent: 'Image'},
        {name: 'DailyRewards', objComponent: 'Image'},
        {name: 'Event', objComponent: 'Image'},
        {name: 'Follow', objComponent: 'Image'},
        {name: 'GiftPlayerList', objComponent: 'Image'},
        {name: 'Gifts', objComponent: 'Image'},
        {name: 'GoldMachine', objComponent: 'Image'},
        {name: 'Guide', objComponent: 'Image'},
        {name: 'Index', objComponent: 'Image'},
        {name: 'Invite', objComponent: 'Image'},
        {name: 'Limited', objComponent: 'Image'},
        {name: 'MutationMachine', objComponent: 'Image'},
        {name: 'PetInventory', objComponent: 'Image'},
        {name: 'Quest', objComponent: 'Image'},
        {name: 'Rebirth', objComponent: 'Image'},
        {name: 'Settings', objComponent: 'Image'},
        {name: 'SlingshotStore', objComponent: 'Image'},
        {name: 'StarterPack', objComponent: 'Image'},
        {name: 'Store', objComponent: 'Image'},
        {name: 'Teleport', objComponent: 'Image'},
        {name: 'Trade', objComponent: 'Image'},
        {name: 'TradePlayerList', objComponent: 'Image'},
        {name: 'TradeRequest', objComponent: 'Image'},
        {name: 'UpdateLog', objComponent: 'Image'},
        {name: 'VoidMachine', objComponent: 'Image'},
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
        
        let dynamicCodesText = new DynamicText(
            this.UIPath.Codes.get<ImageComponent>().instance.WaitForChild('Info') as TextLabel, 
            '<stroke color="#163542" joins="miter" thickness="2.5" transparency="0">Follow <font color="rgb(255, 0, 0)">@StudioBosses</font>, <font color="rgb(237,0,203)">@4upahero</font> and <font color="rgb(89, 255, 29)">@KetwilDev</font> for powerful codes!</stroke>',
            new Map<number, StrokeInfo>([[200, {Speed: 45}]])
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

        this.UIPath.PetInventory.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.PetInventory.get<ImageComponent>().BindToOpen((obj) => {
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })



        this.UIPath.RightList.Buttons.Codes.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Codes.get<ImageComponent>().Change()
        })

        this.UIPath.RightList.Buttons.Settings.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.Settings.get<ImageComponent>().Change()
        })
        
        this.UIPath.LeftList.Pets.get<ButtonComponent>().BindToClick(() => {
            this.UIPath.PetInventory.get<ImageComponent>().Change()
        })

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
