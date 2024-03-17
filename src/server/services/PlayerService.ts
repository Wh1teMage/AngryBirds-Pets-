import { Components } from "@flamework/components";
import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Players } from "@rbxts/services";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { Rarities, Sizes } from "shared/interfaces/PetData";
import { MarketService } from "./MarketService";
import { MarketNamings } from "shared/info/MarketInfo";

@Service({})
export class PlayerService implements OnStart, OnInit {
    onInit() {
        
        Players.PlayerAdded.Connect((player) => {
            let component = ServerPlayerFabric.CreatePlayer(player)

            MarketNamings.forEach((val, key) => {
                MarketService.GamepassCheck(component.instance.UserId, key)
            })
        })

        Players.PlayerRemoving.Connect((player) => {
            ServerPlayerFabric.GetPlayer(player).OnLeft()
        })

    }

    onStart() {
        
    }
}