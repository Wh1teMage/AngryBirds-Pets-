
import { badgeCallbacks } from "shared/info/BadgeInfo";
import { BadgeType, IBadgeData } from "shared/interfaces/BadgeData";

export class BadgeManager {

    public static GetBadgeById(id: number) {
        let badge: IBadgeData | undefined
        badgeCallbacks.forEach((value) => { if (value.badgeId === id) { badge = value } })
        return badge
    }

    public static GetBadgesByType(badgetype: BadgeType) {
        let badges: IBadgeData[] = []
        badgeCallbacks.forEach((value) => { if (value.valueType === badgetype) { badges.push(value) } })
        return badges
    }

}