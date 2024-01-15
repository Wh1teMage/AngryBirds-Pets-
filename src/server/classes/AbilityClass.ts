import { Modding } from "@flamework/core"
import { Constructor } from "@flamework/core/out/utility"

enum UseValue {
    Using = 'Using',
    Used = 'Used',
    Ending = 'Ending',
    Ended = 'Ended'
}

export abstract class AbilityClass {

    public abstract name: string
    public abstract description: string
    public abstract cd: number
    public abstract duration: number

    protected lastUsed: number = tick()
    protected using: UseValue = UseValue.Ended
    protected player: Player | undefined

    constructor(player?: Player) {
        this.player = player
    }

    protected canAttack = () => {
        if ((this.lastUsed + this.cd + this.duration) > tick()) { return }
        if (this.using !== UseValue.Ended) { return }
        return true
    }

    protected abstract start: () => void
    protected abstract stop: () => void

    /*
    public GetOwner = () => { //check if player exists
        //return ServerPlayerFabric.GetPlayer(this.player!)
    }
    */
    public Start = () => {
        if (!this.canAttack()) { return }

        this.using = UseValue.Using

        task.spawn(() => {
            this.start()
            this.using = UseValue.Used

            task.delay(this.duration, () => {
                this.Stop()
            })
        })
    }

    public Stop = () => {
        if (this.using !== UseValue.Used) { return }

        this.using = UseValue.Ending
        this.lastUsed = tick()

        task.spawn(() => {
            this.stop()
            this.using = UseValue.Ended
        })
    }
 
}

export const Abilities = new Map<string, (player?: Player) => AbilityClass>()

export const AbilityDecorator = Modding.createDecorator<[string]>('Class', (descriptor, [name]) => {
    Abilities.set(name, (player?: Player) => {return new (descriptor.constructor as Constructor)(player as never) as AbilityClass})
}) 

export class AbilityFabric {

    static CreateAbility(ability: string, player: Player) {
        return Abilities.get(ability)!(player) as AbilityClass
    }

}