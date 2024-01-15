import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { IClientPlayerComponent } from "shared/interfaces/LocalData";
import { Events } from "client/network";

interface Attributes {}

@Component({})
export class ClientPlayerComponent extends BaseComponent<Attributes, Player> implements OnStart, IClientPlayerComponent {
    onStart() {
        task.wait(3)
        Events.PurchasePrompt.fire(1701055226, this.instance.UserId)

    }
}

export class ClientPlayerFabric {

    static CreatePlayer(player: Player) {
        return Dependency<Components>().addComponent<ClientPlayerComponent>(player)
    }

}