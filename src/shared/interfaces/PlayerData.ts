import { Replica } from "@rbxts/replicaservice";
import { IProfileData } from "./ProfileData"
import { ISessionData } from "./SessionData";
import { Profile, ProfileMetaData } from "@rbxts/profileservice/globals";

declare global {
    interface Replicas{
        PlayerData: {
            Data: {
                Profile: IProfileData;
                Session: ISessionData
            }
            
            Tags: {};
        }
    }
}
export type PlayerDataReplica = Replica<'PlayerData'>;

export interface IServerPlayerComponent {
    profile: Profile<IProfileData, ProfileMetaData>
    replica: PlayerDataReplica
    session: ISessionData
    instance: Player
    isLoaded: boolean
}
