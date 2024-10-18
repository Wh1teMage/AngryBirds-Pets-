import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { PetPerksInfo } from "shared/info/PetInfo";
import { RelicsInfo } from "shared/info/RelicsInfo";
import { ToolsData } from "shared/info/ToolInfo";
import { IDBPetData } from "shared/interfaces/PetData";
import { PetUtilities } from "shared/utility/PetUtilities";

@PassiveDecorator('ExtraPower')
export class ExtraPower extends PassiveClass {
    public name = 'ExtraPower'
    public description = 'test'

    public id: string = ''
    private pet?: IDBPetData

    public setOwner = (player: Player) => {
        this.player = player
    };

    public setPet = (pet: IDBPetData) => {
        this.pet = pet
        if (pet.id) { this.id = pet.id }
    };

    public onPetMultiplierChanged = () => {
        if (!this.pet) { return }
        if (!this.player) { return }

        let info = PetPerksInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)

        let strongestMulti = 1

        component.profile.Data.Pets.forEach((val) => {
            let petInfo = PetUtilities.DBToPetTransfer(val)
            if (!petInfo) { return }
            strongestMulti = math.max(strongestMulti, petInfo!.multipliers.get('strength')!)
        })

        component.session.multipliers.pet.strength += strongestMulti * (info[this.level-1].stats.get('multi')! / 100)

        print(`Started ${this.pet.id}`, component.session.multipliers.pet.strength)
    }

    /*
    public onEnd = () => {
        if (!this.pet) { return }
        if (!this.player) { return }

        let info = PetPerksInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.pet.strength -= info[this.level-1].stats.get('multi')! / 100

        print(`Ended ${this.pet.id}`, component.session.multipliers.pet.strength)
    };

    public onStart = () => {
        if (!this.pet) { return }
        if (!this.player) { return }

        let info = PetPerksInfo.get(this.name)!

        let component = ServerPlayerFabric.GetPlayer(this.player)
        component.session.multipliers.pet.strength += info[this.level-1].stats.get('multi')! / 100

        print(`Started ${this.pet.id}`, component.session.multipliers.pet.strength)
    };
    */
}