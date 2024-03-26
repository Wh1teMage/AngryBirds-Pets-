import { BadgeType, IBadgeData } from "shared/interfaces/BadgeData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { WorldsData } from "./WorldInfo";
import { WorldType } from "shared/enums/WorldEnums";

export const badgeCallbacks = new Map<string, IBadgeData>()

badgeCallbacks.set('friend', {
    name: 'friend',
    valueType: BadgeType.Friend,
    badgeId: 4337298863114220,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.FriendsCount < 1) { return }
        return true
    }
})

badgeCallbacks.set('start', {
    name: 'start',
    valueType: BadgeType.Start,
    badgeId: 1457701305630768,
    checkCallback: (player: IServerPlayerComponent) => {
        return true
    }
})

badgeCallbacks.set('world2', {
    name: 'world2',
    valueType: BadgeType.World,
    badgeId: 2214193672948978,
    checkCallback: (player: IServerPlayerComponent) => {
        if (WorldsData.get(player.profile.Data.Config.MaxWorld)!.weight < WorldsData.get(WorldType.Cyber)!.weight) { return }
        return true
    }
})

badgeCallbacks.set('world3', {
    name: 'world3',
    valueType: BadgeType.World,
    badgeId: 1075416209548324,
    checkCallback: (player: IServerPlayerComponent) => {
        if (WorldsData.get(player.profile.Data.Config.MaxWorld)!.weight < WorldsData.get(WorldType.Space)!.weight) { return }
        return true
    }
})