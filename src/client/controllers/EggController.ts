import { Controller, OnStart, OnInit } from "@flamework/core";
import { GUIUtilities } from "client/classes/GUIUtilities";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { Events } from "client/network";
import { EggsData } from "shared/info/EggInfo";
import { PetsData } from "shared/info/PetInfo";
import { EggBuyType, EggValueType, IEggData, IEggModel } from "shared/interfaces/EggData";
import { PlayerController } from "./PlayerController";
import { FrameFabric } from "client/components/UIComponents/FrameComponent";
import { ImageFabric } from "client/components/UIComponents/ImageComponent";
import { UIAnimations } from "shared/utility/UIAnimations";
import { StarterGui, ReplicatedStorage } from "@rbxts/services";
import { PetOperationStatus } from "shared/interfaces/PetData";

//basically initializer

@Controller({})
export class EggController implements OnStart, OnInit {

    // can easily connect player service here to check players gamepasses and etc

    private _playerController: PlayerController

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    onInit() {
        
        if (!this._playerController.fullyLoaded) { this._playerController.loadSignal.Wait() }

        let profileData = this._playerController.replica.Data.Profile

        print(EggsData, 'EggsData')

        this._playerController.autoDeletePets.AddCallback((val) => {
            Events.ManagePets(PetOperationStatus.SessionAutoDelete, val);
        })

        let eggMainUI = this._playerController.component.instance.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('EggGui')

        for (let egg of EggsData) {

            let name = egg[0]
            let data = egg[1]
            
            print(data.model, data.valuetype, data.name)
            if (!data.model) { continue }

            let billboardPrice = data.model.WaitForChild('Floor').WaitForChild('EggPrice').WaitForChild('BillboardGui')!
            let billboardUI = data.model.WaitForChild('Floor').WaitForChild('EggUI').WaitForChild('BillboardGui')!

            let price = billboardPrice.WaitForChild('Frame')!.WaitForChild('Price')! as TextLabel
            let winsValue = billboardUI.WaitForChild('Frame')!.WaitForChild('EggFrame')!.WaitForChild('Wins')!.WaitForChild('Value')! as TextLabel

            //data.model.Floor.EggPrice.BillboardGui.Frame.Price.Text = GUIUtilities.getSIPrefixSymbol(data.price)
            //data.model.Floor.EggUI.BillboardGui.EggFrame.Wins.Value.Text = GUIUtilities.getSIPrefixSymbol(data.price)

            price.Text = GUIUtilities.getSIPrefixSymbol(data.price)
            winsValue.Text = GUIUtilities.getSIPrefixSymbol(data.price)

            let eggFrame = data.model.Floor.EggUI.BillboardGui.Frame.EggFrame
            let passes = data.model.Floor.EggUI.BillboardGui.Frame.Passes

            passes.Luck.Lock.Visible = false
            passes.Luck2.Lock.Visible = !profileData.Products.includes('luck1')
            passes.Luck3.Lock.Visible = !profileData.Products.includes('luck2')

            eggFrame.EggName.Text = data.name

            ButtonFabric.CreateButton(passes.Luck).BindToClick(() => { Events.PurchasePrompt(722093437) })
            ButtonFabric.CreateButton(passes.Luck2).BindToClick(() => { Events.PurchasePrompt(1779469996) })
            ButtonFabric.CreateButton(passes.Luck3).BindToClick(() => { Events.PurchasePrompt(1779470301) })

            ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.Frame.x3Open).BindToClick(() => { Events.PurchasePrompt(721794896) })

            let fullchance = 0

            for (let petchance of data.petchances) {
                fullchance += petchance.weight
            }

            let buyButton1 = ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.Frame.EggFrame.Buttons.E)
            let buyButton2 = ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.Frame.EggFrame.Buttons.R)
            let buyButton3 = ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.Frame.EggFrame.Buttons.T)

            buyButton1.BindToClick(() => { Events.BuyEgg(name, EggBuyType.Single) })
            buyButton2.BindToClick(() => { Events.BuyEgg(name, EggBuyType.Triple) })
            buyButton3.BindToClick(() => { PlayerController.autoEgg = !PlayerController.autoEgg })

            let eggBillboard = BillboardFabric.CreateBillboard(data.model.Floor.EggUI.BillboardGui)
            let eggImageComponent = ImageFabric.CreateImage(data.model.Floor.EggUI.BillboardGui.Frame, true)
            eggImageComponent.CanBeClosedByOthers = false

            eggImageComponent.BindToOpen((obj) => {
                UIAnimations.MainFrameAnimationOpen(obj, {position: obj.Position, size: UDim2.fromScale(0.8, 1)})
            })

            eggImageComponent.BindToClose((obj) => {
                UIAnimations.MainFrameAnimationClose(obj, {position: obj.Position, size: UDim2.fromScale(0, 0)})
            })

            eggImageComponent.Close()
            eggBillboard.Leave()

            eggBillboard.BindToEnter((arg) => { 
                data.model!.Floor.EggPrice.BillboardGui.Enabled = false; 
                task.spawn(() => { eggImageComponent.Open() })
                arg.Parent = eggMainUI

                for (let obj of eggImageComponent.instance.WaitForChild('EggFrame')!.WaitForChild('Pets')!.GetChildren()) {
                    
                    if (!obj.IsA('ImageButton')) { continue }
                    let viewport = obj.WaitForChild('ViewportFrame') as ViewportFrame
                    let model = viewport.FindFirstChildWhichIsA('Model')!
                    viewport.CurrentCamera!.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                }

                //{0.9, 0},{0.897, 0}
            })
            eggBillboard.BindToLeave((arg) => { 
                data.model!.Floor.EggPrice.BillboardGui.Enabled = true; 
                task.spawn(() => { eggImageComponent.Close() })
                arg.Parent = data.model! //game.Workspace.Terrain
            })

            for (let petchance of data.petchances) {
                if (!petchance.name) { continue }
                
                let pet = PetsData.get(petchance.name) 
                if (!pet) { continue }

                let petUI = StarterGui.WaitForChild('MainUI').WaitForChild('PetInventory').WaitForChild('Template').WaitForChild('PetExample').Clone() as GuiButton
                //data.model.Floor.Examples.PetExample.Clone()

                petUI.Visible = true

                let port = petUI.WaitForChild('ViewportFrame') as ViewportFrame
                let model = pet!.model.Clone() 

                let petNameUI = petUI.WaitForChild('PetName')! as TextLabel
                let petChanceUI = petUI.WaitForChild('Percent')! as TextLabel
                
                model.PivotTo(model.GetPivot().mul(pet!.stats.rotationOffset))
                let modelCam = new Instance('Camera')

                modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                
                model.Parent = port
                modelCam.Parent = port
                port.CurrentCamera = modelCam

                petNameUI.Text = pet.name
                petChanceUI.Text = tostring(math.round(petchance.weight/fullchance*100*100)/100)+'%'

                petChanceUI.Visible = true

                petUI.Parent = data.model.Floor.EggUI.BillboardGui.Frame.EggFrame.Pets

                let gradient = ReplicatedStorage.WaitForChild('PetRarities').WaitForChild(pet.stats.rarity)
                if (gradient) { gradient.Clone().Parent = petUI }

                ButtonFabric.CreateButton(petUI).BindToClick(() => {

                    let deletePets = this._playerController.autoDeletePets.get()
                    let deleteUI = (petUI.WaitForChild('X') as ImageLabel)

                    if (deletePets.includes(pet!.name) && deleteUI.Visible) {

                        deleteUI.Visible = false

                        deletePets.remove(deletePets.indexOf(pet!.name)!)
                        this._playerController.autoDeletePets.set(deletePets)

                        return
                    }

                    deleteUI.Visible = true

                    deletePets.push(pet!.name);
                    this._playerController.autoDeletePets.set(deletePets)
                })

                // print('1/'+math.round(fullchance/petchance.weight)+'%', pet?.name+' chance')

                // can be connected to work

            }
            
            eggBillboard.instance.Adornee = data.model!.Floor.EggUI

            eggBillboard.instance.Parent = data.model! //game.Workspace.Terrain
            eggBillboard.instance.Name = name
        }

    }

    onStart() {
        
    }
}