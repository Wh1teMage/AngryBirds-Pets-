
import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { ICharacter } from "shared/interfaces/SessionData";
import { WorldsData } from "shared/info/WorldInfo";

interface Attributes {}

@Component({})
export class CharacterComponent extends BaseComponent<Attributes, ICharacter> implements OnStart {

    private _player?: IServerPlayerComponent

    public BindPlayer(player: IServerPlayerComponent) {
        this._player = player
        player.session.character = this.instance

        let safe = new Instance('BoolValue') //i can use atributes but who cares
        safe.Name = 'IsSafe'
        safe.Value = true
        safe.Parent = this.instance;

        task.delay(1, () => {
            let animation = new Instance('Animation')
            let animator = this.instance.WaitForChild('Humanoid').WaitForChild('Animator') as Animator
            
            animation.AnimationId = 'rbxassetid://18933758685'
            
            let currentAnimation = animator.LoadAnimation(animation)
            currentAnimation.AdjustWeight(11)
            currentAnimation.Looped = true
            currentAnimation.Play()

            if (!WorldsData.get(player.session.currentWorld) || !this._player?.profile.Data.StatValues.MaxWorldTeleport) { return }

            this.instance.PivotTo( WorldsData.get(player.profile.Data.Config.MaxWorld)!.teleportPart.CFrame )
        })

        //(this.instance.WaitForChild("Animate").WaitForChild("idle").WaitForChild("IdleAnim") as Animation).AnimationId = "rbxassetid://18663660859";

        //this.instance.PrimaryPart.AssemblyLinearVelocity = new Vector3(0, 1000, 0)

    }

    onStart() {
        
        this.instance.Humanoid.Died.Connect(() => {
            CharacterFabric.RemoveCharacter(this.instance)
        })

    }
}

export class CharacterFabric {

    public static CreateCharacter(character: Model, player: IServerPlayerComponent) { 
        let comp = Dependency<Components>().addComponent<CharacterComponent>(character)
        comp.BindPlayer(player)
        return comp
    }

    public static GetCharacter(character: Model) {
        return Dependency<Components>().getComponent<CharacterComponent>(character)
    }

    public static RemoveCharacter(character: Model) {
        return Dependency<Components>().removeComponent<CharacterComponent>(character)
    }

}