import { Components } from "@flamework/components";
import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { Rarities, Sizes } from "shared/interfaces/PetData";

@Service({})
export class PlayerService implements OnStart, OnInit {
    onInit() {
        
        Players.PlayerAdded.Connect((player) => {
            ServerPlayerFabric.CreatePlayer(player)
        })

        Players.PlayerRemoving.Connect((player) => {
            ServerPlayerFabric.GetPlayer(player).OnLeft()
        })

    }

    onStart() {
        
    }
}