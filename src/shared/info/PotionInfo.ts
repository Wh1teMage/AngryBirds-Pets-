import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.LuckPotion, {
    duration: 10,
    buffname: 'LuckPotionBuff',
    enableEffect: (player) => {
        player.session.multipliers.luck += .1
    },
    disableEffect: (player) => {
        player.session.multipliers.luck -= .1
    }
})