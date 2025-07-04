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

    onStart: () => void
    onShoot: () => void
    onTrigger: () => void

    onStrengthChanged: (newvalue: number, oldvalue: number) => void
    onWinsChanged: (newvalue: number, oldvalue: number) => void
    onGemsChanged: (newvalue: number, oldvalue: number) => void
    onStarsChanged: (newvalue: number, oldvalue: number) => void
    onRebirthsChanged: (newvalue: number, oldvalue: number) => void
    onValueChanged: (value: PassiveValues) => void

    onFriendsChanged: () => void
    onTick: () => void

    onPetAdded: (pet: IDBPetData) => void

    setOwner: (player: Player) => void
}