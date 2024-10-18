import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.StrengthPotion2, {
    duration: 15*60,
    buffname: 'StrengthPotion2Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.strength += 1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.strength -= 1
    }
})

PotionsData.set(PotionType.StrengthPotion3, {
    duration: 15*60,
    buffname: 'StrengthPotion3Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.strength += 2
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.strength -= 2
    }
})

PotionsData.set(PotionType.StrengthPotion4, {
    duration: 5*60,
    buffname: 'StrengthPotion4Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.strength += 1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.strength -= 1
    }
})

PotionsData.set(PotionType.GemsPotion2, {
    duration: 15*60,
    buffname: 'GemsPotion2Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.gems += 1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.gems -= 1
    }
})

PotionsData.set(PotionType.GemsPotion3, {
    duration: 15*60,
    buffname: 'GemsPotion3Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.gems += 2
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.gems -= 2
    }
})

PotionsData.set(PotionType.GemsPotion4, {
    duration: 5*60,
    buffname: 'GemsPotion4Buff',
    enableEffect: (player) => {
        player.session.multipliers.potion.gems += 1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.gems -= 1
    }
})