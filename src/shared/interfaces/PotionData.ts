import { IServerPlayerComponent } from "./PlayerData"

export interface IPotionData {
    duration: number
    buffname: string
    enableEffect: (player: IServerPlayerComponent) => void
    disableEffect: (player: IServerPlayerComponent) => void
}