
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { PlayerController } from "./PlayerController";
import { Players, Workspace, RunService, SocialService, TweenService } from "@rbxts/services";
import { FrameComponent, FrameFabric } from "../components/UIComponents/FrameComponent";
import { ButtonComponent, ButtonFabric } from "../components/UIComponents/ButtonComponent";
import { Binding } from "client/classes/BindbingValues";
import { IButton, IGUIData, IMenu, IShop } from "shared/interfaces/GUIData";
import { UIAnimations } from "shared/utility/UIAnimations";
import { ComponentsInitializer } from "client/classes/ComponentsInitializer";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { SurfaceComponent, SurfaceFabric } from "client/components/UIComponents/SurfaceComponent";
import { Evolutions, IDBPetData, IPetData, Mutations, PetOperationStatus, Sizes } from "shared/interfaces/PetData";
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
            {name: 'Close', objComponent: 'Button'}
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
            {name: 'PetsFrame', objComponent: 'Frame'}
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
            {name: 'Close', objComponent: 'Button'}
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
    ]


@Controller({})
export class UIController implements OnStart, OnInit {

    private _playerController: PlayerController
    private UIPath = ComponentsInitializer.InitializeObject(mainUIInterface, mainUI)

    private Pets: IDBPetData[] = []
    private EquippedPets: IDBPetData[] = []
    
    private selectedUIObject?: GuiObject
    private selectedPet?: IDBPetData
    private selectedPetStatus: PetOperationStatus = PetOperationStatus.Equip
    private giftingToUserId?: number

    private autoTrain: boolean = false
    private autoShoot: boolean = false
    private autoRebirth: boolean = false

    private selectedGoldenPet?: IDBPetData
    private selectedGoldenUIObjects: GuiObject[] = []
    private selectedGoldenSize = new Binding<number>(0)

    private selectedVoidPet?: IDBPetData
    private selectedVoidUIObject?: GuiObject
    private startVoidTime: number = 0
    private stopVoidTime: number = 0
    private currentVoidTime = new Binding<number>(0)
    private isPetInVoidMachine = false
    private isFlying = false

    private selectedMutationPet?: IDBPetData
    private selectedMutationUIObject?: GuiObject
    private currentMutationGems = new Binding<number>(1)

    private selectedCleansePet?: IDBPetData
    private selectedCleanseUIObject?: GuiObject

    private currentGiftTime = new Binding<number>(0)
    private currentDailyTime = new Binding<number>(0)

    private ownedTools: string[] = []
    private equippedTool?: string

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    private clearPets(parent: Instance, filter?: keyof Instances) {
        let currentFilter = 'GuiButton'
        if (filter) { currentFilter = filter }

        for (let obj of parent.GetChildren()) {
            if (!obj.IsA(currentFilter as keyof Instances)) continue
            obj.Destroy()
        }
    }

    private createPetExamples(parent: Instance, callback: (pet: IDBPetData, obj: GuiButton) => void) {

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        for (let pet of this.Pets) {

            if (parent.Parent!.Parent!.Name === 'GoldenInfo' && (pet.additional.evolution !== Evolutions.Normal || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'VoidMachine' && (pet.additional.evolution !== Evolutions.Gold || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'MutationMachine' && (pet.additional.mutation !== Mutations.Default || pet.locked)) { continue }
            if (parent.Parent!.Parent!.Name === 'CleanseMachine' && (pet.additional.mutation === Mutations.Default || pet.locked)) { continue }

            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = parent
            obj.Visible = true;
    
            (obj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (obj.WaitForChild('Equip') as TextLabel).Visible = pet.equipped;
            (obj.WaitForChild('Lock') as ImageLabel).Visible = pet.locked;
    
            let button = ButtonFabric.CreateButton(obj)
            button.BindToClick(() => { callback(pet, obj) })
        }

    }

    private updatePets() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        this.clearPets(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        
        let equipAmount = petInventory.WaitForChild('Backpack').WaitForChild('AmountInfo').WaitForChild('Equip').WaitForChild('Amount')! as TextLabel
        let backpackAmount = equipAmount.Parent!.Parent!.WaitForChild('Backpack').WaitForChild('Amount')! as TextLabel

        equipAmount.Text = tostring(this.EquippedPets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxEquippedPets)
        backpackAmount.Text = tostring(this.Pets.size())+'/'+tostring(this._playerController.replica.Data.Profile.Config.MaxPets)

        this.createPetExamples(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, object) => { this.displayPet(pet, object) })
    }

    private displayPet(pet: IDBPetData, object?: GuiObject) {
        if (!pet) { return }

        if (object && this.selectedUIObject && this.selectedUIObject === object) {
            this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Close()
            this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Close()

            object = undefined
        }

        if (object && this.selectedUIObject !== object) {
            this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().Open()
            this.UIPath.PetInventory.PetInfo.get<FrameComponent>().Open()
        }

        this.selectedPet = pet
        this.selectedUIObject = object

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        let petInfo = petInventory.WaitForChild('PetInfo')! as Frame
        
        let formattedPet = PetUtilities.DBToPetTransfer(pet);
        if (!formattedPet) { return }

        let mainStats = petInfo.WaitForChild('Stats').WaitForChild('Main') as Frame;

        (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = false;
        (petInfo.WaitForChild('Stats').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(formattedPet.multipliers.get('strength') || 1)+'x Boost';
        (petInfo.WaitForChild('PetName') as TextLabel).Text = formattedPet.name;
        (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Equip';
        (mainStats.WaitForChild('Mutation').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.mutation;
        (mainStats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.evolution;
        (mainStats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.size;

        this.selectedPetStatus = PetOperationStatus.Equip

        if (this.selectedPet.equipped) {
            (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Unequip'
            this.selectedPetStatus = PetOperationStatus.Unequip
        }

        if (pet.additional.limit) {
            (petInfo.WaitForChild('Stats').WaitForChild('Number').WaitForChild('Text') as TextLabel).Text = tostring(pet.additional.limit);
            (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = true;
        }

        let sizeEvolutionLabel = (this.UIPath.PetInventory.PetInfo.CraftFrame.get<FrameComponent>().instance.WaitForChild('Number') as TextLabel)

        let sizeCount = 0
        this.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { sizeCount += 1 } });

        let nextSizeReq = 0
        petUpgradeConfig.SizeUpgrades[pet.additional.size].requirements.forEach((value) => { nextSizeReq += value });

        sizeEvolutionLabel.Text = tostring(sizeCount)+'/'+tostring(nextSizeReq)
        if (!petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize) { sizeEvolutionLabel.Text = 'MAX' }
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
            (slingshotFrame.WaitForChild('Value') as TextLabel).Text = '+'+tostring(tool.addition);
            (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Value') as TextLabel).Text = tostring(tool.price);

            if (this.ownedTools.includes(toolName)) { (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Equip') as Frame).Visible = true }

            let buttonComponent = ButtonFabric.CreateButton(slingshotFrame.WaitForChild('UnlockButton') as GuiButton)
            if (this.equippedTool === toolName) { (slingshotFrame.WaitForChild('UnlockButton').WaitForChild('Equip').WaitForChild('Equip') as TextLabel).Text = 'Equipped' }

            buttonComponent.BindToClick(() => {
                if (this.equippedTool === toolName) { return }
                if (this.ownedTools.includes(toolName)) { Events.ManageTool.fire(ToolOperationStatus.Equip, toolName); return }
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
            (object.WaitForChild('Equip') as TextLabel).Visible = pet.pet.equipped;
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

        for (let petname of this._playerController.replica.Data.Profile.PetIndex) {
            let obj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            obj.Parent = parent
            obj.Visible = true;
    
            (obj.WaitForChild('PetName') as TextLabel).Text = petname;
            (obj.WaitForChild('Equip') as TextLabel).Visible = false;
            (obj.WaitForChild('Lock') as ImageLabel).Visible = false;

            ButtonFabric.CreateButton(obj)
        }

        let current = PetIndexQuestsData.get('PetIndexQuest1')!
        let petIndex = this._playerController.replica.Data.Profile.PetIndex

        PetIndexQuestsData.forEach((value, key) => {
            let delta1 = value.requirements.get('pets')-petIndex.size()
            let delta2 = current.requirements.get('pets')-petIndex.size()

            if ((value.requirements.get('pets') as number > petIndex.size()) && (delta1 < delta2)) { current = value }
        });

        let percentage = tostring(petIndex.size())+'/'+tostring(current.requirements.get('pets'));

        (index.WaitForChild('Title1') as TextLabel).Text = percentage+' Pets Found!';
        (index.WaitForChild('Rewards').WaitForChild('Bar').WaitForChild('Value') as TextLabel).Text = percentage+' Pets!';
        (index.WaitForChild('Rewards').WaitForChild('Tier') as TextLabel).Text = current.requirements.get('tier');

        TweenService.Create(index.WaitForChild('Rewards').WaitForChild('Bar').WaitForChild('stroke') as TextLabel, new TweenInfo(), {
            'Size': UDim2.fromScale(petIndex.size()/current.requirements.get('pets'), 1)
        }).Play()

        print(petIndex.size(), current.requirements.get('pets'))

    }

    private setupGifts() {
        
        let gifts = this.UIPath.Gifts.get<ImageComponent>().instance

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

                timer.Text = tostring(index)

                //let delta = os.time() - this._playerController.replica.Data.Profile.StatValues.LastDayTime

                if ((reward as Frame).LayoutOrder === (val%DailyRewardsData.size()+1)) { //&& (delta >= 10) //
                    timer.Text = 'Claim'
                    return
                }

                if ((reward as Frame).LayoutOrder < (val%DailyRewardsData.size()+1)) {  //24*60*60
                    timer.Text = 'Claimed'
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

        let meter = bar.WaitForChild('Meter') as ImageLabel
        let percentbar = bar.WaitForChild('HowMuch') as TextLabel
        let countdown = bar.WaitForChild('Countdown') as TextLabel
        let clickicon = bar.WaitForChild('ClickIcon') as ImageLabel

        let countdownChain = ['5', '4', '3', '2', '1', 'GO!']

        if (this.isFlying) { return }

        countdown.Text = countdownChain[0]

        bar.Visible = true
        this.isFlying = true

        PlayerController.currentClicks.set(0)
        meter.Position = UDim2.fromScale(meter.Position.X.Scale, 0.824)

        let perc = 0

        PlayerController.currentClicks.AddCallback((val) => {
            perc = math.min(100, math.round(val/value.maxClicks*100))

            TweenService.Create(clickicon.WaitForChild('UIScale') as UIScale, new TweenInfo(1/20), {'Scale': .85}).Play()
            TweenService.Create(meter, new TweenInfo(1/10, Enum.EasingStyle.Linear), 
                {'Position': UDim2.fromScale(meter.Position.X.Scale, ((100-perc)/100)*0.824) }).Play()

            percentbar.Text = tostring(perc)+'%'

            task.wait(1/20)
            TweenService.Create(clickicon.WaitForChild('UIScale') as UIScale, new TweenInfo(1/20), {'Scale': 1}).Play()
        })

        Events.ShootObject.fire(FlyingObjectStatus.IniticalizeObject)

        for (let i = 0; i < countdownChain.size(); i++) {
            countdown.Text = countdownChain[i]
            TweenService.Create(countdown.WaitForChild('UIScale') as UIScale, new TweenInfo(.1), {'Scale': 1.56}).Play()
            task.wait(.7)
            TweenService.Create(countdown.WaitForChild('UIScale') as UIScale, new TweenInfo(.3), {'Scale': 1.76}).Play()
            task.wait(.3)
        }

        Events.ShootObject.fire(FlyingObjectStatus.ShootObject, perc/100)

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

        let scrollList = new Map<string, number>([
            ['1', 0.001],
            ['2', 1050/5051],
            ['3', 1850/5051],
            ['4', 2250/400],
            ['5', 2850/5051],
            ['6', 3500/5051],
            ['7', 4175/5051],
            ['8', 4751/5051],
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

    public setupStoreGamepasses() {
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame

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

    public setupPacks() {
        let profileData = this._playerController.replica.Data.Profile
        let packFrame = this.UIPath.Limited.get<FrameComponent>().instance.WaitForChild('ScrollingFrame') as ScrollingFrame

        let packList = new Map<string, {id: number, world: WorldType, product: string}>([
            ['CavePack', { id: 1779439494, world: WorldType.Default, product: 'cavepack' }],
            ['NeonPack', { id: 1779439942, world: WorldType.Cyber, product: 'neonpack' } ],
            ['SpacePack', { id: 1779440646, world: WorldType.Space, product: 'spacepack' } ],
        ])

        let maxWorldInfo = WorldsData.get(profileData.Config.MaxWorld)!

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
                print('Prompted')
                Events.PurchasePrompt.fire(info.id)
            })
        }

    }
    
    private makeGift(gift: ImageButton, world: WorldType) {
        let index = gift.LayoutOrder-1

        let giftData = SelectSessionReward(index, world) //SessionRewardsData[gift.LayoutOrder-1]
        let timer = gift.WaitForChild('TimerFrame').WaitForChild('Timer') as TextLabel

        if (!giftData) { return }

        ButtonFabric.CreateButton(gift).BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Session, 'nil')
        })

        this.currentGiftTime.AddCallback((val) => {
            timer.Text =  tostring(giftData.Time! - val)

            if ((giftData.Time! - val) < 0) {
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true
            }

            //print(this._playerController.replica.Data.Session.claimedRewards.includes(index))
    
            if (this._playerController.replica.Data.Session.claimedRewards.includes(index)) {
                (gift.WaitForChild('ClaimFrame') as Frame).Visible = true;
                (gift.WaitForChild('ClaimFrame').WaitForChild('Timer') as TextLabel).Text = 'Claimed!'
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

        (machine.WaitForChild('CraftInfo').WaitForChild('GoldenPet') as TextLabel).Text = 'Golden '+pet.additional.size+' '+pet.name;
        (machine.WaitForChild('CraftInfo').WaitForChild('VoidPet') as TextLabel).Text = 'Void '+pet.additional.size+' '+pet.name;
        (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = tostring(currentVoidTime);
        
        this.isPetInVoidMachine = false
        if ((this.startVoidTime !== this.stopVoidTime)) { this.isPetInVoidMachine = true };

        if ((currentVoidTime > 0)) {
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Skip';
        }

        if (!this.isPetInVoidMachine) {
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Craft To Void';
            (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = tostring(petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time)
        }

        if (this.isPetInVoidMachine && (currentVoidTime <= 0)) {
            (machine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = 'Done';
            (machine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Collect';
        }
    }

    private mutationCallback(pet: IDBPetData, obj: GuiObject) {
        if (this.selectedMutationUIObject === obj) {
            this.setupMutationGui()
            return
        }

        this.UIPath.MutationMachine.MutationInfo.get<FrameComponent>().Open()
        this.UIPath.MutationMachine.PetsFrame.get<FrameComponent>().Open()

        this.selectedMutationUIObject = obj;
        this.selectedMutationPet = pet
    }

    private cleanseCallback(pet: IDBPetData, obj: GuiObject) {
        if (this.selectedCleanseUIObject === obj) {
            this.setupCleanseGui()
            return
        }

        this.UIPath.CleanseMachine.CleanseInfo.get<FrameComponent>().Open()
        this.UIPath.CleanseMachine.PetsFrame.get<FrameComponent>().Open()

        this.selectedCleanseUIObject = obj;
        this.selectedCleansePet = pet
    }

    private goldenCallback(pet: IDBPetData, obj: GuiObject) {
    
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

        this.selectedGoldenPet = pet

        if (this.selectedGoldenUIObjects.size() > 1) { return }
        this.clearPets(goldMachine.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!)
        this.selectedGoldenUIObjects = []

        let debounce = false

        for (let newpet of this.Pets) {
            if (!PetUtilities.ComparePets(newpet, pet) || newpet.locked) { continue }

            let newobj = petInventory.WaitForChild('Template')!.WaitForChild('PetExample')!.Clone() as GuiButton;
            newobj.Parent = goldMachine.WaitForChild('GoldenInfo').WaitForChild('PetsHolder').WaitForChild('Frame')!
            newobj.Visible = true;
    
            (newobj.WaitForChild('PetName') as TextLabel).Text = pet.name;
            (newobj.WaitForChild('Equip') as TextLabel).Visible = false;
            (newobj.WaitForChild('Lock') as ImageLabel).Visible = false;

            if (!debounce) {
                debounce = true
                this.selectedGoldenUIObjects.push(newobj);
                (newobj.WaitForChild('Equip') as TextLabel).Visible = true;
                this.selectedGoldenPet = newpet
            }

            let button = ButtonFabric.CreateButton(newobj)
            button.BindToClick(() => { this.goldenCallback(newpet, newobj) })
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

        print(GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!), );

        (holder.WaitForChild('Stats1').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(currentAdditional.get('Multiplier')!);
        (holder.WaitForChild('Stats1').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(gems);
        (holder.WaitForChild('Stats1').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins);

        (holder.WaitForChild('Stats2').WaitForChild('Boost').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(additional.get('Multiplier')!);
        (holder.WaitForChild('Stats2').WaitForChild('Gems').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(gems+(nextRebirthData.Values!.Gems || 0));
        (holder.WaitForChild('Stats2').WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins+(nextRebirthData.Values!.Wins || 0));

        (rebirthUI.WaitForChild('Wins').WaitForChild('Value') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(wins)+'/'+GUIUtilities.getSIPrefixSymbol(additional.get('Wins')!)
        TweenService.Create(rebirthUI.WaitForChild('Wins').WaitForChild('stroke') as ImageLabel, new TweenInfo(.1), { 'Size': UDim2.fromScale(math.max(1, wins/additional.get('Wins')!), 1) }).Play()

    }

    private updateStoreBillboards() {

        let profileData = this._playerController.replica.Data.Profile
        let maxSlingshot = profileData.OwnedTools[profileData.OwnedTools.size()-1]

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
            ['BowShopPart', world1]
        ])
        
        shops.forEach((slingshots, name) => {
            let shop = game.Workspace.WaitForChild(name)
            let billboard = shop.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
            let description = billboard.WaitForChild('Frame').WaitForChild('Description') as TextLabel

            let index = slingshots.indexOf(maxSlingshot)
            if (index < 0) { description.Text = 'Max'; return }
            if ((index+1) >= slingshots.size() ) { description.Text = 'Max'; return }

            let info = ToolsData.get(slingshots[index+1])!
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
        let storeFrame = this.UIPath.Store.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')

        let world = this._playerController.replica.Data.Profile.Config.MaxWorld
        let worldData = WorldsData.get(world)

        if (!worldData) { return }

        for (let obj of storeFrame.GetDescendants()) {
            if (obj.Name !== 'ChangableValue') { continue }
            if (!obj.IsA('IntValue')) { continue }

            let label = obj.Parent!.WaitForChild('Amount') as TextLabel
            let name = obj.Parent!.Parent!.Parent!.Name
            if (obj.Parent!.Name === 'Huge Pack') { name = obj.Parent!.Parent!.Name }

            label.Text = '+'+GUIUtilities.getSIPrefixSymbol(obj.Value * (worldData!.multipliers.get('product') || 1))+' '+name
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
        let template = giftFrame.Parent!.WaitForChild('Template').WaitForChild('PlayerTemplate') as GuiButton

        for (let obj of giftFrame.GetChildren()) {
            if (!obj.IsA('GuiButton')) { continue }
            obj.Destroy()
        }

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
                if (this.giftingToUserId === player.UserId) { 
                    this.giftingToUserId = undefined; 
                    (storeFrame.WaitForChild('GiftingTo') as TextLabel).Visible = false;
                    return 
                };

                this.giftingToUserId = player.UserId;
                (storeFrame.WaitForChild('GiftingTo') as TextLabel).Text = 'Gifting to: '+player.Name;
                (storeFrame.WaitForChild('GiftingTo') as TextLabel).Visible = true
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

        if (profileData.StatValues.SpinCount < 1) {
            (wheelButton.WaitForChild('Count') as Frame).Visible = false
            return
        }

        (wheelButton.WaitForChild('Count') as Frame).Visible = true;
        (wheelButton.WaitForChild('Count').WaitForChild('Count') as TextLabel).Text = tostring(profileData.StatValues.SpinCount);
    }

    public updateDailyChestBillboard() {
        let profileData = this._playerController.replica.Data.Profile;
        let dailyChestPart = Workspace.WaitForChild('DailyChest')

        let dailyBillboard = dailyChestPart.WaitForChild('Attachment').WaitForChild('BillboardGui') as BillboardGui
        let timer = dailyBillboard.WaitForChild('Frame').WaitForChild('Timer') as TextLabel

        let timeLeft = profileData.StatValues.LastDailyChestTime+10-os.time();

        timer.Text = GUIUtilities.GuiTimeFormatter(math.max(0, timeLeft));

        if (timeLeft <= 0) { timer.Text = 'Claim' }
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
            UIAnimations.MainFrameAnimationClose(obj, { position: UDim2.fromScale(0.5, 0.5), size: obj.Size })
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
            UIAnimations.TestAnimation(obj, new TweenInfo(.2),{ position: obj.Position, size: UDim2.fromScale(0.595, 0.697) }).Play()
        })
        
        this.UIPath.PetInventory.PetsFrame.get<FrameComponent>().BindToClose((obj) => {
            UIAnimations.TestAnimation(obj, new TweenInfo(.2), { position: obj.Position, size: UDim2.fromScale(0.935, 0.697) }).Play()
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

        this.currentMutationGems.AddCallback((val) => {
            this.updateMutations(val)
        })

        let goldCircle = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('Gold Machine Circle') as Part)

        goldCircle.radius = 10

        goldCircle.BindToEnter(() => { this.UIPath.GoldMachine.get<ImageComponent>().Open() })
        goldCircle.BindToLeave(() => { this.UIPath.GoldMachine.get<ImageComponent>().Close() })

        let slingshotStore = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('BowShopPart') as Part)

        slingshotStore.radius = 5

        slingshotStore.BindToEnter(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Open() })
        slingshotStore.BindToLeave(() => { this.UIPath.SlingshotStore.get<ImageComponent>().Close() })

        let voidPart = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('VoidPart') as Part)

        voidPart.radius = 5

        voidPart.BindToEnter(() => { this.UIPath.VoidMachine.get<ImageComponent>().Open() }) 
        voidPart.BindToLeave(() => { this.UIPath.VoidMachine.get<ImageComponent>().Close() }) 

        let mutationPart = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('MutationPart') as Part)

        mutationPart.radius = 5

        mutationPart.BindToEnter(() => { this.UIPath.MutationMachine.get<ImageComponent>().Open() }) 
        mutationPart.BindToLeave(() => { this.UIPath.MutationMachine.get<ImageComponent>().Close() }) 

        let cleansePart = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('CleansePart') as Part)

        cleansePart.radius = 5

        cleansePart.BindToEnter(() => { this.UIPath.CleanseMachine.get<ImageComponent>().Open() }) 
        cleansePart.BindToLeave(() => { this.UIPath.CleanseMachine.get<ImageComponent>().Close() }) 

        let dailyChest = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('DailyChest') as Part)
        dailyChest.radius = 5
        dailyChest.BindToEnter(() => { Events.ClaimReward(RewardType.DailyChest, 'nil') }) 

        let groupChest = GroupPopUpFabric.CreateGroupPopUp(game.Workspace.WaitForChild('GroupChest') as Part)
        groupChest.radius = 5
        groupChest.BindToEnter(() => { Events.ClaimReward(RewardType.GroupChest, 'nil') }) 

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
            this.selectedPet.locked = !this.selectedPet.locked
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
            Events.ClaimReward.fire(RewardType.FollowQuest, '')
        })

        let trainObect = this.UIPath.RightList.AutoTrain.get<ButtonComponent>().instance
        let shootObect = this.UIPath.RightList.AutoShoot.get<ButtonComponent>().instance
        let rebirthObect = this.UIPath.Rebirth.AutoRebirth.get<ButtonComponent>().instance

        this.UIPath.RightList.AutoTrain.get<ButtonComponent>().BindToClick(() => {
            this.autoTrain = !this.autoTrain
            if (this.autoTrain) {
                this.updateGradient(trainObect, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                this.updateGradient(trainObect, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.RightList.AutoShoot.get<ButtonComponent>().BindToClick(() => {
            this.autoShoot = !this.autoShoot
            if (this.autoShoot) {
                this.updateGradient(shootObect, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                this.updateGradient(shootObect, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.Rebirth.AutoRebirth.get<ButtonComponent>().BindToClick(() => {
            if (!this._playerController.replica.Data.Profile.Products.includes('autorebirth')) { return }
            this.autoRebirth = !this.autoRebirth
            if (this.autoRebirth) {
                this.updateGradient(rebirthObect, templates.WaitForChild('Green') as UIGradient)
            }
            else {
                this.updateGradient(rebirthObect, templates.WaitForChild('Red') as UIGradient)
            }
        })

        this.UIPath.Rebirth.Skip.get<ButtonComponent>().BindToClick((obj) => {
            let rebirthList = [ 1762897969, 1762898131, 1762898290, 1762898515 ]
            let skips = this._playerController.replica.Data.Profile.StatValues.RebirthSkips

            if (skips >= rebirthList.size()) { Events.PurchasePrompt.fire(1762898792); return }
            Events.PurchasePrompt.fire(rebirthList[skips])
        })

        this.UIPath.Rebirth.RebirthButton.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Rebirth)
        })

        this.UIPath.Follow.Redeem.get<ButtonComponent>().BindToClick(() => {
            Events.ClaimReward.fire(RewardType.Code, (this.UIPath.Follow.get<ImageComponent>().instance.WaitForChild('Username').WaitForChild('Value') as TextBox).Text)
        })

        this._playerController.replica.ListenToChange('Profile.Pets', (newValue, oldValue) => {
            this.Pets = newValue
            let newEquippedPets = this.getEquippedPets(this.Pets)

            if (newEquippedPets.size() > this.EquippedPets.size()) {
                this.selectedPetStatus = PetOperationStatus.Unequip
                if (this.selectedPet) { this.selectedPet.equipped = true }
            }

            if (this.EquippedPets.size() > newEquippedPets.size()) {
                this.selectedPetStatus = PetOperationStatus.Equip
                if (this.selectedPet) { this.selectedPet.equipped = false }
            }

            this.EquippedPets = newEquippedPets
            this.updatePets()
            this.displayPet(this.selectedPet!)

            if (goldCircle.enabled) { this.setupGoldenGui() }
            if (voidPart.enabled) { this.setupVoidPets() }
            if (mutationPart.enabled) { this.setupMutationGui() }
            if (cleansePart.enabled) { this.setupCleanseGui() }
        })

        let accuracyLabel = this.UIPath.UpperList.Accuracy.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let starsLabel = this.UIPath.UpperList.Stars.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let winsLabel = this.UIPath.UpperList.Wins.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel
        let gemsLabel = this.UIPath.UpperList.Gems.get<ImageComponent>().instance.WaitForChild('Value') as TextLabel

        this._playerController.replica.ListenToChange('Profile.VoidMachine', (newValue, oldValue) => {
            this.setupVoidPets()
        })

        this._playerController.replica.ListenToChange('Profile.Values.StrengthVal', (newValue, oldValue) => {
            accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue)
            this.updateStoreBillboards()
        })

        this._playerController.replica.ListenToChange('Profile.Values.RebirthsVal', (newValue, oldValue) => {
            
        })

        this._playerController.replica.ListenToChange('Profile.Values.StarsVal', (newValue, oldValue) => {
            starsLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Values.WinsVal', (newValue, oldValue) => {
            winsLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Values.GemsVal', (newValue, oldValue) => {
            gemsLabel.Text = GUIUtilities.getSIPrefixSymbol(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Config.MaxWorld', (newValue, oldValue) => {
            this.updateWorldTeleports()
            this.updateStorePacks()
            this.updateGiftRewards()
        })

        this._playerController.replica.ListenToChange('Session.currentWorld', (newValue, oldValue) => {
            let world = WorldsData.get(newValue)
            if (!world) { return }
            this.updateSlingshots(world)
        })

        this._playerController.replica.ListenToChange('Profile.EquippedTool', (newValue) => {
            this.equippedTool = newValue
            this.updateSlingshots(WorldsData.get(replicaData.Session.currentWorld)!)
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
            this.currentGiftTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.StatValues.DayAmount', (newValue) => {
            this.currentDailyTime.set(newValue)
        })

        this._playerController.replica.ListenToChange('Profile.Values.RebirthsVal', (newValue) => {
            this.updateRebirth()
        })

        this._playerController.replica.ListenToChange('Profile.Products', (newValue) => {
            this.updateStoreLuck()
            this.setupPacks()
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

        this._playerController.replica.ListenToChange('Session.currentFlyingObject', (newValue) => {
            print(newValue)
            if (newValue) {
                camera.CameraType = Enum.CameraType.Custom
                camera.CameraSubject = Workspace.WaitForChild('_ignoreObjects').WaitForChild(newValue.partName) as BasePart

                PlayEffect('ChangeUseStatus', new Map([['bool', false]]))
                return 
            }

            camera.CameraType = Enum.CameraType.Custom
            camera.CameraSubject = this._playerController.component.instance.Character?.WaitForChild('Humanoid') as Humanoid

            PlayEffect('ChangeUseStatus', new Map([['bool', true]]))

            this.isFlying = false
        })

        accuracyLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StrengthVal )
        starsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.StarsVal )
        winsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.WinsVal )
        gemsLabel.Text = GUIUtilities.getSIPrefixSymbol( replicaData.Profile.Values.GemsVal )

        this.Pets = replicaData.Profile.Pets
        this.EquippedPets = this.getEquippedPets(this.Pets)

        this.equippedTool = replicaData.Profile.EquippedTool
        this.ownedTools = replicaData.Profile.OwnedTools

        this.setupSlingshots()
        this.setupVoidPets()
        this.setupPetIndex()
        this.setupGifts()
        this.setupDaily()
        this.setupBigSlingshots()
        this.setupDonations()
        this.setupWorldTeleports()
        this.setupStoreUpperButtons()
        this.setupStorePotions()
        this.setupStoreGamepasses()
        this.setupPacks()

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

        let voidMachine: Instance = this.UIPath.VoidMachine.get<ImageComponent>().instance;

        task.spawn(() => {

            while (task.wait(1)) {

                Events.ManageWorld.fire(WorldOperationStatus.BuyAll)
                if (this.autoRebirth) { Events.ClaimReward.fire(RewardType.Rebirth) }
                this.updateWheelSpin()
                this.updateDailyChestBillboard()

                let voidTime = (this.stopVoidTime - this.startVoidTime)*this._playerController.replica.Data.Profile.Multipliers.VoidMachineMul
                let currentVoidTime = this.startVoidTime+voidTime-os.time();

                if (!this.isPetInVoidMachine) {
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = tostring(petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time);
                    (voidMachine.WaitForChild('CraftInfo').WaitForChild('Button').WaitForChild('Craft') as TextLabel).Text = 'Craft To Void';
                    continue
                }
                
                (voidMachine.WaitForChild('CraftInfo').WaitForChild('TimeNumber') as TextLabel).Text = tostring(currentVoidTime);

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