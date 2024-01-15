import { Controller, OnStart, OnInit } from "@flamework/core";
import { PlayEffect } from "client/static/EffectsStatic";
import { Events } from "client/network";
import { RequestOperationStatus } from "shared/interfaces/TradeData";
import { Players } from "@rbxts/services";

const localPlayer = Players.LocalPlayer

@Controller({})
export class SignalController implements OnStart, OnInit {
    onInit() {
        Events.ReplicateEffect.connect((name, additional) => {
            PlayEffect(name, additional)
        })

        Events.SendTradeRequest.connect((requestingPlayer: Player) => {
            task.wait(1)
            Events.RequestTrade.fire(RequestOperationStatus.Accept, requestingPlayer)
        })
    }

    onStart() {
        
    }
}