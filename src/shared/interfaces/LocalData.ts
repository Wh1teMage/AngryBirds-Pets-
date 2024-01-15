import { BaseComponent } from "@flamework/components";
import { PlayerDataReplica } from "./PlayerData";

export interface ILocalPlayer {
    component: IClientPlayerComponent,
    replica: PlayerDataReplica
}

export interface IClientPlayerComponent extends BaseComponent<{}, Player> {

}