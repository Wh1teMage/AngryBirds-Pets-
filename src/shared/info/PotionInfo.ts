import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.LuckPotion, {
    duration: 10,
    buffname: 'LuckPotionBuff',
    enableEffect: (player) => {
        player.session.potionmultipliers.luck += .1
    },
    disableEffect: (player) => {
        player.session.potionmultipliers.luck -= .1
    }
})

PotionsData.set(PotionType.StrengthPotion, {
    duration: 10,
    buffname: 'StrengthPotionBuff',
    enableEffect: (player) => {
        player.session.potionmultipliers.strength += 1.1
    },
    disableEffect: (player) => {
        player.session.potionmultipliers.strength -= 1.1
    }
})