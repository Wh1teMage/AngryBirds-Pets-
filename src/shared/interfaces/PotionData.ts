import { IServerPlayerComponent } from "./PlayerData"

export interface IPotionData {
    duration: number
    enableEffect: (player: IServerPlayerComponent) => void
    disableEffect: (player: IServerPlayerComponent) => void
}