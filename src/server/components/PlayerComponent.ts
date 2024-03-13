import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Profile, ProfileMetaData } from "@rbxts/profileservice/globals";
import ProfileService from "@rbxts/profileservice";
import { LoadProfile } from "server/services/DataStoreService";
import { IProfileData } from "shared/interfaces/ProfileData";
import { Replica, ReplicaService } from "@rbxts/replicaservice";
import { IServerPlayerComponent, PlayerDataReplica } from "shared/interfaces/PlayerData";
import { DefaultMultipliers, ICharacter, IMultipliers, ISessionData, SessionData } from "shared/interfaces/SessionData";
import { Events } from "server/network";
import { EffectName } from "shared/enums/EffectEnums";
import { CharacterFabric } from "./CharacterComponent";
import { Evolutions, IDBPetData, Mutations, Sizes } from "shared/interfaces/PetData";
import { PetUtilities } from "shared/utility/PetUtilities";
import { petUpgradeConfig } from "shared/configs/PetConfig";
import Functions from "shared/utility/LuaUtilFunctions";
import { AbilityFabric } from "server/classes/AbilityClass";
import { BuyType, EggValueType } from "shared/interfaces/EggData";
import { BuyTypeConfig } from "shared/configs/EggConfig";
import { EggsData } from "shared/info/EggInfo";
import { ITradingPlayer, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { Trade } from "server/classes/TradeClass";
import { Players, HttpService } from "@rbxts/services";
import { PetModelManager } from "server/classes/PetModelClass";
import { PotionType } from "shared/enums/PotionEnum";
import { PotionsData } from "shared/info/PotionInfo";
import { PetsData } from "shared/info/PetInfo";
import { WorldsData } from "shared/info/WorldInfo";
import { ToolsData } from "shared/info/ToolInfo";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData";
import { WorldType } from "shared/enums/WorldEnums";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { CodesRewardsData, DailyRewardsData, RebirthsRewardsData, SelectDailyReward, SelectSessionReward } from "shared/info/RewardInfo";
import { IRewardData } from "shared/interfaces/RewardData";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { FlyingObjectClass } from "server/classes/FlyingObjectClass";
import { PetQuestsData } from "shared/info/QuestInfo";
import { IncomeSource } from "shared/enums/IncomeEnums";

const ReplicaToken = ReplicaService.NewClassToken('PlayerData')

@Component({})
export class ServerPlayerComponent extends BaseComponent<{}, Player> implements OnStart {
    
    public profile!: Profile<IProfileData, ProfileMetaData>;
    public replica!: PlayerDataReplica
    public session: ISessionData = table.clone(SessionData)
    
    //private _character!: ICharacter
    private _playerPetController = new PlayerPetController(this)
    private _playerEggController = new PlayerEggController(this)
    private _playerToolController = new PlayerToolController(this)
    private _playerValueController = new PlayerValueController(this)
    private _playerTradeController = new PlayerTradeController(this)
    private _playerWorldController = new PlayerWorldController(this)
    private _playerHttpsController = new PlayerHttpsController(this)
    private _playerPotionController = new PlayerPotionController(this)
    private _playerFlyingController = new PlayerFlyingController(this)
    private _playerRewardController = new PlayerRewardController(this)
    private _playerMultiplersController = new PlayerMultiplersController(this)
    
    public FindPet = (pet: IDBPetData) => this._playerPetController.FindPet(pet)
    public AppendPet = (pet: IDBPetData | undefined) => this._playerPetController.AppendPet(pet)
    public RemovePet = (pet: IDBPetData) => this._playerPetController.RemovePet(pet)
    public LockPet = (pet: IDBPetData) => this._playerPetController.LockPet(pet)

    public EquipPet = (pet: IDBPetData) => this._playerPetController.EquipPet(pet)
    public UnequipPet = (pet: IDBPetData) => this._playerPetController.UnequipPet(pet)
    public ClaimVoidPet = (pet: IDBPetData, skip?: boolean) => this._playerPetController.ClaimVoidPet(pet, skip)

    public UpgradePetSize = (pet: IDBPetData) => this._playerPetController.UpgradePetSize(pet)
    public CheckSpaceForPets = (value: number) => this._playerPetController.CheckSpaceForPets(value)
    public UpgradePetEvolution = (pet: IDBPetData, count?: number) => this._playerPetController.UpgradePetEvolution(pet, count)

    public SetWins = (value: number, source?: IncomeSource) => this._playerValueController.SetWins(value, source)
    public SetGems = (value: number, source?: IncomeSource) => this._playerValueController.SetGems(value, source)
    public SetStars = (value: number, source?: IncomeSource) => this._playerValueController.SetStars(value, source)
    public SetStrength = (value: number, source?: IncomeSource) => this._playerValueController.SetStrength(value, source)

    public BuyEgg = (name: string, buytype: BuyType) => this._playerEggController.BuyEgg(name, buytype)
    public OpenEggBypass = (name: string, buytype: BuyType) => this._playerEggController.OpenEggBypass(name, buytype)

    public SetupTrade = (trade: Trade) => this._playerTradeController.SetupTrade(trade)
    public UpdateTrade = (pet: IDBPetData, status: TradeUpdateStatus) => this._playerTradeController.UpdateTrade(pet, status)

    public AppendPotion = (potion: PotionType, amout?: number) => this._playerPotionController.AppendPotion(potion, amout)
    public PopPotion = (potion: PotionType) => this._playerPotionController.PopPotion(potion)
    public UsePotion = (potion: PotionType) => this._playerPotionController.UsePotion(potion)
    public ApplyPotionEffect = (potion: PotionType) => this._playerPotionController.ApplyPotionEffect(potion)

    public SetPetMultipliers = () => this._playerMultiplersController.SetPetMultipliers()
    public SetWorldMultipliers = () => this._playerMultiplersController.SetWorldMultipliers()
    public CalculateMultiplier = (multiname: keyof IMultipliers) => this._playerMultiplersController.CalculateMultiplier(multiname)

    public UseTool = () => this._playerToolController.UseTool()
    public BuyTool = (toolname: string) => this._playerToolController.BuyTool(toolname)
    public EquipTool = (toolname: string) => this._playerToolController.EquipTool(toolname)
    public ReplicateModel = () => this._playerToolController.ReplicateModel()

    public BuyMaxWorld = (world: WorldType) => this._playerWorldController.BuyMaxWorld(world)
    public ChangeWorld = () => this._playerWorldController.ChangeWorld()
    public UseWorldTeleport = (world: WorldType) => this._playerWorldController.UseWorldTeleport(world)

    public InitializeObject = () => this._playerFlyingController.InitializeObject()
    public ShootObject = (power: number) => this._playerFlyingController.ShootObject(power)

    public IsFriends = (id: number) => this._playerHttpsController.CheckIsFriend(id)

    public ApplyReward = (reward: IRewardData) => this._playerRewardController.ApplyReward(reward)
    public ClaimPetQuestReward = () => this._playerRewardController.ClaimPetQuestReward()
    public ClaimSessionReward = (rewardindex: number) => this._playerRewardController.ClaimSessionReward(rewardindex)
    public ClaimDailyReward = () => this._playerRewardController.ClaimDailyReward()
    public RedeemCode = (code: string) => this._playerRewardController.RedeemCode(code)
    public DoRebirth = (skip?: boolean) => this._playerRewardController.DoRebirth(skip)

    onStart() {

        this.instance
        
        this.initProfile()
        this.initReplica()
        
        this.instance.CharacterAppearanceLoaded.Connect((character) => {
            CharacterFabric.CreateCharacter(character, this) 
            this.ReplicateModel()
            //this._character = character as ICharacter
            //this.session.character = character as ICharacter
        })

        if (this.instance.Character) { 
            CharacterFabric.CreateCharacter(this.instance.Character, this); 
            this.ReplicateModel()
            //this._character = this.instance.Character as ICharacter 
            //this.session.character = this.instance.Character as ICharacter
        }
        else this.instance.CharacterAdded.Wait()
        
        for (let pet of this.profile.Data.Pets) {
            if (!pet.equipped) { continue }
            PetModelManager.AddPet(this.instance, pet)
        }

        this.SetPetMultipliers()

        this.session.activePassives.forEach((value) => { value.onStart() })

        Players.GetPlayers().forEach((player) => {
            if (!this.IsFriends(player.UserId)) { return }
            if (player === this.instance) { return }

            let component = ServerPlayerFabric.GetPlayer(player)
            if (!component) { return }

            component.session.friendList.push(this.instance.Name)
            this.session.friendList.push(player.Name)

            component.session.activePassives.forEach((value) => { value.onFriendsChanged() })
        })

        this.session.activePassives.forEach((value) => { value.onFriendsChanged() })

        task.spawn(() => {
            this.AppendPotion(PotionType.LuckPotion)
            this.UsePotion(PotionType.LuckPotion)

            /*
            for (let i = 0; i<8; i++) {
                
                this.AppendPet(
                    {
                        name: 'Cat',
                        locked: false,
                        equipped: false,
                        additional: {
                            size: Sizes.Normal,
                            evolution: Evolutions.Normal,
                            mutation: Mutations.Default,
                        }
                    }
                )
                
                /*
                this.EquipPet(
                    {
                        name: 'Cat',
                        locked: false,
                        equipped: false,
                        additional: {
                            size: Sizes.Normal,
                            evolution: Evolutions.Normal,
                            mutation: Mutations.Default,
                        }
                    }
                )
                task.wait()
                
            }
            */
           
            /*
            
            for (let i = 0; i<1; i++) {
                
                this.AppendPet(
                    {
                        name: 'Cat',
                        additional: {
                            size: Sizes.Normal,
                            void: true,
                            limit: math.random(0, 100),
                        }
                    }
                )
                

                this.AppendPet(
                    {
                        name: 'Cat',
                        additional: {
                            size: Sizes.Normal,
                            void: true,
                        }
                    }
                )

            }
            
            this.EvolvePetSize(
                {
                    name: 'Cat',
                    additional: {
                        size: Sizes.Normal,
                        void: true,
                        limit: 0,
                    }
                }
            )
            
            */
            print(this.profile.Data)

            /*
            for (let i = 0; i<4; i++) {

                this.AppendPet(
                    {
                        name: 'Cat',
                        additional: {
                            size: Sizes.Normal,
                            void: true,
                        }
                    }
                )

            }

            this.EvolvePetSize(
                {
                    name: 'Cat',
                    additional: {
                        size: Sizes.Normal,
                        void: true,
                    }
                }
            )
            */

            let test = AbilityFabric.CreateAbility('Fireball', this.instance)
            test.Start()
            /*
            let tchances = [
                {weight: 10, name: '1'},
                {weight: 15, name: '2'},
            ]
            

            let c1 = 0
            let c2 = 0

            for (let i = 0; i < 1000; i++) {
                if (PetUtilities.RandomWeight(tchances, 1) === '1') { c1 += 1 }
                else { c2 += 1 }
            }
            
            print(c1, c2)
            */
            //print(this.profile.Data)

            //this.SetCoins(10000)
            //this.BuyEgg('Default', BuyType.Single)

            //print(this.profile.Data)

            task.spawn(() => {
                while (task.wait(1)) {

                    this.profile.Data.StatValues.IngameTime += 1
                    this.session.sessionTime += 1
                    print(this.session.multipliers.pet.strength)
                    //this.session.character!.Humanoid.WalkSpeed += 120
                    this.ChangeWorld()

                    this.session.activePassives.forEach((passive) => { passive.onTick() })

                    this.replica.SetValue('Session.sessionTime', this.session.sessionTime)
                    //this.replica.SetValue('Session.testvalue', math.random(0, 100))
                    //Events.ReplicateEffect.fire(this.instance, EffectName.ClickSound)
                }
            })


        })

    }

    public OnLeft() {
        if (!this.profile) {return}
        if (this.session.activeTrade) { this.session.activeTrade.Deny() }
        this.profile.Release()
    }

    private initProfile() {
        this.profile = LoadProfile(this.instance) as Profile<IProfileData, ProfileMetaData>

        if (!this.profile) {
            this.instance.Kick('Profile wasnt loaded!')
        }
    }
    
    private initReplica() {
        this.replica = ReplicaService.NewReplica({
            ClassToken: ReplicaToken,
            Data: {
                Profile: this.profile.Data,
                Session: SessionData
            },
            Replication: this.instance
        })
    }
    
}

export class ServerPlayerFabric {

    static CreatePlayer(player: Player) {
        Dependency<Components>().addComponent<ServerPlayerComponent>(player)
    }

    static GetPlayer(player: Player) {
        return Dependency<Components>().getComponent<ServerPlayerComponent>(player) as ServerPlayerComponent
    }

}

class PlayerValueController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public SetStrength(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Strength); 
                passive.onStrengthChanged(value, this.player.profile.Data.Values.StrengthVal) 
            })
        }

        this.player.profile.Data.Values.StrengthVal = value
        this.player.replica.SetValue('Profile.Values.StrengthVal', value)
    }

    public SetWins(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Wins); 
                passive.onWinsChanged(value, this.player.profile.Data.Values.WinsVal) 
            })
        }

        this.player.profile.Data.Values.WinsVal = value
        this.player.replica.SetValue('Profile.Values.WinsVal', value)
    }

    public SetStars(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Stars); 
                passive.onStarsChanged(value, this.player.profile.Data.Values.StarsVal) 
            })
        }

        this.player.profile.Data.Values.StarsVal = value
        this.player.replica.SetValue('Profile.Values.StarsVal', value)
    }

    public SetGems(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Gems); 
                passive.onGemsChanged(value, this.player.profile.Data.Values.GemsVal) 
            })
        }

        this.player.profile.Data.Values.GemsVal = value
        this.player.replica.SetValue('Profile.Values.GemsVal', value)
    }

    public SetRebirths(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Rebirths); 
                passive.onStarsChanged(value, this.player.profile.Data.Values.RebirthsVal) 
            })
        }

        this.player.profile.Data.Values.RebirthsVal = value
        this.player.replica.SetValue('Profile.Values.RebirthsVal', value)
    }

}

class PlayerMultiplersController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public CalculateMultiplier(multiname: keyof IMultipliers) { // add profile multipliers
        let profileData = this.player.profile.Data
        let sessionData = this.player.session
        let overallMultiplier = 1

        Functions.iterateObject(sessionData.multipliers, (index, value: IMultipliers) => {
            overallMultiplier *= value[multiname] || 1
        })

        /*
        StrengthMul: number
        WinsMul: number
        StarsMul: number
        RebirthsMul: number
        VoidMachineMul: number
        */

        if (multiname === 'strength') { overallMultiplier *= profileData.Multipliers.StrengthMul }
        if (multiname === 'stars') { overallMultiplier *= profileData.Multipliers.StarsMul }
        if (multiname === 'stars') { overallMultiplier *= profileData.Multipliers.StarsMul }
        if (multiname === 'wins') { overallMultiplier *= profileData.Multipliers.WinsMul }

        /*
        Functions.iterateObject(profileData.Multipliers, (index, value: IMultipliers) => {
            print(value)
            overallMultiplier *= value[multiname] || 1
        })
        */

        return overallMultiplier
    }

    public SetPetMultipliers() {

        this.player.session.multipliers.pet = table.clone( DefaultMultipliers ) 

        this.player.profile.Data.Pets.forEach((pet) => {
            if (!pet.equipped) { return }

            let petData = PetUtilities.DBToPetTransfer(pet)

            for (let multi of petData!.multipliers) {
                this.player.session.multipliers.pet[multi[0] as keyof typeof DefaultMultipliers] += multi[1]
            }
        })

        this.player.replica.SetValues('Session.multipliers.pet', this.player.session.multipliers.pet)

    }

    public SetWorldMultipliers() {

        let sessionData = this.player.session
        let selectedWorld = table.clone( WorldsData.get(sessionData.currentWorld)! ) 

        for (let multi of selectedWorld!.multipliers) {
            this.player.session.multipliers.world[multi[0] as keyof typeof DefaultMultipliers] = multi[1]
        }

        this.player.replica.SetValues('Session.multipliers.world', this.player.session.multipliers.world)

    }

}

class PlayerPotionController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public GetCurrentBuffIndex(buffname: string) {
        let profileData = this.player.profile.Data
        let buffIndex = -1
        profileData.ActiveBuffs.forEach((val, index) => { if (val.name === buffname) { buffIndex = index } })
        if (buffIndex < 0) { return }
        return buffIndex
    }

    public AppendPotion(potion: PotionType, amout?: number) {
        let profileData = this.player.profile.Data
        let potionIndex = -1
        profileData.Potions.forEach((val, index) => { if (val.potion === potion) { potionIndex = index } })

        if (potionIndex < 0) { 
            profileData.Potions.push({potion: potion, amount: amout || 1})
            this.player.replica.SetValue('Profile.Potions', profileData.Potions)
            return 
        }

        profileData.Potions[potionIndex] = { potion: potion, amount: profileData.Potions[potionIndex].amount+(amout || 1) }
        this.player.replica.SetValue('Profile.Potions', profileData.Potions)
    }

    public PopPotion(potion: PotionType) {
        let profileData = this.player.profile.Data

        let potionIndex = -1
        profileData.Potions.forEach((val, index) => { if (val.potion === potion) { potionIndex = index } })
        if (potionIndex < 0) { return }
        if (profileData.Potions[potionIndex].amount <= 0) { return }

        let removedPotion = profileData.Potions[potionIndex]
        profileData.Potions[potionIndex] = { potion: potion, amount: profileData.Potions[potionIndex].amount-1 }

        this.player.replica.SetValue('Profile.Potions', profileData.Potions)
        return removedPotion
    }

    public UsePotion(potion: PotionType) {
        let profileData = this.player.profile.Data
        let removedPotion = this.PopPotion(potion)
        if (!removedPotion) { return }

        let potionInfo = PotionsData.get(removedPotion.potion)
        if (!potionInfo) { return }

        let buffIndex = this.GetCurrentBuffIndex(potionInfo.buffname)

        if (buffIndex) { 
            profileData.ActiveBuffs[buffIndex].endTime += potionInfo!.duration; 
        }
        else { 
            profileData.ActiveBuffs.push({ 
                name: potionInfo!.buffname, 
                endTime: profileData.StatValues.IngameTime + potionInfo!.duration, 
                startTime: profileData.StatValues.IngameTime,
                source: potion 
            }); 
        }
        
        this.player.replica.SetValue('Profile.ActiveBuffs', profileData.ActiveBuffs)
        this.ApplyPotionEffect(potion)
    }

    public ApplyPotionEffect(potion: PotionType) {
        let profileData = this.player.profile.Data

        let potionInfo = PotionsData.get(potion)
        if (!potionInfo) { return }

        let buffIndex = this.GetCurrentBuffIndex(potionInfo.buffname)!
        let activeBuff = profileData.ActiveBuffs[buffIndex]

        task.delay((activeBuff.endTime - profileData.StatValues.IngameTime) || 0, () => {

            let newBuffIndex = this.GetCurrentBuffIndex(potionInfo!.buffname)!
            let newActiveBuff = profileData.ActiveBuffs[newBuffIndex]!

            if ((newActiveBuff.endTime - profileData.StatValues.IngameTime) >= potionInfo!.duration-2) { return }

            potionInfo!.disableEffect(this.player)
            profileData.ActiveBuffs.remove(newBuffIndex)
        })

        if ((activeBuff.endTime - activeBuff.startTime) <= potionInfo.duration-2) { potionInfo!.enableEffect(this.player) }

        this.player.replica.SetValues('Session.multipliers.potion', this.player.session.multipliers.potion)
    }

}

class PlayerTradeController {
    private player: ServerPlayerComponent
    private _operationsCallbacks = {
        Add: (data: ITradingPlayer, pet: IDBPetData) => {this.AddPetToTrade(data, pet)},
        Remove: (data: ITradingPlayer, pet: IDBPetData) => {this.RemovePetFromTrade(data, pet)},
    }

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public SetupTrade(trade: Trade) {
        let sessionData =  this.player.session
        sessionData.activeTrade = trade

        let selectedTradeData = sessionData.activeTrade.requestedPlayer
        let otherTradeData = sessionData.activeTrade.requestingPlayer

        if (sessionData.activeTrade.requestedPlayer.player !== this.player.instance) {
            selectedTradeData = sessionData.activeTrade.requestingPlayer
            otherTradeData = sessionData.activeTrade.requestedPlayer
        }

        trade.BindToAccept(() => {

            for (let pet of selectedTradeData.tradePets) { this.player.RemovePet(pet) }
            print(this.player.profile.Data.Pets, selectedTradeData.tradePets, 'Removed')
            for (let pet of otherTradeData.tradePets) { this.player.AppendPet(pet) }
            print(this.player.profile.Data.Pets, otherTradeData.tradePets, 'Added')

            // sessionData.activeTrade = undefined

            print('Trade Accepted!')
        })

        trade.BindToDeny(() => { 
            sessionData.activeTrade = undefined; 
            print('Trade Denied!')
         })

        selectedTradeData.playerPets = table.clone(this.player.profile.Data.Pets)

        print(selectedTradeData)
    }

    public UpdateTrade(pet: IDBPetData, status: TradeUpdateStatus) {
        print(pet, 'pet', this.player.session.activeTrade)
        let sessionData = this.player.session
        if (!sessionData.activeTrade) { return }

        let selectedTradeData = sessionData.activeTrade.requestedPlayer
        if (sessionData.activeTrade.requestedPlayer.player !== this.player.instance) {
            selectedTradeData = sessionData.activeTrade.requestingPlayer
        }

        this._operationsCallbacks[status](selectedTradeData, pet)

        print(selectedTradeData)
    }

    public AddPetToTrade(data: ITradingPlayer, pet: IDBPetData) {
        print(pet, 'pet')
        let petIndex = -1
        data.playerPets.forEach((value, index) => { if (Functions.compareObjects(value, pet)) { petIndex = index; return } })
        print(petIndex)
        if (petIndex < 0) { return }

        data.tradePets.push(pet)
        data.playerPets.remove(petIndex)
    }

    public RemovePetFromTrade(data: ITradingPlayer, pet: IDBPetData) {
        let petIndex = -1
        data.tradePets.forEach((value, index) => { if (Functions.compareObjects(value, pet)) { petIndex = index; return } })

        if (petIndex < 0) { return }

        data.playerPets.push(pet)
        data.tradePets.remove(petIndex)
    }

}

class PlayerEggController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public OpenEggBypass(name: string, buytype: BuyType) {
        let profileData = this.player.profile.Data

        let amount = BuyTypeConfig[buytype]
        let eggInfo = EggsData.get(name)

        if (!eggInfo) {return}

        for (let i = 0; i < amount; i++) {
            let petName = PetUtilities.RandomWeight(eggInfo.petchances, profileData.Config.Luck)
            this.player.AppendPet(PetUtilities.NameToDBPetWithEgg(petName, eggInfo.name))
        }
    }

    public BuyEgg(name: string, buytype: BuyType) {
        if (!this.player.profile) { return }
        let profileData = this.player.profile.Data

        let amount = BuyTypeConfig[buytype]
        let eggInfo = EggsData.get(name)

        // additional buytype check later on (check gamepass)
        print(eggInfo)
        if (!this.player.CheckSpaceForPets(amount)) {return}
        if (!eggInfo) {return}

        switch (eggInfo.valuetype) {
            case EggValueType.Wins:

                if (profileData.Values.WinsVal < eggInfo.price) {return}
                print(eggInfo, 1)
                for (let i = 0; i < amount; i++) {
                    let petName = PetUtilities.RandomWeight(eggInfo.petchances, profileData.Config.Luck)
                    this.player.AppendPet(PetUtilities.NameToDBPetWithEgg(petName, eggInfo.name)!)
                }

                this.player.SetWins(profileData.Values.WinsVal - eggInfo.price)

                break
            case EggValueType.VBugs:

                Events.ReplicateEffect.fire(this.player.instance, EffectName.ReplicatePurchase, new Map<string, number>([['productId', eggInfo.productid!]]))

                // should rebuilt this egg system btw (esp with paid once)
                break
            default:
            
        }

    }

}

class PlayerPetController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    private _upgradePet<T extends never>(pet: IDBPetData, upgradeConfig: Map<T, number>, field: keyof IDBPetData['additional']) {
        
        let selectedPets: IDBPetData[] = []

        for (let value of upgradeConfig) {
            let passes = 0
            let formatted = pet
            formatted.additional[field] = value[0]

            for (let v of this.player.profile.Data.Pets) {
                if (!PetUtilities.ComparePets(pet, v)) { continue }

                passes += 1; 
                if (passes >= value[1]) { break }
                selectedPets.push(v)
            }

            if (passes < value[1]) { return }
        }

        for (let selectedpet of selectedPets) { this.RemovePet(selectedpet) }
        /*
        for (let value of upgradeConfig) {
            let formatted = pet
            formatted.additional[field] = value[0]

            for (let i = 1; i <= value[1]; i++) {
                this.RemovePet(formatted)
            }
        }
        */
        return true
    }

    public UpdatePetIndex(petname: string) {
        if (this.player.profile.Data.PetIndex.find((value) => value === petname)) { return }
        this.player.profile.Data.PetIndex.push(petname)
    }

    public CheckSpaceForPets(value: number) {
        let profileData = this.player.profile.Data
        if (profileData.Pets.size()+value > profileData.Config.MaxPets) return false;
        return true
    }

    public CheckEquipCount() {
        let profileData = this.player.profile.Data
        let count = 0

        profileData.Pets.forEach((value, index) => { if (value.equipped) { count += 1 } })
        return count
    }

    public EquipPet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        if (this.CheckEquipCount()+1 > profileData.Config.MaxEquippedPets) { return }

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { petIndex = index } })
        if (petIndex < 0) { return }

        profileData.Pets[petIndex].equipped = true

        PetModelManager.AddPet(this.player.instance, profileData.Pets[petIndex])
        this.player.SetPetMultipliers()

        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public UnequipPet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { petIndex = index } })
        if (petIndex < 0) { return }
        //if (!profileData.Pets[petIndex].equipId || profileData.EquippedPets.indexOf(profileData.Pets[petIndex].equipId!) < 0) { return }

        profileData.Pets[petIndex].equipped = false

        PetModelManager.RemovePet(this.player.instance, profileData.Pets[petIndex])
        this.player.SetPetMultipliers()
        
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public FindPet(pet: IDBPetData) {
        let foundPet: IDBPetData | undefined;
        let profileData = this.player.profile.Data

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { foundPet = value } })
        return foundPet
    }

    public AppendPet(pet: IDBPetData | undefined) {
        if (!pet) { return }
        if (!this.CheckSpaceForPets(1)) {return}

        if (this.player.profile.Data.PetIndex.indexOf(pet.name) < 0) { this.player.profile.Data.PetIndex.push(pet.name) }

        this.player.profile.Data.Pets.push(pet)
        this.player.replica.SetValue('Profile.Pets', this.player.profile.Data.Pets)
        this.player.replica.SetValue('Profile.PetIndex', this.player.profile.Data.PetIndex)

        this.player.session.activePassives.forEach((passive) => { passive.onPetAdded(pet) })
    }

    public RemovePet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value) && !value.locked) { petIndex = index } })
        if (petIndex < 0) { return }

        if ( profileData.Pets[petIndex].equipped ) { this.UnequipPet(pet) }

        profileData.Pets.remove(petIndex)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public LockPet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let foundPet = this.FindPet(pet)

        if (!foundPet) { return }
        foundPet.locked = !foundPet.locked

        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public UpgradePetSize(pet: IDBPetData) {
        let globalPass = 0
        this.player.profile.Data.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { globalPass = 1 } })
        if (globalPass === 0) { return }
        if (!petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize) { return }

        let passed = this._upgradePet(pet, petUpgradeConfig.SizeUpgrades[pet.additional.size].requirements as Map<never, number>, 'size')
        if (!passed) { return }

        let formatted = pet
        formatted.additional.size = petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize as Sizes

        this.AppendPet(formatted)
    }

    public UpgradePetEvolution(pet: IDBPetData, count?: number) {
        let profileData = this.player.profile.Data
        let formatted = pet

        let selectedPet = this.FindPet(pet)
        let nextEvolution = petUpgradeConfig.EvolutionUpgrades[pet.additional.evolution].nextEvolution

        if (!selectedPet) { return }
        if (!nextEvolution) { return }
        if (selectedPet.locked) { return }

        switch (selectedPet.additional.evolution) {
            case Evolutions.Normal:
                if (!count) { return }

                let realCount = 0
                let removablePets: IDBPetData[] = []
                this.player.profile.Data.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { realCount += 1 } })

                if (realCount < count) { return }

                this.player.profile.Data.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { 
                    removablePets.push(value)
                } })

                for (let i = 1; i <= count; i++) {
                    this.RemovePet(removablePets[0])
                    removablePets.remove(0)
                }

                let chance = math.random(1,5)

                if (count <= chance) { return }

                formatted.additional.evolution = petUpgradeConfig.EvolutionUpgrades[pet.additional.evolution].nextEvolution as Evolutions
                this.AppendPet(formatted)

                return

            case Evolutions.Gold:

                 if (profileData.VoidMachine.size() >= profileData.Config.MaxPetsInVoidMachine) { return }
                 this.RemovePet(pet)

                 formatted.additional.evolution = petUpgradeConfig.EvolutionUpgrades[pet.additional.evolution].nextEvolution as Evolutions
                 profileData.VoidMachine.push({pet: formatted, endTime: os.time()+petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time, startTime: os.time()})

                 this.player.replica.SetValue('Profile.VoidMachine', profileData.VoidMachine)

                return

        }
    }

    public ClaimVoidPet(pet: IDBPetData, skip?: boolean) {
        let profileData = this.player.profile.Data

        let petIndex = -1
        profileData.VoidMachine.forEach((value, index) => { if (Functions.compareObjects(value.pet, pet)) { petIndex = index } })
        print(petIndex, this.CheckSpaceForPets(1))
        if (petIndex < 0) { return }
        if (!this.CheckSpaceForPets(1)) {return}

        let selecteVoidPet = profileData.VoidMachine[petIndex]

        let voidTime = (selecteVoidPet.endTime - selecteVoidPet.startTime)*profileData.Multipliers.VoidMachineMul
        let currentVoidTime = selecteVoidPet.startTime+voidTime-os.time();
        print(currentVoidTime)
        print(!skip && (currentVoidTime > 0), !skip)
        if (!skip && (currentVoidTime > 0)) { return }

        profileData.VoidMachine.remove(petIndex)
        this.AppendPet(pet)
        this.player.replica.SetValue('Profile.VoidMachine', profileData.VoidMachine)
    }

}

class PlayerWorldController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public ChangeWorld() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session
        let maxWorld = table.clone( WorldsData.get(profileData.Config.MaxWorld)! )  

        WorldsData.forEach((world, worldtype) => {
            let parts = game.Workspace.GetPartBoundsInBox(world.hitbox.CFrame, world.hitbox.Size)
            let foundRootPart = parts.find((value) => value === this.player.session.character!.PrimaryPart)

            if ( !foundRootPart ) { return }
            if ( maxWorld.weight < world.weight ) { return }

            sessionData.currentWorld = worldtype
        })

        this.player.SetWorldMultipliers()
        this.player.replica.SetValue('Session.currentWorld', sessionData.currentWorld)
    }

    public BuyMaxWorld(world: WorldType) {
        let profileData = this.player.profile.Data
        let worldInfo = WorldsData.get(world)!
        
        if (worldInfo.weight < WorldsData.get(profileData.Config.MaxWorld)!.weight) { return }
        if (profileData.Values.StarsVal < worldInfo.price) { return }

        this.player.SetStars(profileData.Values.StarsVal - worldInfo.price)
        profileData.Config.MaxWorld = world
        //this.ChangeWorld()
    }

    public UseWorldTeleport(world: WorldType) {
        let profileData = this.player.profile.Data
        let worldInfo = WorldsData.get(world)!

        if (worldInfo.weight < WorldsData.get(profileData.Config.MaxWorld)!.weight) { return }
        if (profileData.Products.indexOf('SomeWorldTpgamepass') < 0) { return } //TODO

        this.player.session.character!.PrimaryPart!.CFrame = worldInfo.teleportPart.CFrame
    }

}

class PlayerToolController {

    private player: ServerPlayerComponent
    private lastUsed: number = tick()
    private using: boolean = false

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    private canUse(toolinfo: IToolData) {
        if ((this.lastUsed + toolinfo.firerate*(1/1)) > tick()) { return }
        if (this.using) { return }
        return true
    }

    public AppendTool(toolname: string) {
        if (!ToolsData.get(toolname)) { return }
        if (this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }
        this.player.profile.Data.OwnedTools.push(toolname)

        this.player.replica.SetValue('Profile.OwnedTools', this.player.profile.Data.OwnedTools)
    }

    public EquipTool(toolname: string) {
        if (!ToolsData.get(toolname)) { return }
        if (!this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }
        this.player.profile.Data.EquippedTool = toolname

        this.player.replica.SetValue('Profile.EquippedTool', this.player.profile.Data.EquippedTool)

        this.ReplicateModel()
    }

    public BuyTool(toolname: string) {
        if (!ToolsData.get(toolname)) { return }
        if (this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }

        let profileData = this.player.profile.Data
        let toolInfo = ToolsData.get(toolname)!

        switch (toolInfo.valuetype) {
            case ToolValueType.Strength:

                if (profileData.Values.StrengthVal < toolInfo.price) {return}

                this.player.SetWins(profileData.Values.StrengthVal - toolInfo.price)
                this.AppendTool(toolname)

                break
            case ToolValueType.VBugs:

                Events.ReplicateEffect.fire(this.player.instance, EffectName.ReplicatePurchase, new Map<string, number>([['productId', toolInfo.productid!]]))

                break
            default:
            
        }

    }

    public UseTool() {
        let profileData = this.player.profile.Data
        let toolInfo = ToolsData.get(profileData.EquippedTool)!
        print('using')
        if (!this.canUse(toolInfo)) { return }

        this.using = true

        this.player.SetStrength(profileData.Values.StrengthVal + toolInfo.addition * this.player.CalculateMultiplier('strength'))

        this.lastUsed = tick()
        this.using = false

        this.player.session.activePassives.forEach((value) => { value.onShoot() })

        Events.ReplicateEffect.fire(this.player.instance, toolInfo.effectname)
    }

    public ReplicateModel() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session
        let toolInfo = ToolsData.get(profileData.EquippedTool)!

        if (sessionData.character?.FindFirstChild('ToolModel')) {
            sessionData.character?.FindFirstChild('ToolModel')?.Destroy()
        }
        
        let clonnedModel = toolInfo.model.Clone()
        print(clonnedModel)
        clonnedModel.Name = 'ToolModel'
        clonnedModel.PrimaryPart!.Anchored = false

        clonnedModel.Parent = sessionData.character!
        clonnedModel.PivotTo((sessionData.character!.FindFirstChild('RightHand') as Part).CFrame.mul(toolInfo.rotationOffset))

        CreationUtilities.Weld(clonnedModel.PrimaryPart!, sessionData.character!.FindFirstChild('RightHand') as Part)
    }

}

class PlayerRewardController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public ApplyReward(reward: IRewardData) {
        let profile = this.player.profile.Data
        
        reward.Potions?.forEach((value) => {
            this.player.AppendPotion(value.potion, value.amount)
        })

        reward.Pets?.forEach((value) => {
            for (let i = 0; i < value.amount; i++) {
                this.player.AppendPet(value.pet)
            }
        })

        this.player.SetStrength(profile.Values.StrengthVal + (reward.Values?.Strength || 0))
        this.player.SetStars(profile.Values.StarsVal + (reward.Values?.Stars || 0))
        this.player.SetWins(profile.Values.WinsVal + (reward.Values?.Wins || 0))
        
    }

    public ClaimDailyReward() {

        let profileData = this.player.profile.Data

        if ((os.time() - profileData.StatValues.LastDayTime) < 24*60*60) { return }

        profileData.StatValues.LastDayTime = os.time()
        profileData.StatValues.DayAmount += 1

        let currentDay = profileData.StatValues.DayAmount%DailyRewardsData.size()
        let selectedReward = SelectDailyReward(currentDay)

        if (!selectedReward) { return }
        
        this.ApplyReward(selectedReward)

    }

    public ClaimSessionReward(rewardindex: number) {

        let sessionData = this.player.session
        let selectedReward = SelectSessionReward(rewardindex)

        if (!selectedReward) { return }
        if (sessionData.claimedRewards.includes(rewardindex)) { return }
        if (selectedReward.Time! > sessionData.sessionTime) { return }

        sessionData.claimedRewards.push(rewardindex)

        this.ApplyReward(selectedReward)

    }

    public ClaimPetQuestReward() {

        print('Claiming')

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        PetQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key)) { return }
            if (!value.checkCallback || !value.checkCallback(this.player)) { return }

            profileData.CompletedQuests.push(key)
            this.ApplyReward(value.reward)
        })

        this.player.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
    }

    public RedeemCode(code: string) {

        let profileData = this.player.profile.Data
        let selectedReward = CodesRewardsData.get(code)

        if (!selectedReward) { return }
        if (profileData.RedeemedCodes.includes(code)) { return }

        profileData.RedeemedCodes.push(code)

        this.ApplyReward(selectedReward)

    }

    public DoRebirth(skip?: boolean) {

        let profileData = this.player.profile.Data
        let nextRebirthData = RebirthsRewardsData[profileData.Values.RebirthsVal+1]
        let currentRebirthData = RebirthsRewardsData[profileData.Values.RebirthsVal]!

        if (!nextRebirthData) { return }

        let additional = new Map<string, number>()
        nextRebirthData.Additional!.forEach((value) => { additional.set(value.data, value.amount) })

        let currentAdditional = new Map<string, number>()
        currentRebirthData.Additional!.forEach((value) => { additional.set(value.data, value.amount) })
        
        if ((profileData.Values.WinsVal < additional.get('Wins')!) && !skip) { return }

        this.player.SetStrength(0)
        this.ApplyReward(nextRebirthData) // Change multi
        profileData.Multipliers.StrengthMul = profileData.Multipliers.StrengthMul - currentAdditional.get('Wins')! + additional.get('Wins')!

    }

}

class PlayerHttpsController {
    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public CheckIsFriend(id: number){
        return this.player.instance.IsFriendsWith(id)
    }

    public CheckFolowingPlayers(ids: number[]){
        let res = HttpService.RequestAsync(
            {
                Url: `https://friends.roproxy.com/v1/user/following-exists`,
                Method: "POST",
                Body: tostring({
                    "targetUserIds": ids
                })
        })

        if (!res.Success) { return }

        let decoded = HttpService.JSONDecode(res.Body) as { followings: {    
            isFollowing: boolean,
            isFollowed: boolean,
            userId: number
        }[] }

        let result = true
        decoded.followings.forEach(value => {
            result = result && value.isFollowing
        });

        return result
    }
}

class PlayerFlyingController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public InitializeObject() {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data
        if (sessionData.currentFlyingObject) { return }

        let currentWorld = WorldsData.get(sessionData.currentWorld)
        if (!currentWorld) { return }

        let flyingPart = new Instance('Part')
        flyingPart.CanCollide = false
        flyingPart.Massless = true
        flyingPart.Size = new Vector3(5,5,5)
        flyingPart.Transparency = 0
        flyingPart.Name = this.player.instance.Name+tostring(math.random(10e9, 10e8))

        let ignoreFolder = game.Workspace.FindFirstChild('_ignoreObjects')

        if (!ignoreFolder) { 
            ignoreFolder = new Instance('Folder', game.Workspace)
            ignoreFolder.Name = '_ignoreObjects'
            ignoreFolder.Parent = game.Workspace
        }

        flyingPart.CFrame = new CFrame(currentWorld.shootPosition)
        flyingPart.Anchored = true
        flyingPart.Parent = ignoreFolder

        sessionData.currentFlyingObject = { partName: flyingPart.Name, part: flyingPart, flying: false }
        this.player.replica.SetValue('Session.currentFlyingObject', sessionData.currentFlyingObject)
    }

    public ShootObject(power: number) {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data
        if (sessionData.currentFlyingObject && sessionData.currentFlyingObject.flying) { return }

        let currentWorld = WorldsData.get(sessionData.currentWorld)
        if (!currentWorld) { return }

        let flyingPart = sessionData.currentFlyingObject!.part
        sessionData.currentFlyingObject!.flying = true
        print(profileData.Values.StrengthVal, currentWorld.density, power)
        print(profileData.Values.StrengthVal/currentWorld.gravity/3*power, profileData.Values.StrengthVal/currentWorld.density*power)

        let object = new FlyingObjectClass(
            flyingPart, 
            new Vector3(0, profileData.Values.StrengthVal/currentWorld.gravity/3*power, -profileData.Values.StrengthVal/currentWorld.density*power), 
            currentWorld.shootPosition,
            { gravity: currentWorld.gravity, density: currentWorld.density, length: currentWorld.length },
        )
        
        object.BindToStop((obj) => {
            print('ended')
            print(currentWorld!.reward * math.max((obj.TravelledDistance / currentWorld!.length), .01) * this.player.CalculateMultiplier('wins'))
            this.player.SetWins( profileData.Values.WinsVal + currentWorld!.reward * math.max((obj.TravelledDistance / currentWorld!.length), .01) * this.player.CalculateMultiplier('wins') )
            sessionData.currentFlyingObject!.part.Destroy()
            sessionData.currentFlyingObject = undefined
            this.player.replica.SetValue('Session.currentFlyingObject', undefined)
        })

        flyingPart.Anchored = false
        flyingPart.SetNetworkOwner(undefined)
        print('started')
        object.Activate()
    }

}