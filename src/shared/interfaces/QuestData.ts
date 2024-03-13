import { IServerPlayerComponent } from "./PlayerData"
import { IRewardData } from "./RewardData"

export interface IQuestData {
    requirements: Map<string, any>
    reward: IRewardData
    checkCallback?: (player: IServerPlayerComponent) => boolean
}