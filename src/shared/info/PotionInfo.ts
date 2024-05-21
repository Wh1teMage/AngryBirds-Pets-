import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.LuckPotion, {
    duration: 30*60,
    buffname: 'LuckPotionBuff',
    enableEffect: (player) => {
        player.session.multipliers.potion.luck += .1
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.luck -= .1
    }
})

PotionsData.set(PotionType.WinsPotion, {
    duration: 30*60,
    buffname: 'WinPotionBuff',
    enableEffect: (player) => {
        player.session.multipliers.potion.wins += 1
        print(player.session.multipliers.potion.wins, 'player.session.multipliers.potion.wins')
    },
    disableEffect: (player) => {
        player.session.multipliers.potion.wins -= 1
        print(player.session.multipliers.potion.wins, 'player.session.multipliers.potion.wins')
    }
})

PotionsData.set(PotionType.GoldPotion, {
    duration: 30*60,
    buffname: 'GoldPotionBuff',
    enableEffect: (player) => {
        player.session.stats.set('GoldPotionBuff', true)
    },
    disableEffect: (player) => {
        player.session.stats.delete('GoldPotionBuff')
    }
})

PotionsData.set(PotionType.VoidPotion, {
    duration: 30*60,
    buffname: 'VoidPotionBuff',
    enableEffect: (player) => {
        player.session.stats.set('VoidPotionBuff', true)
    },
    disableEffect: (player) => {
        player.session.stats.delete('VoidPotionBuff')
    }
})