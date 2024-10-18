import { PassiveDecorator, PassiveClass } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { MarketCallbacks } from "server/static/MarketStatic";

@PassiveDecorator('WeaponQuest')
export class WeaponQuest extends PassiveClass  {

    public name = 'WeaponQuest'
    public description = 'fuck me'
    
    public setOwner = (player: Player) => {
        this.player = player
    };

    public onTrigger = () => {
        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        if (profileData.Products.includes('cartoonkatana')) { return }
        if ((profileData.StatValues.IngameTime < 60*60*8) || (profileData.StatValues.DayAmount < 2)) { return }

        MarketCallbacks.get('cartoonkatana')!(component)
        profileData.CompletedQuests.push('WeaponQuest')
    }

}