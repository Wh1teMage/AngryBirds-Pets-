import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { MarketService } from "./MarketService";
import { ContextCallbacks } from "server/static/ContextStatic";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { EggBuyType } from "shared/interfaces/EggData";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { TradeRequest, TradeRequestManager } from "server/classes/TradeRequestClass";
import { IDBPetData, PetOperationStatus } from "shared/interfaces/PetData";
import { TradeManager } from "server/classes/TradeClass";
import { ToolOperationStatus } from "shared/interfaces/ToolData";
import { WorldOperationStatus } from "shared/interfaces/WorldData";
import { WorldType } from "shared/enums/WorldEnums";
import { RewardType } from "shared/enums/RewardEnums";
import { FlyingObjectStatus } from "shared/enums/FlyingObjectEnums";
import { WorldsData } from "shared/info/WorldInfo";
import { PotionOperationStatus } from "shared/interfaces/PotionData";
import { PotionType } from "shared/enums/PotionEnum";
import { ReplicationOperationStatus } from "shared/enums/ReplicationEnums";

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

        Events.BuyEgg.connect((player: Player, name: string, buytype: EggBuyType) => {
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

        Events.ManagePet.connect((player: Player, operation: PetOperationStatus, pet: IDBPetData, count?: number) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === PetOperationStatus.Equip) { playerComp.EquipPet(pet) }
            if (operation === PetOperationStatus.Unequip) { playerComp.UnequipPet(pet) }
            if (operation === PetOperationStatus.Lock) { playerComp.LockPet(pet) }
            if (operation === PetOperationStatus.Delete) { playerComp.RemovePet(pet) }
            if (operation === PetOperationStatus.CraftSize) { playerComp.UpgradePetSize(pet) }
            if (operation === PetOperationStatus.Evolve) { playerComp.UpgradePetEvolution(pet, count) }
            if (operation === PetOperationStatus.ClaimVoid) { playerComp.ClaimVoidPet(pet) }
            if (operation === PetOperationStatus.Mutate) { playerComp.UpgradePetMutation(pet, count!) }
            if (operation === PetOperationStatus.RemoveMutation) { playerComp.RemovePetMutation(pet) }
            if (operation === PetOperationStatus.SkipVoid) { playerComp.session.selectedVoid = pet; MarketService.MakePurchase(player.UserId, 1802315798) }
        })

        Events.ManagePets.connect((player: Player, operation: PetOperationStatus, pets?: IDBPetData[] | string | string[]) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === PetOperationStatus.CraftAll) { playerComp.CraftAll() }
            if (operation === PetOperationStatus.EquipBest) { playerComp.EquipBest() }
            if (operation === PetOperationStatus.UnequipAll) { playerComp.UnequipAll() }
            if (operation === PetOperationStatus.MultiDelete) { playerComp.RemovePets(pets as IDBPetData[]) }
            if (operation === PetOperationStatus.MultiLock) { playerComp.MultiLock(pets as IDBPetData[]) }
            if (operation === PetOperationStatus.MultiUnlock) { playerComp.MultiUnlock(pets as IDBPetData[]) }
            if (operation === PetOperationStatus.SessionAutoDelete) { playerComp.UpdateAutoDelete(pets as string[]) }
        })

        Events.ManageTool.connect((player: Player, operation: ToolOperationStatus, toolname: string) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === ToolOperationStatus.Equip) { playerComp.EquipTool(toolname) }
            if (operation === ToolOperationStatus.Buy) { playerComp.BuyTool(toolname) }
            if (operation === ToolOperationStatus.Use) { playerComp.UseTool() }
        })

        Events.ManageWorld.connect((player: Player, operation: WorldOperationStatus, world?: WorldType) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === WorldOperationStatus.Buy) { playerComp.BuyMaxWorld(world!) }
            if (operation === WorldOperationStatus.Teleport) { playerComp.UseWorldTeleport(world!) }
            if (operation === WorldOperationStatus.BuyAll) { WorldsData.forEach((value, key) => { playerComp.BuyMaxWorld(key) }) }
        })

        Events.ShootObject.connect((player: Player, operation: FlyingObjectStatus, power?: number) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }
            
            if (operation === FlyingObjectStatus.IniticalizeObject) { playerComp.InitializeObject() }
            if (operation === FlyingObjectStatus.ShootObject) { 
                let redactedPower = math.clamp(power!, .1, 1)*0.2+1
                print(redactedPower)
                if (playerComp.profile.Data.Products.includes('instantpower')) { redactedPower = 1.2 }
                playerComp.ShootObject(redactedPower)
             }
            
        })

        Events.ClaimReward.connect((player: Player, rewardtype: RewardType, info?: any) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            //if (rewardtype === RewardType.PetQuest) { playerComp.ClaimPetQuestReward() } // make sure to comment ALL disabled pet quests (otherwise it will run poorly)
            if (rewardtype === RewardType.Session) { playerComp.ClaimSessionReward(info!) }
            if (rewardtype === RewardType.Daily) { playerComp.ClaimDailyReward() }
            if (rewardtype === RewardType.Code) { playerComp.RedeemCode(info!) }
            if (rewardtype === RewardType.Rebirth) { playerComp.DoRebirth() }
            if (rewardtype === RewardType.FollowQuest) { playerComp.ClaimFollowReward() }
            if (rewardtype === RewardType.SpinWheel) { playerComp.ClaimSpinReward() }
            if (rewardtype === RewardType.DailyChest) { playerComp.ClaimDailyChest() }
            if (rewardtype === RewardType.GroupChest) { playerComp.ClaimGroupChest() }
            if (rewardtype === RewardType.FollowCode) { playerComp.RedeemFollowCode(info!) }
        })

        Events.ManagePotion.connect((player: Player, operation: PotionOperationStatus, potiontype: PotionType) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === PotionOperationStatus.Use) { playerComp.UsePotion(potiontype) }
        })

        Events.ReplicateValues.connect((player: Player, operation: ReplicationOperationStatus, additional?: any) => {
            let playerComp = ServerPlayerFabric.GetPlayer(player)
            if (!playerComp) { return }

            if (operation === ReplicationOperationStatus.AutoShoot) { playerComp.profile.Data.StatValues.WasShooting = additional as boolean }
            if (operation === ReplicationOperationStatus.AutoTrain) { playerComp.profile.Data.StatValues.WasTraining = additional as boolean }
            if (operation === ReplicationOperationStatus.Favorite) { playerComp.profile.Data.StatValues.Favorited = additional as boolean }
            if (operation === ReplicationOperationStatus.AutoRebirth) { playerComp.profile.Data.StatValues.WasRebirthing = additional as boolean }
        })

    }

    onStart() {
        
    }
}