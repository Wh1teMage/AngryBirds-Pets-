import { Controller, OnStart, OnInit } from "@flamework/core";
import { BillboardFabric } from "client/components/UIComponents/BillboardComponent";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { Events } from "client/network";
import { EggsData } from "shared/info/EggInfo";
import { PetsData } from "shared/info/PetInfo";
import { EggBuyType } from "shared/interfaces/EggData";

//basically initializer

@Controller({})
export class EggController implements OnStart, OnInit {

    // can easily connect player service here to check players gamepasses and etc

    onInit() {
        
        for (let egg of EggsData) {

            let name = egg[0]
            let data = egg[1]
            
            /*
            if (!data.model) { continue }

            data.model.Platform.BillboardGui.Main.Price.Text = tostring(data.price)


            let fullchance = 0

            for (let petchance of data.petchances) {
                fullchance += petchance.weight
            }

            for (let petchance of data.petchances) {
                if (!petchance.name) { continue }
                
                let pet = PetsData.get(petchance.name) 

                let port = new Instance('ViewportFrame')
                let model = pet!.model.Clone() 
                
                model.PivotTo(model.GetPivot().mul(pet!.stats.rotationOffset))
                let modelCam = new Instance('Camera')

                modelCam.CFrame = new CFrame(model.GetPivot().LookVector.mul(4).add(model.GetPivot().Position), model.GetPivot().Position)
                
                model.Parent = port
                modelCam.Parent = port
                port.CurrentCamera = modelCam
                port.Name = tostring(petchance.weight)

                port.Parent = data.model.Platform.BillboardGui.Main.Pets

                BillboardFabric.CreateBillboard(data.model.Platform.BillboardGui)

                print('1/'+math.round(fullchance/petchance.weight)+'%', pet?.name+' chance')

                // can be connected to work

                // let buyButton = ButtonFabric.CreateButton(data.model.Platform.BillboardGui.Main.Buy)

                // buyButton.BindToClick(() => { Events.BuyEgg(name, BuyType.Single) })
            }
            */
            
            task.wait(4)
            print('Bought')
            for (let i = 0; i < 3; i++) {
                Events.BuyEgg(name, EggBuyType.Single)
            }
            

        }

    }

    onStart() {
        
    }
}