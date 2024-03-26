import { Controller, OnStart, OnInit } from "@flamework/core";
import { GUIUtilities } from "client/classes/GUIUtilities";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { Events } from "client/network";
import { EggsData } from "shared/info/EggInfo";
import { PetsData } from "shared/info/PetInfo";
import { EggBuyType } from "shared/interfaces/EggData";
import { PlayerController } from "./PlayerController";

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

        for (let egg of EggsData) {

            let name = egg[0]
            let data = egg[1]
            
            if (!data.model) { continue }

            data.model.Floor.EggPrice.BillboardGui.Frame.Price.Text = GUIUtilities.getSIPrefixSymbol(data.price)
            data.model.Floor.EggUI.BillboardGui.EggFrame.Wins.Value.Text = GUIUtilities.getSIPrefixSymbol(data.price)

            let eggFrame = data.model.Floor.EggUI.BillboardGui.EggFrame

            eggFrame.Passes.Luck.Lock.Visible = profileData.Products.includes('luck1')
            eggFrame.Passes.Luck2.Lock.Visible = profileData.Products.includes('luck2')
            eggFrame.Passes.Luck3.Lock.Visible = profileData.Products.includes('luck3')

            let fullchance = 0

            for (let petchance of data.petchances) {
                fullchance += petchance.weight
            }

            for (let petchance of data.petchances) {
                if (!petchance.name) { continue }
                
                let pet = PetsData.get(petchance.name) 
                if (!pet) { continue }

                let petUI = data.model.Floor.Examples.PetExample.Clone()

                let port = petUI.ViewportFrame
                let model = pet!.model.Clone() 
                
                model.PivotTo(model.GetPivot().mul(pet!.stats.rotationOffset))
                let modelCam = new Instance('Camera')

                modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                
                model.Parent = port
                modelCam.Parent = port
                port.CurrentCamera = modelCam

                petUI.PetName.Text = pet.name
                petUI.Percent.Text = tostring(math.round(fullchance/petchance.weight*100)/100) 

                petUI.Parent = data.model.Floor.EggUI.BillboardGui.EggFrame.Pets

                // print('1/'+math.round(fullchance/petchance.weight)+'%', pet?.name+' chance')

                // can be connected to work

                let buyButton1 = ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.EggFrame.Buttons.E)
                let buyButton2 = ButtonFabric.CreateButton(data.model.Floor.EggUI.BillboardGui.EggFrame.Buttons.R)

                buyButton1.BindToClick(() => { Events.BuyEgg(name, EggBuyType.Single) })
                buyButton2.BindToClick(() => { Events.BuyEgg(name, EggBuyType.Triple) })

                data.model.Floor.EggUI.BillboardGui.Adornee = data.model.Floor.EggUI
                
                BillboardFabric.CreateBillboard(data.model.Floor.EggUI.BillboardGui)

                data.model.Floor.EggUI.BillboardGui.Name = name
                data.model.Floor.EggUI.WaitForChild(name)!.Parent = this._playerController.component.instance.WaitForChild('PlayerGui').WaitForChild('MainUI').WaitForChild('EggGui')
            }

        }

    }

    onStart() {
        
    }
}