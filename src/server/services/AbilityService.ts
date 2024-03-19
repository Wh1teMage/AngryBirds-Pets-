import { Service, OnStart, OnInit } from "@flamework/core";
import { Fireball } from "server/abilities/Fireball";
import { EggQuest } from "server/quests/EggQuest";
import { FriendQuest } from "server/quests/FriendQuest";
import { PetIndexQuest } from "server/quests/PetIndexQuest";
import { PetQuest } from "server/quests/PetQuest";

@Service({})
export class AbilityService implements OnStart, OnInit {
    onInit() {
        
        new Fireball()

        new EggQuest()
        new FriendQuest()
        new PetIndexQuest()
        new PetQuest()

    }

    onStart() {
        
    }
}