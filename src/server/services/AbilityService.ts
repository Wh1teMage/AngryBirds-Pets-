import { Service, OnStart, OnInit } from "@flamework/core";
import { Fireball } from "server/abilities/Fireball";

@Service({})
export class AbilityService implements OnStart, OnInit {
    onInit() {
        
        new Fireball()

    }

    onStart() {
        
    }
}