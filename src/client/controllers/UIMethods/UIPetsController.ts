import { IPathObject } from "client/classes/ComponentsInitializer"
import { PlayerController } from "../PlayerController"
import { GUIUtilities } from "client/classes/GUIUtilities"
import { ButtonFabric, ButtonComponent } from "client/components/UIComponents/ButtonComponent"
import { FrameComponent } from "client/components/UIComponents/FrameComponent"
import { ImageComponent } from "client/components/UIComponents/ImageComponent"
import { Events } from "client/network"
import { PlayEffect } from "client/static/EffectsStatic"
import { PetPerksInfo, PetPerkNames } from "shared/info/PetInfo"
import { IDBPetData, Evolutions, Mutations, PetOperationStatus } from "shared/interfaces/PetData"
import { PetUtilities } from "shared/utility/PetUtilities"
import { Players, Workspace, RunService, SocialService, TweenService, MarketplaceService, ReplicatedStorage, UserInputService, TeleportService, Lighting } from "@rbxts/services";
import { Binding } from "client/classes/BindbingValues"
import Functions from "shared/utility/LuaUtilFunctions"

export class UIPetsController {

    private UIPath!: IPathObject
    private _playerController!: PlayerController

    public petInventory = new Map<GuiObject, IDBPetData>()

    public Pets: IDBPetData[] = []
    public EquippedPets: IDBPetData[] = []

    public selectedDeleteUIObjects: GuiObject[] = []
    public selectedDeletePets: IDBPetData[] = []
    public allDeletingPets?: Map<GuiObject, IDBPetData>

    public selectedLockUIObjects: GuiObject[] = []
    public selectedLockPets: IDBPetData[] = []
    public selectedUnlockPets: IDBPetData[] = []
    public allLockingPets?: Map<GuiObject, IDBPetData>

    public currentlySearching?: string

    public selectedGoldenPet?: IDBPetData
    public selectedGoldenUIObjects: GuiObject[] = []
    public selectedGoldenSize = new Binding<number>(0)

    public selectedVoidPet?: IDBPetData
    public selectedVoidUIObject?: GuiObject
    public startVoidTime: number = 0
    public stopVoidTime: number = 0
    public currentVoidTime: number = 0
    public isPetInVoidMachine = false

    public selectedMutationPet?: IDBPetData
    public selectedMutationUIObject?: GuiObject
    public currentMutationGems = new Binding<number>(1)

    public selectedCleansePet?: IDBPetData
    public selectedCleanseUIObject?: GuiObject

    public selectedUIObject?: GuiObject
    public selectedPet?: IDBPetData
    public selectedPetStatus: PetOperationStatus = PetOperationStatus.Equip


    constructor() {}

    public setupData(UIPath: IPathObject, PlayerController: PlayerController) {
        this.UIPath = UIPath
        this._playerController = PlayerController
    }

    
    public createPetExample(pet: IDBPetData, callback: (pet: IDBPetData, obj: GuiButton) => void) {

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
        let stats = petOverlay.WaitForChild('Stats') as Frame
        let scale = petOverlay.WaitForChild('Scale') as Frame

        if (!newPet) { return }
        
        let gradient = petRarities.WaitForChild(newPet.stats.rarity) as UIGradient
        if (gradient) { gradient.Clone().Parent = obj }

        button.BindToEnter(() => { 
            petOverlay.Visible = true;

            let petData = newPet; //Check this later
            if (this.petInventory.get(button.instance)!) { petData = PetUtilities.DBToPetTransfer(this.petInventory.get(button.instance)!)! }

            stats.Visible = true;
            scale.Visible = false;

            (petOverlay.WaitForChild('PetName') as TextLabel).Text = petData.name;
            //(stats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = petData.additional.size;
            //(stats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = petData.additional.evolution;
            (stats.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
            (stats.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet.stats.rarity;
            (stats.WaitForChild('Power').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(petData.multipliers.get('strength')!)+'x';

            if (!newPet.additional.perks) { return }

            let perkIndex = -1
            newPet.additional.perks?.forEach((val, index) => { if (val.name === 'Extra Power') { perkIndex = index } })
            
            if (perkIndex < 0) { return }

            let selectedPerk = newPet.additional.perks[perkIndex]

            stats.Visible = false
            scale.Visible = true;

            (scale.WaitForChild('Rarity').WaitForChild('Text').WaitForChild('UIGradient') as UIGradient).Color = gradient.Color;
            (scale.WaitForChild('Rarity').WaitForChild('Text') as TextLabel).Text = newPet.stats.rarity;
            (scale.WaitForChild('Boost') as TextLabel).Text = PetPerksInfo.get(PetPerkNames.get(selectedPerk.name)!)![selectedPerk.level-1].desc
            
            //(stats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.size) as UIGradient).Color;
            //(stats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(petData.additional.evolution) as UIGradient).Color;

        })
        button.BindToLeave(() => { petOverlay.Visible = false;  });

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
    
    public createPetExamples(parent: Instance, callback: (pet: IDBPetData, obj: GuiButton) => void) {

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

        //print(this.petInventory, 'this.petInventory', this.Pets)

        //return petsUI
    }

    public updatePetSearch() {
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

        //this.displayPet(this.selectedPet!, this.selectedUIObject, false, true)

        pets.clear()
    }

    public updatePetInventory(newpets: IDBPetData[]) {

        //print(newpets, this.petInventory)

        let proxy = new Map<GuiObject, IDBPetData>()

        //newpets.forEach((newpet) => {

        for (let i = 0; i < this.Pets.size(); i++) {

            let newpet = this.Pets[i]

            for (let obj of this.petInventory) {
                let value = obj[1]
                let UIObject = obj[0]

                ////print(newpet.id, value.id)
                if (newpet.id !== value.id) { continue };

                //print('pass');
    
                (UIObject.WaitForChild('Equip') as TextLabel).Visible = newpet.equipped;
                (UIObject.WaitForChild('Lock') as ImageLabel).Visible = newpet.locked;
                (UIObject.WaitForChild('X') as ImageLabel).Visible = false;
    
                //let redactedPet = PetUtilities.DBToPetTransfer(newpet)!
    
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

        //this.displayPet(this.selectedPet!, this.selectedUIObject, true, true)
        //proxy.clear()
    }

    public updatePets() {
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

    public clearPets(parent: Instance, filter?: keyof Instances) {
        let currentFilter = 'GuiButton'
        if (filter) { currentFilter = filter }

        for (let obj of parent.GetChildren()) {
            if (!obj.IsA(currentFilter as keyof Instances)) continue
            obj.Destroy()
        }
    }

    public setupPets() {
        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance

        this.updatePets()

        this.clearPets(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!)
        this.createPetExamples(petInventory.WaitForChild('PetsFrame').WaitForChild('ScrollingFrame')!, (pet, object) => { this.displayPet(pet, object) })
    }

    public displayPet(pet: IDBPetData | undefined, object?: GuiObject, ignore?: boolean, artificial?: boolean) {
        let massDeleteButtons = this.UIPath.PetInventory.MassDeleteButtons.get<FrameComponent>().instance
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let lockButton = inventoryButtons.WaitForChild('Lock') as GuiButton
        let search = inventoryButtons.WaitForChild('Search') as Frame

        if (massDeleteButtons.Visible && !artificial) { this.displayDeletePet(this.petInventory.get(object!)!, object!); return }
        if (!search.Visible) { this.displayLockPet(this.petInventory.get(object!)!, object!); return }

        /*

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

        */

        if (!pet) { return }

        this.selectedPet = this.petInventory.get(object!)!
        this.selectedUIObject = object

        if (!this.petInventory.get(object!)) { return }

        let petInventory = this.UIPath.PetInventory.get<ImageComponent>().instance
        //let petInfo = petInventory.WaitForChild('PetInfo')! as Frame

        //print(this.selectedPet!, object, this.petInventory.get(object!))

        //if (!this.petInventory.get(object!)) { return }
        //print(PetUtilities.DBToPetTransfer(this.selectedPet))

        let formattedPet = PetUtilities.DBToPetTransfer(this.selectedPet);
        if (!formattedPet) { return }

        this.selectedPetStatus = PetOperationStatus.Equip

        if (this.selectedPet.equipped) { this.selectedPetStatus = PetOperationStatus.Unequip }

        //print(this.selectedPetStatus)

        Events.ManagePet(this.selectedPetStatus, this.selectedPet)

        /*

        let mainStats = petInfo.WaitForChild('Stats').WaitForChild('Main') as Frame;

        (petInfo.WaitForChild('Stats').WaitForChild('Number') as Frame).Visible = false;
        (petInfo.WaitForChild('Stats').WaitForChild('Boost') as TextLabel).Text = GUIUtilities.getSIPrefixSymbol(formattedPet.multipliers.get('strength') || 1)+'x Boost';
        (petInfo.WaitForChild('PetName') as TextLabel).Text = formattedPet.name;
        (petInfo.WaitForChild('Equip').WaitForChild('TextLabel') as TextLabel).Text = 'Equip';
        //(mainStats.WaitForChild('PetCraft').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.evolution;
        //(mainStats.WaitForChild('PetSize').WaitForChild('Text') as TextLabel).Text = formattedPet.additional.size;

        let petModifiers = ReplicatedStorage.WaitForChild('PetModifiers') as Folder;
        //(mainStats.WaitForChild('PetCraft').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(formattedPet.additional.evolution) as UIGradient).Color;
        //(mainStats.WaitForChild('PetSize').WaitForChild('UIGradient') as UIGradient).Color = (petModifiers.WaitForChild(formattedPet.additional.size) as UIGradient).Color;

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
        */
    }

    public setupInventoryButtons() {
        let inventoryButtons = this.UIPath.PetInventory.Buttons.get<FrameComponent>().instance
        let massDeleteButtons = this.UIPath.PetInventory.MassDeleteButtons.get<FrameComponent>().instance

        let deleteButton = this.UIPath.PetInventory.Buttons.Delete.get<ButtonComponent>()
        let equipBestButton = this.UIPath.PetInventory.Buttons.EquipBest.get<ButtonComponent>()
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

        ButtonFabric.CreateButton(equipBestButton.instance.WaitForChild('NoPets') as GuiButton).BindToClick(() => {
            Events.ManagePets.fire(PetOperationStatus.UnequipAll, 'nil')
        })

        search.GetPropertyChangedSignal('Text').Connect(() => {
            //print('Ended')
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

    public setupMassLock() {
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

    public setupMassLockFrame() {
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

    public displayLockPet(pet: IDBPetData, object: GuiObject) {

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

    public updateMassLock() {
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

    public setupMassDelete() {
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

            //print('Deleted')

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

    public setupMassDeleteFrame() {
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

    public updateMassDelete() {
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


    public displayDeletePet(pet: IDBPetData, object: GuiObject) {
        if (!pet || !object) { return }

        //print(object, 'fffffff111111')

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

    public getEquippedPets(pets: IDBPetData[]) {
        let equipped: IDBPetData[] = []
        pets.forEach((value, index) => { if (value.equipped) { equipped.push(value) } })
        return equipped
    }
}