import { Networking } from "@flamework/networking";
import { EffectName } from "./enums/EffectEnums";
import { EggBuyType } from "./interfaces/EggData";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "./interfaces/TradeData";
import { IDBPetData, PetOperationStatus, PetReplicationStatus } from "./interfaces/PetData";
import { ToolOperationStatus } from "./interfaces/ToolData";
import { WorldOperationStatus } from "./interfaces/WorldData";
import { WorldType } from "./enums/WorldEnums";
import { RewardType } from "./enums/RewardEnums";
import { FlyingObjectStatus } from "./enums/FlyingObjectEnums";
import { PotionOperationStatus } from "./interfaces/PotionData";
import { PotionType } from "./enums/PotionEnum";
import { ReplicationOperationStatus } from "./enums/ReplicationEnums";
import { RelicOperationStatus } from "./enums/RelicEnums";

interface ClientToServerEvents {
    PurchasePrompt: (productid: number, giftid?: number) => void
    RegisterInput: (name: string, state: Enum.UserInputState) => void
    BuyEgg: (name: string, buytype: EggBuyType) => void

    RequestTrade: (operation: RequestOperationStatus, otherplayer: Player) => void
    ManageTrade: (operation: TradeOperationStatus, status?: TradeUpdateStatus, pet?: IDBPetData) => void
    ManagePet: (operation: PetOperationStatus, pet: IDBPetData, count?: number) => void

    ManagePets: (operation: PetOperationStatus, pets?: IDBPetData[] | string | string[]) => void

    ManageTool: (operation: ToolOperationStatus, toolname: string) => void
    ManageWorld: (operation: WorldOperationStatus, world?: WorldType) => void
    ManagePotion: (operation: PotionOperationStatus, potiontype: PotionType) => void

    ManageRelic: (operation: RelicOperationStatus, name: string, level: number) => void

    ClaimReward: (rewardtype: RewardType, info?: any) => void

    ShootObject: (operation: FlyingObjectStatus, power?: number) => void
    ReplicateValues: (operation: ReplicationOperationStatus, additional?: any) => void
}

interface ServerToClientEvents {
    ReplicateEffect: (name: string, additional?: Map<string, any>) => void
    SendTradeRequest: (requestingplayer: Player) => void
    SendPetReplication: (operation: PetReplicationStatus, newpets?: IDBPetData[], oldpets?: IDBPetData[]) => void
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
