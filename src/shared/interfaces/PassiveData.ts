export enum PassiveValues {
    Strength = 'Strength',
    Wins = 'Wins',
    Stars = 'Stars',
    Rebirths = 'Rebirths',
}

export interface IPassiveData {

    name: string
    description: string

    onStart: () => void
    onShoot: () => void
    onValueAdded: (value: PassiveValues) => void

}