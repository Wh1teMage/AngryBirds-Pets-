import { BadgeType, IBadgeData } from "shared/interfaces/BadgeData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { WorldsData } from "./WorldInfo";
import { WorldType } from "shared/enums/WorldEnums";

export const badgeCallbacks = new Map<string, IBadgeData>()


badgeCallbacks.set('start', {
    name: 'start',
    valueType: BadgeType.Start,
    badgeId: 4458949753959920,
    checkCallback: (player: IServerPlayerComponent) => {
        return true
    }
})

badgeCallbacks.set('strength1', {
    name: 'strength1',
    valueType: BadgeType.Strength,
    badgeId: 1402713115979695,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 100) { return }
        return true
    }
})

badgeCallbacks.set('strength2', {
    name: 'strength2',
    valueType: BadgeType.Strength,
    badgeId: 179773573008865,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 100000) { return }
        return true
    }
})

badgeCallbacks.set('strength3', {
    name: 'strength3',
    valueType: BadgeType.Strength,
    badgeId: 2025510791379697,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 1000000) { return }
        return true
    }
})

badgeCallbacks.set('strength4', {
    name: 'strength4',
    valueType: BadgeType.Strength,
    badgeId: 2774256216673345,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 1000000000) { return }
        return true
    }
})

badgeCallbacks.set('strength5', {
    name: 'strength5',
    valueType: BadgeType.Strength,
    badgeId: 4334145332767751,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 1000000000*1000) { return }
        return true
    }
})

badgeCallbacks.set('strength6', {
    name: 'strength6',
    valueType: BadgeType.Strength,
    badgeId: 2196421355508172,
    checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.Values.StrengthVal < 1000000000*1000000) { return }
        return true
    }
})