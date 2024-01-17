import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.LuckPotion, {
    duration: 10,
    buffname: 'LuckPotionBuff',
    enableEffect: (player) => {
        player.session.multipliers.potion.luck += .1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.luck -= .1
    }
})

PotionsData.set(PotionType.StrengthPotion, {
    duration: 10,
    buffname: 'StrengthPotionBuff',
    enableEffect: (player) => {
        player.session.multipliers.potion.strength += 1.1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.strength -= 1.1
    }
})