import { Players } from "@rbxts/services"
import { FIND_TRADE_DURATION, TRADE_ACCEPT_TIME } from "shared/configs/TradeConfig"
import { IDBPetData } from "shared/interfaces/PetData"
import { ITradeObj, ITradingPlayer } from "shared/interfaces/TradeData"

export const ActiveTrades: Trade[] = []

export class Trade implements ITradeObj {

    private _onDeny: Array<() => void> = []
    private _onAccept: Array<() => void> = []

    private _setupTradingPlayers(player: Player) {
        return {
            player: player,
            playerPets: [],
            tradePets: [],
            accepted: false,
        } as ITradingPlayer
    }

    public requestingPlayer!: ITradingPlayer
    public requestedPlayer!: ITradingPlayer

    constructor(requestingPlayer: Player, requestedPlayer: Player) {
        if (TradeManager.IsPlayerInTrade(requestingPlayer) || TradeManager.IsPlayerInTrade(requestedPlayer)) { return }

        this.requestingPlayer = this._setupTradingPlayers(requestingPlayer)
        this.requestedPlayer = this._setupTradingPlayers(requestedPlayer)

        ActiveTrades.push(this)
    }

    public BindToDeny(callback: () => void) { this._onDeny.push(() => { callback() }) }
    public BindToAccept(callback: () => void) { this._onAccept.push(() => { callback() })  }

    public Deny() {
        this.requestingPlayer.accepted = false
        this.requestedPlayer.accepted = false

        this._onDeny.forEach((value) => value())
        ActiveTrades.remove(ActiveTrades.indexOf(this))
    }

    public Accept(player: Player) {
        let currentTime = (TRADE_ACCEPT_TIME*10)+1

        if (player === this.requestingPlayer.player) { this.requestingPlayer.accepted = true }
        if (player === this.requestedPlayer.player) { this.requestedPlayer.accepted = true }

        task.spawn(() => {

            while (this.requestingPlayer.accepted && this.requestedPlayer.accepted) {
                currentTime -= 1
                print(this.requestingPlayer.accepted, this.requestedPlayer.accepted, currentTime)
                if (currentTime < 0) { 
                    this._onAccept.forEach((value) => value())
                    ActiveTrades.remove(ActiveTrades.indexOf(this))
                    break 
                }
                task.wait(1/10)
            }

        })

    }

    public Update() {
        this.requestingPlayer.accepted = false
        this.requestedPlayer.accepted = false
    }
}

export class TradeManager {

    public static WaitFotTrade(player: Player) {
        let trade!: Trade
        let start = tick()
        while (!trade && (tick() - start) < FIND_TRADE_DURATION) {
            ActiveTrades.forEach((value) => { if (value.requestingPlayer.player === player || value.requestedPlayer.player === player) { trade = value as Trade } })
            task.wait(.1)
        }
        return trade
    }

    public static IsPlayerInTrade(player: Player) {
        for (let trade of ActiveTrades) {
            if (trade.requestedPlayer.player === player || trade.requestedPlayer.player === player) { return true }
        }
        return false
    }
    
}
