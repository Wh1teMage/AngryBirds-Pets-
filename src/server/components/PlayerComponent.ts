import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Profile, ProfileMetaData } from "@rbxts/profileservice/globals";
import ProfileService from "@rbxts/profileservice";
import { LoadProfile } from "server/services/DataStoreService";
import { IProfileData } from "shared/interfaces/ProfileData";
import { Replica, ReplicaService } from "@rbxts/replicaservice";
import { IServerPlayerComponent, PlayerDataReplica } from "shared/interfaces/PlayerData";
import { DefaultMultipliers, ICharacter, IMultipliers, ISessionData, SessionData, cloneSessionData } from "shared/interfaces/SessionData";
import { Events } from "server/network";
import { EffectName } from "shared/enums/EffectEnums";
import { CharacterFabric } from "./CharacterComponent";
import { Evolutions, IDBPetData, IPetData, Mutations, PetReplicationStatus, Sizes } from "shared/interfaces/PetData";
import { PetUtilities } from "shared/utility/PetUtilities";
import { petUpgradeConfig } from "shared/configs/PetConfig";
import Functions from "shared/utility/LuaUtilFunctions";
import { AbilityFabric } from "server/classes/AbilityClass";
import { EggBuyType, EggValueType } from "shared/interfaces/EggData";
import { BuyTypeConfig } from "shared/configs/EggConfig";
import { EggsData } from "shared/info/EggInfo";
import { ITradingPlayer, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { Trade } from "server/classes/TradeClass";
import { Players, HttpService, BadgeService, Workspace, ReplicatedStorage, TweenService } from "@rbxts/services";
import { PetModelManager } from "server/classes/PetModelClass";
import { PotionType } from "shared/enums/PotionEnum";
import { PotionsData } from "shared/info/PotionInfo";
import { PetsData } from "shared/info/PetInfo";
import { WorldsData } from "shared/info/WorldInfo";
import { ToolsData } from "shared/info/ToolInfo";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData";
import { WorldType } from "shared/enums/WorldEnums";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { CodesRewardsData, DailyChestRewardData, DailyRewardsData, FollowCodeRewardData, GroupChestRewardData, RebirthsRewardsData, SelectDailyReward, SelectSessionReward, SpinRewardData } from "shared/info/RewardInfo";
import { IRewardData } from "shared/interfaces/RewardData";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { FlyingObjectClass } from "server/classes/FlyingObjectClass";
import { PetQuestsData } from "shared/info/QuestInfo";
import { IncomeSource } from "shared/enums/IncomeEnums";
import { Passives } from "server/classes/PassiveClass";
import { BadgeManager } from "server/services/BadgeManager";
import { BadgeType } from "shared/interfaces/BadgeData";
import { MarketCallbacks } from "server/static/MarketStatic";
import { RelicPassiveNames } from "shared/info/RelicsInfo";

const ReplicaToken = ReplicaService.NewClassToken('PlayerData')

@Component({})
export class ServerPlayerComponent extends BaseComponent<{}, Player> implements OnStart {
    
    public profile!: Profile<IProfileData, ProfileMetaData>;
    public replica!: PlayerDataReplica
    public session: ISessionData = cloneSessionData() // table.clone(SessionData) //deep table clone
    public isLoaded: boolean = false
    
    //private _character!: ICharacter
    private _playerPetController = new PlayerPetController(this)
    private _playerEggController = new PlayerEggController(this)
    private _playerToolController = new PlayerToolController(this)
    private _playerBadgeController = new PlayerBadgeController(this)
    private _playerValueController = new PlayerValueController(this)
    private _playerTradeController = new PlayerTradeController(this)
    private _playerWorldController = new PlayerWorldController(this)
    private _playerHttpsController = new PlayerHttpsController(this)
    private _playerRelicsController = new PlayerRelicsController(this)
    private _playerPotionController = new PlayerPotionController(this)
    private _playerFlyingController = new PlayerFlyingController(this)
    private _playerRewardController = new PlayerRewardController(this)
    
    private _playerMultiplersController = new PlayerMultiplersController(this)
    
    
    public FindPet = (pet: IDBPetData) => this._playerPetController.FindPet(pet)
    public AppendPet = (pet: IDBPetData | undefined, ignore?: boolean) => this._playerPetController.AppendPet(pet, ignore)
    public RemovePet = (pet: IDBPetData) => this._playerPetController.RemovePet(pet)
    public LockPet = (pet: IDBPetData) => this._playerPetController.LockPet(pet)

    public EquipPet = (pet: IDBPetData) => this._playerPetController.EquipPet(pet)
    public UnequipPet = (pet: IDBPetData) => this._playerPetController.UnequipPet(pet)
    public ClaimVoidPet = (pet: IDBPetData, skip?: boolean) => this._playerPetController.ClaimVoidPet(pet, skip)

    public UpgradePetSize = (pet: IDBPetData) => this._playerPetController.UpgradePetSize(pet)
    public CheckSpaceForPets = (value: number) => this._playerPetController.CheckSpaceForPets(value)
    public RemovePetMutation = (pet: IDBPetData) => this._playerPetController.RemovePetMutation(pet)
    public UpgradePetMutation = (pet: IDBPetData, count: number) => this._playerPetController.UpgradePetMutation(pet, count)
    public UpgradePetEvolution = (pet: IDBPetData, count?: number) => this._playerPetController.UpgradePetEvolution(pet, count)

    public UnequipAll = () => this._playerPetController.UnequipAll()
    public EquipBest = () => this._playerPetController.EquipBest()
    public CraftAll = () => this._playerPetController.CraftAll()
    public RemovePets = (pets: IDBPetData[]) => this._playerPetController.RemovePets(pets)
    public MultiLock = (pets: IDBPetData[]) => this._playerPetController.MultiLock(pets)
    public MultiUnlock = (pets: IDBPetData[]) => this._playerPetController.MultiUnlock(pets)
    public UpdateAutoDelete = (petnames: string[]) => this._playerPetController.UpdateAutoDelete(petnames)

    public SetWins = (value: number, source?: IncomeSource) => this._playerValueController.SetWins(value, source)
    public SetGems = (value: number, source?: IncomeSource) => this._playerValueController.SetGems(value, source)
    public SetStars = (value: number, source?: IncomeSource) => this._playerValueController.SetStars(value, source)
    public SetStrength = (value: number, source?: IncomeSource) => this._playerValueController.SetStrength(value, source)

    public BuyEgg = (name: string, buytype: EggBuyType) => this._playerEggController.BuyEgg(name, buytype)
    public OpenEggBypass = (name: string, buytype: EggBuyType, noeffect?: boolean) => this._playerEggController.OpenEggBypass(name, buytype, noeffect)

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
    public AppendTool = (toolname: string) => this._playerToolController.AppendTool(toolname)
    public ReplicateModel = () => this._playerToolController.ReplicateModel()

    public BuyMaxWorld = (world: WorldType) => this._playerWorldController.BuyMaxWorld(world)
    public ChangeWorld = () => this._playerWorldController.ChangeWorld()
    public UseWorldTeleport = (world: WorldType) => this._playerWorldController.UseWorldTeleport(world)

    public InitializeObject = () => this._playerFlyingController.InitializeObject()
    public ShootObject = (power: number) => this._playerFlyingController.ShootObject(power)

    public IsFriends = (id: number) => this._playerHttpsController.CheckIsFriend(id)
    public GivePremiumReward = () => this._playerHttpsController.GivePremiumReward()

    public ApplyReward = (reward: IRewardData) => this._playerRewardController.ApplyReward(reward)
    public ClaimPetQuestReward = () => this._playerRewardController.ClaimPetQuestReward()
    public ClaimSessionReward = (rewardindex: number) => this._playerRewardController.ClaimSessionReward(rewardindex)
    public ClaimDailyReward = () => this._playerRewardController.ClaimDailyReward()
    public RedeemCode = (code: string) => this._playerRewardController.RedeemCode(code)
    public DoRebirth = (skip?: boolean) => this._playerRewardController.DoRebirth(skip)

    public ClaimFollowReward = () => this._playerRewardController.ClaimFollowReward()
    public ApplySpin = () => this._playerRewardController.ApplySpin() 
    public ClaimSpinReward = () => this._playerRewardController.ClaimSpinReward()
    public ClaimDailyChest = () => this._playerRewardController.ClaimDailyChest()
    public ClaimGroupChest = () => this._playerRewardController.ClaimGroupChest()
    public RedeemFollowCode = (code: string) => this._playerRewardController.RedeemFollowCode(code)

    public ClaimBadge = (id: number) => this._playerBadgeController.ClaimBadge(id)
    public AddBadgeToInventory = (id: number) => this._playerBadgeController.AddBadgeToInventory(id)

    public AppendRelic = (name: string, level: number, amout?: number) => this._playerRelicsController.AppendRelic(name, level, amout)
    public EquipRelic = (name: string, level: number) => this._playerRelicsController.EquipRelic(name, level)
    public UnequipRelic = (name: string, level: number) => this._playerRelicsController.UnequipRelic(name, level)

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

        this.profile.Data.StatValues.LastJoined = os.time()
        this.replica.SetValue('Profile.StatValues.LastJoined', this.profile.Data.StatValues.LastJoined)

        for (let buff of this.profile.Data.ActiveBuffs) {
            if (PotionsData.get(buff.source as PotionType)) { this.ApplyPotionEffect(buff.source as PotionType) }
        }

        let defaultPassives = [
            'EggQuest', 'FriendQuest', 'PetQuest', 'PetIndexQuest'
        ]

        for (let passiveName of defaultPassives) {
            let passive = Passives.get(passiveName)!() 
            passive.setOwner(this.instance)
            this.session.activePassives.push(passive)
        }

        print(this.session.leftToFollow)

        for (let badge of BadgeManager.GetBadgesByType(BadgeType.Start)) { this.ClaimBadge(badge.badgeId) }

        this.SetPetMultipliers()

        this.session.activePassives.forEach((value) => { value.onStart() })

        Players.GetPlayers().forEach((player) => {
            if (!this.IsFriends(player.UserId)) { return }
            if (player === this.instance) { return }

            let component = ServerPlayerFabric.GetPlayer(player)
            if (!component) { return }
            if (component.session.friendList.includes(this.instance.Name)) { return }

            component.session.friendList.push(this.instance.Name)
            this.session.friendList.push(player.Name)

            component.session.activePassives.forEach((value) => { value.onFriendsChanged() })
            for (let badge of BadgeManager.GetBadgesByType(BadgeType.Friend)) { component.ClaimBadge(badge.badgeId) }
        })

        this.session.activePassives.forEach((value) => { print(value); value.onFriendsChanged() })
        for (let badge of BadgeManager.GetBadgesByType(BadgeType.Friend)) { this.ClaimBadge(badge.badgeId) }

        this.GivePremiumReward()
        this.session.headStats.Parent = Workspace.Terrain
        this.session.leaderStats.Parent = this.instance

        task.spawn(() => {
            //this.AppendPotion(PotionType.LuckPotion)
            //this.UsePotion(PotionType.LuckPotion)

            /*
            if (this.profile.Data.Pets.size() < 10) {
                for (let i = 0; i < 200; i++) {
                    this.AppendPet(
                        {
                            name: 'Cat',
                            additional: {
                                size: Sizes.Baby,
                                evolution: Evolutions.Normal,
                                mutation: Mutations.Default,
                                limit: math.random(0, 100),
                            },
                            locked: false,
                            equipped: false
                        }
                    )
                    
                    this.EquipPet(
                        {
                            name: 'Cat',
                            additional: {
                                size: Sizes.Baby,
                                evolution: Evolutions.Normal,
                                mutation: Mutations.Default,
                                limit: math.random(0, 100),
                            },
                            locked: false,
                            equipped: false
                        }
                    )
                    
                }
            }
            */
            
            /*
            for (let i = 1; i < 8; i++) {
                this.AppendRelic('test'+tostring(i), 8, 1)
                this.EquipRelic('test'+tostring(i), 8)

                print('test'+tostring(i))
            }
            */

            
            if (this.profile.Data.Pets.size() < 1) {

                this.AppendPet(
                    {
                        name: 'Cat', //'GigaRaccoon',
                        additional: {
                            size: Sizes.Baby,
                            evolution: Evolutions.Normal,
                            mutation: Mutations.Default,
                        },
                        locked: false,
                        equipped: false
                    }
                )

            }
            
            print(this.profile.Data, 'Profile')
            
            //this.UseWorldTeleport(this.profile.Data.Config.MaxWorld)
           
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

            //let test = AbilityFabric.CreateAbility('Fireball', this.instance)
            //test.Start()
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

            let headFrame = this.session.headStats.WaitForChild('Frame');
            (headFrame.WaitForChild('Nickname') as TextLabel).Text = this.instance.Name

            let accuracyStats = this.session.leaderStats.WaitForChild('Accuracy') as IntValue
            let winsStats = this.session.leaderStats.WaitForChild('Wins') as IntValue
            let rebirthStats = this.session.leaderStats.WaitForChild('Rebirth') as IntValue
            let gemsStats = this.session.leaderStats.WaitForChild('Gems') as IntValue

            task.spawn(() => {
                while (task.wait(1) && this.instance.Parent) {

                    this.profile.Data.StatValues.IngameTime += 1
                    this.session.sessionTime += 1
                    print(this.session.claimedRewards.size(), this.instance.Name)
                    //print(this.session.multipliers.pet.strength)
                    //this.session.character!.Humanoid.WalkSpeed += 120
                    this.ChangeWorld()
                    this.ApplySpin()

                    this.session.headStats.Adornee = this.session.character;
                    (headFrame.WaitForChild('Stat') as TextLabel).Text = 'Accuracy: '+CreationUtilities.getSIPrefixSymbol(this.profile.Data.Values.StrengthVal)
                    if (this.profile.Data.Products.includes('vippass')) { (headFrame.WaitForChild('Vip') as TextLabel).Visible = true }

                    this.session.activePassives.forEach((passive) => { passive.onTick() })

                    this.replica.SetValue('Session.sessionTime', this.session.sessionTime)
                    this.replica.SetValue('Profile.StatValues.IngameTime', this.profile.Data.StatValues.IngameTime )

                    accuracyStats.Value = this.profile.Data.Values.StrengthVal
                    winsStats.Value = this.profile.Data.Values.WinsVal
                    rebirthStats.Value = this.profile.Data.Values.RebirthsVal
                    gemsStats.Value = this.profile.Data.Values.GemsVal

                    //this.replica.SetValue('Session.testvalue', math.random(0, 100))
                    //Events.ReplicateEffect.fire(this.instance, EffectName.ClickSound)
                }
            })


        })

        this.isLoaded = true

    }

    public OnLeft() {
        if (!this.profile) {return}
        if (this.session.activeTrade) { this.session.activeTrade.Deny() }
        this.profile.Release()
        this.replica.Destroy()
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
                Session: this.session
            },
            Replication: this.instance
        })
    }
    
}

export class ServerPlayerFabric {

    static CreatePlayer(player: Player) {
        return Dependency<Components>().addComponent<ServerPlayerComponent>(player)
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

        this.player.profile.Data.Values.StrengthVal = math.round(value)
        this.player.profile.Data.MaxValues.StrengthMaxVal = math.max(this.player.profile.Data.MaxValues.StrengthMaxVal, math.round(value))

        this.player.replica.SetValue('Profile.Values.StrengthVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.StrengthMaxVal', this.player.profile.Data.MaxValues.StrengthMaxVal)
    }

    public SetWins(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Wins); 
                passive.onWinsChanged(value, this.player.profile.Data.Values.WinsVal) 
            })
        }

        this.player.profile.Data.Values.WinsVal = math.round(value)
        this.player.profile.Data.MaxValues.WinsMaxVal = math.max(this.player.profile.Data.MaxValues.WinsMaxVal, math.round(value))

        this.player.replica.SetValue('Profile.Values.WinsVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.WinsMaxVal', this.player.profile.Data.MaxValues.WinsMaxVal)
    }

    public SetStars(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Stars); 
                passive.onStarsChanged(value, this.player.profile.Data.Values.StarsVal) 
            })
        }

        this.player.profile.Data.Values.StarsVal = math.round(value)
        this.player.profile.Data.MaxValues.StarsMaxVal = math.max(this.player.profile.Data.MaxValues.StarsMaxVal, math.round(value))

        this.player.replica.SetValue('Profile.Values.StarsVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.StarsMaxVal', this.player.profile.Data.MaxValues.StarsMaxVal)
    }

    public SetGems(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Gems); 
                passive.onGemsChanged(value, this.player.profile.Data.Values.GemsVal) 
            })
        }

        this.player.profile.Data.Values.GemsVal = math.round(value)
        this.player.profile.Data.MaxValues.GemsMaxVal = math.max(this.player.profile.Data.MaxValues.GemsMaxVal, math.round(value))

        this.player.replica.SetValue('Profile.Values.GemsVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.GemsMaxVal', this.player.profile.Data.MaxValues.GemsMaxVal)
    }

    public SetRebirths(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Rebirths); 
                passive.onStarsChanged(value, this.player.profile.Data.Values.RebirthsVal) 
            })
        }

        this.player.profile.Data.Values.RebirthsVal = math.round(value)
        this.player.replica.SetValue('Profile.Values.RebirthsVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.RebirthsMaxVal', this.player.profile.Data.MaxValues.RebirthsMaxVal)
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
        //if (multiname === 'stars') { overallMultiplier *= profileData.Multipliers. }
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

        print(buffIndex, 'Buffindex')

        if (buffIndex !== undefined) { 
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
        
        this.ApplyPotionEffect(potion)
        this.player.replica.SetValue('Profile.ActiveBuffs', profileData.ActiveBuffs)
    }

    public ApplyPotionEffect(potion: PotionType) {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

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
            if (sessionData.activeBuffs.includes(activeBuff.name)) {
                sessionData.activeBuffs.remove(sessionData.activeBuffs.indexOf(activeBuff.name))
            }

            this.player.replica.SetValue('Profile.ActiveBuffs', profileData.ActiveBuffs)
        })

        if (!sessionData.activeBuffs.includes(activeBuff.name)) { potionInfo!.enableEffect(this.player); sessionData.activeBuffs.push(activeBuff.name) }

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
    private eggCD = 6
    private lastOpen = 0

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public OpenEggBypass(name: string, buytype: EggBuyType, noeffect?: boolean) {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        let amount = BuyTypeConfig[buytype]
        let eggInfo = EggsData.get(name)

        if (!eggInfo) {return}

        let pets: string[] = []

        for (let i = 0; i < amount; i++) {
            let petName = PetUtilities.RandomWeight(eggInfo.petchances, profileData.Config.Luck+sessionData.multipliers.other.luck-1)
            let pet = PetUtilities.NameToDBPetWithEgg(petName, eggInfo.name)

            let goldenChance = math.random(1, 1000)
            let voidChance = math.random(1, 1000)

            if (goldenChance <= 10 && this.player.session.stats.get('GoldPotionBuff')) { pet!.additional.evolution = Evolutions.Gold }
            if (voidChance <= 5 && this.player.session.stats.get('VoidPotionBuff')) { pet!.additional.evolution = Evolutions.Void }

            pets.push(pet!.name)

            if (sessionData.deletePets.includes(pet!.name)) { continue }
            this.player.AppendPet(pet, true)
        }
        
        this.player.replica.SetValue('Profile.Pets', this.player.profile.Data.Pets)
        this.player.replica.SetValue('Profile.PetIndex', this.player.profile.Data.PetIndex)

        if (noeffect) { return }

        Events.ReplicateEffect.fire(this.player.instance, 'EggHatched', new Map<string, any>([
            ['EggName', name], ['Pets', pets], ['Speed', this.player.profile.Data.Multipliers.HatchSpeedMul]
        ]))
    }

    public BuyEgg(name: string, buytype: EggBuyType) {
        if (!this.player.profile) { return }
        let profileData = this.player.profile.Data

        let amount = BuyTypeConfig[buytype]
        let eggInfo = EggsData.get(name)

        // additional buytype check later on (check gamepass)
        print(eggInfo)
        if (!eggInfo) {return}

        if ((os.clock() - this.lastOpen) < this.eggCD/this.player.profile.Data.Multipliers.HatchSpeedMul) { return }
        if (buytype === EggBuyType.Ten && eggInfo!.valuetype !== EggValueType.VBugs) { return }
        if (buytype === EggBuyType.Triple && !profileData.Products.includes('3egghatch') && eggInfo!.valuetype !== EggValueType.VBugs) { return }
        if (!this.player.CheckSpaceForPets(amount)) {return}
        
        switch (eggInfo.valuetype) {
            case EggValueType.Wins:

                if (profileData.Values.WinsVal < eggInfo.price*amount) {return}
                print(eggInfo, 1)

                this.OpenEggBypass(name, buytype)

                this.player.session.activePassives.forEach((value) => { value.onEggOpened(eggInfo!, amount, buytype) })

                /*
                for (let i = 0; i < amount; i++) {
                    let petName = PetUtilities.RandomWeight(eggInfo.petchances, profileData.Config.Luck)
                    this.player.AppendPet(PetUtilities.NameToDBPetWithEgg(petName, eggInfo.name)!)
                }
                */

                this.player.SetWins(profileData.Values.WinsVal - eggInfo.price*amount)

                break
            case EggValueType.VBugs:
                let id = eggInfo.productid!
                if (buytype === EggBuyType.Triple) { id = eggInfo.productidx3! }

                Events.ReplicateEffect.fire(this.player.instance, EffectName.ReplicatePurchase, new Map<string, number>([['productId', id]]))

                // should rebuilt this egg system btw (esp with paid once)
                break
            case EggValueType.Stored:

                let foundIndex = -1
                profileData.StoredEggs.forEach((val, index) => { if (val.name === name) { foundIndex = index } })
                print(foundIndex)
                if (foundIndex < 0) { return }
                if (profileData.StoredEggs[foundIndex].amount < eggInfo.price*amount) { return }

                this.OpenEggBypass(name, buytype)

                profileData.StoredEggs[foundIndex].amount -= eggInfo.price*amount
                print(profileData.StoredEggs[foundIndex].amount)

                this.player.replica.SetValue('Profile.StoredEggs', profileData.StoredEggs)

                break
            default:
            
        }

        this.lastOpen = os.clock()

    }

}

class PlayerPetController {

    private player: ServerPlayerComponent

    private lastCraftAll = os.clock()

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    private _upgradePet<T extends never>(pet: IDBPetData, upgradeConfig: Map<T, number>, field: keyof IDBPetData['additional']) {
        
        let selectedPets: IDBPetData[] = [ pet ]

        for (let value of upgradeConfig) {
            let passes = 1
            let formatted = pet
            formatted.additional[field] = value[0]

            for (let v of this.player.profile.Data.Pets) {
                if (Functions.compareObjects(pet, v)) { continue }
                if (!PetUtilities.ComparePets(pet, v) || v.locked) { continue }

                passes += 1; 
                selectedPets.push(v)
                if (passes >= value[1]) { break }
            }

            if (passes < value[1]) { return }
        }

        for (let selectedpet of selectedPets) { this.RemovePet(selectedpet, true, true) }
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Remove, selectedPets)
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
        this.player.replica.SetValue('Profile.PetIndex', this.player.profile.Data.PetIndex)
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

    public UpdateAutoDelete(petnames: string[]) {
        let sessionData = this.player.session
        sessionData.deletePets = petnames
    }

    public EquipPet(pet: IDBPetData, ignore?: boolean, index?: number) {
        print('TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest2', pet, ignore)
        let profileData = this.player.profile.Data
        let petIndex = -1

        if (this.CheckEquipCount()+1 > profileData.Config.MaxEquippedPets) { return }

        if (index !== undefined) { petIndex = index }
        if (!index) { profileData.Pets.forEach((value, index) => { if ((pet.id === value.id)) { petIndex = index } }) } //Functions.compareObjects(pet, value) && !value.equipped
        //print(petIndex, pet.equipped)
        if (petIndex < 0) { return }
        //print('Equipped')
        profileData.Pets[petIndex].equipped = true

        task.spawn(() => { PetModelManager.AddPet(this.player.instance, profileData.Pets[petIndex]) })
        
        if (ignore) { return }

        this.player.SetPetMultipliers()
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, [profileData.Pets[petIndex]!], [pet])
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public UnequipPet(pet: IDBPetData, ignore?: boolean, index?: number) {
        print('TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest1', pet, ignore)

        let profileData = this.player.profile.Data
        let petIndex = -1

        if (index) { petIndex = index }
        if (!index) { profileData.Pets.forEach((value, index) => { if ((pet.id === value.id)) { petIndex = index } }) } //&& value.equipped

        print(petIndex)

        if (petIndex < 0) { return }
        //if (!profileData.Pets[petIndex].equipId || profileData.EquippedPets.indexOf(profileData.Pets[petIndex].equipId!) < 0) { return }

        print(profileData.Pets[petIndex], petIndex)

        profileData.Pets[petIndex].equipped = false

        task.spawn(() => { PetModelManager.RemovePet(this.player.instance, profileData.Pets[petIndex]) })

        if (ignore) { return }

        print('Sent!')

        this.player.SetPetMultipliers()
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, [profileData.Pets[petIndex]!], [pet])
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public FindPet(pet: IDBPetData) {
        let foundPet: IDBPetData | undefined;
        let profileData = this.player.profile.Data

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { foundPet = value } })
        return foundPet
    }

    public AppendPet(pet: IDBPetData | undefined, ignore?: boolean) {
        let profileData = this.player.profile.Data

        if (!pet) { return }
        if (!this.CheckSpaceForPets(1)) {return}

        if (this.player.profile.Data.PetIndex.indexOf(pet.name) < 0) { this.player.profile.Data.PetIndex.push(pet.name) }

        let formatted = table.clone(pet)
        formatted.id = HttpService.GenerateGUID(false)+tostring(math.random(1, 100000))

        this.player.profile.Data.Pets.push(formatted)
        this.player.session.activePassives.forEach((passive) => { passive.onPetAdded(formatted) })

        if (ignore) { return }

        this.player.replica.SetValue('Profile.Pets', this.player.profile.Data.Pets)
        this.player.replica.SetValue('Profile.PetIndex', this.player.profile.Data.PetIndex)
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Append, [pet])
    }

    public RemovePet(pet: IDBPetData, ignore?: boolean, bypass?: boolean) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        if (!bypass && profileData.Pets.size() <= 1) { return }

        profileData.Pets.forEach((value, index) => { if ((pet.id === value.id) && !value.locked) { petIndex = index } })
        if (petIndex < 0) { return }

        if ( profileData.Pets[petIndex].equipped ) { this.UnequipPet(pet, true) }

        profileData.Pets.remove(petIndex)

        if (ignore) { return }
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Remove, [pet])
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public RemovePets(pets: IDBPetData[]) {
        pets.forEach((val) => { this.RemovePet(val, true) })
        this.player.replica.SetValue('Profile.Pets', this.player.profile.Data.Pets)
    }

    public CraftAll() {
        if ((os.clock() - this.lastCraftAll) < 1) { return }

        let profileData = this.player.profile.Data
        for (let pet of profileData.Pets) {
            this.UpgradePetSize(pet, true)
        }

        this.lastCraftAll = os.clock()

        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
        this.player.replica.SetValue('Profile.PetIndex', profileData.PetIndex)
    }

    public EquipBest() {
        let profileData = this.player.profile.Data
        let start = os.clock()
        print(os.clock()-start, 'pass1')

        /*
        let proxyPets: IPetData[] = []
        let otherProxy = []

        for (let val of profileData.Pets) {
            proxyPets.push(PetUtilities.DBToPetTransfer(val)!)
            otherProxy.push(table.clone(val))
        }

        print(os.clock()-start, 'pass1.5')
        proxyPets.sort((a, b) => {
            return a.multipliers!.get('strength')! > b.multipliers!.get('strength')!
        })
        */

        this.UnequipAll(true)
        print(os.clock()-start, 'pass3')
        
        profileData.Pets.sort((a, b) => {
            let petData1 = PetUtilities.DBToPetTransfer(a)!
            let petData2 = PetUtilities.DBToPetTransfer(b)!

            return petData1.multipliers!.get('strength')! > petData2.multipliers!.get('strength')!
        })
        
        print(os.clock()-start, 'pass2')


        let equipList: IDBPetData[] = []

        /*
        for (let val of proxyPets) {
            //task.wait()
            if (equipList.size() > math.min(profileData.Config.MaxEquippedPets, profileData.Pets.size())) { continue }
            equipList.push(PetUtilities.PetToDBTransfer(val))
        }
        */

        print(os.clock()-start, 'pass4')
        print(equipList, 'EquipList')

        for (let i = 0; i < math.min(profileData.Config.MaxEquippedPets, profileData.Pets.size()); i++) {
            let val = profileData.Pets[i]
            //task.wait()
            this.EquipPet(val, true, i)
        }

        print(os.clock()-start, 'pass5')

        this.player.SetPetMultipliers()
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, profileData.Pets, otherProxy)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)

        equipList.clear()

        print(os.clock()-start, 'pass6')
    }

    public UnequipAll(ignore?: boolean) {
        let profileData = this.player.profile.Data
        let unequipList: IDBPetData[] = []
        let proxyList: IDBPetData[] = []

        profileData.Pets.forEach((val) => {
            if (!val.equipped) { return }
            unequipList.push(table.clone(val))
            proxyList.push(table.clone(val))
        })

        for (let i = 0; i < unequipList.size(); i++) {
            let val = unequipList[i]
            this.UnequipPet(val, true, i)
            proxyList[i].equipped = false
        }

        if (ignore) { 
            unequipList.clear()
            proxyList.clear()
        }

        if (ignore) { return }

        this.player.SetPetMultipliers()
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, proxyList, unequipList)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)

        unequipList.clear()
        proxyList.clear()
    }

    public LockPet(pet: IDBPetData, ignore?: boolean) {
        let profileData = this.player.profile.Data
        let foundPet = this.FindPet(pet)

        if (!foundPet) { return }
        foundPet.locked = !foundPet.locked

        if (ignore) { return }
        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, [foundPet], [pet])
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public MultiLock(pets: IDBPetData[]) {
        let profileData = this.player.profile.Data
        let newPets: IDBPetData[] = []

        pets.forEach((val) => { if (!val.locked) { this.LockPet(val, true); newPets.push(val) } })

        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, newPets, pets)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)

        newPets.clear()
    }

    public MultiUnlock(pets: IDBPetData[]) {
        let profileData = this.player.profile.Data
        let newPets: IDBPetData[] = []

        pets.forEach((val) => { if (val.locked) { this.LockPet(val, true); newPets.push(val) } })

        //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Update, newPets, pets)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)

        newPets.clear()
    }

    public UpgradePetSize(pet: IDBPetData, ignore?: boolean) {
        let globalPass = 0
        this.player.profile.Data.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value) && !value.locked) { globalPass = 1 } })
        if (globalPass === 0) { return }
        if (!petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize) { return }

        let passed = this._upgradePet(pet, petUpgradeConfig.SizeUpgrades[pet.additional.size].requirements as Map<never, number>, 'size')
        if (!passed) { return }

        let formatted = pet
        formatted.additional.size = petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize as Sizes

        this.AppendPet(formatted, ignore)
    }

    public UpgradePetMutation(pet: IDBPetData, count: number) {
        let profileData = this.player.profile.Data
        let selectedPet = this.FindPet(pet)

        count = math.clamp(count, 1, 15)

        if (!selectedPet) { return }
        if (selectedPet.additional.mutation !== Mutations.Default) { return }
        if (profileData.Values.GemsVal < count) { return }

        let allMutations = [Mutations.Elder, Mutations.Majestic, Mutations.Primordial, Mutations.Sacred]
        let mutations: {weight: number, name: string}[] = []

        for (let name of allMutations) {
            if (name === Mutations.Default) { continue }
            mutations.push({weight: petUpgradeConfig.MutationUpgrades[name].requirements.weight, name: name})
        }

        let mutationName = PetUtilities.RandomWeight(mutations, (1-0.088)+count*0.088)
        print(mutationName)
        this.player.SetGems(profileData.Values.GemsVal - count)

        this.RemovePet(pet, false, true)

        let formatted = pet
        formatted.additional.mutation = mutationName as Mutations

        this.AppendPet(formatted)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Successful ${mutationName!.upper()} Mutation!`], ['Image', 'Success']]))
    }

    public RemovePetMutation(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let selectedPet = this.FindPet(pet)

        if (!selectedPet) { return }
        if (selectedPet.additional.mutation === Mutations.Default) { return }

        this.player.SetGems(profileData.Values.GemsVal - 1)

        this.RemovePet(pet, false, true)

        let formatted = pet
        formatted.additional.mutation = Mutations.Default

        this.AppendPet(formatted)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Successfully Cleared Mutation!'], ['Image', 'Success']]))
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

                let proxy: IDBPetData[] = []

                for (let i = 1; i <= count; i++) {
                    proxy.push(table.clone(removablePets[0]))
                    this.RemovePet(removablePets[0], true, true)
                    removablePets.remove(0)
                }

                //Events.SendPetReplication.fire(this.player.instance, PetReplicationStatus.Remove, proxy)
                proxy.clear()

                let chance = math.random(1,5)

                if (count < chance) { 
                    this.player.replica.SetValue('Profile.Pets', profileData.Pets)
                    Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Failed To Craft!'], ['Image', 'Error']]))
                    return 
                }
                Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Successful Craft!'], ['Image', 'Success']]))

                formatted.additional.evolution = petUpgradeConfig.EvolutionUpgrades[pet.additional.evolution].nextEvolution as Evolutions
                this.AppendPet(formatted)

                return

            case Evolutions.Gold:

                if (profileData.VoidMachine.size() >= profileData.Config.MaxPetsInVoidMachine) { return }
                this.RemovePet(pet, false, true)

                formatted.additional.evolution = petUpgradeConfig.EvolutionUpgrades[pet.additional.evolution].nextEvolution as Evolutions
                profileData.VoidMachine.push({pet: formatted, endTime: os.time()+petUpgradeConfig.EvolutionUpgrades.Gold.requirements.time, startTime: os.time()})

                this.player.replica.SetValue('Profile.VoidMachine', profileData.VoidMachine)
                Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Pet Into Void Machine!'], ['Image', 'Success']]))

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
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Pet From Void Machine!'], ['Image', 'Success']]))
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

        if (worldInfo.weight <= WorldsData.get(profileData.Config.MaxWorld)!.weight) { return }
        if (profileData.Values.StarsVal < worldInfo.price) { return }

        this.player.SetStars(profileData.Values.StarsVal - worldInfo.price)
        profileData.Config.MaxWorld = world

        for (let badge of BadgeManager.GetBadgesByType(BadgeType.World)) { this.player.ClaimBadge(badge.badgeId) }
        this.player.replica.SetValue('Profile.Config.MaxWorld', profileData.Config.MaxWorld)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'New Max World!'], ['Image', 'NewWorld']]))
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'New Bundle!'], ['Image', 'NewWorldBundle']]))

        this.UseWorldTeleport(profileData.Config.MaxWorld)

        //this.ChangeWorld()
    }

    public UseWorldTeleport(world: WorldType) {
        let profileData = this.player.profile.Data
        let worldInfo = WorldsData.get(world)!

        if (WorldsData.get(profileData.Config.MaxWorld)!.weight < worldInfo.weight) { return }
        //if (profileData.Products.indexOf('SomeWorldTpgamepass') < 0) { return } //TODO //There are no tp passes

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
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'New Tool!'], ['Image', 'Success']]))
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

                //this.player.SetStrength(profileData.Values.StrengthVal - toolInfo.price)
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

        if (!this.canUse(toolInfo)) { return }

        this.using = true

        this.player.SetStrength(profileData.Values.StrengthVal + toolInfo.addition * this.player.CalculateMultiplier('strength'))

        this.lastUsed = tick()
        this.using = false

        print(this.player.session.activePassives)

        this.player.session.activePassives.forEach((value) => { print(value.onShoot()); value.onShoot() })
        
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

        CreationUtilities.WeldConstraint(clonnedModel.PrimaryPart!, sessionData.character!.FindFirstChild('RightHand') as Part)
    }

}

class PlayerRewardController {

    private player: ServerPlayerComponent

    private spinCD = 7
    private lastSpin = 0

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public GetChanceReward(reward: IRewardData) {
        let chances: {name: string, weight: number}[] = []

        reward.Chances?.forEach((val, key) => {
            chances.push({name: val.name, weight: val.weight})
        })

        let rewardName = PetUtilities.RandomWeight(chances, 1)!
        let selectedReward : IRewardData = {}

        reward.Chances?.forEach((val, key) => {
            if (rewardName === val.name) { selectedReward = val.reward }
        })

        return {name: rewardName, reward: selectedReward}
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

        reward.Eggs?.forEach((value) => {
            for (let i = 0; i < value.amount; i++) {
                this.player.OpenEggBypass(value.egg, value.type)
            }
        })

        if (reward.Additional?.get('MaxEquippedPets')) { profile.Config.MaxEquippedPets += reward.Additional?.get('MaxEquippedPets')! }
        if (reward.Additional?.get('MaxPets')) { profile.Config.MaxPets += reward.Additional?.get('MaxPets')! }
        if (reward.Additional?.get('SpinCount')) { profile.StatValues.SpinCount += reward.Additional?.get('SpinCount')! }

        if (reward.Additional?.get('StrengthMul')) { profile.Multipliers.StrengthMul += reward.Additional?.get('StrengthMul')! }
        if (reward.Additional?.get('tinypackwins')) { MarketCallbacks.get('tinypackwins')!(this.player) }

        this.player.SetStrength(profile.Values.StrengthVal + (reward.Values?.Strength || 0))
        this.player.SetStars(profile.Values.StarsVal + (reward.Values?.Stars || 0))
        this.player.SetWins(profile.Values.WinsVal + (reward.Values?.Wins || 0))
        this.player.SetGems(profile.Values.GemsVal + (reward.Values?.Gems || 0))

        if (reward.Values?.Strength) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Recieved ${reward.Values?.Strength} Accuracy!`], ['Image', 'Accuracy']]))
        }
        if (reward.Values?.Wins) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Recieved ${reward.Values?.Wins} Wins!`], ['Image', 'Wins']]))
        }
        if (reward.Values?.Stars) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Recieved ${reward.Values?.Stars} Stars!`], ['Image', 'Stars']]))
        }
        if (reward.Values?.Gems) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Recieved ${reward.Values?.Gems} Gems!`], ['Image', 'Gems']]))
        }

        this.player.replica.SetValue('Profile.Config.MaxEquippedPets', profile.Config.MaxEquippedPets)
        this.player.replica.SetValue('Profile.Config.MaxPets', profile.Config.MaxPets)
    }

    public ClaimDailyReward() {

        let profileData = this.player.profile.Data
        print(os.time() - profileData.StatValues.LastDayTime)
        if ((os.time() - profileData.StatValues.LastDayTime) < 24*60*60) { return } 

        profileData.StatValues.LastDayTime = os.time()
        profileData.StatValues.DayAmount += 1

        let currentDay = profileData.StatValues.DayAmount%DailyRewardsData.size()
        let selectedReward = SelectDailyReward(currentDay)

        this.player.replica.SetValue('Profile.StatValues.LastDayTime', profileData.StatValues.LastDayTime)
        this.player.replica.SetValue('Profile.StatValues.DayAmount', profileData.StatValues.DayAmount)

        if (!selectedReward) { return }
        
        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Daily Claimed!'], ['Image', 'Success']]))
    }

    public ClaimSessionReward(rewardindex: number) {

        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        let selectedReward = SelectSessionReward(rewardindex, profileData.Config.MaxWorld)

        if (!selectedReward) { return }
        if (sessionData.claimedRewards.includes(rewardindex)) { return }
        if (selectedReward.Time! > sessionData.sessionTime) { return }

        sessionData.claimedRewards.push(rewardindex)
        this.player.replica.SetValue('Session.claimedRewards', sessionData.claimedRewards)

        print(sessionData.claimedRewards.size(), 'Claimed Rewards', this.player.instance.Name)
        print(sessionData)

        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Gift Claimed!'], ['Image', 'Success']]))

    }

    public ClaimPetQuestReward() {

        print('Claiming')

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        //sessionData.activePassives.forEach((value) => { value.onTrigger() })

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
        let selectedReward = CodesRewardsData.get(code.lower())

        print(code, selectedReward)

        if (!selectedReward) { 
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Invalid Code!'], ['Image', 'Error']]))
            return 
        }
        if (profileData.RedeemedCodes.includes(code)) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Code Already Redeemed!'], ['Image', 'Error']]))
            return 
        }

        profileData.RedeemedCodes.push(code)

        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Code Redeemed!'], ['Image', 'Success']]))
    }

    public RedeemFollowCode(code: string) {
        let profileData = this.player.profile.Data

        if (code.find('@').size() < 1) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Invalid Code!'], ['Image', 'Error']]))
            return 
        }
        if (profileData.RedeemedCodes.includes('FollowCode')) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Code Already Redeemed!'], ['Image', 'Error']]))
            return
        }

        profileData.RedeemedCodes.push('FollowCode')
        this.ApplyReward(FollowCodeRewardData)

        this.player.replica.SetValue('Profile.RedeemedCodes', profileData.RedeemedCodes)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Code Redeemed!'], ['Image', 'SuccessfulFollow']]))
    }

    public DoRebirth(skip?: boolean) {

        let profileData = this.player.profile.Data
        let nextRebirthData = RebirthsRewardsData[profileData.Values.RebirthsVal+1]
        let currentRebirthData = RebirthsRewardsData[profileData.Values.RebirthsVal]!

        if (!nextRebirthData) { return }

        let additional = new Map<string, number>()
        nextRebirthData.Additional!.forEach((value, key) => { additional.set(key, value) })

        let currentAdditional = new Map<string, number>()
        currentRebirthData.Additional!.forEach((value, key) => { currentAdditional.set(key, value) })
        
        if ((profileData.Values.WinsVal < additional.get('Wins')!) && !skip) { return }

        this.player.SetStrength(0)
        profileData.Multipliers.StrengthMul = profileData.Multipliers.StrengthMul - currentAdditional.get('Multiplier')! + additional.get('Multiplier')!

        print(nextRebirthData)

        
        profileData.Values.RebirthsVal += 1
        profileData.Values.GemsVal += nextRebirthData.Values!.Gems! * (profileData.Multipliers.GemsMul - 1)
        if (!skip) { profileData.Values.WinsVal -= additional.get('Wins')! }

        this.ApplyReward(nextRebirthData)

        this.player.replica.SetValue('Profile.Values.WinsVal', profileData.Values.WinsVal)
        this.player.replica.SetValue('Profile.Values.RebirthsVal', profileData.Values.RebirthsVal)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Rebirth Successful!'], ['Image', 'Success']]))
    }

    public ClaimFollowReward() {

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        print('Claimed!', sessionData.leftToFollow)

        if (sessionData.leftToFollow.size() !== 0) { return }
        if (profileData.CompletedQuests.includes('PetQuest1')) { return }

        print('Done!')

        profileData.CompletedQuests.push('PetQuest1')
        this.ApplyReward(PetQuestsData.get('PetQuest1')!.reward)

        this.player.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Quest Done!'], ['Image', 'Success']]))
    }

    public ApplySpin() {

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if ((os.time() - profileData.StatValues.LastSpinTime) < 24*60*60) { return }

        profileData.StatValues.LastSpinTime = os.time()
        profileData.StatValues.SpinCount += 1

        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'New Spin!'], ['Image', 'NewSpin']]))

        this.player.replica.SetValue('Profile.StatValues.LastSpinTime', profileData.StatValues.LastSpinTime)
        this.player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)

    }

    public ClaimSpinReward() { //TO DO make some kind of different worlds rewards (so we can change rewards depending on the max world)

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if ((profileData.StatValues.SpinCount) < 1) { return }
        if ((os.time() - this.lastSpin) < this.spinCD) { return }

        profileData.StatValues.SpinCount -= 1 
        this.lastSpin = os.time()

        let data = this.GetChanceReward(SpinRewardData)
        Events.ReplicateEffect.fire(this.player.instance, 'SpinStarted', new Map<string, any>([['Reward', data.name], ['SpinTime', this.spinCD-1.5]]))

        task.wait(this.spinCD)

        this.ApplyReward(data.reward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Claimed Spin Reward!'], ['Image', 'Success']]))
    }
 
    public ClaimDailyChest() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if ((os.time() - profileData.StatValues.LastDailyChestTime) < 24*60*60) { return }

        profileData.StatValues.LastDailyChestTime = os.time()

        for (let i = 0; i < 2; i ++) {
            let data = this.GetChanceReward(DailyChestRewardData)
            this.ApplyReward(data.reward)
        }

        this.player.replica.SetValue('Profile.StatValues.LastDailyChestTime', profileData.StatValues.LastDailyChestTime)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Claimed Daily Chest!'], ['Image', 'Success']]))
    }

    public ClaimGroupChest() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if (!this.player.instance.IsInGroup(32554726)) { return } 
        if ((os.time() - profileData.StatValues.LastGroupChestTime) < 24*60*60) { return }

        profileData.StatValues.LastGroupChestTime = os.time()

        //if (profileData.CompletedQuests.includes('GroupChest')) { return }
        //profileData.CompletedQuests.push('GroupChest')

        let data = this.GetChanceReward(GroupChestRewardData)
        this.ApplyReward(data.reward)

        this.player.replica.SetValue('Profile.StatValues.LastGroupChestTime', profileData.StatValues.LastGroupChestTime)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'Claimed Group Chest!'], ['Image', 'Success']]))
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

    public GivePremiumReward() {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        if (profileData.Products.includes('RobloxPremium')) { return }
        if (this.player.instance.MembershipType !== Enum.MembershipType.Premium) { return }

        profileData.Multipliers.WinsMul += 0.1
        profileData.Config.Luck += 0.1

        profileData.Products.push('RobloxPremium')
    }
}

class PlayerFlyingController {

    private player: ServerPlayerComponent
    private effect?: Part

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public InitializeObject() {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data
        if (sessionData.currentFlyingObject) { return }

        let effects = ReplicatedStorage.WaitForChild('Effects')
        let currentWorld = WorldsData.get(sessionData.currentWorld)
        if (!currentWorld) { return }

        let flyingPart = new Instance('Part')
        flyingPart.CanCollide = false
        flyingPart.Massless = true
        flyingPart.Size = new Vector3(5,5,5)
        flyingPart.Transparency = 1
        flyingPart.Name = this.player.instance.Name+tostring(math.random(10e9, 10e8))

        let ignoreFolder = game.Workspace.WaitForChild('InstaReplica') //game.Workspace.FindFirstChild('_ignoreObjects')

        print(flyingPart, ignoreFolder?.GetChildren())

        /*
        if (!ignoreFolder) { 
            ignoreFolder = new Instance('Model', game.Workspace)
            ignoreFolder.Name = '_ignoreObjects'
            ignoreFolder.Parent = game.Workspace
        }
        */

        flyingPart.CFrame = new CFrame(currentWorld.startingPosition)
        flyingPart.Anchored = true
        flyingPart.Parent = ignoreFolder

        /*
        let gyro = new Instance('BodyGyro')
        gyro.MaxTorque = new Vector3(10e99, 10e99, 10e99)
        gyro.CFrame = flyingPart.CFrame
        gyro.Parent = flyingPart
        */

        /*
        let currentEffect = effects.WaitForChild('RedFly').Clone() as Part
        currentEffect.CFrame = flyingPart.CFrame
        currentEffect.CanCollide = false
        currentEffect.Anchored = false
        currentEffect.Massless = true
        currentEffect.Transparency = 0
        currentEffect.Color = Color3.fromRGB(255, 0, 0)
        currentEffect.Size = new Vector3(1,1,1)
        currentEffect.Parent = ignoreFolder
        
        let pos = new Instance('BodyPosition')
        pos.MaxForce = new Vector3(10e99, 10e99, 10e99)
        pos.P = 10**5
        pos.Position = flyingPart.Position
        pos.Parent = currentEffect
        */

        //this.effect = currentEffect
        sessionData.currentFlyingObject = { partName: flyingPart.Name, part: flyingPart, flying: false }
        this.player.replica.SetValue('Session.currentFlyingObject', sessionData.currentFlyingObject)
    }

    public ShootObject(power: number) {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        if (!sessionData.currentFlyingObject) { return }
        if (sessionData.currentFlyingObject && sessionData.currentFlyingObject.flying) { return }

        let currentWorld = WorldsData.get(sessionData.currentWorld)
        let flyingWorld = sessionData.currentWorld
        if (!currentWorld) { return }

        let flyingPart = sessionData.currentFlyingObject!.part
        sessionData.currentFlyingObject!.flying = true
        print(profileData.Values.StrengthVal, currentWorld.density, power)
        print(profileData.Values.StrengthVal/currentWorld.gravity/3*power, profileData.Values.StrengthVal/currentWorld.density*power)

        let object = new FlyingObjectClass(flyingPart, profileData.Values.StrengthVal*power*sessionData.multipliers.other.shootboost, sessionData.currentWorld)
        let length = currentWorld.startingPosition.sub(currentWorld.endingPosition).Magnitude
        
        let isFlying = true

        object.BindToStop((obj) => {
            print('ended')
            print(currentWorld!.reward * math.max((obj.Distance / length), .01) * this.player.CalculateMultiplier('wins'), math.max((obj.Distance / length), .01), this.player.CalculateMultiplier('wins'), obj.Distance, length)
            print(obj.Laps, 'Laps')

            isFlying = false

            this.player.SetWins( profileData.Values.WinsVal + currentWorld!.reward * math.max((obj.Distance / length), .01) * this.player.CalculateMultiplier('wins') )
            if (profileData.Config.MaxWorld === sessionData.currentWorld && flyingWorld === sessionData.currentWorld) { 
                this.player.SetStars( profileData.Values.StarsVal + obj.Laps * currentWorld!.starsReward * this.player.CalculateMultiplier('stars') )
            }

            sessionData.currentFlyingObject!.part.Destroy()
            sessionData.currentFlyingObject = undefined
            this.player.replica.SetValue('Session.currentFlyingObject', undefined)
        })

        flyingPart.Anchored = false
        flyingPart.SetNetworkOwner(undefined)
        /*
        let pet = PetUtilities.DBToPetTransfer(profileData.Pets[math.random(0, profileData.Pets.size()-1)]!)!
        let model = pet.model.Clone()

        model.PivotTo(flyingPart.CFrame.mul(pet.stats.rotationOffset))
        model.Parent = flyingPart

        for (let modelPart of model.GetDescendants()) {
            if (!modelPart.IsA('BasePart')) { continue }

            modelPart.Anchored = false
            modelPart.CanCollide = false
            modelPart.Massless = true
        }

        CreationUtilities.Weld(flyingPart, model.PrimaryPart!)

        task.spawn(() => {

            let effects = ReplicatedStorage.WaitForChild('Effects')

            let flyEffects = new Map<Instance, number>([
                [effects.WaitForChild('RedFly'), 1000],
                [effects.WaitForChild('PurpleFly'), 10000],
                [effects.WaitForChild('BlueFly'), 100000],
                [effects.WaitForChild('GreenFly'), 1000000]
            ])
            
            let currentEffect = this.effect!
            //let pos = currentEffect.WaitForChild('BodyPosition') as BodyPosition

            CreationUtilities.Weld(flyingPart, currentEffect)

            while (isFlying) {
            
                let currentEnergy = flyingPart.AssemblyLinearVelocity.Magnitude**2/2

                //let velocity = flyingPart.AssemblyLinearVelocity

                //if (velocity.Magnitude < 1) { velocity = new Vector3(.01,.01,.01) }
                //else (velocity = flyingPart.AssemblyLinearVelocity.Unit)

                //pos.Position = flyingPart.Position.add(velocity)

                //TweenService.Create(currentEffect, new TweenInfo(.1, Enum.EasingStyle.Linear), 
                    //{'CFrame': new CFrame(flyingPart.Position, flyingPart.Position.add(flyingPart.AssemblyLinearVelocity.Unit))}).Play()

                let delta = 10**9
                let selected = effects.WaitForChild('RedFly')

                let effect1 = (currentEffect.WaitForChild('0.1').WaitForChild('ragered1') as ParticleEmitter)
                let effect2 = (currentEffect.WaitForChild('0.1').WaitForChild('ragered') as ParticleEmitter)
    
                flyEffects.forEach((value, instance) => {
                    if ((currentEnergy - value) > delta || (currentEnergy - value) < 0) { return }
                    delta = (currentEnergy - value)
                    selected = instance
                })

                effect1.Color = (selected.WaitForChild('0.1').WaitForChild('ragered1') as ParticleEmitter).Color;
                effect2.Color = (selected.WaitForChild('0.1').WaitForChild('ragered') as ParticleEmitter).Color;
                
                task.wait(.1)
            }

            //currentEffect.Destroy()
            
            
        })
        */
        print('started')
        object.Activate()
    }

}

class PlayerRelicsController {
    
    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public FindRelic(name: string, level: number) {

        let profileData = this.player.profile.Data

        let index = -1
        profileData.Relics.forEach((val, i) => { if (val.name === name && val.level === level) { index = i } })
        if (index < 0) { return }

        return profileData.Relics[index]
        
    }

    public FindEquippedRelic(name: string, level: number) {

        let profileData = this.player.profile.Data

        let index = -1
        profileData.EquippedRelics.forEach((val, i) => { if (val.name === name && val.level === level) { index = i } })
        if (index < 0) { return }

        return profileData.EquippedRelics[index]
        
    }

    public AppendRelic(name: string, level: number, amount?: number) {

        let profileData = this.player.profile.Data
        let finalAmount = 1

        if (amount) { finalAmount = amount }

        let relic = this.FindRelic(name, level)
        if (relic) { relic.amount += finalAmount; return }

        profileData.Relics.push({ name: name, level: level, amount: finalAmount })
        this.player.replica.SetValue('Profile.Relics', profileData.Relics)

    }

    public DeleteRelic(name: string, level: number, amount?: number) {

        let profileData = this.player.profile.Data
        let finalAmount = 1

        if (amount) { finalAmount = amount }

        let relic = this.FindRelic(name, level)
        if (!relic) { return }
        if (relic) { relic.amount -= finalAmount }

        if (relic.amount <= 0) {
            let index = -1
            profileData.Relics.forEach((val, i) => { if (val.name === name && val.level === level) { index = i } })
    
            profileData.Relics.remove(index)
        }

        this.player.replica.SetValue('Profile.Relics', profileData.Relics)

    }

    public UnequipRelic(name: string, level: number) {
        
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if (profileData.EquippedRelics.size() <= 0) { return }

        let relic = this.FindEquippedRelic(name, level)
        if (!relic) { return }

        let index = -1
        profileData.EquippedRelics.forEach((val, i) => { if (val.name === name && val.level === level) { index = i } })
        profileData.EquippedRelics.remove(index)

        let passiveName = RelicPassiveNames.get(name)!

        index = -1
        sessionData.activePassives.forEach((val) => { if (val.name === passiveName && val.level === level && (index < 0)) { val.onEnd() } })

        sessionData.activePassives.remove(index)
        this.AppendRelic(name, level)

        this.player.replica.SetValue('Profile.EquippedRelics', profileData.EquippedRelics)
    }

    public EquipRelic(name: string, level: number) {

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if (profileData.EquippedRelics.size() >= profileData.Config.MaxEquippedRelics) { return }

        let relic = this.FindRelic(name, level)
        if (!relic) { return }

        profileData.EquippedRelics.push({name: name, level: level})

        let passiveName = RelicPassiveNames.get(name)!

        let passive = Passives.get(passiveName)!() 

        passive.setOwner(this.player.instance)
        passive.level = level

        sessionData.activePassives.push(passive)
        passive.onStart()

        print('sessionData.activePassives', sessionData.activePassives)

        this.DeleteRelic(name, level)

        this.player.replica.SetValue('Profile.EquippedRelics', profileData.EquippedRelics)

    }
}

class PlayerBadgeController { // add a debug method if playerData has badge but playerInventory doesnt (not sure about request rate)

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public ClaimBadge(id: number) {
        let profileData = this.player.profile.Data
        let badge = BadgeManager.GetBadgeById(id)
        
        if (!badge) { return }
        if (profileData.Badges.includes(badge.name)) { return }

        let result = badge.checkCallback(this.player) // this one also gives stuff
        if (!result) { return }
        
        this.AddBadgeToInventory(id)
        profileData.Badges.push(badge.name)
    }

    public AddBadgeToInventory(id: number) {
        let profileData = this.player.profile.Data
        let badge = BadgeManager.GetBadgeById(id)

        if (!badge) { return }
        if (profileData.Badges.includes(badge.name)) { return }
        if (BadgeService.UserHasBadgeAsync(this.player.instance.UserId, id)) { return }

        BadgeService.AwardBadge(this.player.instance.UserId, id)
    }

}