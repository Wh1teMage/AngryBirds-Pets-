import { IDBPetData } from "./PetData"

export enum TradeUpdateStatus {
    Add = 'Add',
    Remove = 'Remove',
}

export enum TradeOperationStatus {
    Accept = 'Accept',
    Update = 'Update',
    Deny = 'Deny',
}

export enum RequestOperationStatus {
    Send = 'Send',
    Deny = 'Deny',
    Accept = 'Accept',
}

export interface ITradingPlayer {
    player: Player
    tradePets: IDBPetData[]
    playerPets: IDBPetData[]
    accepted: boolean
}

export interface ITradeObj {
    requestingPlayer: ITradingPlayer, 
    requestedPlayer: ITradingPlayer,

    Deny(): void,
    Accept(player: Player): void,
}