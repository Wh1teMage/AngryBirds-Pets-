

import { Controller, OnStart, OnInit } from "@flamework/core";
import { PlayerController } from "./PlayerController";
import { ContextActionService } from "@rbxts/services";
import { Contexts } from "client/static/ContextsStatic";

@Controller({})
export class UISController implements OnStart, OnInit {
    
    private _playerController: PlayerController

    constructor(playerController: PlayerController) {
        this._playerController = playerController
    }

    onInit() {

        let controls: Array<Enum.KeyCode | Enum.UserInputType | Enum.PlayerActions> = []
        let formattedControls = new Map<string, string>()
        
        Contexts.forEach((val, key) => {
            if (typeOf(val.obj) !== 'string') {
                controls.push(val.obj as Enum.KeyCode || Enum.UserInputType || Enum.PlayerActions)
                formattedControls.set(tostring(val.obj)+tostring(val.state), key)
            }
        })

        ContextActionService.BindAction('SpecialControls', (actionname: string, state: Enum.UserInputState, inputobj: InputObject) => {
            let formattedInput = tostring(inputobj.KeyCode)+tostring(state)

            if (inputobj.KeyCode === Enum.KeyCode.Unknown) { formattedInput = tostring(inputobj.UserInputType)+tostring(state) }

            if (!formattedControls.get(formattedInput)) { warn('Client Context Doesnt Exist!'); return Enum.ContextActionResult.Pass }
            Contexts.get(formattedControls.get(formattedInput)!)!.callback()

            print('Test')

            return Enum.ContextActionResult.Pass
        }, false, ...controls)

    }

    onStart() {
        
    }
}