import { Components } from "@flamework/components";
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { ReplicaController } from "@rbxts/replicaservice";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import { ClientPlayerComponent, ClientPlayerFabric } from "client/components/PlayerComponent";
import { ButtonFabric } from "client/components/UIComponents/ButtonComponent";
import { FrameComponent, FrameFabric } from "client/components/UIComponents/FrameComponent";
import { ILocalPlayer } from "shared/interfaces/LocalData";
import { PlayerDataReplica } from "shared/interfaces/PlayerData";

@Controller({})
export class PlayerController implements OnStart, OnInit, ILocalPlayer {

    public component!: ClientPlayerComponent
    public replica!: PlayerDataReplica
    public loadSignal = new Signal<() => void>()
    public fullyLoaded = false

    onInit() {
        
        this.component = ClientPlayerFabric.CreatePlayer(Players.LocalPlayer)

        ReplicaController.ReplicaOfClassCreated('PlayerData', (replica) => {
            //print(replica)
            this.replica = replica
            print('Replica Loaded')
            this.loadSignal.Fire()
            this.fullyLoaded = true
        })

        ReplicaController.RequestData()
    }

    onStart() {

    }
}