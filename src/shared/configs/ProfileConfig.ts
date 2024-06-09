import { WorldType } from "shared/enums/WorldEnums";
import { IProfileData } from "shared/interfaces/ProfileData";

export const ORDERED_UPDATE_TIME = 60*10/2
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

    MaxValues: {
        StrengthMaxVal: 0,
        WinsMaxVal: 0,
        StarsMaxVal: 0,
        RebirthsMaxVal: 0,
        GemsMaxVal: 0,
    },

    StatValues: {
        FirstJoin: os.time(),
        LastJoined: os.time(),
        LastSpinTime: 0,

        LastDayTime: 0, // os.time()
        LastDailyChestTime: 0,
        LastGroupChestTime: 0, 

        DayAmount: 0,
        IngameTime: 0,
        RobuxSpent: 0,

        SpinCount: 0,
        RebirthSkips: 0,
        FriendsCount: 0,
        //EquippedPetsCount: 0,

        WasShooting: false,
        WasTraining: false,
        WasRebirthing: false,

        Favorited: false,
    },

    Multipliers: {
        StrengthMul: 1,
        GemsMul: 1,
        WinsMul: 1,
        StarsMul: 1,
        RebirthsMul: 1,
        HatchSpeedMul: 1,
        VoidMachineMul: 1,
    },

    Config: {
        Luck: 1,
        MaxPets: 100,
        MaxEquippedPets: 3,
        MaxPetsInVoidMachine: 5,
        MaxEquippedRelics: 6,
        MaxWorld: WorldType.Cave,
        RebirthTitle: 'Default',
    },

    CompletedQuests: [],
    Badges: [],
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
    Relics: [],
    EquippedRelics: [],

    CONSTANTS: {
        VERSION: VERSION,
        name: 'Default',
    }
}
