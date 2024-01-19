import { Modding } from "@flamework/core";
import { Constructor } from "@flamework/core/out/utility";
import { IPassiveData, PassiveValues } from "shared/interfaces/PassiveData";

export abstract class PassiveClass implements IPassiveData {

    public abstract name: string
    public abstract description: string

    protected player: Player | undefined

    constructor(player?: Player) {
        this.player = player
    }

    public onStart = () => {}
    public onShoot = () => {}
    public onValueAdded = (value: PassiveValues) => {}

}

export const Passives = new Map<string, (player?: Player) => PassiveClass>()

export const AbilityDecorator = Modding.createDecorator<[string]>('Class', (descriptor, [name]) => {
    Passives.set(name, (player?: Player) => {return new (descriptor.object as Constructor)(player as never) as PassiveClass})
}) 

export class PassiveFabric {

    static CreatePassive(passive: string, player: Player) {
        return Passives.get(passive)!(player) as PassiveClass
    }

}