import { PassiveDecorator, PassiveClass } from "server/classes/PassiveClass";
import { ServerPlayerFabric } from "server/components/PlayerComponent";

@PassiveDecorator('GameBoostQuest')
export class GameBoostQuest extends PassiveClass  {

    public name = 'GameBoostQuest'
    public description = 'fuck me'

    private _currentMulti = 0
    
    public setOwner = (player: Player) => {
        this.player = player
    };

    public onTick = () => {
        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }
                     
        let profileData = component.profile.Data
        let sessionData = component.session

        if (sessionData.sessionTime%(60/1) !== 0) { return }

        this._currentMulti = math.min(this._currentMulti + 0.5, 125)
        sessionData.multipliers.gameboost.strength = 1 + this._currentMulti/100

        component.replica.SetValues('Session.multipliers.gameboost', sessionData.multipliers.gameboost)
    }

}