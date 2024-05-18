
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { PlayerController } from "./PlayerController";
import { Players, Workspace, RunService, SocialService, TweenService, MarketplaceService, ReplicatedStorage, UserInputService, TeleportService, Lighting } from "@rbxts/services";
import { FrameComponent, FrameFabric } from "../components/UIComponents/FrameComponent";
import { ButtonComponent, ButtonFabric } from "../components/UIComponents/ButtonComponent";
import { Binding } from "client/classes/BindbingValues";
import { IButton, IGUIData, IMenu, IShop } from "shared/interfaces/GUIData";
import { UIAnimations } from "shared/utility/UIAnimations";
import { ComponentsInitializer } from "client/classes/ComponentsInitializer";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { SurfaceComponent, SurfaceFabric } from "client/components/UIComponents/SurfaceComponent";
import { Evolutions, IDBPetData, IPetData, Mutations, PetOperationStatus, Rarities, Sizes } from "shared/interfaces/PetData";
import { Components } from "@flamework/components";
import { PetsData } from "shared/info/PetInfo";
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
import { EggQuestsData, FriendQuestsData, PetIndexQuestsData, PetQuestsData } from "shared/info/QuestInfo";
import { IQuestData } from "shared/interfaces/QuestData";
import { SessionData } from "shared/interfaces/SessionData";
import { DailyRewardsData, RebirthsRewardsData, SelectSessionReward, SessionRewardsData } from "shared/info/RewardInfo";
import { RewardType } from "shared/enums/RewardEnums";
import { FlyingObjectStatus } from "shared/enums/FlyingObjectEnums";
import { PotionType } from "shared/enums/PotionEnum";
import { PotionOperationStatus } from "shared/interfaces/PotionData";
import { EggBuyType } from "shared/interfaces/EggData";
import { ReplicationOperationStatus } from "shared/enums/ReplicationEnums";
import LuaUtilFunctions from "shared/utility/LuaUtilFunctions";
import { EggsData } from "shared/info/EggInfo";
import { UIControllerSetup } from "./UIControllerSetup";

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainUI   = playerGui.WaitForChild('MainUI') as ScreenGui
const templates =  mainUI.WaitForChild('Templates') as Folder

const camera = Workspace.CurrentCamera!

const defaultPet = PetUtilities.PetToDBTransfer(PetsData.get('Cat')!)!

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
export class UIController implements OnStart, OnInit {

    private _playerController: PlayerController
    private _uiControllerSetup: UIControllerSetup
    private UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    private Pets: IDBPetData[] = []
    private EquippedPets: IDBPetData[] = []
    
    private selectedUIObject?: GuiObject
    private selectedPet?: IDBPetData
    private selectedPetStatus: PetOperationStatus = PetOperationStatus.Equip
    private giftingToUserId?: number
    private giftsReady = 0
    private minGiftTime = 100000

    private autoTrain: boolean = false
    private autoShoot: boolean = false
    private autoRebirth: boolean = false

    private disablePets: boolean = false

    private selectedGoldenPet?: IDBPetData
    private selectedGoldenUIObjects: GuiObject[] = []
    private selectedGoldenSize = new Binding<number>(0)

    private selectedVoidPet?: IDBPetData
    private selectedVoidUIObject?: GuiObject
    private startVoidTime: number = 0
    private stopVoidTime: number = 0
    private currentVoidTime: number = 0
    private isPetInVoidMachine = false
    private isFlying = false

    private selectedMutationPet?: IDBPetData
    private selectedMutationUIObject?: GuiObject
    private currentMutationGems = new Binding<number>(1)

    private selectedCleansePet?: IDBPetData
    private selectedCleanseUIObject?: GuiObject

    private currentGiftTime = new Binding<number>(0)
    private currentDailyTime = new Binding<number>(0)

    private selectedDeleteUIObjects: GuiObject[] = []
    private selectedDeletePets: IDBPetData[] = []
    private allDeletingPets?: Map<GuiObject, IDBPetData>

    private selectedLockUIObjects: GuiObject[] = []
    private selectedLockPets: IDBPetData[] = []
    private selectedUnlockPets: IDBPetData[] = []
    private allLockingPets?: Map<GuiObject, IDBPetData>

    private currentlySearching?: string

    private ownedTools: string[] = []
    private equippedTool?: string

    private creationId: number = 0
    private petInventory = new Map<GuiObject, IDBPetData>()

    private sortedPetNames: string[] = []

    private worldPurchaseTime = 0

    constructor(playerController: PlayerController, uiControllerSetup: UIControllerSetup) {
        this._playerController = playerController
        this._uiControllerSetup = uiControllerSetup
    }

    private clearPets(parent: Instance, filter?: keyof Instances) {
        let currentFilter = 'GuiButton'
        if (filter) { currentFilter = filter }

        for (let obj of parent.GetChildren()) {
            if (!obj.IsA(currentFilter as keyof Instances)) continue
            obj.Destroy()
        }
    }

    private setupPetOverlay() {
        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance
        let mouse = this._playerController.component.instance.GetMouse()

        task.spawn(() => {
            while (task.wait()) {
                if (!petOverlay.Visible) { continue }
                petOverlay.Position = petOverlay.Position.Lerp(UDim2.fromOffset(mouse.X+50, mouse.Y+100), .5)
            }
        })
    }

    private setupPetBackpackPasses() {
        let profileData = this._playerController.replica.Data.Profile
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let amountInfo = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo') as Frame

        ButtonFabric.CreateButton(amountInfo.WaitForChild('Backpack').WaitForChild('Plus') as ImageButton).BindToClick(() => {
            if (!profileData.Products.includes('100storage')) { Events.PurchasePrompt(722039542) }
            if (!profileData.Products.includes('250storage')) { Events.PurchasePrompt(722093443) }
        })

        ButtonFabric.CreateButton(amountInfo.WaitForChild('Equip').WaitForChild('Plus') as ImageButton).BindToClick(() => {
            if (!profileData.Products.includes('3equipped')) { Events.PurchasePrompt(722111374) }
            if (!profileData.Products.includes('5equipped')) { Events.PurchasePrompt(721938617) }
        })
    }

    private setupPotionInfo() {
        let potionFrame = this.UIPath.Potions.get<ImageComponent>().instance
        let potionInfo = potionFrame.WaitForChild('Templates').WaitForChild('PotionInfo') as Frame
        let mouse = this._playerController.component.instance.GetMouse()

        let boostList = new Map<string, string>([
            ['FriendBoost', 'Friend Boost'],
            ['PremiumBoost', 'Premium Boost ( +10% Wins/Luck )'],
            ['XBoost', 'Follow Boost ( +10% Accuracy )'],
        ])

        task.spawn(() => {
            while (task.wait()) {
                if (!potionInfo.Visible) { continue }
                let position = UserInputService.GetMouseLocation()
                potionInfo.Position = potionInfo.Position.Lerp(UDim2.fromOffset(position.X+50, position.Y-potionFrame.AbsolutePosition.Y-potionFrame.AbsoluteSize.Y/3), .5)
            }
        })

        for (let obj of potionFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }

            let button = ButtonFabric.CreateButton(obj)

            button.BindToEnter(() => { potionInfo.Visible = true; (potionInfo.WaitForChild('TextLabel') as TextLabel).Text = boostList.get(obj.Name)! })
            button.BindToLeave(() => { potionInfo.Visible = false })
        }

    }

    private createPetExample(pet: IDBPetData, callback: (pet: IDBPetData, obj: GuiButton) => void) {

        /*
        if (this.sortedPetNames.size() < 0) {
            let sort: {name: string, val: number}[] = []

            PetsData.forEach((value, key) => {
                sort.push({name: value.name, val: value.multipliers.get('strength')})
            })
        }
        */

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance

        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;
        let petRarities = ReplicatedStorage.WaitForChild('PetRarities') as Folder;

        let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
        obj.Visible = true;

        (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
        (obj.WaitForChild('Equip') as TextLabel).Visible = pet.equipped;
        (obj.WaitForChild('Lock') as ImageLabel).Visible = pet.locked;

        let button = ButtonFabric.CreateButton(obj)
        button.BindToClick(() => { callback(pet, obj) })

        let newPet = PetUtilities.DBToPetTransfer(pet)!
        let stats = petOverlay.WaitForChild('Stats')

        if (!newPet) { return }
        
        let gradient = petRarities.WaitForChild(newPet.stats.rarity)
        if (gradient) { gradient.Clone().Parent = obj }

        button.BindToEnter(() => { 
            petOverlay.Visible = true;

            let petData = newPet; //Check this later
            if (this.petInventory.get(button.instance)!) { petData = PetUtilities.DBToPetTransfer(this.petInventory.get(button.instance)!)! }

            (petOverlay.WaitForChild('PetName') as TextLabel).Text = petData.name;
            (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = petData.additional.mutation;
            (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = petData.additional.size;
            (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = petData.additional.evolution;
            (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(petData.multipliers.get('strength')!)+'x';

            (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.mutation) as UIGradient).Color;
            (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.size) as UIGradient).Color;
            (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.evolution) as UIGradient).Color;

        })
        button.BindToLeave(() => { petOverlay.Visible = false });

        let model = newPet!.model.Clone() 
        let port = obj.WaitForChild('ViewportFrame') as ViewportFrame
            
        model.PivotTo(model.GetPivot().mul(newPet!.stats.rotationOffset))
        let modelCam = new Instance('Camera')

        modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
        
        model.Parent = port
        modelCam.Parent = port
        port.CurrentCamera = modelCam

        return button
    }
    
    private createPetExamples(parent: Instance, callback: (pet: IDBPetData, obj: GuiButton) => void) {

        //let petsUI = new Map<GuiObject, IDBPetData>()

        let first = true
        if (this.petInventory.size() > 0) { first = false } 

        for (let i = 0; i < this.Pets.size(); i++) {

            let pet = this.Pets[i]

            //task.wait()
            if (parent.Parent!.Parent!.Name === 'GoldenInfo' && (pet.additional.evolution !== Evolutions.Normal || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'VoidMachine' && (pet.additional.evolution !== Evolutions.Gold || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'MutationMachine' && (pet.additional.mutation !== Mutations.Default || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'CleanseMachine' && (pet.additional.mutation === Mutations.Default || pet.locked)) { continue }
            
            let button = this.createPetExample(pet, callback)
            if (!button) { continue }

            button.instance.LayoutOrder = -i
            if (pet.equipped) { button.instance.LayoutOrder -= 1000 }

            button.instance.Parent = parent

            if (first) { this.petInventory.set(button.instance, pet) }
        }

        //return petsUI
    }

    private updatePetSearch() {
        for (let obj of this.petInventory) {
            let pet = obj[1]
            let UIObject = obj[0]

            if (this.currentlySearching !== undefined && this.currentlySearching.size() > 0 && pet.name.lower().find(this.currentlySearching.lower()).size() < 1) { UIObject.Visible = false }
            else { UIObject.Visible = true }
        }
    }

    public appendPetInventory(pets: IDBPetData[]) {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let scrollingFrame = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!



        for (let pet of pets) {
            let button = this.createPetExample(pet, (pet, object) => { this.displayPet(pet, object) })
            if (!button) { continue }

            let index = -1
            this.Pets.forEach((val, i) => { if (val.id === pet.id) { index = i } })

            button.instance.LayoutOrder = -index
            if (pet.equipped) { button.instance.LayoutOrder -= 1000 }

            button.instance.Parent = scrollingFrame
            this.petInventory.set(button.instance, pet)
        }

        pets.clear()
    }

    public removePetInventory(pets: IDBPetData[]) {
        for (let pet of pets) {

            for (let obj of this.petInventory) {
                let value = obj[1]
                let UIObject = obj[0]
                if (this.selectedPet && pet.id === this.selectedPet.id) { this.selectedPet = undefined }
                if ((pet.id === value.id)) { UIObject.Destroy(); this.petInventory.delete(UIObject); break }
            }

        }

        this.displayPet(this.selectedPet!, this.selectedUIObject, false, true)

        pets.clear()
    }

    public updatePetInventory(newpets: IDBPetData[]) {

        print(newpets, this.petInventory)

        let proxy = new Map<GuiObject, IDBPetData>()

        //newpets.forEach((newpet) => {

        for (let i = 0; i < this.Pets.size(); i++) {

            let newpet = this.Pets[i]

            for (let obj of this.petInventory) {
                let value = obj[1]
                let UIObject = obj[0]

                //print(newpet.id, value.id)
                if (newpet.id !== value.id) { continue }

                print('pass');
    
                (UIObject.WaitForChild('Equip') as TextLabel).Visible = newpet.equipped;
                (UIObject.WaitForChild('Lock') as ImageLabel).Visible = newpet.locked;
                (UIObject.WaitForChild('X') as ImageLabel).Visible = false;
    
                let redactedPet = PetUtilities.DBToPetTransfer(newpet)!
    
                //let multiplier = math.round(redactedPet.multipliers.get('strength')!*10) 

                UIObject.LayoutOrder = -i
                if (newpet.equipped) { UIObject.LayoutOrder -= 1000 }
    
                proxy.set(UIObject, newpet)
                
                break
            }
        }

        for (let obj of proxy) {
            if (this.selectedPet && obj[1].id === this.selectedPet.id) { this.selectedPet = obj[1] }
            this.petInventory.set(obj[0], obj[1])
        }

        this.displayPet(this.selectedPet!, this.selectedUIObject, true, true)
        //proxy.clear()
    }

    private updatePets() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let equipBestButton = this.UIPath.PetInventory.Buttons.EquipBest.get<ButtonComponent>().instance
        let uneqipButton = equipBestButton.WaitForChild('NoPets') as GuiButton
        
        let equipAmount = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo').WaitForChild('Equip').WaitForChild('Amount')! as TextLabel
        let backpackAmount = equipAmount.Parent!.Parent!.WaitForChild('Backpack').WaitForChild('Amount')! as TextLabel

        equipAmount.Text = tostring(this.EquippedPets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxEquippedPets)
        backpackAmount.Text = tostring(this.Pets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxPets)

        if (this.EquippedPets.size() === math.min(this._playerController.replica.Data.Profile.Config.MaxEquippedPets, this.Pets.size())) {
            uneqipButton.Visible = true
        }
        else {
            uneqipButton.Visible = false
        }
        
    }

    private setupPets() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        this.updatePets()

        this.clearPets(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        this.createPetExamples(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, object) => { this.displayPet(pet, object) })
    }

    private displayPet(pet: IDBPetData | undefined, object?: GuiObject, ignore?: boolean, artificial?: boolean) {
        let massDeleteButtons = this.UIPath.PetInventory.MassDeleteButtons.get<FrameComponent>().instance
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let lockButton = inventoryButtons.WaitForChild('Lock') as GuiButton
        let search = inventoryButtons.WaitForChild('Search') as Frame

        if (massDeleteButtons.Visible && !artificial) { this.displayDeletePet(this.petInventory.get(object!)!, object!); return }
        if (!search.Visible) { this.displayLockPet(this.petInventory.get(object!)!, object!); return }

        if (!ignore) {
            if (object && this.selectedUIObject && this.selectedUIObject === object) {
                this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Close()
                this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Close()
    
                object = undefined
            }
    
            if (object && this.selectedUIObject !== object) {
                this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Open()
                this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Open()
            }
        }

        if (!pet) { return }

        this.selectedPet = this.petInventory.get(object!)!
        this.selectedUIObject = object

        if (!this.petInventory.get(object!)) { return }

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        print(this.selectedPet!, object, this.petInventory.get(object!))

        //if (!this.petInventory.get(object!)) { return }
        print(PetUtilities.DBToPetTransfer(this.selectedPet))

        let formattedPet = PetUtilities.DBToPetTransfer(this.selectedPet);
        if (!formattedPet) { return }

        let mainStats = petInfo.WaitForChild('Stats').WaitForChild('Main') as Frame;

        (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = false;
        (petInfo.WaitForChild('Stats').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(formattedPet.multipliers.get('strength') || 1)+'x Boost';
        (petInfo.WaitForChild('PetName') as TextLabel).Text = formattedPet.name;
        (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Equip';
        (mainStats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.mutation;
        (mainStats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.evolution;
        (mainStats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.size;

        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;
        (mainStats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(formattedPet.additional.mutation) as UIGradient).Color;
        (mainStats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(formattedPet.additional.evolution) as UIGradient).Color;
        (mainStats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(formattedPet.additional.size) as UIGradient).Color;

        this.selectedPetStatus = PetOperationStatus.Equip

        if (this.selectedPet.equipped) {
            (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Unequip'
            this.selectedPetStatus = PetOperationStatus.Unequip
        }

        if (pet.additional.limit) {
            (petInfo.WaitForChild('Stats').WaitForChild('Number').WaitForChild('Text') as TextLabel).Text = '#'+tostring(pet.additional.limit);
            (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = true;
        }

        let sizeEvolutionLabel = (this.UIPath.PetInventory.PetInfo.CraftFrame.get<FrameComponent>().instance.WaitForChild('Number') as TextLabel)

        let sizeCount = 0
        this.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { sizeCount += 1 } });

        let nextSizeReq = 0
        petUpgradeConfig.SizeUpgrades[pet.additional.size].requirements.forEach((value) => { nextSizeReq += value });

        sizeEvolutionLabel.Text = tostring(sizeCount)+'/'+tostring(nextSizeReq)
        if (!petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize) { sizeEvolutionLabel.Text = 'MAX' }

        let port = petInfo.WaitForChild('PetIcon') as ViewportFrame
        let model = formattedPet.model.Clone() 
        
        for (let portobj of port.GetChildren()) { if (portobj.IsA('Model')) { portobj.Destroy() } }

        model.PivotTo(model.GetPivot().mul(formattedPet.stats.rotationOffset))
        let modelCam = new Instance('Camera')
        if (port.CurrentCamera) { modelCam = port.CurrentCamera }

        modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
        
        model.Parent = port
        if (!port.CurrentCamera) { modelCam.Parent = port }
        port.CurrentCamera = modelCam
    }

    private setupAutoTrain() {
        task.spawn(() => {

            while (task.wait()) { // maybe change to runservice
                if (!this.autoTrain) { continue }
                PlayEffect('Click')
            }

        })
    }

    private setupAutoShoot() {
        task.spawn(() => {

            while (task.wait()) { // maybe change to runservice
                if (!this.autoShoot) { continue }
                let worldData = WorldsData.get(this._playerController.replica.Data.Session.currentWorld)
                if (!worldData) { continue }
                this.sendObjectFlying(worldData)
            }

        })
    }

    private setupInventoryButtons() {
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let massDeleteButtons = this.UIPath.PetInventory.MassDeleteButtons.get<FrameComponent>().instance

        let deleteButton = this.UIPath.PetInventory.Buttons.Delete.get<ButtonComponent>()
        let equipBestButton = this.UIPath.PetInventory.Buttons.EquipBest.get<ButtonComponent>()
        let craftAllButton = this.UIPath.PetInventory.Buttons.CraftAll.get<ButtonComponent>()
        let lockButton = this.UIPath.PetInventory.Buttons.Lock.get<ButtonComponent>()
        let search = this.UIPath.PetInventory.Search.Search.get<FrameComponent>().instance.WaitForChild('Type') as TextBox

        massDeleteButtons.Visible = false
        inventoryButtons.Visible = true

        deleteButton.BindToClick(() => {
            massDeleteButtons.Visible = true
            inventoryButtons.Visible = false

            this.selectedDeletePets = []
            this.selectedDeleteUIObjects = []

            this.setupMassDeleteFrame()
        })

        equipBestButton.BindToClick(() => { Events.ManagePets.fire(PetOperationStatus.EquipBest, 'nil') })
        craftAllButton.BindToClick(() => { Events.ManagePets.fire(PetOperationStatus.CraftAll, 'nil') })

        ButtonFabric.CreateButton(equipBestButton.instance.WaitForChild('NoPets') as GuiButton).BindToClick(() => {
            Events.ManagePets.fire(PetOperationStatus.UnequipAll, 'nil')
        })

        search.GetPropertyChangedSignal('Text').Connect(() => {
            print('Ended')
            this.currentlySearching = search.Text

            if (this.currentlySearching === undefined || this.currentlySearching.size() <= 0) {
                this.petInventory.forEach((value, key) => {
                    key.Visible = true
                })
                return
            }

            this.petInventory.forEach((value, key) => {
                if (value.name.lower().find(this.currentlySearching!.lower()).size() > 0) { key.Visible = true }
                else { key.Visible = false }
            })

            //if (inventoryButtons.Visible && ((inventoryButtons.WaitForChild('Search') as Frame).Visible)) { this.updateMassLock(); return }
            //if (inventoryButtons.Visible) { this.updatePets(); return }
            //if (massDeleteButtons.Visible) { this.updateMassDelete(); return }
        })
    }

    private setupMassLock() {
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let lockButton = inventoryButtons.WaitForChild('Lock') as GuiButton
        let search = inventoryButtons.WaitForChild('Search') as Frame

        ButtonFabric.CreateButton(lockButton).BindToClick(() => {
            if (search.Visible) {
                for (let obj of inventoryButtons.GetChildren()) {
                    if (!obj.IsA('GuiObject') || obj === lockButton) { continue }
                    obj.Visible = false
                }

                this.selectedLockPets = []
                this.selectedUnlockPets = []
                this.selectedLockUIObjects = []

                this.setupMassLockFrame()
            }
            else {
                for (let obj of inventoryButtons.GetChildren()) {
                    if (!obj.IsA('GuiObject') || obj === lockButton) { continue }
                    obj.Visible = true
                }

                Events.ManagePets.fire(PetOperationStatus.MultiLock, this.selectedLockPets)
                Events.ManagePets.fire(PetOperationStatus.MultiUnlock, this.selectedUnlockPets)
                
                this.selectedLockPets = []
                this.selectedUnlockPets = []
                this.selectedLockUIObjects = []

                //this.updatePets()
            }
        })

    }

    private setupMassLockFrame() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Close()
        this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Close()

        let equipAmount = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo').WaitForChild('Equip').WaitForChild('Amount')! as TextLabel
        let backpackAmount = equipAmount.Parent!.Parent!.WaitForChild('Backpack').WaitForChild('Amount')! as TextLabel

        equipAmount.Text = tostring(this.EquippedPets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxEquippedPets)
        backpackAmount.Text = tostring(this.Pets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxPets)

        let frame = petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!

        for (let obj of frame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            let lock = obj.FindFirstChild('Lock') as ImageLabel

            if (!lock || !lock.Visible) { continue }
            this.selectedLockUIObjects.push(obj)
        }

        /*
        this.clearPets(frame)
        this.allLockingPets = this.createPetExamples(frame, (pet, object) => { this.displayLockPet(pet, object) })

        */

    }

    private displayLockPet(pet: IDBPetData, object: GuiObject) {

        if (object && this.selectedLockUIObjects.includes(object)) {
            this.selectedLockUIObjects.remove(this.selectedLockUIObjects.indexOf(object)!)

            let selectedIndex = -1
            this.selectedLockPets.forEach((val, index) => { if (Functions.compareObjects(val, pet)) {selectedIndex = index} });

            (object.WaitForChild('Lock') as ImageLabel).Visible = false
            this.selectedUnlockPets.push(pet)

            if (selectedIndex < 0) { return }
            this.selectedLockPets.remove(selectedIndex)
        }
        else {
            this.selectedLockUIObjects.push(object)

            let selectedIndex = -1
            this.selectedUnlockPets.forEach((val, index) => { if (Functions.compareObjects(val, pet)) {selectedIndex = index} });

            (object.WaitForChild('Lock') as ImageLabel).Visible = true
            this.selectedLockPets.push(pet)

            if (selectedIndex < 0) { return }
            this.selectedUnlockPets.remove(selectedIndex)
        }

    }

    private updateMassLock() {
        if (!this.allLockingPets) { return }
        if (!this.currentlySearching || this.currentlySearching.size() < 1) { return }

        this.allLockingPets.forEach((pet, guiobject) => {
            if (pet.name.lower().find(this.currentlySearching!.lower()).size() < 1) { 
                guiobject.Visible = false
                return 
            }

            guiobject.Visible = true
        })
    }

    private setupMassDelete() {
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let massDeleteButtons = this.UIPath.PetInventory.MassDeleteButtons.get<FrameComponent>().instance
        
        let cancelButton = this.UIPath.PetInventory.MassDeleteButtons.Cancel.get<ButtonComponent>()
        let deleteButton = this.UIPath.PetInventory.MassDeleteButtons.Delete.get<ButtonComponent>()
        let selectAllButton = this.UIPath.PetInventory.MassDeleteButtons.SelectAll.get<ButtonComponent>()

        this.selectedDeletePets = []
        this.selectedDeleteUIObjects = [];

        (deleteButton.instance.WaitForChild('TextLabel') as TextLabel).Text = 'Delete ('+this.selectedDeletePets.size()+')'

        cancelButton.BindToClick(() => {
            massDeleteButtons.Visible = false
            inventoryButtons.Visible = true

            this.selectedDeletePets = []
            this.selectedDeleteUIObjects = []

            this.petInventory.forEach((pet, guiobject) => {
                (guiobject.WaitForChild('X') as ImageLabel).Visible = false;
            });

            (deleteButton.instance.WaitForChild('TextLabel') as TextLabel).Text = 'Delete (0)'

            //this.updatePets()
        })

        deleteButton.BindToClick(() => {
            if (!this.selectedDeletePets) { return }
            Events.ManagePets.fire(PetOperationStatus.MultiDelete, this.selectedDeletePets)

            print('Deleted')

            this.selectedDeletePets = []
            this.selectedDeleteUIObjects = []

            this.petInventory.forEach((pet, guiobject) => {
                (guiobject.WaitForChild('X') as ImageLabel).Visible = false;
            });

            (deleteButton.instance.WaitForChild('TextLabel') as TextLabel).Text = 'Delete (0)'
        });

        selectAllButton.BindToClick(() => {
            if (!this.petInventory) { return }
            this.petInventory.forEach((pet, guiobject) => {
                if (this.selectedDeleteUIObjects.includes(guiobject)) { return }

                (guiobject.WaitForChild('X') as ImageLabel).Visible = true;

                this.selectedDeleteUIObjects.push(guiobject)
                this.selectedDeletePets.push(pet)
            });

            (deleteButton.instance.WaitForChild('TextLabel') as TextLabel).Text = 'Delete ('+this.selectedDeletePets.size()+')'
        })

    }

    private setupMassDeleteFrame() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let deleteButton = this.UIPath.PetInventory.MassDeleteButtons.Delete.get<ButtonComponent>().instance;

        (deleteButton.WaitForChild('TextLabel') as TextLabel).Text = 'Delete ('+this.selectedDeletePets.size()+')'

        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Close()
        this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Close()

        /*
        let equipAmount = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo').WaitForChild('Equip').WaitForChild('Amount')! as TextLabel
        let backpackAmount = equipAmount.Parent!.Parent!.WaitForChild('Backpack').WaitForChild('Amount')! as TextLabel

        equipAmount.Text = tostring(this.EquippedPets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxEquippedPets)
        backpackAmount.Text = tostring(this.Pets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxPets)

        this.clearPets(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        this.allDeletingPets = this.createPetExamples(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, object) => { this.displayDeletePet(pet, object) })
        */
    }

    private updateMassDelete() {
        if (!this.allDeletingPets) { return }
        if (!this.currentlySearching || this.currentlySearching.size() < 1) { return }

        this.allDeletingPets.forEach((pet, guiobject) => {
            if (pet.name.lower().find(this.currentlySearching!.lower()).size() < 1) { 
                guiobject.Visible = false
                return 
            }

            guiobject.Visible = true
        })
    }


    private displayDeletePet(pet: IDBPetData, object: GuiObject) {
        if (!pet || !object) { return }

        print(object, 'fffffff111111')

        if (object && this.selectedDeleteUIObjects.includes(object)) {
            let selectedIndex = -1

            this.selectedDeleteUIObjects.remove(this.selectedDeleteUIObjects.indexOf(object))
            this.selectedDeletePets.forEach((val, index) => { if (Functions.compareObjects(val, pet)) {selectedIndex = index} });

            (object.WaitForChild('X') as ImageLabel).Visible = false

            if (selectedIndex < 0) { return }
            this.selectedDeletePets.remove(selectedIndex)
        }
        else {
            this.selectedDeleteUIObjects.push(object)
            this.selectedDeletePets.push(pet);
            
            (object.WaitForChild('X') as ImageLabel).Visible = true
        }

        let deleteButton = this.UIPath.PetInventory.MassDeleteButtons.Delete.get<ButtonComponent>().instance;
        (deleteButton.WaitForChild('TextLabel') as TextLabel).Text = 'Delete ('+this.selectedDeletePets.size()+')'
    }

    private getEquippedPets(pets: IDBPetData[]) {
        let equipped: IDBPetData[] = []
        pets.forEach((value, index) => { if (value.equipped) { equipped.push(value) } })
        return equipped
    }

    private setupGoldenGui() {
        let obj: Instance = this.UIPath.GoldMachine.get<ImageComponent>().instance

        this.selectedGoldenPet = undefined
        this.selectedGoldenUIObjects = []
        this.selectedGoldenSize.set(0)

        this.UIPath.GoldMachine.GoldenInfo.PetsHolder.get<FrameComponent>().Close()
        this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.get<FrameComponent>().Close()

        this.clearPets(obj.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!)
        this.createPetExamples(obj.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!, (pet, obj) => {this.goldenCallback(pet, obj)} )
    }

    private setupMutationGui() {
        let obj: Instance = this.UIPath.MutationMachine.get<ImageComponent>().instance

        this.selectedMutationPet = undefined
        this.selectedMutationUIObject = undefined

        this.UIPath.MutationMachine.PetsFrame.get<FrameComponent>().Close()
        this.UIPath.MutationMachine.MutationInfo.get<FrameComponent>().Close()

        this.clearPets(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        this.createPetExamples(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, obj) => {this.mutationCallback(pet, obj)} )

        for (let newobj of (obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame') as ScrollingFrame).GetChildren()) {
            if (!newobj.IsA('GuiButton')) { continue }

            (newobj.WaitForChild('Equip') as TextLabel).Visible = false;
            (newobj.WaitForChild('Lock') as ImageLabel).Visible = false;
        }

    }

    private setupCleanseGui() {
        let obj: Instance = this.UIPath.CleanseMachine.get<ImageComponent>().instance

        this.selectedCleansePet = undefined
        this.selectedCleanseUIObject = undefined

        this.UIPath.CleanseMachine.PetsFrame.get<FrameComponent>().Close()
        this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().Close()

        this.clearPets(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        this.createPetExamples(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, obj) => { this.cleanseCallback(pet, obj) } )

        for (let newobj of (obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame') as ScrollingFrame).GetChildren()) {
            if (!newobj.IsA('GuiButton')) { continue }

            (newobj.WaitForChild('Equip') as TextLabel).Visible = false;
            (newobj.WaitForChild('Lock') as ImageLabel).Visible = false;
        }

    }

    private setupSlingshots() {
        let obj = this.UIPath.SlingshotStore.get<ImageComponent>().instance
        let store = obj.WaitForChild('ScrollingFrame') as ScrollingFrame

        for (let button of store.GetDescendants()) {
            if (!button.IsA('GuiButton')) { continue }
            let slingshotFrame = button.Parent!

            if (!slingshotFrame.FindFirstChild('Pointer')) { continue }
            let toolName = (slingshotFrame.WaitForChild('Pointer') as StringValue).Value;

            let tool = ToolsData.get(toolName)
            if (!tool) { continue };

            (slingshotFrame.WaitForChild('Name') as TextLabel).Text = tool.name;
            (slingshotFrame.WaitForChild('Value') as TextLabel).Text = '+'+GUIUtilities.getSIPrefixSymbol(tool.addition);
            (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(tool.price);

            if (this.ownedTools.includes(toolName)) { (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Equip') as Frame).Visible = true }

            let buttonComponent = ButtonFabric.CreateButton(slingshotFrame.WaitForChild('UnlockButton') as GuiButton)
            if (this.equippedTool === toolName) { (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Equip').WaitForChild('Equip') as TextLabel).Text = 'Equipped' }
            if (tool.valuetype === ToolValueType.VBugs) { (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Value') as TextLabel).Text = ''+GUIUtilities.getSIPrefixSymbol(tool.price) }

            buttonComponent.BindToClick(() => {
                if (this.equippedTool === toolName) { return }
                if (this.ownedTools.includes(toolName)) { Events.ManageTool.fire(ToolOperationStatus.Equip, toolName); return }
                if (tool!.valuetype === ToolValueType.VBugs) { Events.PurchasePrompt(tool!.productid!) }
                Events.ManageTool.fire(ToolOperationStatus.Buy, toolName)
            })

        }
    }

    private setupVoidPets() {

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let obj: Instance = this.UIPath.VoidMachine.get<ImageComponent>().instance

        this.selectedVoidPet = undefined
        this.selectedVoidUIObject = undefined

        this.UIPath.VoidMachine.CraftInfo.get<FrameComponent>().Close()
        this.UIPath.VoidMachine.PetsFrame.get<FrameComponent>().Close()

        this.clearPets(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)

        for (let pet of this._playerController.replica.Data.Profile.VoidMachine) {

            let object = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            object.Parent = obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!
            object.Visible = true;
    
            (object.WaitForChild('PetName') as TextLabel).Text = pet.pet.name;
            (object.WaitForChild('Equip') as TextLabel).Visible = false;
            (object.WaitForChild('Lock') as ImageLabel).Visible = pet.pet.locked;
            (object.WaitForChild('Clock') as ImageLabel).Visible = true
    
            let button = ButtonFabric.CreateButton(object)
            button.BindToClick(() => { this.voidCallback(pet.pet, {start: pet.startTime, stop: pet.endTime}, object) })
        }

        this.createPetExamples(obj.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, object) => {this.voidCallback(pet, {start: 0, stop: 0}, object)} )

    }

    private setupPetIndex() {

        let index = this.UIPath.Index.get<ImageComponent>().instance

        this.clearPets(index.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame'))

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let parent = index.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')

        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance

        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;
        let petRarities = ReplicatedStorage.WaitForChild('PetRarities') as Folder;

        let stats = petOverlay.WaitForChild('Stats')

        let layoutRarity = new Map([
            [Rarities.Common, 1],
            [Rarities.Uncommon, 2],
            [Rarities.Rare, 3],
            [Rarities.Epic, 4],
            [Rarities.Legendary, 5],
            [Rarities.Mythic, 6],
            [Rarities.Secret, 7],
            [Rarities.Exclusive, 8],
            [Rarities.Limited, 9],
        ])

        PetsData.forEach((value, petname) => {

            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = parent
            obj.Visible = true;
    
            (obj.WaitForChild('PetName') as TextLabel).Text = petname;
            (obj.WaitForChild('Equip') as TextLabel).Visible = false;
            (obj.WaitForChild('Lock') as ImageLabel).Visible = false;

            let newPet = PetUtilities.DBToPetTransfer(PetUtilities.NameToDBPet(petname)!)
            if (!newPet) { return }
            
            let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(newPet.stats.rarity)
            if (gradient) { gradient.Clone().Parent = obj }

            let model = newPet!.model.Clone() 
            let port = obj.WaitForChild('ViewportFrame') as ViewportFrame
                
            model.PivotTo(model.GetPivot().mul(newPet!.stats.rotationOffset))
            let modelCam = new Instance('Camera')

            obj.LayoutOrder = layoutRarity.get(value.stats.rarity) || 10

            if (!this._playerController.replica.Data.Profile.PetIndex.includes(petname)) {
                port.ImageColor3 = Color3.fromRGB(0,0,0);
                (obj.WaitForChild('PetName') as TextLabel).Visible = false
                //obj.LayoutOrder += 10
            }
            modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
            
            model.Parent = port
            modelCam.Parent = port
            port.CurrentCamera = modelCam

            let button = ButtonFabric.CreateButton(obj)

            button.BindToEnter(() => { 
                petOverlay.Visible = true;
    
                let petData = PetUtilities.DBToPetTransfer(value)!; //Check this later
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = petData.name;
                (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = petData.additional.mutation;
                (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = petData.additional.size;
                (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = petData.additional.evolution;

                let strength = GUIUtilities.getSIPrefixSymbol(petData.multipliers.get('strength')!)+'x';
                if (!this._playerController.replica.Data.Profile.PetIndex.includes(petname)) { strength = '???' }

                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = strength;
    
                (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.mutation) as UIGradient).Color;
                (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.size) as UIGradient).Color;
                (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.evolution) as UIGradient).Color;
    
            })
            button.BindToLeave(() => { petOverlay.Visible = false });

        })

        //print(petIndex.size(), current.requirements.get('pets'))

        let current = PetIndexQuestsData.get('PetIndexQuest6')!
        let petIndex = this._playerController.replica.Data.Profile.PetIndex
        
        //let locked = false
        
        PetIndexQuestsData.forEach((value, key) => {
            let delta1 = value.requirements.get('pets')-petIndex.size() //25
            let delta2 = current.requirements.get('pets')-petIndex.size() //75
            //if (locked) { return }

            if ((value.requirements.get('pets') as number > petIndex.size()) && (delta1 < delta2)) { current = value }
        });
        

        let maxPercentage = tostring(petIndex.size())+'/'+tostring(PetsData.size());
        let percentage = tostring(petIndex.size())+'/'+tostring(current.requirements.get('pets'));

        (index.WaitForChild('Title1') as TextLabel).Text = maxPercentage+' Pets Found!';
        (index.WaitForChild('Rewards').WaitForChild('Bar').WaitForChild('Value') as TextLabel).Text = percentage+' Pets!';
        (index.WaitForChild('Rewards').WaitForChild('Tier') as TextLabel).Text = current.requirements.get('tier');

        TweenService.Create(index.WaitForChild('Rewards').WaitForChild('Bar').WaitForChild('stroke') as TextLabel, new TweenInfo(), {
            'Size': UDim2.fromScale(petIndex.size()/current.requirements.get('pets'), 1)
        }).Play()

    }



    private setupGifts() {
        
        let gifts = this.UIPath.Gifts.get<ImageComponent>().instance

        this.giftsReady = 0

        for (let gift of gifts.WaitForChild('Rewards').GetDescendants()) {
            if (!gift.IsA('ImageButton')) { continue }

            let world = gift.Parent!.Parent!.Name
            if (gift.Name === 'Pet') { world = gift.Parent!.Name }

            this.makeGift(gift, world as WorldType)
        }

        //this.makeGift(gifts.WaitForChild('Pet') as ImageButton)
    }

    private setupDaily() {

        let daily = this.UIPath.DailyRewards.get<ImageComponent>().instance

        for (let reward of daily.WaitForChild('ScrollingFrame').GetChildren()) {
            if (!reward.IsA('Frame')) { continue }

            let dailyData = DailyRewardsData[reward.LayoutOrder-1]
            let timer = reward.WaitForChild('Button').WaitForChild('Text') as TextLabel

            if (!dailyData) { continue } 
            
            ButtonFabric.CreateButton(reward.WaitForChild('Button') as ImageButton).BindToClick(()=> {
                print('Clicked', RewardType.Daily)
                Events.ClaimReward.fire(RewardType.Daily, 'nil') //some sort of bug here
            })

            this.currentDailyTime.AddCallback((val) => {

                let index = (reward as Frame).LayoutOrder-(val%DailyRewardsData.size()+1) //((reward as Frame).LayoutOrder-val-1)%DailyRewardsData.size()

                timer.Text = tostring(index) + ' Days Left'

                let delta = this._playerController.replica.Data.Profile.StatValues.LastDayTime + 24*60*60 - os.time()

                if ((reward as Frame).LayoutOrder === (val%DailyRewardsData.size()+1)) { //&& (delta >= 10) //
                    if (delta > 0) { timer.Text = GUIUtilities.GuiTimeFormatter(delta); return }
                    timer.Text = 'CLAIM!'
                    return
                }

                if ((reward as Frame).LayoutOrder < (val%DailyRewardsData.size()+1)) {  //24*60*60
                    timer.Text = 'CLAIMED!'
                    return
                }

            })

        }

    }

    private setupBigSlingshots() {
        let bar = this.UIPath.ClickForPower.get<ImageComponent>().instance

        let meter = bar.WaitForChild('Meter') as ImageLabel
        let percentbar = bar.WaitForChild('HowMuch') as TextLabel
        let countdown = bar.WaitForChild('Countdown') as TextLabel
        let clickicon = bar.WaitForChild('ClickIcon') as ImageLabel

        let countdownChain = ['5', '4', '3', '2', '1', 'GO!']

        WorldsData.forEach((value, key) => {

            let sling = value.slingshotPart
            print(sling)
            let proximity = new Instance('ProximityPrompt')

            proximity.Parent = sling

            proximity.Triggered.Connect(() => {
                this.sendObjectFlying(value)
            })
        })
    }

    private sendObjectFlying(value: IWorldData) {
        let bar = this.UIPath.ClickForPower.get<ImageComponent>().instance

        print('Triggered')

        let meter = bar.WaitForChild('Meter') as ImageLabel
        let percentbar = bar.WaitForChild('HowMuch') as TextLabel
        let countdown = bar.WaitForChild('Countdown') as TextLabel
        let clickicon = bar.WaitForChild('ClickIcon') as ImageLabel

        let countdownChain = ['5', '4', '3', '2', '1', 'GO!']

        if (this.isFlying) { return }

        countdown.Text = countdownChain[0]

        this.isFlying = true

        meter.Position = UDim2.fromScale(meter.Position.X.Scale, 0.824)

        let perc = 0

        PlayerController.currentClicks.AddCallback((val) => {
            perc = math.min(100, math.round(val/value.maxClicks*100))
            if (this._playerController.replica.Data.Profile.Products.includes('instantpower')) {
                perc = 100
            }

            TweenService.Create(clickicon.WaitForChild('UIScale') as UIScale, new TweenInfo(1/20), {'Scale': .85}).Play()
            TweenService.Create(meter, new TweenInfo(1/10, Enum.EasingStyle.Linear), 
                {'Position': UDim2.fromScale(meter.Position.X.Scale, ((100-perc)/100)*0.824) }).Play()

            percentbar.Text = tostring(perc)+'%'

            task.wait(1/20)
            TweenService.Create(clickicon.WaitForChild('UIScale') as UIScale, new TweenInfo(1/20), {'Scale': 1}).Play()
        })

        print('Sent')

        PlayerController.currentClicks.set(0)

        Events.ShootObject.fire(FlyingObjectStatus.IniticalizeObject)
        bar.Visible = true

        for (let i = 0; i < countdownChain.size(); i++) {
            countdown.Text = countdownChain[i]
            TweenService.Create(countdown.WaitForChild('UIScale') as UIScale, new TweenInfo(.1), {'Scale': 1.56}).Play()
            task.wait(.7)
            TweenService.Create(countdown.WaitForChild('UIScale') as UIScale, new TweenInfo(.3), {'Scale': 1.76}).Play()
            task.wait(.3)
        }

        Events.ShootObject.fire(FlyingObjectStatus.ShootObject, perc/100)

        PlayerController.currentClicks.RemoveCallbacks()

        bar.Visible = false
        //this.isFlying = false

        print(perc)
    }

    private setupDonations() {

        let accuracylist = new Map<string, number>([
            ['1', 1762885895],
            ['2', 1762886150],
            ['3', 1762886258],
            ['4', 1762886345],
            ['5', 1762886496],
            ['6', 1762886599],
            ['7', 1762886688]
        ])

        let winslist = new Map<string, number>([
            ['1', 1762886863],
            ['2', 1762886977],
            ['3', 1762887049],
            ['4', 1762887130],
            ['5', 1762887254],
            ['6', 1762887397],
            ['7', 1762887501]
        ])

        let gemslist = new Map<string, number>([
            ['1', 1762887630],
            ['2', 1762887698],
            ['3', 1762887934],
            ['4', 1762888203],
            ['5', 1762888316],
            ['6', 1762888398],
            ['7', 1762888472]
        ])

        let luckList = new Map<string, number>([
            ['Lucky1', 722093437],
            ['Lucky2', 722436217],
            ['Lucky3', 722472169],
        ])

        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')
        let accuracyFrame = storeFrame.WaitForChild('Accuracy').WaitForChild('AccuracyList')
        let winsFrame = storeFrame.WaitForChild('Wins').WaitForChild('WinsList')
        let gemsFrame = storeFrame.WaitForChild('Gems').WaitForChild('GemsList')

        let luckFrame = storeFrame.WaitForChild('EggLuckPasses').WaitForChild('Passes')

        for (let obj of accuracyFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!accuracylist.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(accuracylist.get(obj.Name)!, this.giftingToUserId)
            })
        }

        for (let obj of winsFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!winslist.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(winslist.get(obj.Name)!, this.giftingToUserId)
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

        ButtonFabric.CreateButton(winsFrame.Parent!.WaitForChild('Huge Pack') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(winslist.get('7')!, this.giftingToUserId)
        })

        ButtonFabric.CreateButton(gemsFrame.Parent!.WaitForChild('Huge Pack') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(gemslist.get('7')!, this.giftingToUserId)
        })

        for (let obj of luckFrame.GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            ButtonFabric.CreateButton(obj.WaitForChild('Buy') as GuiButton).BindToClick(() => {
                if (!luckList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(luckList.get(obj.Name)!, this.giftingToUserId)
            })
        }

    }

    public setupStoreUpperButtons() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let cleanseGemsImage = this.UIPath.CleanseMachine.get<ImageComponent>().instance.WaitForChild('Gems') as ImageLabel
        let mutationGemsImage = this.UIPath.MutationMachine.get<ImageComponent>().instance.WaitForChild('Gems') as ImageLabel
        let upperFrame = this.UIPath.UpperList.get<FrameComponent>().instance

        let scrollList = new Map<string, number>([
            ['1', 0.001],
            ['2', 1050/5051],
            ['3', 1850/5051],
            ['4', 2250/5051],
            ['5', 2850/5051],
            ['6', 3500/5051],
            ['7', 4175/5051],
            ['8', 4751/5051],
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

        for (let obj of upperFrame.GetChildren()) {
            if (!obj.FindFirstChild('Plus')) { continue }
            ButtonFabric.CreateButton(obj.WaitForChild('Plus') as GuiButton).BindToClick(() => {
                this.UIPath.Store.get<FrameComponent>().Open()
                TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2(scrollList.get(otherList.get(obj.Name)!)!*offset, 0) }).Play()
            })
        }

        ButtonFabric.CreateButton(mutationGemsImage.WaitForChild('Plus') as GuiButton).BindToClick(() => {
            this.UIPath.Store.get<FrameComponent>().Open()
            TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2(scrollList.get('5')!*offset, 0) }).Play()
        })

        ButtonFabric.CreateButton(cleanseGemsImage.WaitForChild('Plus') as GuiButton).BindToClick(() => {
            this.UIPath.Store.get<FrameComponent>().Open()
            TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2(scrollList.get('5')!*offset, 0) }).Play()
        })

    }

    private updateLowerFrame() {
        let itemFrame = this.UIPath.LowerList.Item.get<ButtonComponent>().instance as ImageButton

        let profileData = this._playerController.replica.Data.Profile
        let ownedTool = ToolsData.get(profileData.EquippedTool)!;

        (itemFrame.WaitForChild('ItemImage') as ImageLabel).Image = (ownedTool.model.WaitForChild('ItemImage') as ImageLabel).Image;
        (itemFrame.WaitForChild('Value') as TextLabel).Text = '+'+GUIUtilities.getSIPrefixSymbol(ownedTool.addition)+'/Tap'
    }

    public setupStoreGamepasses() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let rightFrame = this.UIPath.RightList.get<FrameComponent>().instance.WaitForChild('Passes') as Frame

        let passList = new Map<string, number>([
            ['+100Storage', 722039542],
            ['+250Storage', 722093443],
            ['+3PetEquipped', 722111374],
            ['+5PetEquipped', 721938617],
            ['AutoRebirth', 733950750],
            ['DoubleAccuracy', 721905653],
            ['DoubleGems', 734124643],
            ['DoubleStars', 722336327],
            ['DoubleWins', 721820866],
            ['FastHatch', 722545023],
            ['InstantPower', 722529168],
            ['TripleHatch', 721794896],
            ['TripleWins', 722507170],
            ['VipPass', 722092789],
        ])


        for (let obj of storeFrame.WaitForChild('Passes').WaitForChild('PassList')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!passList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(passList.get(obj.Name)!, this.giftingToUserId)
            })
        }

        ButtonFabric.CreateButton(storeFrame.WaitForChild('GamepassBundle').WaitForChild('Buy') as GuiButton).BindToClick(() => {
            Events.PurchasePrompt.fire(1779423116, this.giftingToUserId)
        })

        for (let obj of rightFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => {
                if (!passList.get(obj.Name)) { return }
                Events.PurchasePrompt.fire(passList.get(obj.Name)!, this.giftingToUserId)
            })
        }

    }

    public setupWorldTeleports() {
        let worldsUI = this.UIPath.Teleport.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')

        for (let worldIcon of worldsUI.GetChildren()) {
            if (!worldIcon.IsA('ImageLabel')) { continue }
            if (!WorldsData.has(worldIcon.Name as WorldType)) { continue }

            let worldData = WorldsData.get(worldIcon.Name as WorldType);

            (worldIcon.WaitForChild('Locked').WaitForChild('Value') as TextLabel).Text = tostring( worldData!.price );

            ButtonFabric.CreateButton(worldIcon.WaitForChild('TeleportButton') as GuiButton).BindToClick(() => {
                print(worldIcon.Name as WorldType, worldIcon.Name)
                Events.ManageWorld.fire(WorldOperationStatus.Teleport, worldIcon.Name as WorldType)
            })
        }
    }

    public setupStorePotions() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let potionsFrame = storeFrame.WaitForChild('Boosts')

        let potionList = new Map<string, number>([
            ['2x Wins', 1762884667],
            ['Lucky', 1779471423],
            ['Gold', 1779471655],
            ['Void', 1779471915],
            ['HugePack', 1779472537],
        ])

        let potionUseList = new Map<string, PotionType>([
            ['2x Wins', PotionType.WinsPotion],
            ['Lucky', PotionType.LuckPotion],
            ['Gold', PotionType.GoldPotion],
            ['Void', PotionType.VoidPotion],
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

    public openCurrentPack() {
        let profileData = this._playerController.replica.Data.Profile
        let packFrame = this.UIPath.Limited.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame

        let packList = new Map<string, {id: number, world: WorldType, product: string}>([
            ['CavePack', { id: 1779439494, world: WorldType.Cave, product: 'cavepack' }],
            ['NeonPack', { id: 1779439942, world: WorldType.NeonCity, product: 'neonpack' } ],
            ['SpacePack', { id: 1779440646, world: WorldType.Space, product: 'spacepack' } ],
        ])

        packList.forEach((val, name) => {
            if (val.world !== profileData.Config.MaxWorld) { return }
            this.UIPath[name].get<FrameComponent>().Open()
        })
    }

    public setupPacks() {
        let profileData = this._playerController.replica.Data.Profile
        let packFrame = this.UIPath.Limited.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame

        let packList = new Map<string, {id: number, world: WorldType, product: string}>([
            ['CavePack', { id: 1779439494, world: WorldType.Cave, product: 'cavepack' }],
            ['NeonPack', { id: 1779439942, world: WorldType.NeonCity, product: 'neonpack' } ],
            ['SpacePack', { id: 1779440646, world: WorldType.Space, product: 'spacepack' } ],
        ])

        let maxWorldInfo = WorldsData.get(profileData.Config.MaxWorld)!

        packList.forEach((val, key) => {
            ButtonFabric.CreateButton(this.UIPath[key].get<FrameComponent>().instance.WaitForChild('Buy') as GuiButton).BindToClick(() => {
                Events.PurchasePrompt.fire(val.id)
            })

            ButtonFabric.CreateButton(this.UIPath[key].get<FrameComponent>().instance.WaitForChild('Close') as GuiButton).BindToClick(() => {
                this.UIPath[key].get<FrameComponent>().Close()
            })
        })

        for (let obj of packFrame.GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            if (!packList.get(obj.Name)) { continue }

            let info = packList.get(obj.Name)!
            let worldInfo = WorldsData.get(info.world)!;

            (obj.WaitForChild('Owned') as Frame).Visible = false;
            (obj.WaitForChild('View').WaitForChild('Locked') as Frame).Visible = false;

            if (worldInfo.weight > maxWorldInfo.weight) {
                (obj.WaitForChild('View').WaitForChild('Locked') as Frame).Visible = true;
            }

            if (profileData.Products.includes(info.product)) { 
                (obj.WaitForChild('Owned') as Frame).Visible = true;
                (obj.WaitForChild('View').WaitForChild('Locked') as Frame).Visible = true; 
            }

            //if (ButtonFabric.GetButton(obj.WaitForChild('View') as GuiButton)) { continue }
            ButtonFabric.CreateButton(obj.WaitForChild('View') as GuiButton).BindToClick(() => {
                //print('Prompted')
                if ((obj.WaitForChild('Owned') as Frame).Visible) { return }
                if ((obj.WaitForChild('View').WaitForChild('Locked') as Frame).Visible) { return }

                this.UIPath[obj.Name].get<FrameComponent>().Open()
            })
        }

    }

    private setupLimitedPets() {
        let profileData = this._playerController.replica.Data.Profile
        let scrollingFrame = this.UIPath.Store.get<ImageComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let limitedPets = scrollingFrame.WaitForChild('LimitedPets').WaitForChild('Pets')

        let petList = new Map<string, number>([
            ['LimitedPet1', 1779420282],
            ['LimitedPet2', 1779420957],
            ['LimitedPet3', 1779421279]
        ])

        for (let obj of limitedPets.GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            if (!petList.get(obj.Name)) { continue }

            ButtonFabric.CreateButton(obj.WaitForChild('Buy') as TextButton).BindToClick(() => {
                Events.PurchasePrompt.fire(petList.get(obj.Name)!)
            })
        }
    }
    
    private makeGift(gift: ImageButton, world: WorldType) {
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
            if (!(gift.Parent!.Parent! as Frame).Visible) { return }

            timer.Text = GUIUtilities.GuiTimeFormatter(giftData.Time! - val)
            let oldGiftAmount = this.giftsReady

            if ((giftData.Time! - val) < 0) {
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true
                this.giftsReady += 1
            }
    
            if (this._playerController.replica.Data.Session.claimedRewards.includes(index)) {
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true;
                (gift.WaitForChild('ClaimFrame').WaitForChild('Timer') as TextLabel).Text = 'Claimed!'
                this.giftsReady -= 1
            };

            let giftTime = giftData.Time! - val;

            if (giftTime >= -1) {
                this.minGiftTime = math.min(giftTime, this.minGiftTime)
            }
            
            giftAmount.Visible = false

            if ((giftData.Time! - val) < 0 && (giftData.Time! - val) > -2) {
                PlayEffect('Notify', new Map([['Message', 'Gift Is Ready!'], ['Image', 'NewGift']]))
            }

            if (this.giftsReady > 0) {
                giftAmount.Visible = true;
                (giftAmount.WaitForChild('Value') as TextLabel).Text = tostring(this.giftsReady)
                giftText.Text = 'CLAIM GIFT'
            } 
            else {
                giftText.Text = 'REWARD IN: '+GUIUtilities.GuiTimeFormatter(this.minGiftTime)
                if (this.minGiftTime <= -1) { this.minGiftTime = 10000000 }
            }

        })

    }

    private voidCallback(pet: IDBPetData, times: {start: number, stop: number}, object?: GuiObject, ) {

        if (!pet) { return }

        if (object && this.selectedVoidUIObject && this.selectedVoidUIObject === object) {
            this.UIPath.VoidMachine.PetsFrame.get<FrameComponent>().Close()
            this.UIPath.VoidMachine.CraftInfo.get<FrameComponent>().Close()

            object = undefined
        }

        if (object && this.selectedVoidUIObject !== object) {
            this.UIPath.VoidMachine.PetsFrame.get<FrameComponent>().Open()
            this.UIPath.VoidMachine.CraftInfo.get<FrameComponent>().Open()
        }

        this.selectedVoidPet = pet
        this.selectedVoidUIObject = object
        this.startVoidTime = times.start
        this.stopVoidTime = times.stop

        let machine: Instance = this.UIPath.VoidMachine.get<ImageComponent>().instance;
        let voidTime = (this.stopVoidTime - this.startVoidTime)*this._playerController.replica.Data.Profile.Multipliers.VoidMachineMul
        let currentVoidTime = this.startVoidTime+voidTime-os.time();

        this.currentVoidTime = currentVoidTime;

        (machine.WaitForChild('CraftInfo').WaitForChild('GoldenPet') as TextLabel).Text = 'Golden '+pet.additional.size+' '+pet.name;
        (machine.WaitForChild('CraftInfo').WaitForChild('VoidPet') as TextLabel).Text = 'Void '+pet.additional.size+' '+pet.name;
        (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(currentVoidTime);
        
        let newPet = PetUtilities.DBToPetTransfer(pet)!

        let port = machine.WaitForChild('CraftInfo').WaitForChild('PetIcon') as ViewportFrame
        let model = newPet.model.Clone() 
        
        for (let portobj of port.GetChildren()) { if (portobj.IsA('Model')) { portobj.Destroy() } }

        model.PivotTo(model.GetPivot().mul(newPet.stats.rotationOffset))
        let modelCam = new Instance('Camera')
        if (port.CurrentCamera) { modelCam = port.CurrentCamera }

        modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
        
        model.Parent = port
        if (!port.CurrentCamera) { modelCam.Parent = port }
        port.CurrentCamera = modelCam

        this.isPetInVoidMachine = false
        if ((this.startVoidTime !== this.stopVoidTime)) { this.isPetInVoidMachine = true };

        if ((currentVoidTime > 0)) {
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Skip';
        }

        if (!this.isPetInVoidMachine) {
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Craft To Void';
            (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time)
        }

        if (this.isPetInVoidMachine && (currentVoidTime <= 0)) {
            (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = 'Done';
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Collect';
        }
    }

    private mutationCallback(pet: IDBPetData, obj: GuiObject) {
        let mutationMachine = this.UIPath.MutationMachine.get<ImageComponent>().instance as Instance
        let info = mutationMachine.WaitForChild('MutationInfo') as Frame

        if (this.selectedMutationUIObject === obj) {
            this.setupMutationGui()
            return
        }

        this.UIPath.MutationMachine.MutationInfo.get<FrameComponent>().Open()
        this.UIPath.MutationMachine.PetsFrame.get<FrameComponent>().Open()

        this.selectedMutationUIObject = obj;
        this.selectedMutationPet = pet;

        (info.WaitForChild('PetName') as TextLabel).Text = pet.name
        let newPet = PetUtilities.DBToPetTransfer(pet)!

        let port = info.WaitForChild('PetIcon') as ViewportFrame
        let model = newPet.model.Clone() 
        
        for (let portobj of port.GetChildren()) { if (portobj.IsA('Model')) { portobj.Destroy() } }

        model.PivotTo(model.GetPivot().mul(newPet.stats.rotationOffset))
        let modelCam = new Instance('Camera')
        if (port.CurrentCamera) { modelCam = port.CurrentCamera }

        modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
        
        model.Parent = port
        if (!port.CurrentCamera) { modelCam.Parent = port }
        port.CurrentCamera = modelCam
    }

    private cleanseCallback(pet: IDBPetData, obj: GuiObject) {
        let cleanseInfo = this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().instance

        print('Cleanse', this.selectedCleanseUIObject, obj)

        if (this.selectedCleanseUIObject === obj) {
            this.setupCleanseGui()
            return
        }

        this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().Open()
        this.UIPath.CleanseMachine.PetsFrame.get<FrameComponent>().Open()

        this.selectedCleanseUIObject = obj;
        this.selectedCleansePet = pet

        let pet1 = cleanseInfo.WaitForChild('Pet1') as ViewportFrame
        let pet2 = cleanseInfo.WaitForChild('Pet2') as ViewportFrame

        pet1.GetChildren().forEach((val) => {
            if (val.IsA('GuiObject') || val.IsA('UICorner') || val.IsA('UIAspectRatioConstraint')) { return }
            val.Destroy()
        })

        pet2.GetChildren().forEach((val) => {
            if (val.IsA('GuiObject') || val.IsA('UICorner') || val.IsA('UIAspectRatioConstraint')) { return }
            val.Destroy()
        })

        let redactedPet = PetUtilities.DBToPetTransfer(pet)!

        let clonnedPet1 = redactedPet.model.Clone()
        let clonnedPet2 = redactedPet.model.Clone()

        let camera1 = new Instance('Camera')
        let camera2 = new Instance('Camera')

        camera1.CFrame = new CFrame(clonnedPet1.GetPivot().LookVector.mul(4).add(clonnedPet1.GetPivot().Position), clonnedPet1.GetPivot().Position)
        camera2.CFrame = new CFrame(clonnedPet2.GetPivot().LookVector.mul(4).add(clonnedPet2.GetPivot().Position), clonnedPet2.GetPivot().Position)

        camera1.Parent = pet1
        camera2.Parent = pet2

        clonnedPet1.Parent = pet1
        clonnedPet2.Parent = pet1

        pet1.CurrentCamera = camera1
        pet2.CurrentCamera = camera2

        print(camera1.Parent)
    }

    private goldenCallback(pet: IDBPetData, obj: GuiObject) {
    
        let petOverlay = this.UIPath.PetOverlay.get<ImageComponent>().instance
        let goldMachine = this.UIPath.GoldMachine.get<ImageComponent>().instance
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        if (this.selectedGoldenUIObjects.includes(obj)) {
            this.selectedGoldenUIObjects.remove(this.selectedGoldenUIObjects.indexOf(obj))
            this.selectedGoldenSize.set(this.selectedGoldenUIObjects.size());
            (obj.WaitForChild('Equip') as TextLabel).Visible = false
            if (this.selectedGoldenUIObjects.size() > 0) { return }

            this.setupGoldenGui()
            return
        }

        this.UIPath.GoldMachine.GoldenInfo.PetsHolder.get<FrameComponent>().Open()
        this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.get<FrameComponent>().Open()

        if (this.selectedGoldenUIObjects.size() === 5) { return }

        this.selectedGoldenUIObjects.push(obj);
        this.selectedGoldenSize.set(this.selectedGoldenUIObjects.size());
        (obj.WaitForChild('Equip') as TextLabel).Visible = true

        this.selectedGoldenPet = pet;
        (goldMachine.WaitForChild('GoldenInfo').WaitForChild('GoldenHolder').WaitForChild('For')! as TextLabel).Text = `For a Golden ${pet.name}`

        if (this.selectedGoldenUIObjects.size() > 1) { return }
        this.clearPets(goldMachine.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!)
        this.selectedGoldenUIObjects = []

        let debounce = false

        let petRarities = ReplicatedStorage.WaitForChild('PetRarities') as Folder;
        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;

        for (let newpet of this.Pets) {
            if (!PetUtilities.ComparePets(newpet, pet) || newpet.locked) { continue }

            let newobj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            newobj.Parent = goldMachine.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!
            newobj.Visible = true;
    
            (newobj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (newobj.WaitForChild('Equip') as TextLabel).Visible = false;
            (newobj.WaitForChild('Lock') as ImageLabel).Visible = false;

            let newPet = PetUtilities.DBToPetTransfer(pet)
            let stats = petOverlay.WaitForChild('Stats')
            if (!newPet) { continue }

            let gradient = petRarities.WaitForChild(newPet.stats.rarity)
            if (gradient) { gradient.Clone().Parent = newobj }

            let model = newPet!.model.Clone() 
            let port = newobj.WaitForChild('ViewportFrame') as ViewportFrame
                
            model.PivotTo(model.GetPivot().mul(newPet!.stats.rotationOffset))
            let modelCam = new Instance('Camera')

            modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
            
            model.Parent = port
            modelCam.Parent = port
            port.CurrentCamera = modelCam

            if (!debounce) {
                debounce = true
                this.selectedGoldenUIObjects.push(newobj);
                (newobj.WaitForChild('Equip') as TextLabel).Visible = true;
                this.selectedGoldenPet = newpet
            }

            let button = ButtonFabric.CreateButton(newobj)
            button.BindToClick(() => { this.goldenCallback(newpet, newobj) })

            button.BindToEnter(() => { 
                petOverlay.Visible = true;

                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = pet.additional.mutation;
                (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';
    
                (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.mutation) as UIGradient).Color;
                (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;
            })
            button.BindToLeave(() => { petOverlay.Visible = false });
        }
        
    }

    public updateQuestsProgress(progress: Map<string, Map<string, any>>) {

        let profileData = this._playerController.replica.Data.Profile
        /*
        if (progress.get('PetQuest1')) {

            let questUI = this.UIPath.Quest.get<ImageComponent>().instance as Instance
            let label1 = (questUI.WaitForChild('Tasks').WaitForChild('Task1').WaitForChild('stroke') as ImageLabel)

            let quest = PetQuestsData.get('PetQuest1');
            let questProgress = progress.get('PetQuest1')!;

            TweenService.Create(label1, new TweenInfo(.1), 
            {'Size': UDim2.fromScale(quest?.requirements.get('strength')/math.max(quest?.requirements.get('strength'), questProgress.get('strength')), 1)}).Play()

        }
        */
        if (progress.get('Shadow')) {

            let questUI = this.UIPath.Event.get<ImageComponent>().instance as Instance
            let label1 = (questUI.WaitForChild('Progress').WaitForChild('stroke') as ImageLabel)

            let quest = EggQuestsData.get('Shadow');
            let questProgress = progress.get('Shadow')!;

            print(quest?.requirements.get('time'), questProgress.get('time'));

            (label1.Parent?.WaitForChild('Progress') as TextLabel).Text = tostring(questProgress.get('time'))+'/'+tostring(quest?.requirements.get('time'));

            TweenService.Create(label1, new TweenInfo(.1), 
            {'Size': UDim2.fromScale(math.min(quest?.requirements.get('time'), questProgress.get('time'))/quest?.requirements.get('time'), 1)}).Play();

        }

        let eventClaimButton = this.UIPath.Event.Claim.get<ButtonComponent>().instance as GuiButton;
        (eventClaimButton.WaitForChild('Value') as TextLabel).Visible = false

        let foundEggIndex = -1

        profileData.StoredEggs.forEach((val, index) => {
            if ((val.name === 'Shadow') && (val.amount > 0)) { foundEggIndex = index }
        })

        if (foundEggIndex > -1) { 
            (eventClaimButton.WaitForChild('Value') as TextLabel).Visible = true;
            (eventClaimButton.WaitForChild('Value') as TextLabel).Text = 'x'+tostring(profileData.StoredEggs[foundEggIndex]!.amount)
         }

    }

    public updateFriendQuestProgress() {
        let inviteFrame = this.UIPath.Invite.get<ImageComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let leftBoost = this.UIPath.Potions.FriendBoost.get<ImageComponent>().instance

        let profileData = this._playerController.replica.Data.Profile
        let sessionData = this._playerController.replica.Data.Session

        let friendsCount = profileData.StatValues.FriendsCount

        let friendsList = new Map<string, string>([
            ['Reward1', 'FriendQuest1'],
            ['Reward2', 'FriendQuest2'],
            ['Reward3', 'FriendQuest3'],
            ['Reward4', 'FriendQuest4'],
            ['Reward5', 'FriendQuest5'],
            ['Reward6', 'FriendQuest6'],
        ])

        let nextRewardUI = inviteFrame.WaitForChild('Reward1')
        let minDifference = 1000

        for (let obj of inviteFrame.GetChildren()) {
            if (!obj.IsA('ImageLabel') || !friendsList.has(obj.Name)) { continue }
            let info = FriendQuestsData.get(friendsList.get(obj.Name)!)!
            let friendRequirement = info.requirements.get('friends')! as number

            if (friendRequirement <= friendsCount) {
                (obj.WaitForChild('Collected') as Frame).Visible = true;
                (obj.WaitForChild('Locked') as Frame).Visible = false;
                (obj.WaitForChild('Number') as TextLabel).Text = tostring(math.min(friendsCount, friendRequirement))+'/'+tostring(friendRequirement)
                continue
            };

            (obj.WaitForChild('Collected') as Frame).Visible = false;
            (obj.WaitForChild('Locked') as Frame).Visible = true;
            (obj.WaitForChild('Number') as TextLabel).Text = tostring(friendsCount)+'/'+tostring(friendRequirement);

            if ((info.requirements.get('friends')-friendsCount) < minDifference) {
                minDifference = friendRequirement-friendsCount
                nextRewardUI = obj
            }

        };

        (nextRewardUI.WaitForChild('Collected') as Frame).Visible = false;
        (nextRewardUI.WaitForChild('Locked') as Frame).Visible = false;

        let boostSting = math.round((sessionData.multipliers.friends.wins-1)*100);

        (leftBoost.WaitForChild('Timer') as TextLabel).Text = '+'+boostSting+'%';
        (inviteFrame.WaitForChild('Main').WaitForChild('Boost') as TextLabel).Text = 'Current Boost: '+boostSting+'%'
    }

    public updateRebirth() {

        let rebirthUI = this.UIPath.Rebirth.get<ImageComponent>().instance
        let currentRebirthData = RebirthsRewardsData[this._playerController.replica.Data.Profile.Values.RebirthsVal]
        let nextRebirthData = RebirthsRewardsData[this._playerController.replica.Data.Profile.Values.RebirthsVal+1]

        if (!nextRebirthData) { nextRebirthData = currentRebirthData }

        let additional = new Map<string, number>()
        nextRebirthData.Additional!.forEach((value, key) => { additional.set(key, value) })

        let currentAdditional = new Map<string, number>()
        currentRebirthData.Additional!.forEach((value, key) => { currentAdditional.set(key, value) });
        
        let gems = this._playerController.replica.Data.Profile.Values.GemsVal
        let wins = this._playerController.replica.Data.Profile.Values.WinsVal
        let holder = rebirthUI.WaitForChild('StatsHolder');


        let newWins = math.max(0, wins-(nextRebirthData.Additional!.get('Wins') || 0))
        print(GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!), );

        (holder.WaitForChild('Stats1').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!*100)+'%';
        (holder.WaitForChild('Stats1').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(gems);
        (holder.WaitForChild('Stats1').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins);

        (holder.WaitForChild('Stats2').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(additional.get('Multiplier')!*100)+'%';
        (holder.WaitForChild('Stats2').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(gems+(nextRebirthData.Values!.Gems || 0));
        (holder.WaitForChild('Stats2').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newWins);

        (rebirthUI.WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins)+'/'+GUIUtilities.getSIPrefixSymbol(additional.get('Wins')!)
        TweenService.Create(rebirthUI.WaitForChild('Wins').WaitForChild('stroke') as ImageLabel, new TweenInfo(.1), { 'Size': UDim2.fromScale(math.min(1, wins/additional.get('Wins')!), 1) }).Play()

        if (wins >= additional.get('Wins')!) [
            PlayEffect('Notify', new Map([['Message', 'Rebirth Is Ready!'], ['Image', 'RebirthPossible']]))
        ]

    }

    private updateStoreBillboards() {

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

        let shops = new Map<string, string[]>([
            ['BowShopPart', world1],
            ['BowShopPart2', world2],
            ['BowShopPart3', world3],
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
    
    private updateSlingshots(world: IWorldData) {
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

    }

    private updateWorldTeleports() {
        let maxWorld = this._playerController.replica.Data.Profile.Config.MaxWorld
        let worldsUI = this.UIPath.Teleport.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')

        let maxWorldData = WorldsData.get(maxWorld)

        for (let worldIcon of worldsUI.GetChildren()) {
            if (!worldIcon.IsA('ImageLabel')) { continue }
            if (!WorldsData.has(worldIcon.Name as WorldType)) { continue }

            let worldData = WorldsData.get(worldIcon.Name as WorldType)

            if (maxWorldData!.weight < worldData!.weight) { (worldIcon.WaitForChild('Locked') as Frame).Visible = true; continue };
            (worldIcon.WaitForChild('Locked') as Frame).Visible = false
        }

    }

    private updateGradient(parent: GuiObject, gradient: UIGradient) {
        for (let obj of parent.GetDescendants()) {
            if (!obj.FindFirstChildWhichIsA('UIGradient')) { continue }
            print(obj)
            obj.FindFirstChildWhichIsA('UIGradient')!.Destroy()
            gradient.Clone().Parent = obj
        }

        parent.FindFirstChildWhichIsA('UIGradient')!.Destroy()
        gradient.Clone().Parent = parent
    }

    private updateStorePacks() {
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

            if (name === 'Wins') { val = math.max(val, profileData.MaxValues.WinsMaxVal * winsList[index]/100) }
            if (name === 'Accuracy') { val = math.max(val, profileData.MaxValues.StrengthMaxVal * accuracyList[index]/100) }

            label.Text = '+'+GUIUtilities.getSIPrefixSymbol(math.round(val))+' '+name
        }

    }

    private updateStoreLuck() {
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

    }


    public updateStoreGamepasses() {
        let profileData = this._playerController.replica.Data.Profile
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let rightFrame = this.UIPath.RightList.get<FrameComponent>().instance.WaitForChild('Passes') as Frame
        let potionFrame = this.UIPath.Potions.get<FrameComponent>().instance

        let luckFrame = storeFrame.WaitForChild('EggLuckPasses').WaitForChild('Passes')

        let passList = new Map<string, string>([
            ['+100Storage', '100storage'],
            ['+250Storage', '250storage'],
            ['+3PetEquipped', '3equipped'],
            ['+5PetEquipped', '5equipped'],
            ['AutoRebirth', 'autorebirth'],
            ['DoubleAccuracy', 'doubleaccuracy'],
            ['DoubleGems', 'doublegems'],
            ['DoubleStars', 'doublestars'],
            ['DoubleWins', 'doublewins'],
            ['FastHatch', 'fasthatch'],
            ['InstantPower', 'instantpower'],
            ['TripleHatch', '3egghatch'],
            ['TripleWins', 'triplewins'],
            ['VipPass', 'vippass'],
        ])

        let luckList = new Map<string, string>([
            ['Lucky1', 'luck1'],
            ['Lucky2', 'luck2'],
            ['Lucky3', 'luck3'],
        ])

        for (let obj of storeFrame.WaitForChild('Passes').WaitForChild('PassList')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            if (!passList.get(obj.Name)) { continue }
            if (!profileData.Products.includes(passList.get(obj.Name)!)) { continue }

            (obj.WaitForChild('PriceFrame').WaitForChild('Price') as TextLabel).Text = 'Owned!'

            if (obj.Name === 'VipPass') {
                this.UIPath.LeftList.VIP.get<ButtonComponent>().instance.Visible = false
            }
        }

        for (let obj of luckFrame.GetChildren()) {
            if (!obj.IsA('ImageLabel')) { continue }
            if (!luckList.get(obj.Name)) { continue }
            if (!profileData.Products.includes(luckList.get(obj.Name)!)) { continue }

            (obj.WaitForChild('Buy').WaitForChild('Price') as TextLabel).Text = 'Owned!'
        }
        
        if (profileData.Products.includes('bundle')) {
            (storeFrame.WaitForChild('GamepassBundle').WaitForChild('Buy').WaitForChild('Price') as TextLabel).Text = 'Owned!'
        }

        for (let obj of rightFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            if (!passList.get(obj.Name)) { continue }
            if (!profileData.Products.includes(passList.get(obj.Name)!)) { continue }

            obj.Destroy()
        }

        if (profileData.Products.includes('RobloxPremium')) {
            (potionFrame.WaitForChild('PremiumBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        }

        if (profileData.RedeemedCodes.includes('FollowCode')) {
            (potionFrame.WaitForChild('XBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        }

    }

    private updatePotionBoosts() {
        let profileData = this._playerController.replica.Data.Profile
        let potionFrame = this.UIPath.Potions.get<FrameComponent>().instance

        if (profileData.Products.includes('RobloxPremium')) {
            (potionFrame.WaitForChild('PremiumBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        }

        if (profileData.RedeemedCodes.includes('FollowCode')) {
            (potionFrame.WaitForChild('XBoost').WaitForChild('Timer') as TextLabel).Text = '+10%'
        }
    }

    private updateGiftRewards() {
        let world = this._playerController.replica.Data.Profile.Config.MaxWorld
        let gifts = this.UIPath.Gifts.get<ImageComponent>().instance

        for (let obj of gifts.WaitForChild('Rewards')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            if (obj.Name !== world) { obj.Visible = false; continue }
            obj.Visible = true;
        }
    }

    private updatePotions() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
        let potionsBoostsFrame = storeFrame.WaitForChild('Boosts').WaitForChild('BoostList')
        let profileData = this._playerController.replica.Data.Profile

        let potionUIList = new Map<PotionType, string>([
            [PotionType.WinsPotion, '2x Wins'],
            [PotionType.LuckPotion, 'Lucky'],
            [PotionType.GoldPotion, 'Gold'],
            [PotionType.VoidPotion, 'Void']
        ])

        for (let potionInfo of profileData.Potions) {
            if (!potionUIList.get(potionInfo.potion)) { continue }

            let potionImage = potionsBoostsFrame.WaitForChild(potionUIList.get(potionInfo.potion)!) as ImageLabel;
            (potionImage.WaitForChild('Use').WaitForChild('Price') as TextLabel).Text = 'Use ('+GUIUtilities.getSIPrefixSymbol(potionInfo.amount)+')'
        }

    }

    private updatePlayerGiftFrame() {
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
            ['+100Storage', 79],
            ['+250Storage', 179],
            ['+3PetEquipped', 249],
            ['+5PetEquipped', 399],
            ['AutoRebirth', 129],
            ['DoubleAccuracy', 249],
            ['DoubleGems', 349],
            ['DoubleStars', 449],
            ['DoubleWins', 349],
            ['FastHatch', 129],
            ['InstantPower', 799],
            ['TripleHatch', 379],
            ['TripleWins', 649],
            ['VipPass', 449],
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
                    (val.WaitForChild('PriceFrame').WaitForChild('Price') as TextLabel).Text = ''+tostring( passList.get(val.Name)! )
                })


            })
        }

    }

    private updateFollowQuest() {
        let questFrame = this.UIPath.Quest.get<ImageComponent>().instance
        let tasksFrame = questFrame.WaitForChild('Tasks')

        let profileData = this._playerController.replica.Data.Profile
        let sessionData = this._playerController.replica.Data.Session

        for (let obj of tasksFrame.GetChildren()) {
            if (!obj.FindFirstChild('UserId')) { continue }
            print(sessionData.leftToFollow)
            if (sessionData.leftToFollow.includes((obj.WaitForChild('UserId') as IntValue).Value)) {

                (obj.WaitForChild('stroke') as ImageLabel).Size = UDim2.fromScale(0, 1);
                (obj.WaitForChild('Number') as TextLabel).Text = '0/1';

                continue;
            }

            (obj.WaitForChild('stroke') as ImageLabel).Size = UDim2.fromScale(1, 1);
            (obj.WaitForChild('Number') as TextLabel).Text = '1/1';

        }
 
    }

    public updateWheelSpin() {
        let wheel = this.UIPath.WheelSpin.get<ImageComponent>().instance as Instance
        let wheelButton = this.UIPath.RightList.Wheel.get<ImageComponent>().instance as Instance
        let profileData = this._playerController.replica.Data.Profile;

        let timeLeft = profileData.StatValues.LastSpinTime+10-os.time();

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
    }

    public updateDailyChestBillboard() {
        let profileData = this._playerController.replica.Data.Profile;
        let dailyChestPart = Workspace.WaitForChild('InstaReplica').WaitForChild('DailyChest')

        let dailyBillboard = dailyChestPart.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
        let timer = dailyBillboard.WaitForChild('Frame').WaitForChild('Timer') as TextLabel

        let timeLeft = profileData.StatValues.LastDailyChestTime+(24*60*60)-os.time();
        
        timer.Text = GUIUtilities.GuiTimeFormatter(math.max(0, timeLeft));

        if (timeLeft <= 0) { timer.Text = 'CLAIM!' }
    }

    private updateStarterPack() {
        let profileData = this._playerController.replica.Data.Profile
        let currentTime = os.time() - profileData.StatValues.FirstJoin
        let pack = this.UIPath.RightList.Bundles.StarterPack.get<ButtonComponent>().instance

        if ( currentTime < 60 || currentTime > 3600 || profileData.Products.includes('starterpack')) {
            pack.Visible = false
            return
        }

        pack.Visible = true;
        (pack.WaitForChild('Timer') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(profileData.StatValues.FirstJoin+3660-os.time())
    }

    public updateMutations(val: number) {

        let mutationMachine = this.UIPath.MutationMachine.get<ImageComponent>().instance as Instance
        let info = mutationMachine.WaitForChild('MutationInfo') as Frame
        let gemsLabel = info.WaitForChild('Buttons').WaitForChild('Total').WaitForChild('Value') as TextLabel

        gemsLabel.Text = tostring(val)

        let allMutations = [Mutations.Elder, Mutations.Majestic, Mutations.Primordial, Mutations.Sacred]
        let mutations: {weight: number, name: string}[] = []

        for (let name of allMutations) {
            if (name === Mutations.Default) { continue }
            mutations.push({weight: petUpgradeConfig.MutationUpgrades[name].requirements.weight, name: name})
        }

        let maxweight = 0
        mutations.forEach((info, key) => { maxweight += info.weight })

        maxweight = maxweight/((1-0.088)+val*0.088)
        let currentWeight = maxweight

        mutations = mutations.sort((n1, n2) => {
            if (n1.weight < n2.weight) { return true } 
            else { return false }
        })

        print(mutations)

        let newMutations = table.clone(mutations)

        for (let i = 0; i < mutations.size(); i++) {
            if ((currentWeight - mutations[i].weight) <= 0) { newMutations[i].weight = math.max(currentWeight, 0) }
            currentWeight -= mutations[i].weight
        }

        for (let chanceInfo of mutations) {
            let label = (info.WaitForChild('Chance').WaitForChild(chanceInfo.name) as TextLabel)
            label.Text = tostring(math.round(chanceInfo.weight/maxweight*100))+'% '+label.Name
        }

    }

    private updatePotionBuffs() {
        let profileData = this._playerController.replica.Data.Profile

        let potionsFrame = this.UIPath.Potions.get<FrameComponent>().instance
        let potionInfo = potionsFrame.WaitForChild('Templates').WaitForChild('PotionInfo') as Frame

        let template = potionsFrame.WaitForChild('Templates').WaitForChild('Potion') as ImageButton

        let buffList = new Map<string, string>([
            ['LuckPotionBuff', 'rbxassetid://16775664373'],
            ['WinPotionBuff', 'rbxassetid://16775681520'],
            ['GoldPotionBuff', 'rbxassetid://16775706913'],
            ['VoidPotionBuff', 'rbxassetid://16776373393']
        ])

        let boostList = new Map<string, string>([
            ['LuckPotionBuff', 'Luck Boost'],
            ['WinPotionBuff', 'Wins Boost'],
            ['GoldPotionBuff', 'Gold Boost'],
            ['VoidPotionBuff', 'Void Boost'],
        ])

        for (let obj of potionsFrame.GetChildren()) { 
            if (!buffList.get(obj.Name)) { continue }
            obj.Destroy()
        }

        profileData.ActiveBuffs.forEach((value) => {
            print(value.endTime - profileData.StatValues.IngameTime)
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

    private replicateValue(name: string, newvalue: number, oldvalue: number) {
        let statsFrame = this.UIPath.StatsInfo.get<FrameComponent>().instance
        let info = statsFrame.WaitForChild('Templates').WaitForChild(name) as Frame
        
        let accuracyLabel = this.UIPath.UpperList.Accuracy.get<ImageComponent>().instance 
        let starsLabel = this.UIPath.UpperList.Stars.get<ImageComponent>().instance
        let winsLabel = this.UIPath.UpperList.Wins.get<ImageComponent>().instance
        let gemsLabel = this.UIPath.UpperList.Gems.get<ImageComponent>().instance

        if (!info) { return }
        if (oldvalue >= newvalue) { return }

        let clonnedInfo = info.Clone()

        let positionList = new Map<string, {pos: UDim2, label: ImageLabel}>([
            ['AccuracyInfo', {pos: UDim2.fromScale(0.39 , -0.3), label: accuracyLabel}],
            ['GemsInfo', {pos: UDim2.fromScale(0.193, -0.3), label: gemsLabel}],
            ['StarsInfo', {pos: UDim2.fromScale(0.88, -0.3), label: starsLabel}],
            ['WinsInfo', {pos: UDim2.fromScale(0.635, -0.3), label: winsLabel}],
        ])

        let tweenInfo = new TweenInfo(1, Enum.EasingStyle.Quad)
        let tweenInfo2 = new TweenInfo(.4, Enum.EasingStyle.Quad)

        let delta = math.round(newvalue - oldvalue);
        (clonnedInfo.WaitForChild('Value') as TextLabel).Text = '+'+GUIUtilities.getSIPrefixSymbol(delta)

        clonnedInfo.Visible = true
        clonnedInfo.Position = UDim2.fromScale(math.random(0, 100)/100, math.random(0, 100)/100)
        clonnedInfo.Parent = statsFrame

        print(clonnedInfo.Parent, delta, clonnedInfo)

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

    private renderFlyingObjectPosition() {
        print('FIRE IN THE HOLE!!!')
        let effects = ReplicatedStorage.WaitForChild('Effects')

        let accuracyLabel = this.UIPath.UpperList.Accuracy.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let roadFrame = this.UIPath.LowerList.Road.get<ImageComponent>().instance

        let sessionData = this._playerController.replica.Data.Session
        let profileData = this._playerController.replica.Data.Profile

        let oldobj = game.Workspace.WaitForChild('InstaReplica').WaitForChild(sessionData.currentFlyingObject!.partName) as Part
        //Workspace.WaitForChild('_ignoreObjects').WaitForChild(sessionData.currentFlyingObject!.partName) as Part

        let obj = oldobj.Clone()
        obj.Parent = game.Workspace.WaitForChild('InstaReplica') //Workspace.WaitForChild('_ignoreObjects')

        print(oldobj, game.Workspace.WaitForChild('InstaReplica').GetChildren())

        let circles = 0
        let previousPosition = obj.Position

        let world = WorldsData.get(sessionData.currentWorld)!
        let length = world.startingPosition.sub(world.endingPosition).Magnitude
        let power = profileData.Values.StrengthVal

        let lapsText = roadFrame.WaitForChild('You').WaitForChild('Laps')  as TextLabel
        let icon = Players.GetUserThumbnailAsync(this._playerController.component.instance.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size100x100);
        (roadFrame.WaitForChild('You') as ImageLabel).Image = icon[0];
        (roadFrame.WaitForChild('WorldIcon') as ImageLabel).Image = world.worldIcon;
        (roadFrame.WaitForChild('WorldIcon').WaitForChild('Value') as TextLabel).Text = sessionData.currentWorld

        if (profileData.Products.includes('instantpower')) { (roadFrame.WaitForChild('Final').WaitForChild('InstantPower') as ImageButton).Visible = false }

        let pet = PetUtilities.DBToPetTransfer(profileData.Pets[math.random(0, profileData.Pets.size()-1)]!)!
        let model = pet.model.Clone()

        let attachment = world.slingshotPart.Parent!.FindFirstChild('MainAttachment', true) as Attachment
        let tInfo = new TweenInfo(5)

        let oldCFrame = attachment.WorldCFrame

        let flyEffects = new Map<Instance, number>([
            [effects.WaitForChild('RedFly'), 1000],
            [effects.WaitForChild('PurpleFly'), 10000],
            [effects.WaitForChild('BlueFly'), 100000],
            [effects.WaitForChild('GreenFly'), 1000000]
        ])

        lapsText.Visible = false;
        (roadFrame.WaitForChild('You') as ImageLabel).Position = UDim2.fromScale(0, 0.069)

        model.PivotTo(attachment.WorldCFrame.mul(pet.stats.rotationOffset))
        model.Parent = obj

        for (let modelPart of model.GetDescendants()) {
            if (modelPart.IsA('WeldConstraint')) { modelPart.Destroy() }
            if (!modelPart.IsA('BasePart')) { continue }

            modelPart.Anchored = false
            modelPart.CanCollide = false

            if (modelPart === model.PrimaryPart!) { continue }
            let weld = CreationUtilities.WeldConstraint(modelPart, model.PrimaryPart!)
            weld.Parent = weld.Part0
        }

        obj.Anchored = true
        model.PrimaryPart!.Anchored = true
        Workspace.CurrentCamera!.CameraSubject = model.PrimaryPart!

        TweenService.Create(attachment, tInfo, { 'Position': attachment.Position.add(attachment.CFrame.LookVector.mul(-8)) }).Play()
        TweenService.Create(model.PrimaryPart!, tInfo, { 'CFrame': attachment.WorldCFrame.add(attachment.WorldCFrame.LookVector.mul(-8)) }).Play()

        print(obj.AssemblyLinearVelocity.Magnitude, 'Magnitude')

        //task.delay(7, () => { if (obj.Anchored) { obj.Anchored = false } })

        task.wait(6)

        print('Fuck me 1')

        TweenService.Create(attachment, new TweenInfo(.4), { 'WorldCFrame': oldCFrame }).Play()

        //model.PrimaryPart!.Anchored = false
        model.PrimaryPart!.CFrame = obj.CFrame.mul(pet.stats.rotationOffset)

        Workspace.CurrentCamera!.CameraSubject = obj

        let rotationWeld = CreationUtilities.Weld(obj, model.PrimaryPart!)

        while (oldobj.Anchored) { task.wait() }

        model.PrimaryPart!.Anchored = false

        while (obj.AssemblyLinearVelocity.Magnitude < 1 && task.wait()) {
            obj.Anchored = false
            obj.CanCollide = false
            obj.AssemblyLinearVelocity = oldobj.AssemblyLinearVelocity
        }
        
        world = WorldsData.get(sessionData.currentWorld)!
        length = world.startingPosition.sub(world.endingPosition).Magnitude
        

        //let maxEnergy = (obj.WaitForChild('BodyVelocity') as BodyVelocity).Velocity.Magnitude**2/2
        //let currentEnergy = maxEnergy

        //let firstFlyTime = math.abs((obj.WaitForChild('BodyVelocity') as BodyVelocity).Velocity.Y)*2/world.gravity/3
        //let flyTime = firstFlyTime/(1-(world.energyLoss/100))

        //let decrease = power/flyTime

        print('Fuck me 2')

        let currentEffect = effects.WaitForChild('RedFly').Clone() as Part
        currentEffect.CFrame = model.PrimaryPart!.CFrame
        currentEffect.Anchored = false
        currentEffect.CanCollide = false
        currentEffect.Parent = obj

        CreationUtilities.Weld(obj, currentEffect)

        let currentEnergy = obj.AssemblyLinearVelocity.Magnitude**2/2
        if (currentEnergy < flyEffects.get(effects.WaitForChild('RedFly'))!) { currentEffect.Destroy() }

        let speedLines = this.UIPath.SpeedLines.get<FrameComponent>().instance
        let speedLineTemplate = speedLines.WaitForChild('Speedlines') as ImageLabel

        speedLines.GetChildren().forEach((val) => { if (val.Name !== 'Speedlines') { val.Destroy() } }) //make this one for preloading

        print('Fuck me 3')

        /*
        let ids = [
            16955275605,
            16955296593,
            16955301649,
            16955308513,
            16955320770,
            16955328882,
            16955335976,
            16955341726,
        ]
        */

        let ids = [
            17296200977,
            17296202886,
            17296205275,
            17296207072,
            17296208419,
            17296210234
        ]


        let objLines: ImageLabel[] = []

        ids.forEach((val, index) => {
            let objLine = speedLineTemplate.Clone()
            objLine.Image = 'rbxassetid://'+tostring(val)
            objLine.Position = UDim2.fromScale(2,2)
            objLine.Visible = true
            objLine.Name = tostring(index)
            objLine.Parent = speedLines

            objLines.push(objLine)
        })

        print('Fuck me 4')
        
        let lineDelta = 1/30
        let currentFrame = -1

        /*
        let connection = oldobj.GetPropertyChangedSignal('Anchored').Connect(() => {
            obj.Anchored = true
            task.delay(1, () => { if (obj.Anchored) { obj.Anchored = false } })
        })
        */

        let sound = new Instance('Sound')
        sound.SoundId = 'rbxassetid://596046130'
        sound.Parent = game.Workspace
        sound.Play()

        let prevoiusVelocity = oldobj.AssemblyLinearVelocity

        print('Fuck me 5')

        task.spawn(() => {

            let deltacframe = CFrame.Angles(1, 0, 0)
            let start = os.clock()

            print('Fuck me 6', obj.Anchored, this.isFlying, oldobj.Parent)

            print('Fuck you')

            while (this.isFlying && !obj.Anchored && ((obj.AssemblyLinearVelocity.Magnitude > 1) || os.clock() - start < 2)) {
                currentFrame += 1

                //print(obj.Position)
                /*
                if (math.abs(obj.Position.Z - previousPosition.Z) > length/2) { 
                    circles += 1 
                    model.PrimaryPart!.CFrame = obj.CFrame
                }
                */

                let currentLineObject = objLines[currentFrame%objLines.size()]
                prevoiusVelocity = oldobj.AssemblyLinearVelocity

                currentLineObject.Position = UDim2.fromScale(0,0)
                task.wait(lineDelta)
                currentLineObject.Position = UDim2.fromScale(2,2)
    
                let yvelocity = obj.AssemblyLinearVelocity.Y
                obj.AssemblyLinearVelocity = oldobj.AssemblyLinearVelocity.mul(new Vector3(1, 0, 1)).add(new Vector3(0, yvelocity, 0))

                if (obj.Position.Z < world.endingPosition.Z) {
                    //obj.CFrame = new CFrame(world.startingPosition.X, obj.Position.Y, world.startingPosition.Z) 
                    obj.CFrame = oldobj.CFrame
                    circles += 1
                }

                if (obj.Position.Y < world.minY) {  
                    obj.CFrame = new CFrame(obj.Position.X, world.minY, obj.Position.Z)
                    deltacframe = CFrame.Angles(math.random(0, 100)/100, math.random(0, 100)/100, math.random(0, 100)/100)

                    obj.AssemblyLinearVelocity = new Vector3(
                        obj.AssemblyLinearVelocity.X,
                        math.abs(obj.AssemblyLinearVelocity.Y),
                        obj.AssemblyLinearVelocity.Z
                    ).mul(world.energyLoss/100)
                }

                /*
                if ((prevoiusVelocity.Y < 0 && oldobj.AssemblyLinearVelocity.Y > 0)) {  
                    obj.CFrame = new CFrame(oldobj.Position.X, world.minY, oldobj.Position.Z)
                    deltacframe = CFrame.Angles(math.random(0, 100)/100, math.random(0, 100)/100, math.random(0, 100)/100)
                }
                */

                /*
                if (oldobj.AssemblyLinearVelocity.Magnitude < 120) { //(math.abs(oldobj.AssemblyLinearVelocity.Y) < 20) && (math.abs(oldobj.AssemblyLinearVelocity.X) < 20)
                    obj.Anchored = true
                    let goal = new CFrame(oldobj.CFrame.X, world.minY, oldobj.CFrame.Z) 
                    obj.AssemblyLinearVelocity = new Vector3(0,0,0)
                    TweenService.Create(obj, new TweenInfo(1, Enum.EasingStyle.Linear), { 'CFrame': goal }).Play()
                }
                */

                if (circles > 0) { 
                    lapsText.Visible = true
                    lapsText.Text = '🔥 LAPS '+tostring(circles)
                }

                //let velocity = obj.FindFirstChild('BodyVelocity') as BodyVelocity
                //if (!velocity) { continue }
                
                currentEnergy = obj.AssemblyLinearVelocity.Magnitude**2/2

                let perc = math.max(0, (1-obj.Position.sub(world.endingPosition).Magnitude/length))
    
                TweenService.Create(roadFrame.WaitForChild('You') as ImageLabel, new TweenInfo(.1, Enum.EasingStyle.Linear), {'Position': UDim2.fromScale(perc, 0.069)}).Play()
    
                //let dir = model.PrimaryPart!.CFrame.LookVector.Lerp(model.PrimaryPart!.AssemblyLinearVelocity.Unit.mul(new Vector3(0, 1, 1)), 1)
                //let finalcframe = obj.CFrame.mul(pet.stats.rotationOffset) //new CFrame( obj.Position, obj.Position.add(dir))

                //previousPosition = obj.Position
                //TweenService.Create(currentEffect, new TweenInfo(.1, Enum.EasingStyle.Linear), {'CFrame': new CFrame(obj.Position, obj.Position.add(dir))}).Play()
                //TweenService.Create(model.PrimaryPart!, new TweenInfo(.1, Enum.EasingStyle.Linear), {'CFrame': finalcframe}).Play()
                //model.PrimaryPart!.CFrame = 

                rotationWeld.C1 = rotationWeld.C1.mul(deltacframe)
                obj.CFrame = new CFrame(obj.Position.X, obj.Position.Y, obj.Position.Z) 

                if (!currentEffect || !currentEffect.Parent) { continue }
                
                let delta = 10**9
                let selected = effects.WaitForChild('RedFly')

                let effect1 = (currentEffect.WaitForChild('0.1').WaitForChild('ragered1') as ParticleEmitter)
                let effect2 = (currentEffect.WaitForChild('0.1').WaitForChild('ragered') as ParticleEmitter)
 
                flyEffects.forEach((value, instance) => {
                    if ((currentEnergy - value) > delta || (currentEnergy - value) < 0) { return }
                    delta = (currentEnergy - value)
                    selected = instance
                })

                if (currentEnergy < flyEffects.get(effects.WaitForChild('RedFly'))!) { currentEffect.Destroy(); continue }

                effect1.Color = (selected.WaitForChild('0.1').WaitForChild('ragered1') as ParticleEmitter).Color;
                effect2.Color = (selected.WaitForChild('0.1').WaitForChild('ragered') as ParticleEmitter).Color;
                
                //currentLineObject.ImageColor3 = (selected.WaitForChild('0.1').WaitForChild('ragered1') as ParticleEmitter).Color.Keypoints[0].Value;

            }

            obj.AssemblyLinearVelocity = new Vector3(0,0,0)

            //connection.Disconnect()
            obj.Destroy()
            sound.Destroy()
        })

    }

    public setupPetDisable() {
        task.spawn(() => {
            let petsFolder = game.Workspace.WaitForChild('Pets', 60) as Folder

            let terrainFolder = new Instance('Folder')
            terrainFolder.Name = 'DisabledPets'
            terrainFolder.Parent = ReplicatedStorage

            if (!petsFolder) { return }

            petsFolder.ChildAdded.Connect((child) => {
                if (!this.disablePets) { return }
                task.wait(.1)
                child.Parent = terrainFolder
            })
        })
    }

    public setupStoreBuyablePets() {

        let event = this.UIPath.Event.get<ImageComponent>().instance
        let store = this.UIPath.Store.get<ImageComponent>().instance
        let storeFrame = store.WaitForChild('ScrollingFrame') as ScrollingFrame
        let eggs = storeFrame.WaitForChild('ExclusiveEggs')

        let petRarities = ReplicatedStorage.WaitForChild('PetRarities') as Folder;
        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;

        let nightmareList = new Map([
            ['Buy1', 1762894442],
            ['Buy3', 1762894847],
            ['Buy10', 1762894981],
        ])

        let partyList = new Map([
            ['Buy1', 1762895173],
            ['Buy3', 1762895301],
            ['Buy10', 1762895396],
        ])

        let shadowList = new Map([
            ['Buy1', 1763283579],
            ['Buy3', 1763283812],
            ['Buy10', 1763283954],
        ])

        let nightmatePets = new Map([
            ['NightmareBunny', PetsData.get('Nightmare Bunny')],
            ['NightmareCat', PetsData.get('Nightmare Cat')],
            ['NightmareSpirit', PetsData.get('Nightmare Spirit')],
            ['NightmareYeti', PetsData.get('Nightmare Yeti')],
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
        let stats = petOverlay.WaitForChild('Stats')

        for (let obj of event.WaitForChild('ShadowEgg')!.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            ButtonFabric.CreateButton(obj).BindToClick(() => { Events.PurchasePrompt(shadowList.get(obj.Name)!) })
        }

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
            
            print(nightmatePets.get(obj.Name), obj.Name, nightmateChances)
            let pet = nightmatePets.get(obj.Name)!
            let newPet = PetUtilities.DBToPetTransfer(pet)
            let chanceLabel = obj.WaitForChild('TextLabel') as TextLabel

            chanceLabel.Text = tostring(math.round(nightmateChances.get(pet.name)!/nightmateChances.get('Sum')!*100*10)/10)+'%'

            frame.BindToEnter(() => { 
                petOverlay.Visible = true;
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = pet.additional.mutation;
                (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';
    
                (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.mutation) as UIGradient).Color;
                (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;
            })
            frame.BindToLeave(() => { petOverlay.Visible = false });
        }

        for (let obj of eggs.WaitForChild('PartyEgg')!.WaitForChild('Pets')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            let frame = FrameFabric.CreateFrame(obj)

            print(partyPets.get(obj.Name), obj.Name)
            let pet = partyPets.get(obj.Name)!
            let newPet = PetUtilities.DBToPetTransfer(pet)
            let chanceLabel = obj.WaitForChild('TextLabel') as TextLabel

            chanceLabel.Text = tostring(math.round(partyChances.get(pet.name)!/partyChances.get('Sum')!*100*10)/10)+'%'

            frame.BindToEnter(() => { 
                petOverlay.Visible = true;
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = pet.additional.mutation;
                (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';
    
                (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.mutation) as UIGradient).Color;
                (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;
            })
            frame.BindToLeave(() => { petOverlay.Visible = false });
        }

        for (let obj of event.WaitForChild('ShadowEgg')!.WaitForChild('Pets')!.GetChildren()) {
            if (!obj.IsA('Frame')) { continue }
            let frame = FrameFabric.CreateFrame(obj)

            print(shadowPets.get(obj.Name), obj.Name)
            let pet = shadowPets.get(obj.Name)!
            let newPet = PetUtilities.DBToPetTransfer(pet)
            let chanceLabel = obj.WaitForChild('TextLabel') as TextLabel

            chanceLabel.Text = tostring(math.round(shadowChances.get(pet.name)!/shadowChances.get('Sum')!*100*10)/10)+'%'

            frame.BindToEnter(() => { 
                petOverlay.Visible = true;
    
                (petOverlay.WaitForChild('PetName') as TextLabel).Text = pet.name;
                (stats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = pet.additional.mutation;
                (stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = pet.additional.size;
                (stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = pet.additional.evolution;
                (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(newPet!.multipliers.get('strength')!)+'x';
    
                (stats.WaitForChild('Mutation').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.mutation) as UIGradient).Color;
                (stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.size) as UIGradient).Color;
                (stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(newPet!.additional.evolution) as UIGradient).Color;

            })
            frame.BindToLeave(() => { petOverlay.Visible = false });
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
                task.wait(10*60)
                tries += 1
                result = LuaUtilFunctions.checkFavorite()
            }

            Events.ReplicateValues.fire(ReplicationOperationStatus.Favorite, true)
        })

    }

    onInit() {
        print('Waiting')
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }
        print('Loading GUI')

        //GUIUtilities.InitializeGuiTimer(testing, 10)
        //GUIUtilities.InitializeGuiWheel(testing, 10, 5)

        //let currentlyShooting: Part | undefined = undefined

        this.setupAutoTrain()
        this.setupAutoShoot()

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

        this.UIPath.MutationMachine.get<ImageComponent>().BindToOpen((obj) => {
            this.setupMutationGui()
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
        })

        this.UIPath.CleanseMachine.get<ImageComponent>().BindToClose((obj) => {
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5*3), size: obj.Size })
        })

        this.UIPath.CleanseMachine.get<ImageComponent>().BindToOpen((obj) => {
            this.setupCleanseGui()
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
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

        this.UIPath.GoldMachine.get<ImageComponent>().BindToOpen((obj) => {
            this.setupGoldenGui()
            UIAnimations.MainFrameAnimationOpen(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
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

        this.UIPath.Gifts.UnlockAll.get<ButtonComponent>().BindToClick(() => {
            Events.PurchasePrompt.fire(1762896804)
        })

        this.UIPath.LowerList.Road.Final.InstantPower.get<ButtonComponent>().BindToClick(() => {
            Events.PurchasePrompt.fire(722529168)
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


        this.UIPath.StarterPack.Buy.get<ButtonComponent>().BindToClick(() => {
            Events.PurchasePrompt.fire(1779438971)
        })

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

        let enableNotifications = this.UIPath.Settings.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('Notify').WaitForChild('Enable') as GuiButton
        let disableNotifications = enableNotifications.WaitForChild('Disable') as GuiButton

        ButtonFabric.CreateButton(enableNotifications).BindToClick(() => {
            PlayerController.enabledNotifications = true
            disableNotifications.Visible = true
        })

        ButtonFabric.CreateButton(disableNotifications).BindToClick(() => {
            PlayerController.enabledNotifications = false
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
        
        this.currentMutationGems.AddCallback((val) => {
            this.updateMutations(val)
        })

        let instaReplica = game.Workspace.WaitForChild('InstaReplica')

        let goldCircle = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('Gold Machine Circle') as Part)

        goldCircle.radius = 10

        goldCircle.BindToEnter(() => { this.UIPath.GoldMachine.get<ImageComponent>().Open() })
        goldCircle.BindToLeave(() => { this.UIPath.GoldMachine.get<ImageComponent>().Close() })

        let slingshotStore = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('BowShopPart') as Part)

        slingshotStore.radius = 5

        slingshotStore.BindToEnter(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Open() })
        slingshotStore.BindToLeave(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Close() })

        
        let slingshotStore2 = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('BowShopPart2') as Part)

        slingshotStore2.radius = 5

        slingshotStore2.BindToEnter(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Open() })
        slingshotStore2.BindToLeave(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Close() })

                
        let slingshotStore3 = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('BowShopPart3') as Part)

        slingshotStore3.radius = 5

        slingshotStore3.BindToEnter(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Open() })
        slingshotStore3.BindToLeave(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Close() })

        let voidPart = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('VoidPart') as Part)

        voidPart.radius = 5

        voidPart.BindToEnter(() => { this.UIPath.VoidMachine.get<ImageComponent>().Open() }) 
        voidPart.BindToLeave(() => { this.UIPath.VoidMachine.get<ImageComponent>().Close() }) 

        let mutationPart = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('MutationPart') as Part)

        mutationPart.radius = 5

        mutationPart.BindToEnter(() => { this.UIPath.MutationMachine.get<ImageComponent>().Open() }) 
        mutationPart.BindToLeave(() => { this.UIPath.MutationMachine.get<ImageComponent>().Close() }) 

        let cleansePart = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('CleansePart') as Part)

        cleansePart.radius = 5

        cleansePart.BindToEnter(() => { this.UIPath.CleanseMachine.get<ImageComponent>().Open() }) 
        cleansePart.BindToLeave(() => { this.UIPath.CleanseMachine.get<ImageComponent>().Close() }) 

        let petIndex = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('PetIndexPart') as Part)

        petIndex.radius = 5

        petIndex.BindToEnter(() => { this.UIPath.Index.get<ImageComponent>().Open() }) 
        petIndex.BindToLeave(() => { this.UIPath.Index.get<ImageComponent>().Close() }) 

        let petQuestPart = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('PetQuest') as Part)

        petQuestPart.radius = 5

        petQuestPart.BindToEnter(() => { this.UIPath.Quest.get<ImageComponent>().Open() }) 
        petQuestPart.BindToLeave(() => { this.UIPath.Quest.get<ImageComponent>().Close() }) 

        let limitedPetsPart = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('LimitedPets') as Part)

        limitedPetsPart.radius = 5

        limitedPetsPart.BindToEnter(() => { 
            let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame
            let offset = storeFrame.AbsoluteCanvasSize.X - storeFrame.AbsoluteWindowSize.X
    
            this.UIPath.Store.get<ImageComponent>().Open() 
            TweenService.Create(storeFrame, new TweenInfo(.3), { CanvasPosition: new Vector2((2250/5051)*offset, 0) }).Play()
        }) 
        limitedPetsPart.BindToLeave(() => { this.UIPath.Store.get<ImageComponent>().Close() }) 

        let dailyChest = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('DailyChest') as Part)
        dailyChest.radius = 5
        dailyChest.BindToEnter(() => { Events.ClaimReward(RewardType.DailyChest, 'nil') }) 

        let dailyChestBoard = BillboardFabric.CreateBillboard(dailyChest.instance.WaitForChild('Attachment1').WaitForChild('DailyUI') as BillboardGui)
        dailyChestBoard.radius = 7
        /*
        ButtonFabric.CreateButton(dailyChestBoard.instance.WaitForChild('Claim') as TextButton).BindToClick(() => {
            Events.ClaimReward(RewardType.DailyChest, 'nil')
        })
        */

        let groupChest = GroupPopUpFabric.CreateGroupPopUp(instaReplica.WaitForChild('GroupChest') as Part)
        groupChest.radius = 5
        groupChest.BindToEnter(() => { Events.ClaimReward(RewardType.GroupChest, 'nil') }) 

        let groupChestBoard = BillboardFabric.CreateBillboard(groupChest.instance.WaitForChild('Attachment').WaitForChild('GroupUI') as BillboardGui)
        groupChestBoard.radius = 7
        /*
        ButtonFabric.CreateButton(groupChestBoard.instance.WaitForChild('Claim') as TextButton).BindToClick(() => {
            Events.ClaimReward(RewardType.GroupChest, 'nil')
        })
        */

        this.selectedGoldenSize.AddCallback((val) => {
            (this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.get<FrameComponent>().instance.WaitForChild('Percent') as TextLabel).Text = tostring(val*20)+'%'
        })

        let inviteButton = ButtonFabric.CreateButton(this.UIPath.Invite.get<ImageComponent>().instance.WaitForChild('ScrollingFrame').WaitForChild('Main').WaitForChild('Button') as GuiButton) 
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let inviteFrame = this.UIPath.Invite.get<ImageComponent>().instance.WaitForChild('ScrollingFrame')
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        //print(CreationUtilities.getSIPrefixSymbol(1550), 'TestNumber')
        //print(CreationUtilities.getSIPrefixSymbol(1230000), 'TestNumber')
        print(GUIUtilities.getSIPrefixSymbol(10667865604675647), 'TestNumber')

        ButtonFabric.CreateButton(inviteFrame.WaitForChild('Main').WaitForChild('Button') as GuiButton).BindToClick(() => {
            //roblox invite later on
        })

        inviteButton.BindToClick(() => { pcall(() => { SocialService.PromptGameInvite(this._playerController.component.instance) }) })

        this.UIPath.WheelSpin.Spin2.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.SpinWheel, 'nil')
        })

        this.UIPath.WheelSpin.SpinButton.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.SpinWheel, 'nil')
        })

        this.UIPath.WheelSpin.Buy1.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1762896093) })
        this.UIPath.WheelSpin.Buy10.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1762896251) })
        this.UIPath.WheelSpin.Buy100.get<ButtonComponent>().BindToClick(() => { Events.PurchasePrompt.fire(1762896353) })

        this.UIPath.RightList.Bundles.StarterPack.get<ButtonComponent>().BindToClick(() => { this.UIPath.StarterPack.get<ImageComponent>().Open() })

        this.UIPath.MutationMachine.MutationInfo.Buttons.Plus.get<ButtonComponent>().BindToClick((obj) => {
            this.currentMutationGems.set(math.clamp(this.currentMutationGems.get()+1, 1, 15))
        })

        this.UIPath.MutationMachine.MutationInfo.Buttons.Minus.get<ButtonComponent>().BindToClick((obj) => {
            this.currentMutationGems.set(math.clamp(this.currentMutationGems.get()-1, 1, 15))
        })
        
        this.UIPath.MutationMachine.MutationInfo.Enchant.get<ButtonComponent>().BindToClick((obj) => {
            if (!this.selectedMutationPet) { return }
            Events.ManagePet.fire(PetOperationStatus.Mutate, this.selectedMutationPet, this.currentMutationGems.get())
        })

        this.UIPath.CleanseMachine.CleanseInfo.Cleanse.get<ButtonComponent>().BindToClick((obj) => {
            if (!this.selectedCleansePet) { return }
            Events.ManagePet.fire(PetOperationStatus.RemoveMutation, this.selectedCleansePet)
        })

        this.UIPath.VoidMachine.CraftInfo.Button.get<ButtonComponent>().BindToClick((obj) => {
            if (!this.selectedVoidPet) { return }
            if (this.currentVoidTime > 0) {
                Events.ManagePet.fire(PetOperationStatus.SkipVoid, this.selectedVoidPet);
                return
            }
            if (this.isPetInVoidMachine) {
                Events.ManagePet.fire(PetOperationStatus.ClaimVoid, this.selectedVoidPet);
                return
            }
            Events.ManagePet.fire(PetOperationStatus.Evolve, this.selectedVoidPet)
        })

        this.UIPath.GoldMachine.GoldenInfo.GoldenHolder.Make.get<ButtonComponent>().BindToClick((obj) => {
            if (!this.selectedGoldenPet) { return }
            Events.ManagePet.fire(PetOperationStatus.Evolve, this.selectedGoldenPet, this.selectedGoldenSize.get())
        })

        this.UIPath.PetInventory.PetInfo.Equip.get<ButtonComponent>().BindToClick(() => {
            if (!this.selectedPet) { return }
            Events.ManagePet(this.selectedPetStatus, this.selectedPet)
        })

        this.UIPath.PetInventory.PetInfo.Lock.get<ButtonComponent>().BindToClick(() => {
            if (!this.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.Lock, this.selectedPet)
            //this.selectedPet.locked = !this.selectedPet.locked
        })

        this.UIPath.PetInventory.PetInfo.Delete.get<ButtonComponent>().BindToClick(() => {
            if (!this.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.Delete, this.selectedPet)
        })

        this.UIPath.PetInventory.PetInfo.CraftFrame.Craft.get<ButtonComponent>().BindToClick(() => {
            if (!this.selectedPet) { return }
            Events.ManagePet(PetOperationStatus.CraftSize, this.selectedPet)
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

        this.UIPath.Event.Claim.get<ButtonComponent>().BindToClick(() => {
            Events.BuyEgg('Shadow', EggBuyType.Single)
        })

        this.UIPath.LeftList.VIP.get<ButtonComponent>().BindToClick(() => {
           Events.PurchasePrompt.fire(722092789)
        })

        ButtonFabric.CreateButton(this.UIPath.Quest.get<ButtonComponent>().instance.WaitForChild('Reward').WaitForChild('Claim') as GuiButton).BindToClick(() => {
            Events.ClaimReward.fire(RewardType.FollowQuest, 'nil')
        })

        let trainObject = this.UIPath.RightList.AutoTrain.get<ButtonComponent>().instance
        let shootObject = this.UIPath.RightList.AutoShoot.get<ButtonComponent>().instance
        let rebirthObject = this.UIPath.Rebirth.AutoRebirth.get<ButtonComponent>().instance

        this.UIPath.RightList.AutoTrain.get<ButtonComponent>().BindToClick(() => {
            this.autoTrain = !this.autoTrain
            if (this.autoTrain) {
                this.updateGradient(trainObject, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                this.updateGradient(trainObject, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.RightList.AutoShoot.get<ButtonComponent>().BindToClick(() => {
            this.autoShoot = !this.autoShoot
            if (this.autoShoot) {
                this.updateGradient(shootObject, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                this.updateGradient(shootObject, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.Rebirth.AutoRebirth.get<ButtonComponent>().BindToClick((arg) => {
            if (!this._playerController.replica.Data.Profile.Products.includes('autorebirth')) { Events.PurchasePrompt.fire(733950750); return }
            this.autoRebirth = !this.autoRebirth
            if (this.autoRebirth) {
                //(arg.WaitForChild('AutoRebirthOff') as ImageButton).Visible = true
                this.updateGradient(rebirthObject, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                //(arg.WaitForChild('AutoRebirthOff') as ImageButton).Visible = false
                this.updateGradient(rebirthObject, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.Rebirth.Skip.get<ButtonComponent>().BindToClick((obj) => {
            let rebirthList = [ 1762897969, 1762898131, 1762898290, 1762898515 ]
            let skips = this._playerController.replica.Data.Profile.StatValues.RebirthSkips

            if (skips >= rebirthList.size()) { Events.PurchasePrompt.fire(1762898792); return }
            Events.PurchasePrompt.fire(rebirthList[skips])
        })

        this.UIPath.Rebirth.RebirthButton.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Rebirth, 'nil')
        })

        this.UIPath.Codes.Redeem.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Code, (this.UIPath.Codes.get<ImageComponent>().instance.WaitForChild('Code').WaitForChild('Value') as TextBox).Text)
        })

        this.UIPath.Follow.Redeem.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.FollowCode, (this.UIPath.Follow.get<ImageComponent>().instance.WaitForChild('Username').WaitForChild('Value') as TextBox).Text)
        })

        this._playerController.replica.ListenToChange('Profile.Pets', (newValue, oldValue) => {
            //let pets: IPetData[] = []
            //newValue.forEach((val) => { pets.push(PetUtilities.DBToPetTransfer(val)!) })

            this.Pets = newValue

            
            this.Pets.sort((a, b) => {
                let vala = PetUtilities.DBToPetTransfer(a)!
                let valb = PetUtilities.DBToPetTransfer(b)!

                return vala.multipliers!.get('strength')! < valb.multipliers!.get('strength')!
            })
            
    

            let appendValues: IDBPetData[] = []
            let removeValues: IDBPetData[] = []
            let updateValues: IDBPetData[] = []

            if (newValue.size() !== oldValue.size()) {
                newValue.forEach((value, index) => {
                    let pass = false
                    this.petInventory.forEach((oldval) => { if (value.id === oldval.id) { pass = true } })
                    if (!pass) { appendValues.push(value) }
                })
                
                this.petInventory.forEach((value, index) => {
                    let pass = false
                    newValue.forEach((newval) => { if (newval.id && (value.id === newval.id)) { print(value.id, newval.id); pass = true } })
                    if (!pass) { removeValues.push(value) }
                })
            }

            newValue.forEach((value, index) => {
                let pass = false
                this.petInventory.forEach((oldval) => {if (Functions.compareObjects(value, oldval)) { pass = true } })
                if (!pass) { updateValues.push(value) }
            })

            let test: string[] = []
            newValue.forEach((newval) => { if (test.includes(newval.id!)) { print(newval) } else { test.push(newval.id!) }})

            print(updateValues, appendValues, removeValues, oldValue, newValue, this.petInventory)

            if (this.selectedPet) {
                newValue.forEach((value, index) => {if (value.id === this.selectedPet!.id) { print(this.selectedPet, value)} })
            }

            if (updateValues.size() > 0) { this.updatePetInventory(updateValues) }
            if (appendValues.size() > 0) { this.appendPetInventory(appendValues) }
            if (removeValues.size() > 0) { this.removePetInventory(removeValues) }
            
            appendValues.clear()
            removeValues.clear()
            updateValues.clear()

            print('PetsChanged')
            let newEquippedPets = this.getEquippedPets(this.Pets)
            this.EquippedPets = newEquippedPets

            this.updatePets()

            if (this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance.Visible) {
                

                /*
                if (newEquippedPets.size() > this.EquippedPets.size()) {
                    this.selectedPetStatus = PetOperationStatus.Unequip
                    if (this.selectedPet) { this.selectedPet.equipped = true }
                    PlayEffect('EquipSound')
                }
    
                if (this.EquippedPets.size() > newEquippedPets.size()) {
                    this.selectedPetStatus = PetOperationStatus.Equip
                    if (this.selectedPet) { this.selectedPet.equipped = false }
                    PlayEffect('EquipSound')
                }
                */
    
                
                //
                print(this.selectedUIObject, this.selectedPet)
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

            if (goldCircle.enabled) { this.setupGoldenGui() }
            if (voidPart.enabled) { this.setupVoidPets() }
            if (mutationPart.enabled) { this.setupMutationGui() }

        })

        let accuracyLabel = this.UIPath.UpperList.Accuracy.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let starsLabel = this.UIPath.UpperList.Stars.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let winsLabel = this.UIPath.UpperList.Wins.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let gemsLabel = this.UIPath.UpperList.Gems.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel

        this._playerController.replica.ListenToChange('Profile.VoidMachine', (newValue, oldValue) => {
            this.setupVoidPets()
        })

        this._playerController.replica.ListenToChange('Profile.Values.StrengthVal', (newValue, oldValue) => {
            task.delay(1, () => { accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue) } ) 
            this.updateStoreBillboards()
            this.replicateValue('AccuracyInfo', newValue, oldValue)
            PlayEffect('EarnSound')
        })

        this._playerController.replica.ListenToChange('Profile.Values.RebirthsVal', (newValue, oldValue) => {
            this.updateRebirth()
        })

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

        this._playerController.replica.ListenToChange('Profile.Values.GemsVal', (newValue, oldValue) => {
            let val = GUIUtilities.getSIPrefixSymbol(newValue)
            task.delay(1, () => { gemsLabel.Text = val } );
            (this.UIPath.MutationMachine.get<ImageComponent>().instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = val;
            (this.UIPath.CleanseMachine.get<ImageComponent>().instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = val;
            this.replicateValue('GemsInfo', newValue, oldValue)
            PlayEffect('EarnSound')
            this.updateRebirth()
        })

        this._playerController.replica.ListenToChange('Profile.Config.MaxWorld', (newValue, oldValue) => {
            this.updateWorldTeleports()
            this.updateStorePacks()
            this.updateGiftRewards()
            this.setupPacks()

            this.worldPurchaseTime = os.time()
        })

        this._playerController.replica.ListenToChange('Session.currentWorld', (newValue, oldValue) => {
            let world = WorldsData.get(newValue)
            if (!world) { return }
            this.updateSlingshots(world)
            this.updateStoreBillboards()
        })

        this._playerController.replica.ListenToChange('Profile.EquippedTool', (newValue) => {
            this.equippedTool = newValue
            this.updateSlingshots(WorldsData.get(replicaData.Session.currentWorld)!)
            this.updateLowerFrame()
        })

        this._playerController.replica.ListenToChange('Profile.OwnedTools', (newValue) => {
            this.ownedTools = newValue
            this.updateSlingshots(WorldsData.get(replicaData.Session.currentWorld)!)
            this.updateStoreBillboards()
        })

        this._playerController.replica.ListenToChange('Profile.CompletedQuests', (newValue) => {

        })

        this._playerController.replica.ListenToChange('Profile.CurrentQuestsProgress', (newValue) => {
            this.updateQuestsProgress(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.StoredEggs', (newValue) => {
            this.updateQuestsProgress(this._playerController.replica.Data.Profile.CurrentQuestsProgress)
        })

        this._playerController.replica.ListenToChange('Profile.PetIndex', (newValue) => {
            this.setupPetIndex()
        })

        this._playerController.replica.ListenToChange('Session.sessionTime', (newValue) => {
            this.giftsReady = 0
            print(this.giftsReady)
            this.currentGiftTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.StatValues.DayAmount', (newValue) => {
            this.currentDailyTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Products', (newValue) => {
            this.updateStoreLuck()
            this.setupPacks()
            this.updateStoreGamepasses()
            this.updatePotionBoosts()
        })

        this._playerController.replica.ListenToChange('Profile.RedeemedCodes', (newValue) => {
            this.updatePotions()
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

        this._playerController.replica.ListenToChange('Profile.StatValues.FriendsCount', (newValue) => {
            this.updateFriendQuestProgress()
        })

        this._playerController.replica.ListenToChange('Session.leftToFollow', () => {
            this.updateFollowQuest()
        })

        this._playerController.replica.ListenToChange('Profile.ActiveBuffs', () => {
            this.updatePotionBuffs()
        })

        this._playerController.replica.ListenToChange('Session.currentFlyingObject', (newValue) => {
            print(newValue, 'Firing')
            if (newValue) {
                camera.CameraType = Enum.CameraType.Custom
                //camera.CameraSubject = Workspace.WaitForChild('_ignoreObjects').WaitForChild(newValue.partName) as BasePart

                PlayEffect('ChangeUseStatus', new Map([['bool', false]]))

                this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible = false
                this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible = true

                print('this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible', this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible)
                print('this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible', this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible)

                this.isFlying = true
                this.renderFlyingObjectPosition()

                return 
            }

            camera.CameraType = Enum.CameraType.Custom
            camera.CameraSubject = this._playerController.component.instance.Character?.WaitForChild('Humanoid') as Humanoid

            this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible = true
            this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible = false

            PlayEffect('ChangeUseStatus', new Map([['bool', true]]))

            print('this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible', this.UIPath.LowerList.Item.get<ButtonComponent>().instance.Visible)
            print('this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible', this.UIPath.LowerList.Road.get<ImageComponent>().instance.Visible)

            accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol(this._playerController.replica.Data.Profile.Values.StrengthVal)

            this.isFlying = false
        })

        accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StrengthVal )
        starsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StarsVal )
        winsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.WinsVal )
        gemsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.GemsVal );

        (this.UIPath.MutationMachine.get<ImageComponent>().instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = gemsLabel.Text;
        (this.UIPath.CleanseMachine.get<ImageComponent>().instance.WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = gemsLabel.Text;

        //let pets: IPetData[] = []
        //replicaData.Profile.Pets.forEach((val) => { pets.push(PetUtilities.DBToPetTransfer(val)!) })

        this.Pets = replicaData.Profile.Pets
        this.EquippedPets = this.getEquippedPets(this.Pets)

        this.Pets.sort((a, b) => {
            let vala = PetUtilities.DBToPetTransfer(a)!
            let valb = PetUtilities.DBToPetTransfer(b)!

            return vala.multipliers!.get('strength')! < valb.multipliers!.get('strength')!
        })

        this.equippedTool = replicaData.Profile.EquippedTool
        this.ownedTools = replicaData.Profile.OwnedTools

        this.setupSlingshots()
        this.setupVoidPets()
        this.setupPetIndex()
        this.setupGifts()
        this.setupDaily()
        this.setupPets()
        this.setupBigSlingshots()
        this.setupDonations()
        this.setupWorldTeleports()
        this.setupStoreUpperButtons()
        this.setupStorePotions()
        this.setupStoreGamepasses()
        this.setupPacks()
        this.setupInventoryButtons()
        this.setupMassDelete()
        this.setupLimitedPets()
        this.setupPetOverlay()
        this.setupPotionInfo()
        this.setupPetDisable()
        this.setupMassLock()
        this.setupStoreBuyablePets()
        this.setupFavorites()
        this.setupPetBackpackPasses()

        this.updateGiftRewards()
        this.updateStoreLuck()
        this.updateRebirth()
        this.updatePotions()
        this.updatePlayerGiftFrame()
        this.updateWorldTeleports()
        this.updateStorePacks()
        this.updatePets()
        this.updateFriendQuestProgress()
        this.updateFollowQuest()
        this.updateMutations(1)
        this.updateWheelSpin()
        this.updateStoreBillboards()
        this.updateStoreGamepasses()
        this.updateLowerFrame()
        this.updatePotionBuffs()

        let voidMachine: Instance = this.UIPath.VoidMachine.get<ImageComponent>().instance;
        (game.Workspace.WaitForChild('GameMusic') as Sound).Play()

        let replica = this._playerController.replica

        this.autoShoot = replica.Data.Profile.StatValues.WasShooting
        this.autoTrain = replica.Data.Profile.StatValues.WasTraining
        this.autoRebirth = replica.Data.Profile.StatValues.WasRebirthing

        this.UIPath.UpdateLog.get<ImageComponent>().Open()

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
                this.updateStarterPack()
                this.updatePotionBuffs()
                this.updateStorePacks()

                this.currentDailyTime.set(this._playerController.replica.Data.Profile.StatValues.DayAmount)

                if (replica.Data.Session.currentWorld === replica.Data.Profile.Config.MaxWorld && os.time() - this.worldPurchaseTime < 5*60) {
                    this.openCurrentPack()
                    this.worldPurchaseTime = 0
                }

                if (replica.Data.Session.currentWorld === WorldType.Space) { 
                    TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 23}).Play() 
                }

                if (replica.Data.Session.currentWorld !== WorldType.Space) { 
                    TweenService.Create(Lighting, new TweenInfo(.2), {'ClockTime': 13}).Play()
                }
                
                if (prevAutoShoot !== this.autoShoot) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoShoot, this.autoShoot) }
                if (prevAutoTrain !== this.autoTrain) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoTrain, this.autoTrain) }
                if (prevAutoRebirth !== this.autoRebirth) { Events.ReplicateValues.fire(ReplicationOperationStatus.AutoRebirth, this.autoRebirth) }

                prevAutoShoot = this.autoShoot
                prevAutoTrain = this.autoTrain
                prevAutoRebirth = this.autoRebirth

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

                if ((os.time() - PlayerController.lastClick) > 15*60) { TeleportService.Teleport(game.PlaceId, this._playerController.component.instance) }

                //PlayEffect('Notify', new Map([['Message', 'Im gay']]))

                if (os.time()%10 === 0) {
                    let label = this.UIPath.LeftList.Store.get<ImageComponent>().instance.WaitForChild('ImageLabel') as ImageLabel
                    let tinfo = new TweenInfo(.3)

                    TweenService.Create(label, tinfo, { 'Rotation': 20 }).Play()
                    task.delay(tinfo.Time, () => { TweenService.Create(label, tinfo, { 'Rotation': -20 }).Play() })
                    task.delay(tinfo.Time*2, () => { TweenService.Create(label, tinfo, { 'Rotation': 0 }).Play() })
                }

                let voidTime = (this.stopVoidTime - this.startVoidTime)*this._playerController.replica.Data.Profile.Multipliers.VoidMachineMul
                let currentVoidTime = this.startVoidTime+voidTime-os.time();

                this.currentVoidTime = currentVoidTime;

                if (!this.isPetInVoidMachine) {
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time);
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Craft To Void';
                    continue
                }
                
                (voidMachine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = GUIUtilities.GuiTimeFormatter(currentVoidTime);

                if (currentVoidTime <= 0) {
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Collect';
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = 'Done';
                }
                if (currentVoidTime > 1) {
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Skip';
                }

            }

        })
        
    }

    onStart() {
        
    }
}