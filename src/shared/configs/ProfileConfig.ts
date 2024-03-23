import { WorldType } from "shared/enums/WorldEnums";
import { IProfileData } from "shared/interfaces/ProfileData";

export const ORDERED_UPDATE_TIME = 60*10
export const DBName = 'Main'
export const VERSION = 1.3

export const defaultValue: IProfileData = {
    Values: {
        StrengthVal: 0,
        WinsVal: 0,
        StarsVal: 0,
        RebirthsVal: 0,
        GemsVal: 0,
    },

    StatValues: {
        FirstJoin: os.time(),
        LastJoined: os.time(),
        LastSpinTime: 0,

        LastDayTime: 0, // os.time()
        LastDailyChestTime: 0,

        DayAmount: 0,
        IngameTime: 0,
        RobuxSpent: 0,

        SpinCount: 0,
        RebirthSkips: 0,
        FriendsCount: 0,
    },

    Multipliers: {
        StrengthMul: 1,
        GemsMul: 1,
        WinsMul: 1,
        StarsMul: 1,
        RebirthsMul: 1,
        VoidMachineMul: 1,
    },

    Config: {
        Luck: 1,
        MaxPets: 100,
        MaxEquippedPets: 3,
        MaxPetsInVoidMachine: 5,
        MaxWorld: WorldType.Default,
        RebirthTitle: 'Default',
    },

    CompletedQuests: [],
    CurrentQuestsProgress: new Map(),

    ActiveBuffs: [],
    Potions: [],
    
    Abilities: [],
    Products: [],
    Pets: [],

    PetIndex: [],

    OwnedTools: ['Slingshot1W1'],
    EquippedTool: 'Slingshot1W1',

    VoidMachine: [],
    RedeemedCodes: [],
    StoredEggs: [],

    CONSTANTS: {
        VERSION: VERSION,
        name: 'Default',
    }
}
