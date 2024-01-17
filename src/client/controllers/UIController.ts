
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { PlayerController } from "./PlayerController";

import { Players, Workspace } from "@rbxts/services";
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

const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui')
const mainGUI   = playerGui.WaitForChild('MainGui') as ScreenGui

//const testing = mainGUI.WaitForChild('TextLabel') as TextLabel
/*
const menu = mainGUI.WaitForChild('Menu') as IMenu

const menuBtn   = mainGUI.WaitForChild('MenuBtn')   as IButton
const shop      = mainGUI.WaitForChild('Shop')      as IShop
const shopBtn   = mainGUI.WaitForChild('ShopBtn')   as IButton
*/


const menuGuitest = 
    [
        {name: 'Menu', objComponent: 'Frame', children: [
            {name: 'SubMenu', objComponent: 'Frame'},
            {name: 'TestBtn', objComponent: 'Button'},
            {name: 'Funny', objComponent: 'Button'},
        ]},
        {name: 'MenuBtn', objComponent: 'Button'},
        {name: 'ShopBtn', objComponent: 'Button'},
    ]


const test = 
[
    {name: 'SurfaceGui', objComponent: 'Surface'},
    {name: 'BillboardGui', objComponent: 'Billboard'},
]



let ClearChildrenIgnoreFilter = (parent: Instance, filter: string[]) => {
    for (let v of parent.GetChildren()) {
        if (filter.includes(v.ClassName)) continue
        Dependency<Components>().removeComponent<ButtonComponent>(v)
        v.Destroy()
    }
}


//const testFrame = playerGui.WaitForChild('ScreenGui').WaitForChild('Frame') as Frame
//const testBtn   = playerGui.WaitForChild('ScreenGui').WaitForChild('TextButton') as TextButton

@Controller({})
export class UIController implements OnStart, OnInit {

    private _playerController: PlayerController

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    onInit() {
        print('Waiting')
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }
        print('Loading GUI')

        //GUIUtilities.InitializeGuiTimer(testing, 10)
        //GUIUtilities.InitializeGuiWheel(testing, 10, 5)

        let replicaData = this._playerController.replica.Data
        let menuPath = ComponentsInitializer.InitializeObject(menuGuitest, mainGUI);

        menuPath.Menu.get<FrameComponent>().BindToOpen((arg) => {
            let anim = UIAnimations.TestAnimation(arg, new TweenInfo(1), {position: new UDim2(0.229, 0, 0.151, 0), size: new UDim2(0.534, 0, 0.724, 0)})
            anim.Play()
            anim.Completed.Wait()
        })

        menuPath.Menu.get<FrameComponent>().BindToClose((arg) => {
            let anim = UIAnimations.TestAnimation(arg, new TweenInfo(1), {position: new UDim2(1.229, 0, 1.151, 0), size: new UDim2(0, 0, 0, 0)})
            anim.Play()
            anim.Completed.Wait()
        })

        menuPath.MenuBtn.get<ButtonComponent>().BindToClick((arg) => {
            menuPath.Menu.get<FrameComponent>().Change()
        })

        let dynamicText = new DynamicText(
            menuPath.Menu.Funny.get<ButtonComponent>().instance as TextButton, 
            'testtesttesttesttesttest',
            new Map<number, StrokeInfo>([[10, {Speed: 30}], [20, {Speed: 20}]])
            )

        menuPath.Menu.Funny.get<ButtonComponent>().BindToClick((arg) => {
            dynamicText.Start()
        })
        
        // menuPath.ShopBtn.get<ButtonComponent>().BindToClick((arg) => {
        //     Events.ManageTool(ToolOperationStatus.Buy, 'Default3')
        //     task.wait(2)
        //     Events.ManageTool(ToolOperationStatus.Equip, 'Default3')
        // })

        menuPath.ShopBtn.get<ButtonComponent>().BindToClick((arg) => {
            Events.ManageWorld(WorldOperationStatus.Buy, WorldType.Desert)
        })

        /*
        let testcomps = ComponentsInitializer.InitializeObject(test, Workspace.WaitForChild('testpart') as Part)

        let bind = new Binding<number>(0);
        let label = (testcomps.SurfaceGui.get<SurfaceComponent>().instance.WaitForChild('TextLabel')! as TextLabel)
        
        bind.AddCallback((val) => {
            label.Text = tostring(val)
        })
        */

        print(menuPath.Menu.SubMenu.get<FrameComponent>())
        //print(menuPath.Menu.SubMenu.get<FrameComponent>())

        let petDisplayBind = new Binding<{Pets: IDBPetData[], EquippedPets: IDBPetData[]}>({Pets: [], EquippedPets: []});

        let scrollingFrame = menuPath.Menu.SubMenu.get<FrameComponent>().instance.WaitForChild('ScrollingFrame')!
        let infoLabel = menuPath.Menu.get<FrameComponent>().instance.WaitForChild('TextLabel')! as TextLabel

        let selectedPet: IDBPetData | undefined;
        let selectionStatus: PetOperationStatus = PetOperationStatus.Equip
        let clicked = false

        menuPath.Menu.TestBtn.get<ButtonComponent>().BindToClick(() => {
            if (!selectedPet) { return }
            Events.ManagePet(selectionStatus, selectedPet)
            clicked = true
        })

        petDisplayBind.AddCallback((val) => {

            if (!clicked) { return }
            clicked = false

            if (selectionStatus === PetOperationStatus.Equip) {
                selectionStatus = PetOperationStatus.Unequip;
                (menuPath.Menu.TestBtn.get<ButtonComponent>().instance as TextButton).Text = 'Unequip'
            }
            else {
                selectionStatus = PetOperationStatus.Equip;
                (menuPath.Menu.TestBtn.get<ButtonComponent>().instance as TextButton).Text = 'Equip'
            }

        })

        petDisplayBind.AddCallback((val) => {

            ClearChildrenIgnoreFilter(scrollingFrame, ['UIGridLayout'])
            print(val)

            for (let v of val.EquippedPets) { // tbh this should be a simple function call but who cares in showcases?
                let pet = PetsData.get(v.name)
                let textButton = ButtonFabric.CreateButton( (playerGui.WaitForChild('TestGui')!.WaitForChild('TestButton') as TextButton).Clone() );

                (textButton.instance as TextButton).Text = v.name;
                (textButton.instance as TextButton).BackgroundColor3 = Color3.fromRGB(255, 0, 0);

                textButton.BindToClick((arg) => {
                    selectionStatus = PetOperationStatus.Unequip
                    selectedPet = v;
                    (menuPath.Menu.TestBtn.get<ButtonComponent>().instance as TextButton).Text = 'Equipped'
                    infoLabel.Text = `My name is <b> ${v.name} </b>`
                });
                
                let port = (textButton.instance.WaitForChild('ViewportFrame') as ViewportFrame)
                let model = pet!.model.Clone() 
                
                model.PivotTo(model.GetPivot().mul(pet!.stats.rotationOffset))
                let modelCam = new Instance('Camera')

                modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                
                model.Parent = port
                modelCam.Parent = port
                port.CurrentCamera = modelCam

                port.Parent = textButton.instance
                textButton.instance.Parent = scrollingFrame
            }

            for (let v of val.Pets) {
                let pet = PetsData.get(v.name)
                let textButton = ButtonFabric.CreateButton( (playerGui.WaitForChild('TestGui')!.WaitForChild('TestButton') as TextButton).Clone() );

                (textButton.instance as TextButton).Text = v.name;
                (textButton.instance as TextButton).BackgroundColor3 = Color3.fromRGB(255, 255, 255);

                textButton.BindToClick((arg) => {
                    selectionStatus = PetOperationStatus.Equip
                    selectedPet = v;
                    (menuPath.Menu.TestBtn.get<ButtonComponent>().instance as TextButton).Text = 'Equip'
                    infoLabel.Text = `My name is <b> ${v.name} </b>`
                });
                
                let port = (textButton.instance.WaitForChild('ViewportFrame') as ViewportFrame)
                let model = pet!.model.Clone() 
                
                model.PivotTo(model.GetPivot().mul(pet!.stats.rotationOffset))
                let modelCam = new Instance('Camera')

                modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                
                model.Parent = port
                modelCam.Parent = port
                port.CurrentCamera = modelCam

                port.Parent = textButton.instance
                textButton.instance.Parent = scrollingFrame
                
            }

        })
        
        this._playerController.replica.ListenToChange('Profile.Pets', (newValue) => {
            let format: {Pets: IDBPetData[], EquippedPets: IDBPetData[]} = {Pets: [], EquippedPets: []}
            newValue.forEach((value, key) => format.Pets.push(value))
            replicaData.Profile.EquippedPets.forEach((value, key) => format.EquippedPets.push(value))
            print(format)
            petDisplayBind.set(format)
        })

        this._playerController.replica.ListenToChange('Profile.EquippedPets', (newValue) => {
            let format: {Pets: IDBPetData[], EquippedPets: IDBPetData[]} = {Pets: [], EquippedPets: []}
            newValue.forEach((value, key) => format.EquippedPets.push(value))
            replicaData.Profile.Pets.forEach((value, key) => format.Pets.push(value))
            print(format)
            petDisplayBind.set(format)
        })

        this._playerController.replica.ListenToChange('Session.currentWorld', (newValue) => {
            print(WorldsData.get(newValue)!.shop)
        })

        petDisplayBind.set({Pets: replicaData.Profile.Pets, EquippedPets: replicaData.Profile.EquippedPets})



        /*
        task.wait(4)
        Events.RequestTrade(RequestOperationStatus.Send, Players.GetPlayers()[0])
        task.wait(2)
        print('Managing')
        Events.ManageTrade(TradeOperationStatus.Update, TradeUpdateStatus.Add, 
            {
                name: 'Cat',
                additional: {
                    size: Sizes.Normal,
                    void: true,
                }
            })
        task.wait(2)
        Events.ManageTrade(TradeOperationStatus.Accept)
        task.wait(1)
        Events.ManageTrade(TradeOperationStatus.Deny)
        */
        /*
        let localPlayer = this._playerController.component.instance
        let component = this._playerController.component
        let replica = this._playerController.replica

        let testFrameComp    = FrameFabric.CreateFrame(testFrame)
        let testBtnComp      = ButtonFabric.CreateButton(testBtn)
        let menuComponent    = FrameFabric.CreateFrame(menu)
        let menuBtnComponent = ButtonFabric.CreateButton(menuBtn)
        let shopComponent    = FrameFabric.CreateFrame(shop)
        let shopBtnComponent = ButtonFabric.CreateButton(shopBtn)
        
        
        shopBtnComponent.BindToClick(() => {
            print(2)
        })

        menuComponent.BindToOpen((arg) => {
            let anim = UIAnimations.TestAnimation(arg, new TweenInfo(1), {position: new UDim2(0.229, 0, 0.151, 0), size: new UDim2(0.534, 0, 0.724, 0)})
            anim.Play()
            anim.Completed.Wait()
        })
        
        menuComponent.BindToClose((arg) => {
            let anim = UIAnimations.TestAnimation(arg, new TweenInfo(1), {position: new UDim2(1.229, 0, 1.1511, 0), size: new UDim2(0.534, 0, 0.724, 0)})
            anim.Play()
            anim.Completed.Wait()
        })

        menuBtnComponent.BindToClick(() => {
            print(1)
            menuComponent.Change()
        })

        replica.ListenToChange('Session.coins', (newvalue: number, oldvalue: number) => {
            coins.set(newvalue)
        })
        */

        //let coins   = new Binding<number>(0)

        //coins.AddCallback((val) => {testBtn.Text = tostring(val)})
        //testBtnComp.BindToClick((arg: GuiButton) => { print(1) })

        
    }

    onStart() {
        
    }
}
