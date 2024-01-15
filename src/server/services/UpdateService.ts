import { Service, OnStart, OnInit } from "@flamework/core";
import { Players, TeleportService } from "@rbxts/services";

@Service({})
export class UpdateService implements OnStart, OnInit {
    onInit() {
        
        game.BindToClose(() => {

            let reservedServer = TeleportService.ReserveServer(game.PlaceId)
            TeleportService.TeleportToPrivateServer(game.PlaceId, reservedServer[0], Players.GetPlayers())

            Players.PlayerAdded.Connect((player) => {
                player.Kick('Server is being updated!')
            })

            task.wait(10) // to make sure that all players will teleport

        })

    }

    onStart() {
        
    }
}