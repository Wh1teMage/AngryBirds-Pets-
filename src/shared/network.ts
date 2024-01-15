import { Networking } from "@flamework/networking";
import { EffectName } from "./enums/EffectEnums";
import { BuyType } from "./interfaces/EggData";
import { RequestOperationStatus, TradeOperationStatus, TradeUpdateStatus } from "./interfaces/TradeData";
import { IDBPetData, PetOperationStatus } from "./interfaces/PetData";

interface ClientToServerEvents {
    PurchasePrompt: (productid: number, giftid?: number) => void
    RegisterInput: (name: string, state: Enum.UserInputState) => void
    BuyEgg: (name: string, buytype: BuyType) => void

    RequestTrade: (operation: RequestOperationStatus, otherPlayer: Player) => void
    ManageTrade: (operation: TradeOperationStatus, status?: TradeUpdateStatus, pet?: IDBPetData) => void
    ManagePet: (operation: PetOperationStatus, pet: IDBPetData) => void
}

interface ServerToClientEvents {
    ReplicateEffect: (name: EffectName, additional?: Map<string, any>) => void
    SendTradeRequest: (requestingPlayer: Player) => void
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
