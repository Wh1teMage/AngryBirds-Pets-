import { EggBuyType, IEggData } from "./EggData"
import { IDBPetData } from "./PetData"

export enum PassiveValues {
    Strength = 'Strength',
    Wins = 'Wins',
    Stars = 'Stars',
    Rebirths = 'Rebirths',
    Gems = 'Gems',
}

export interface IPassiveData {

    name: string
    description: string

    level: number
    id?: string

    onStart: () => void
    onEnd: () => void

    onLeft: () => void

    onShoot: () => void
    onTrigger: () => void
    onKill: () => void

    onStrengthChanged: (newvalue: number, oldvalue: number) => void
    onWinsChanged: (newvalue: number, oldvalue: number) => void
    onGemsChanged: (newvalue: number, oldvalue: number) => void
    onStarsChanged: (newvalue: number, oldvalue: number) => void
    onRebirthsChanged: (newvalue: number, oldvalue: number) => void
    onValueChanged: (value: PassiveValues) => void

    onEggOpened: (egg: IEggData, amount: number, buytype: EggBuyType) => void

    onFriendsChanged: () => void
    onTick: () => void

    onPetAdded: (pet: IDBPetData) => void
    onPetMultiplierChanged: () => void

    setOwner: (player: Player) => void
    setPet: (pet: IDBPetData) => void
    
}