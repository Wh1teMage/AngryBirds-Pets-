import { Modding } from "@flamework/core";
import { Constructor } from "@flamework/core/out/utility";
import { IPassiveData, PassiveValues } from "shared/interfaces/PassiveData";
import { IDBPetData } from "shared/interfaces/PetData";

export abstract class PassiveClass implements IPassiveData {

    public abstract name: string
    public abstract description: string

    public player: Player | undefined

    constructor(player?: Player) {
        this.player = player
    }

    public onStart = () => {}
    public onShoot = () => {}

    public onStrengthChanged = (newvalue: number, oldvalue: number) => {}
    public onWinsChanged = (newvalue: number, oldvalue: number) => {}
    public onGemsChanged = (newvalue: number, oldvalue: number) => {}
    public onStarsChanged = (newvalue: number, oldvalue: number) => {}
    public onRebirthsChanged = (newvalue: number, oldvalue: number) => {}
    public onValueChanged = (value: PassiveValues) => {}

    public onFriendsChanged = () => {}
    public onTick = () => {}

    public onPetAdded = (pet: IDBPetData) => {}

    public setOwner = (player: Player) => {}

}

export const Passives = new Map<string, (player?: Player) => PassiveClass>()

export const PassiveDecorator = Modding.createDecorator<[string]>('Class', (descriptor, [name]) => {
    Passives.set(name, (player?: Player) => {return new (descriptor.object as Constructor)() as PassiveClass})
}) 

export class PassiveFabric {

    static CreatePassive(passive: string, player: Player) {
        return Passives.get(passive)!(player) as PassiveClass
    }

}