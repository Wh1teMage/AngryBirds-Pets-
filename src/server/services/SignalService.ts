import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { MarketService } from "./MarketService";
import { ContextCallbacks } from "server/static/ContextStatic";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { BuyType } from "shared/interfaces/EggData";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { TradeRequest, TradeRequestManager } from "server/classes/TradeRequestClass";
import { IDBPetData, PetOperationStatus } from "shared/interfaces/PetData";
import { TradeManager } from "server/classes/TradeClass";

@Service({})
export class SignalService implements OnStart, OnInit {
    onInit() {
        
        Events.PurchasePrompt.connect((player: Player, productid: number, giftid?: number) => {
            if (!ServerPlayerFabric.GetPlayer(player)) { return }
            MarketService.MakePurchase(player.UserId, productid, giftid)
        })
        
        Events.RegisterInput.connect((player: Player, name: string, state: Enum.UserInputState) => {
            if (!ServerPlayerFabric.GetPlayer(player)) { return }
            if (!ContextCallbacks.get(name+state)) { warn('Context Doesnt Exist!'); return }

            ContextCallbacks.get(name+state)!(ServerPlayerFabric.GetPlayer(player)!)
        })

        Events.BuyEgg.connect((player: Player, name: string, buytype: BuyType) => {
            if (!ServerPlayerFabric.GetPlayer(player)) { return }
            ServerPlayerFabric.GetPlayer(player)!.BuyEgg(name, buytype)
        })

        Events.RequestTrade.connect((player: Player, operation: RequestOperationStatus, otherPlayer: Player) => {
            print('Accepted Request')
            if (!ServerPlayerFabric.GetPlayer(player) || !ServerPlayerFabric.GetPlayer(otherPlayer)) { return }
            if (operation === RequestOperationStatus.Send) { new TradeRequest(player, otherPlayer) }

            let request = TradeRequestManager.FindTradeRequest(otherPlayer, player)
            if (!request) { return }
            
            if (operation === RequestOperationStatus.Deny ) { request.Deny() }
            if (operation === RequestOperationStatus.Accept ) { 
                let trade = request.Accept()
                if (!ServerPlayerFabric.GetPlayer(player) || !ServerPlayerFabric.GetPlayer(otherPlayer)) { return }

                ServerPlayerFabric.GetPlayer(player)!.SetupTrade(trade)
                ServerPlayerFabric.GetPlayer(otherPlayer)!.SetupTrade(trade)
            }
        })

        Events.ManageTrade.connect((player: Player, operation: TradeOperationStatus, status?: TradeUpdateStatus, pet?: IDBPetData) => {
            print('Update Required')
            let trade = TradeManager.WaitFotTrade(player)
            print(trade)
            if (!trade) { return }

            if (operation === TradeOperationStatus.Accept) { trade.Accept(player) }
            if (operation === TradeOperationStatus.Deny) { trade.Deny() }

            if (!ServerPlayerFabric.GetPlayer(player)) { return }
            if (operation === TradeOperationStatus.Update) {
                trade.Update()
                ServerPlayerFabric.GetPlayer(player).UpdateTrade(pet!, status!)
            }
        })

        Events.ManagePet.connect((player: Player, operation: PetOperationStatus, pet: IDBPetData) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === PetOperationStatus.Equip) { playerComp.EquipPet(pet) }
            if (operation === PetOperationStatus.Unequip) { playerComp.UnequipPet(pet) }

        })

    }

    onStart() {
        
    }
}