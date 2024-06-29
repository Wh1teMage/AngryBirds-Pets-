import { Service, OnStart, OnInit } from "@flamework/core";
import { Fireball } from "server/abilities/Fireball";
import { EggQuest } from "server/quests/EggQuest";
import { FriendQuest } from "server/quests/FriendQuest";
import { PetIndexQuest } from "server/quests/PetIndexQuest";
import { PetQuest } from "server/quests/PetQuest";
import { RelicQuest } from "server/quests/RelicQuest";
import { AttackSpeedRelic } from "server/relics/AttackSpeedRelic";
import { BonusShotRelic } from "server/relics/BonusShotRelic";
import { CashbackRelic } from "server/relics/CashbackRelic";
import { DuplicateEggRelic } from "server/relics/DuplicateEggRelic";
import { EquipSlotRelic } from "server/relics/EquipSlotRelic";
import { FreeEggRelic } from "server/relics/FreeEggRelic";
import { LuckRelic } from "server/relics/LuckRelic";
import { ShootBoostRelic } from "server/relics/ShootBoostRelic";
import { StrengthRelic } from "server/relics/StrengthRelic";
import { WalkspeedRelic } from "server/relics/WalkspeedRelic";
import { WinsRelic } from "server/relics/WinsRelic";

@Service({})
export class AbilityService implements OnStart, OnInit {
    onInit() {
        
        new Fireball()

        new EggQuest()
        new FriendQuest()
        new PetIndexQuest()
        new PetQuest()
        new RelicQuest()
        
        new BonusShotRelic()
        new CashbackRelic()
        new DuplicateEggRelic()
        new FreeEggRelic()
        new LuckRelic()
        new ShootBoostRelic()
        new StrengthRelic()
        new WalkspeedRelic()
        new WinsRelic()
        new AttackSpeedRelic()
        new EquipSlotRelic()
        

    }

    onStart() {
        
    }
}