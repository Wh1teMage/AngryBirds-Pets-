import { TRADE_REQUEST_TIMEOUT } from "shared/configs/TradeConfig"
import { Trade, TradeManager } from "./TradeClass"
import { Events } from "server/network"

export const ActiveTradeRequests = new Map<Player, TradeRequest>()

export class TradeRequest {

    public requestingPlayer!: Player
    public requestedPlayer!: Player

    private _onAccept = () => {
        ActiveTradeRequests.delete(this.requestingPlayer)
        return new Trade(this.requestingPlayer, this.requestedPlayer)
    }

    private _onDeny = () => {
        ActiveTradeRequests.delete(this.requestingPlayer)
    }

    constructor(requestingPlayer: Player, requestedPlayer: Player) { // disable self trading
        if (TradeManager.IsPlayerInTrade(requestingPlayer) || TradeManager.IsPlayerInTrade(requestedPlayer)) { return }

        this.requestingPlayer = requestingPlayer
        this.requestedPlayer = requestedPlayer

        ActiveTradeRequests.set(requestingPlayer, this)

        task.delay(TRADE_REQUEST_TIMEOUT, () => {
            if (ActiveTradeRequests.get(requestingPlayer)?.requestedPlayer !== requestedPlayer) { return }
            ActiveTradeRequests.delete(requestingPlayer)
        })

        Events.SendTradeRequest(requestedPlayer, requestingPlayer)
    }

    public Accept() {
        return this._onAccept()
    }

    public Deny() {
        return this._onDeny()
    }

}

export class TradeRequestManager {

    public static FindTradeRequest(requestingPlayer: Player, requestedPlayer: Player) {
        let trade!: TradeRequest
        ActiveTradeRequests.forEach((value, key) => {
            if (value.requestingPlayer === requestingPlayer && value.requestedPlayer === requestedPlayer) { trade = value }
        })
        return trade
    }

}