import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";

@PassiveDecorator('GlobalPassive')
export class GlobalPassive extends PassiveClass {
    public name = 'GlobalPassive'
    public description = 'test'

    public onStrengthChanged = (newvalue: number, oldvalue: number) => {

    }

    public onWinsChanged = (newvalue: number, oldvalue: number) => {
        
    }

    public onGemsChanged = (newvalue: number, oldvalue: number) => {
        
    }

    public onStarsChanged = (newvalue: number, oldvalue: number) => {
        
    }

    public onRebirthsChanged = (newvalue: number, oldvalue: number) => {
        
    }

}