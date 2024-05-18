import { Controller, OnStart, OnInit } from "@flamework/core";
import { PlayEffect } from "client/static/EffectsStatic";
import { Events } from "client/network";
import { RequestOperationStatus } from "shared/interfaces/TradeData";
import { Players } from "@rbxts/services";
import { UIController } from "./UIController";
import { IDBPetData, PetReplicationStatus } from "shared/interfaces/PetData";

const localPlayer = Players.LocalPlayer

@Controller({})
export class SignalController implements OnStart, OnInit {

    private _UIController: UIController

    constructor(uiController: UIController) {
        this._UIController = uiController
    }

    onInit() {
        Events.ReplicateEffect.connect((name, additional) => {
            PlayEffect(name, additional)
        })

        Events.SendTradeRequest.connect((requestingPlayer: Player) => {
            task.wait(1)
            Events.RequestTrade.fire(RequestOperationStatus.Accept, requestingPlayer)
        })

        Events.SendPetReplication.connect((operation: PetReplicationStatus, newpets?: IDBPetData[], oldpets?: IDBPetData[]) => {

            print(operation, newpets, oldpets)

            //if (operation === PetReplicationStatus.Append) { this._UIController.appendPetInventory(newpets!) }
            //if (operation === PetReplicationStatus.Remove) { this._UIController.removePetInventory(newpets!) }
            //if (operation === PetReplicationStatus.Update) { this._UIController.updatePetInventory(oldpets!, newpets!) }

        })
    }

    onStart() {
        
    }
}