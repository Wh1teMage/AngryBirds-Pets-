import { IServerPlayerComponent } from "./PlayerData"

export interface IBadgeData {
    name: string
    valueType: BadgeType
    badgeId: number
    checkCallback: (player: IServerPlayerComponent) => boolean | void

}

export enum BadgeType {
    Start = 'Start',
    World = 'World',
    Friend = 'Friend',
    Strength = 'Strength',
}