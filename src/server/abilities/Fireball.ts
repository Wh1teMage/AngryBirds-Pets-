import { AbilityClass, AbilityDecorator } from "server/classes/AbilityClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { HitboxClass } from "shared/classes/HitboxClass";
import { IHitboxData } from "shared/interfaces/HitboxData";

@AbilityDecorator('Fireball')
export class Fireball extends AbilityClass {
    public name: string = 'Fireball'
    public duration: number = 5
    public cd: number = 1
    public description: string = 'test'

    protected start = () => {
        print(ServerPlayerFabric.GetPlayer(this.player!))

        let hitboxData: IHitboxData = {
            part: game.Workspace.WaitForChild('Part') as Part,
            duration: 100
        }

        let hitbox = new HitboxClass(hitboxData)

        hitbox.onHit.Connect((parts) => {
            print(parts)
        })

        hitbox.Activate()

        task.wait(this.duration-1)
    }

    protected stop = () => {
        print('Stopped')
    };
}