
import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { ICharacter } from "shared/interfaces/SessionData";

interface Attributes {}

@Component({})
export class CharacterComponent extends BaseComponent<Attributes, ICharacter> implements OnStart {

    private _player?: IServerPlayerComponent

    public BindPlayer(player: IServerPlayerComponent) {
        this._player = player
        player.session.character = this.instance

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