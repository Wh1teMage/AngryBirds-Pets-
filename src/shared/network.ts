import { Networking } from "@flamework/networking";
import { EffectName } from "./enums/EffectEnums";
import { BuyType } from "./interfaces/EggData";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "./interfaces/TradeData";
import { IDBPetData, PetOperationStatus } from "./interfaces/PetData";
import { ToolOperationStatus } from "./interfaces/ToolData";
import { WorldOperationStatus } from "./interfaces/WorldData";
import { WorldType } from "./enums/WorldEnums";
import { RewardType } from "./enums/RewardEnums";
import { FlyingObjectStatus } from "./enums/FlyingObjectEnums";

interface ClientToServerEvents {
    PurchasePrompt: (productid: number, giftid?: number) => void
    RegisterInput: (name: string, state: Enum.UserInputState) => void
    BuyEgg: (name: string, buytype: BuyType) => void

    RequestTrade: (operation: RequestOperationStatus, otherplayer: Player) => void
    ManageTrade: (operation: TradeOperationStatus, status?: TradeUpdateStatus, pet?: IDBPetData) => void
    ManagePet: (operation: PetOperationStatus, pet: IDBPetData, count?: number) => void

    ManageTool: (operation: ToolOperationStatus, toolname: string) => void
    ManageWorld: (operation: WorldOperationStatus, world?: WorldType) => void

    ClaimReward: (rewardtype: RewardType, info?: any) => void

    ShootObject: (operation: FlyingObjectStatus, power?: number) => void
}

interface ServerToClientEvents {
    ReplicateEffect: (name: string, additional?: Map<string, any>) => void
    SendTradeRequest: (requestingplayer: Player) => void
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
