import ProfileService from "@rbxts/profileservice";
import { ProfileMetaData } from "@rbxts/profileservice/globals";
import { DataStoreService, Players } from "@rbxts/services";
import { GlobalDataService } from "server/classes/GlobalDataStoreService";
import { OrderedDataService } from "server/classes/OrderedDataStoreService";
import { DBName, ORDERED_UPDATE_TIME, defaultValue } from "shared/configs/ProfileConfig";
import { IOrderedData, IProfileData } from "shared/interfaces/ProfileData";
import Functions from "shared/utility/LuaUtilFunctions";

let IsStarted = false

let StartUpdating = () => {
    if (IsStarted) { return }
    IsStarted = true

    task.spawn(() => {
        
        while (true) {
            print('Replicating')
    
            OrderedDataService.updateValues()
            OrderedDataService.replicateLeaderboardValues()
            GlobalDataService.updateValues()
            task.wait(ORDERED_UPDATE_TIME)
        }
        
    })
}



const ProfileData = ProfileService.GetProfileStore<IProfileData, ProfileMetaData>(DBName, defaultValue)

export const LoadProfile = (player: Player) => {

    let profile = ProfileData.LoadProfileAsync(tostring(player.UserId));

    if (!profile){
        player.Kick("Profile wasnt found! Please rejoin");
        return
    }
    print('Loaded', profile.Data)
    profile.Data = Functions.constuctData(profile.Data, defaultValue) as IProfileData
    profile.Data.CONSTANTS = defaultValue.CONSTANTS

    print('Formatted', profile.Data)
    print('Current Tool', profile.Data.EquippedTool)

    print('ReplicReplicatingReplicatingReplicatingReplicatingating')
    StartUpdating()

    profile.AddUserId(player.UserId);
    profile.ListenToRelease(()=>{
        OrderedDataService.saveValues(tostring(player.UserId), profile!.Data)
        player.Kick("Profile was released!");
    });

    if (player.IsDescendantOf(Players)) {
        return profile;
    }

    return profile
}

