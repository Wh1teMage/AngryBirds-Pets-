import { PotionType } from "shared/enums/PotionEnum";
import { IPotionData } from "shared/interfaces/PotionData";

export const PotionsData = new Map<PotionType, IPotionData>()

PotionsData.set(PotionType.LuckPotion, {
    duration: 10,
    enableEffect: (player) => {

    },
    disableEffect: (player) => {

    }
})