import { WorldType } from "shared/enums/WorldEnums";
import { IProfileData } from "shared/interfaces/ProfileData";

export const ORDERED_UPDATE_TIME = 60*10
export const DBName = 'Main'
export const VERSION = 1.3

export const defaultValue: IProfileData = {
    Values: {
        Strength: 0,
        Wins: 0,
        Stars: 0,
        Rebirths: 0,
    },

    StatValues: {
        FirstJoin: os.time(),
        LastJoined: os.time(),
        LastDayTime: 0, // os.time()

        DayAmount: 0,
        IngameTime: 0,
        RobuxSpent: 0,
    },

    Multipliers: {
        Strength: 1,
        Wins: 1,
        Stars: 1,
        Rebirths: 1,
        VoidMachine: 1,
    },

    Config: {
        Luck: 1,
        MaxPets: 100,
        MaxEquippedPets: 3,
        MaxPetsInVoidMachine: 5,
        MaxWorld: WorldType.Default
    },

    ActiveBuffs: [],
    Potions: [],
    
    EquippedPets: [],
    Abilities: [],
    Products: [],
    Pets: [],

    PetIndex: [],

    OwnedTools: ['Default'],
    EquippedTool: 'Default',

    VoidMachine: [],
    RedeemedCodes: [],

    CONSTANTS: {
        VERSION: VERSION,
        name: 'Default',
    }
}
