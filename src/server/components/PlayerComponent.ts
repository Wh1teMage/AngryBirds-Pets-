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
import { PetPerkNames, PetsData } from "shared/info/PetInfo";
import { WorldsData } from "shared/info/WorldInfo";
import { ToolsData } from "shared/info/ToolInfo";
import { IToolData, ToolValueType } from "shared/interfaces/ToolData";
import { WorldType } from "shared/enums/WorldEnums";
import { CreationUtilities } from "shared/utility/CreationUtilities";
import { CodesRewardsData, DailyChestRewardData, DailyRewardsData, FollowCodeRewardData, GetNextBar, GetNextRebirth, GroupChestRewardData, RebirthTitles, SelectDailyReward, SelectSessionReward, SpinRewardData } from "shared/info/RewardInfo";
import { IRewardData } from "shared/interfaces/RewardData";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { FlyingObjectClass } from "server/classes/FlyingObjectClass";
import { PetQuestsData } from "shared/info/QuestInfo";
import { IncomeSource } from "shared/enums/IncomeEnums";
import { Passives } from "server/classes/PassiveClass";
import { BadgeManager } from "server/services/BadgeManager";
import { BadgeType } from "shared/interfaces/BadgeData";
import { MarketCallbacks } from "server/static/MarketStatic";
import { RelicPassiveNames, RelicsCases, RelicsInfo } from "shared/info/RelicsInfo";
import { RelicCaseType } from "shared/interfaces/RelicData";
import { LocationsData } from "shared/info/Locations";
import { TrailsData } from "shared/info/TrailInfo";

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
    //private _playerBarController = new PlayerBarController(this)
    private _playerTrailController = new PlayerTrailController(this)
    
    public FindPet = (pet: IDBPetData) => this._playerPetController.FindPet(pet)
    public AppendPet = (pet: IDBPetData | undefined, ignore?: boolean) => this._playerPetController.AppendPet(pet, ignore)
    public RemovePet = (pet: IDBPetData) => this._playerPetController.RemovePet(pet)
    public LockPet = (pet: IDBPetData) => this._playerPetController.LockPet(pet)

    public BuyTrail = (name: string) => this._playerTrailController.BuyTrail(name)
    public EquipTrail = (name: string) => this._playerTrailController.EquipTrail(name)
    public ReplicateTrail = (name: string) => this._playerTrailController.ReplicateTrail(name)

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

    public AddPetPerks = (pet: IDBPetData, activate?: boolean) => this._playerPetController.AddPetPerks(pet, activate)
    public RemovePetPerks = (pet: IDBPetData) => this._playerPetController.RemovePetPerks(pet)

    //public SetGems = (value: number, source?: IncomeSource) => this._playerValueController.SetGems(value, source)
    public SetWins = (value: number, source?: IncomeSource) => this._playerValueController.SetWins(value, source)
    public SetStrength = (value: number, source?: IncomeSource) => this._playerValueController.SetStrength(value, source)
    //public SetRebirths = (value: number, source?: IncomeSource) => this._playerValueController.SetRebirths(value, source)

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

    public UseTool = (status: string) => this._playerToolController.UseTool(status)
    public BuyTool = (toolname: string) => this._playerToolController.BuyTool(toolname)
    public EquipTool = (toolname: string) => this._playerToolController.EquipTool(toolname)
    public AppendTool = (toolname: string) => this._playerToolController.AppendTool(toolname)
    //public ReplicateModel = () => this._playerToolController.ReplicateModel()

    public BuyMaxWorld = (world: WorldType) => this._playerWorldController.BuyMaxWorld(world)
    public ChangeWorld = () => this._playerWorldController.ChangeWorld()
    public ChangeLocation = () => this._playerWorldController.ChangeLocation()
    public IsInSafezone = () => this._playerWorldController.IsInSafezone()
    public UseWorldTeleport = (world: WorldType) => this._playerWorldController.UseWorldTeleport(world)

    public InitializeObject = () => this._playerFlyingController.InitializeObject()

    public IsFriends = (id: number) => this._playerHttpsController.CheckIsFriend(id)
    public GivePremiumReward = () => this._playerHttpsController.GivePremiumReward()

    public ApplyReward = (reward: IRewardData) => this._playerRewardController.ApplyReward(reward)
    public GetChanceReward = (reward: IRewardData) => this._playerRewardController.GetChanceReward(reward)
    public ClaimPetQuestReward = () => this._playerRewardController.ClaimPetQuestReward()
    public ClaimWeaponQuestReward = () => this._playerRewardController.ClaimWeaponQuestReward()
    public ClaimSessionReward = (rewardindex: number) => this._playerRewardController.ClaimSessionReward(rewardindex)
    public ClaimDailyReward = () => this._playerRewardController.ClaimDailyReward()
    public RedeemCode = (code: string) => this._playerRewardController.RedeemCode(code)
    //public DoRebirth = (skip?: boolean) => this._playerRewardController.DoRebirth(skip)

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
    public MergeRelic = (name: string, level: number) => this._playerRelicsController.MergeRelic(name, level)

    public OpenRelicCase = (name: string, amount: number) => this._playerRelicsController.OpenRelicCase(name, amount)
    public OpenRelicCaseBypass = (name: string, amount: number) => this._playerRelicsController.OpenRelicCaseBypass(name, amount)

    //public SetBarLevel = (level: number) => this._playerBarController.SetBarLevel(level)
    //public UpdateBar = () => this._playerBarController.UpdateBar()

    public EquipLastFreeTool = () => this._playerToolController.EquipLastFreeTool()
    public UnequipTool = () => this._playerToolController.UnequipTool()

    onStart() {

        //this.instance
        
        print('Loading')

        this.initProfile()
        this.initReplica()

        print('Profile Loaded')
        
        this.instance.CharacterAppearanceLoaded.Connect((character) => {
            CharacterFabric.CreateCharacter(character, this) 
            //this.ReplicateModel()
            //this._character = character as ICharacter
            //this.session.character = character as ICharacter
        })

        if (this.instance.Character) { 
            CharacterFabric.CreateCharacter(this.instance.Character, this); 
            //this.ReplicateModel()
            //this._character = this.instance.Character as ICharacter 
            //this.session.character = this.instance.Character as ICharacter
        }
        else this.instance.CharacterAdded.Wait()
        
        for (let pet of this.profile.Data.Pets) {
            if (!pet.equipped) { continue }
            PetModelManager.AddPet(this.instance, pet)
            this.AddPetPerks(pet)
        }

        this.profile.Data.StatValues.LastJoined = os.time()
        this.replica.SetValue('Profile.StatValues.LastJoined', this.profile.Data.StatValues.LastJoined)

        for (let buff of this.profile.Data.ActiveBuffs) {
            if (PotionsData.get(buff.source as PotionType)) { this.ApplyPotionEffect(buff.source as PotionType) }
        }

        let defaultPassives = [
            'EggQuest', //'FriendQuest', 'GameBoostQuest', 'WeaponQuest'
            //'EggQuest', 'FriendQuest', 'PetQuest', 'PetIndexQuest', 'RelicQuest'
        ]

        
        for (let passiveName of defaultPassives) {
            let passive = Passives.get(passiveName)!() 
            passive.setOwner(this.instance)
            this.session.activePassives.push(passive)
        }

        for (let badge of BadgeManager.GetBadgesByType(BadgeType.Start)) { this.ClaimBadge(badge.badgeId) }

        this.SetPetMultipliers()

        this.session.activePassives.forEach((value) => { value.onStart() })

        task.spawn(() => {
            while (Players.FindFirstChild(this.instance.Name) && task.wait(15)) {

                print(this.profile, this.replica)

                this.session.friendList = []

                //if (!this.profile || !this.replica) { continue }

                pcall(() => { //fix this later (check if replica is existing) & friendservice

                    Players.GetPlayers().forEach((player) => {
                        if (!this.IsFriends(player.UserId)) { return }
                        if (player === this.instance) { return }
            
                        this.session.friendList.push(player.Name)
                    })
    
                    print('this.session.friendList', this.session.friendList.size())

                    this.session.activePassives.forEach((value) => { value.onFriendsChanged() })
                    for (let badge of BadgeManager.GetBadgesByType(BadgeType.Friend)) { this.ClaimBadge(badge.badgeId) }
                })

            }
        })

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
            
            this.profile.Data.EquippedRelics.forEach((val) => {
                let passiveName = RelicPassiveNames.get(val.name)!

                let passive = Passives.get(passiveName)!() 
        
                passive.setOwner(this.instance)
                passive.level = val.level
        
                this.session.activePassives.push(passive)
                passive.onStart()
            })
            
            /*
            for (let i = 1; i < 9; i++) {
                this.AppendRelic('test'+tostring(i), 1, 1)
                //this.EquipRelic('test'+tostring(i), 1)

                print('test'+tostring(i))
            }
            */
            /*
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
            */
            //this.AppendRelic('Golden Egg', 5, 11)

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
            //(headFrame.WaitForChild('Nickname') as TextLabel).Text = this.instance.Name

            let accuracyStats = this.session.leaderStats.WaitForChild('Strength') as StringValue
            let killStats = this.session.leaderStats.WaitForChild('Kills') as StringValue
            let rebirthStats = this.session.leaderStats.WaitForChild('Rebirth') as StringValue
            let gemsStats = this.session.leaderStats.WaitForChild('Gems') as StringValue

            task.spawn(() => {
                while (task.wait(1) && this.instance.Parent) {

                    //this.AppendRelic('BonusShotRelic', 1, 1)

                    //this.profile.Data.StatValues.KillsVal += 1

                    this.profile.Data.StatValues.IngameTime += 1
                    this.session.sessionTime += 1
                    print(this.session.claimedRewards.size(), this.instance.Name)
                    //print(this.session.multipliers.pet.strength)
                    //this.session.character!.Humanoid.WalkSpeed += 120
                    this.ChangeWorld()
                    this.ChangeLocation()
                    this.IsInSafezone()
                    this.ApplySpin()
                    this.UseTool('default')

                    if (this.session.character && this.session.character.FindFirstChild('Head')) {
                        this.session.headStats.Adornee = this.session.character.FindFirstChild('Head') as BasePart;
                    }

                    (headFrame.WaitForChild('Title') as TextLabel).Text = this.profile.Data.Config.RebirthTitle;
                    (headFrame.WaitForChild('TitleImage') as ImageLabel).Image = RebirthTitles.get(this.profile.Data.Config.RebirthTitle)!.id;
                    (headFrame.WaitForChild('Stat') as TextLabel).Text = CreationUtilities.getSIPrefixSymbol(this.profile.Data.Values.StrengthVal)
                    //if (this.profile.Data.Products.includes('vippass')) { (headFrame.WaitForChild('Vip') as TextLabel).Visible = true }

                    this.session.activePassives.forEach((passive) => { passive.onTick() })

                    this.replica.SetValue('Session.sessionTime', this.session.sessionTime)
                    this.replica.SetValue('Profile.StatValues.IngameTime', this.profile.Data.StatValues.IngameTime )

                    accuracyStats.Value = CreationUtilities.getSIPrefixSymbol(this.profile.Data.Values.StrengthVal) 
                    //rebirthStats.Value = CreationUtilities.getSIPrefixSymbol(this.profile.Data.Values.RebirthsVal)
                    //gemsStats.Value = CreationUtilities.getSIPrefixSymbol(this.profile.Data.Values.GemsVal)
                    //killStats.Value = CreationUtilities.getSIPrefixSymbol(this.profile.Data.StatValues.KillsVal)

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

        this.session.activePassives.forEach((passive) => { passive.onLeft(); })
        PetModelManager.RemovePlayer(this.instance.UserId)

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

        //this.player.UpdateBar()

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

    /*
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
    */

    /*
    public SetRebirths(value: number, source?: IncomeSource) {
        if (!source || source === IncomeSource.Default) { 
            this.player.session.activePassives.forEach((passive) => { 
                passive.onValueChanged(PassiveValues.Rebirths); 
                passive.onStarsChanged(value, this.player.profile.Data.Values.RebirthsVal) 
            })
        }

        this.player.profile.Data.Values.RebirthsVal = math.round(value)
        this.player.profile.Data.MaxValues.RebirthsMaxVal = math.max(this.player.profile.Data.MaxValues.RebirthsMaxVal, math.round(value))

        this.player.replica.SetValue('Profile.Values.RebirthsVal', math.round(value))
        this.player.replica.SetValue('Profile.MaxValues.RebirthsMaxVal', this.player.profile.Data.MaxValues.RebirthsMaxVal)
    }
    */

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

        if (multiname === 'strength') { overallMultiplier *= (profileData.Multipliers.StrengthMul) }
        //if (multiname === 'gems') { overallMultiplier *= (profileData.Multipliers.GemsMul) }
        //if (multiname === 'stars') { overallMultiplier *= profileData.Multipliers. }

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

        let hasPet = false

        this.player.profile.Data.Pets.forEach((pet) => {
            if (!pet.equipped) { return }
            hasPet = true

            let petData = PetUtilities.DBToPetTransfer(pet, true)

            for (let multi of petData!.multipliers) {
                this.player.session.multipliers.pet[multi[0] as keyof typeof DefaultMultipliers] += multi[1]
            }
        })

        this.player.session.activePassives.forEach((passive) => { passive.onPetMultiplierChanged() })

        if (hasPet) { this.player.session.multipliers.pet.strength -= 1 }

        print(this.player.session.multipliers.pet.strength, 'this.player.session.multipliers.pet.strength')

        this.player.replica.SetValues('Session.multipliers.pet', this.player.session.multipliers.pet)

    }

    public SetWorldMultipliers() {

        let sessionData = this.player.session
        let profileData = this.player.profile.Data
        let selectedWorld = table.clone( WorldsData.get(profileData.Config.MaxWorld)! ) 

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

        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `🧪 Got a ${potion}!`], ['Image', 'NewPotion']]))
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

    /*
    public offerGemsProduct(price: number) {
        let profileData = this.player.profile.Data

        let delta = price - profileData.Values.GemsVal

        let products = new Map([
            [250, 1907111627],
            [1000, 1907111788],
            [2500, 1907111941],
            [6500, 1907112107],
            [15000, 1907112245],
            [30000, 1907112416],
            [50000, 1907112582],
        ])

        let selectedProduct = 0
        let minVal = 32132132321321321

        products.forEach((id, val) => {
            if ((val > delta) && (val < minVal)) {
                minVal = val
                selectedProduct = id
            }
            print(val, delta, minVal, selectedProduct, 'check1')
        })

        Events.ReplicateEffect.fire(this.player.instance, EffectName.ReplicatePurchase, new Map<string, number>([['productId', selectedProduct]]))
    }
    */

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
        if (WorldsData.get(eggInfo.world)!.weight > WorldsData.get(profileData.Config.MaxWorld)!.weight) { return }
        
        switch (eggInfo.valuetype) {
            case EggValueType.Gems:

                if (profileData.Values.WinsVal < eggInfo.price*amount) { return } //this.offerGemsProduct(eggInfo.price*amount);
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

    public RemovePetPerks(pet: IDBPetData) {
        print('TestTestTestTestTestTestTestTestTestTestTestTestTestTest44')
        if (pet.equipped) { return }
        if (!pet.additional.perks) { pet.additional.perks = []; return }

        let sessionData = this.player.session

        pet.additional.perks.forEach((perk) => {
            let passiveName = PetPerkNames.get(perk.name)!
            if (!passiveName) { return }

            let index = -1

            sessionData.activePassives.forEach((val, i) => { 
                if (val.id && val.id === pet.id && val.name === passiveName && val.level === perk.level && (index < 0)) { val.onEnd(); index = i } 
            }) //not so optimized
    
            sessionData.activePassives.remove(index)
        })

    }

    public AddPetPerks(pet: IDBPetData, activate?: boolean) {
        print('TestTestTestTestTestTestTestTestTestTestTestTestTestTest123123')
        if (!pet.equipped) { return }
        if (!pet.additional.perks) { pet.additional.perks = []; return }

        let sessionData = this.player.session

        pet.additional.perks.forEach((val) => {
            let passiveName = PetPerkNames.get(val.name)!
            print(passiveName, val.name)
            if (!passiveName) { return }

            let passive = Passives.get(passiveName)!() 
    
            passive.setOwner(this.player.instance)
            passive.setPet(pet)
            passive.level = val.level
    
            sessionData.activePassives.push(passive)
            if (!activate) { return }
            passive.onStart()
        })
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
        
        this.AddPetPerks(profileData.Pets[petIndex], true)
        this.player.SetPetMultipliers()

        if (ignore) { return }
        
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

        this.RemovePetPerks(profileData.Pets[petIndex])
        this.player.SetPetMultipliers()

        if (ignore) { return }

        print('Sent!')
        
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

        print('Added Pet ' + pet)

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
            let petData1 = PetUtilities.DBToPetTransfer(a, true)!
            let petData2 = PetUtilities.DBToPetTransfer(b, true)!

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
        //if (profileData.Values.GemsVal < count) { return } // !! Return if mutation persists

        let allMutations = [Mutations.Elder, Mutations.Majestic, Mutations.Primordial, Mutations.Sacred]
        let mutations: {weight: number, name: string}[] = []

        for (let name of allMutations) {
            if (name === Mutations.Default) { continue }
            mutations.push({weight: petUpgradeConfig.MutationUpgrades[name].requirements.weight, name: name})
        }

        let mutationName = PetUtilities.RandomWeight(mutations, (1-0.088)+count*0.088)
        print(mutationName)
        //this.player.SetGems(profileData.Values.GemsVal - count)

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

        //this.player.SetGems(profileData.Values.GemsVal - 1)

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

    public ChangeLocation() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        this.player.session.multipliers.location = table.clone(DefaultMultipliers)
        
        LocationsData.forEach((val) => {
            let parts = game.Workspace.GetPartBoundsInBox(val.hitbox.CFrame, val.hitbox.Size)
            let foundRootPart = parts.find((value) => value === this.player.session.character!.PrimaryPart)

            if ( !foundRootPart ) { return }
            if ( sessionData.currentWorld !== val.world ) { return }

            let requirements = val.requirements

            if (requirements) { 
                let passed = true
                
                if ((requirements.get('strength')) && (requirements.get('strength')! > profileData.Values.StrengthVal)) { passed = false }
                if ((requirements.get('wins')) && (requirements.get('wins')! > profileData.Values.WinsVal)) { passed = false }
    
                if (!passed) { return }
            }



            for (let multi of val!.multipliers) {
                this.player.session.multipliers.location[multi[0] as keyof typeof DefaultMultipliers] = multi[1]
            }

        })

        this.player.replica.SetValues('Session.multipliers.location', sessionData.multipliers.location)

    }

    public IsInSafezone() {
        let sessionData = this.player.session;

        if (!sessionData.character) { return }

        (sessionData.character?.FindFirstChild('IsSafe') as BoolValue).Value = false

        game.Workspace.WaitForChild('InstaReplica')!.GetChildren().forEach((val) => { //i dont really care about security or errors
            if (!val.FindFirstChild('Safe')) { return }
            if (!val.IsA('BasePart')) { return }

            let parts = game.Workspace.GetPartBoundsInBox(val.CFrame, val.Size)
            let foundRootPart = parts.find((value) => value === this.player.session.character!.PrimaryPart)

            if ( !foundRootPart ) { return };

            (sessionData.character?.FindFirstChild('IsSafe') as BoolValue).Value = true
        })
    }

    public BuyMaxWorld(world: WorldType) {
        let profileData = this.player.profile.Data
        let worldInfo = WorldsData.get(world)!

        if (worldInfo.weight <= WorldsData.get(profileData.Config.MaxWorld)!.weight) { return }
        if (profileData.Values.WinsVal < worldInfo.price) { return }

        profileData.Config.MaxWorld = world

        for (let badge of BadgeManager.GetBadgesByType(BadgeType.World)) { this.player.ClaimBadge(badge.badgeId) }
        this.player.replica.SetValue('Profile.Config.MaxWorld', profileData.Config.MaxWorld)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🌍 New Max World!'], ['Image', 'NewWorld']]))
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🥚 New Egg Avaliable!'], ['Image', 'NewWorldBundle']]))

        this.UseWorldTeleport(profileData.Config.MaxWorld)

        //this.ChangeWorld()
    }

    public UseWorldTeleport(world: WorldType) {
        let profileData = this.player.profile.Data
        let worldInfo = WorldsData.get(world)!

        if (WorldsData.get(profileData.Config.MaxWorld)!.weight < worldInfo.weight) { return }
        //if (profileData.Products.indexOf('SomeWorldTpgamepass') < 0) { return } //TODO //There are no tp passes

        this.player.session.character!.PrimaryPart!.CFrame = worldInfo.teleportPart.CFrame.add(new Vector3(0, 5, 0))
        task.wait(.1)
        this.player.session.character!.PrimaryPart!.Anchored = true
        task.wait(.5)
        this.player.session.character!.PrimaryPart!.Anchored = false
    }

}

class PlayerTrailController {

    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }

    public BuyTrail(name: string) {
        let profileData = this.player.profile.Data

        let trailInfo = TrailsData.get(name)
        if (!trailInfo) { return }
        if (profileData.OwnedTrails.includes(name)) { return }
        
        if (profileData.Values.WinsVal < trailInfo.price) { return }

        this.player.SetWins(profileData.Values.WinsVal - trailInfo.price)

        profileData.OwnedTrails.push(name)
        this.EquipTrail(name)
    }

    public EquipTrail(name: string) {
        let profileData = this.player.profile.Data

        let trailInfo = TrailsData.get(name)
        if (!trailInfo) { return }
        if (!profileData.OwnedTrails.includes(name)) { return }

        this.ReplicateTrail(name)

        profileData.EquippedTrail = name
    }

    public ReplicateTrail(name: string) {

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
        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        if ((this.lastUsed + toolinfo.firerate*(1/(sessionData.multipliers.other.attackspeed * profileData.Multipliers.AttackSpeedMul))) > tick()) { return }
        if (this.using) { return }
        return true
    }

    public AppendTool(toolname: string) {
        if (!ToolsData.get(toolname)) { return }
        if (this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }
        this.player.profile.Data.OwnedTools.push(toolname)

        this.player.replica.SetValue('Profile.OwnedTools', this.player.profile.Data.OwnedTools)
        //Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', 'New Tool!'], ['Image', 'Success']]))
    }

    public EquipLastFreeTool() {

        let maxWeight = 0
        let toolname = ''

        this.player.profile.Data.OwnedTools.forEach((val) => {
            let info = ToolsData.get(val)
            if (!info) { return }
            if ((info.valuetype === ToolValueType.VBugs) || info.productid) { return }

            if (info.weight > maxWeight) {
                maxWeight = info.weight
                toolname = val
            }
        })

        if (!ToolsData.get(toolname)) { return }
        if (!this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }
        this.player.profile.Data.EquippedTool = toolname

        this.player.replica.SetValue('Profile.EquippedTool', this.player.profile.Data.EquippedTool)

        //this.ReplicateModel()
    }

    public EquipTool(toolname: string) {
        if (!ToolsData.get(toolname)) { return }
        if (!this.player.profile.Data.OwnedTools.find((val) => val === toolname)) { return }
        this.player.profile.Data.EquippedTool = toolname

        this.player.replica.SetValue('Profile.EquippedTool', this.player.profile.Data.EquippedTool)

        //this.ReplicateModel()
    }

    public UnequipTool() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        profileData.EquippedTool = 'None'

        this.player.replica.SetValue('Profile.EquippedTool', profileData.EquippedTool)

        if (sessionData.character?.FindFirstChild('ToolModel')) {
            sessionData.character?.FindFirstChild('ToolModel')?.Destroy()
        }
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

    /*
    public Attack() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if (!sessionData.character || !sessionData.character.PrimaryPart) { return }
        if (sessionData.character.FindFirstChild('IsSafe') && (sessionData.character.FindFirstChild('IsSafe') as BoolValue).Value) { return }
        if (sessionData.character.Humanoid.Health <= 0 || (sessionData.character.Humanoid.GetState() === Enum.HumanoidStateType.Dead)) { return }

        Players.GetPlayers().forEach((val) => {
            if (val.UserId === this.player.instance.UserId) { return }
            if (!val.Character || !val.Character.PrimaryPart) { return }
            if (val.Character.PrimaryPart?.Position.sub(sessionData.character!.PrimaryPart!.Position).Magnitude > 7) { return }
            if (val.Character.FindFirstChild('IsSafe') && (val.Character.FindFirstChild('IsSafe') as BoolValue).Value) { return }

            let percDamage = profileData.Values.StrengthVal / ServerPlayerFabric.GetPlayer(val).profile.Data.Values.StrengthVal
            let humanoid = val.Character.FindFirstChild('Humanoid') as Humanoid

            print(val.Name, humanoid.Health, percDamage, 'humanoid')

            if (humanoid) { 
                //if (humanoid.Health <= 0.1) { return } //should be 0
                if ((humanoid.Health <= 0) || (humanoid.GetState() === Enum.HumanoidStateType.Dead)) { return }

                humanoid.TakeDamage(percDamage*humanoid.MaxHealth); 

                if ((humanoid.Health > 0) && (humanoid.GetState() !== Enum.HumanoidStateType.Dead)) { return }
                
                //humanoid.Health = humanoid.Health - percDamage*humanoid.MaxHealth

                print(val.Name, humanoid.Health, 'killed')

                humanoid.Health = 0;
                profileData.StatValues.KillsVal += 1 
                sessionData.activePassives.forEach((value) => { value.onKill() })

                this.player.SetGems(profileData.Values.GemsVal + 250 * this.player.CalculateMultiplier('gems'))
                Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `💀 Got a kill!`], ['Image', 'Accuracy']]))
            }
            this.player.replica.SetValue('Profile.StatValues.KillsVal', profileData.StatValues.KillsVal)
        })

    }
    */

    public UseTool(status: string) {
        let profileData = this.player.profile.Data

        if (profileData.EquippedTool === 'None') { return }

        let toolInfo = ToolsData.get(profileData.EquippedTool)!

        if (!this.canUse(toolInfo)) { return }

        this.using = true

        if (status !== 'restricted') { 
            this.player.SetStrength(profileData.Values.StrengthVal + 
                (profileData.Values.WinsVal) * this.player.CalculateMultiplier('strength'))
    
            for (let badge of BadgeManager.GetBadgesByType(BadgeType.Strength)) { this.player.ClaimBadge(badge.badgeId) }
        }

        this.lastUsed = tick()
        this.using = false

        this.player.session.activePassives.forEach((value) => { value.onShoot() })

        Events.ReplicateEffect.fire(this.player.instance, toolInfo.effectname)
    }

    /*
    public ReplicateModel() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session
        let toolInfo = ToolsData.get(profileData.EquippedTool)!

        if (!sessionData.character || !sessionData.character.PrimaryPart) { return }

        if (sessionData.character?.FindFirstChild('ToolModel')) {
            sessionData.character?.FindFirstChild('ToolModel')?.Destroy()
        }
        
        let clonnedModel = toolInfo.model.Clone()
        clonnedModel.Name = 'ToolModel'
        clonnedModel.PrimaryPart!.Anchored = false

        clonnedModel.Parent = sessionData.character!
        clonnedModel.PivotTo((sessionData.character!.FindFirstChild('RightHand') as Part).CFrame.mul(toolInfo.rotationOffset))

        CreationUtilities.WeldConstraint(clonnedModel.PrimaryPart!, sessionData.character!.FindFirstChild('RightHand') as Part)
    }
    */

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

        reward.Relics?.forEach((value) => {
            for (let i = 0; i < value.amount; i++) {
                this.player.AppendRelic(value.name, value.level, value.amount)
            }
        })

        if (reward.Additional?.get('MaxEquippedPets')) { profile.Config.MaxEquippedPets += reward.Additional?.get('MaxEquippedPets')! }
        if (reward.Additional?.get('MaxPets')) { profile.Config.MaxPets += reward.Additional?.get('MaxPets')! }
        if (reward.Additional?.get('SpinCount')) { profile.StatValues.SpinCount += reward.Additional?.get('SpinCount')! }

        if (reward.Additional?.get('StrengthMul')) { profile.Multipliers.StrengthMul += reward.Additional?.get('StrengthMul')! }
        if (reward.Additional?.get('tinypackwins')) { MarketCallbacks.get('tinypackwins')!(this.player) }
        if (reward.Additional?.get('smallpackwins')) { MarketCallbacks.get('smallpackwins')!(this.player) }

        this.player.SetStrength(profile.Values.StrengthVal + (reward.Values?.Strength || 0))
        this.player.SetWins(profile.Values.WinsVal + (reward.Values?.Wins || 0))

        if (reward.Values?.Strength) {
            let val = CreationUtilities.getSIPrefixSymbol(reward.Values?.Strength)
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `💪 Recieved ${val} Strength!`], ['Image', 'Accuracy']]))
            Events.ReplicateEffect(this.player.instance, 'ReplicateRewards', 
                new Map<string, number | string>([
                    ['Amount', math.round(reward.Values?.Strength/6)], 
                    ['Repeats', 6],
                    ['Image', 'Accuracy'],
                ]))
        }
        if (reward.Values?.Wins) {
            let val = CreationUtilities.getSIPrefixSymbol(reward.Values?.Wins)
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `💎 Recieved ${val} Gems!`], ['Image', 'Gems']]))
            Events.ReplicateEffect(this.player.instance, 'ReplicateRewards', 
                new Map<string, number | string>([
                    ['Amount', math.round(reward.Values?.Wins/6)], 
                    ['Repeats', 6],
                    ['Image', 'Gems'],
                ]))
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
        if (currentDay === 0) { currentDay = DailyRewardsData.size() }

        let selectedReward = SelectDailyReward(currentDay)

        this.player.replica.SetValue('Profile.StatValues.LastDayTime', profileData.StatValues.LastDayTime)
        this.player.replica.SetValue('Profile.StatValues.DayAmount', profileData.StatValues.DayAmount)

        if (!selectedReward) { return }
        
        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎁 Daily Claimed!'], ['Image', 'Success']]))
    }

    public ClaimSessionReward(rewardindex: number) {

        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        let selectedReward = SelectSessionReward(rewardindex, WorldType.Cave)

        if (!selectedReward) { return }
        if (sessionData.claimedRewards.includes(rewardindex)) { return }
        if (selectedReward.Time! > sessionData.sessionTime) { return }

        sessionData.claimedRewards.push(rewardindex)
        this.player.replica.SetValue('Session.claimedRewards', sessionData.claimedRewards)

        print(sessionData.claimedRewards.size(), 'Claimed Rewards', this.player.instance.Name)
        print(sessionData)

        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎁 Gift Claimed!'], ['Image', 'Success']]))

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

    public ClaimWeaponQuestReward() {

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        sessionData.activePassives.forEach((value) => { value.onTrigger() })

        this.player.replica.SetValue('Profile.Products', profileData.Products)
        this.player.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
    }

    public RedeemCode(code: string) {

        let profileData = this.player.profile.Data
        let selectedReward = CodesRewardsData.get(code.lower())

        print(code, selectedReward)

        if (!selectedReward) { 
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '❌ Invalid Code!'], ['Image', 'Error']]))
            return 
        }
        if (profileData.RedeemedCodes.includes(code)) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '❌ Code Already Redeemed!'], ['Image', 'Error']]))
            return 
        }

        profileData.RedeemedCodes.push(code)

        this.ApplyReward(selectedReward)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '✔️ Code Redeemed!'], ['Image', 'Success']]))
    }

    public RedeemFollowCode(code: string) {
        let profileData = this.player.profile.Data

        if (code.find('@').size() < 1) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '❌ Invalid Code!'], ['Image', 'Error']]))
            return 
        }
        if (profileData.RedeemedCodes.includes('FollowCode')) {
            Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '❌ Code Already Redeemed!'], ['Image', 'Error']]))
            return
        }

        profileData.RedeemedCodes.push('FollowCode')
        this.ApplyReward(FollowCodeRewardData)

        this.player.replica.SetValue('Profile.RedeemedCodes', profileData.RedeemedCodes)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '✔️ Code Redeemed!'], ['Image', 'SuccessfulFollow']]))
    }

    /*
    public DoRebirth(skip?: boolean) {

        let profileData = this.player.profile.Data
        let currentRebirth = GetNextRebirth(profileData.Values.RebirthsVal-1)
        let selectedRebirth = GetNextRebirth(profileData.Values.RebirthsVal)

        let additional = selectedRebirth.Additional!
        let currentAdditional = currentRebirth.Additional!

        if ((profileData.Values.StrengthVal < additional.get('Strength')!) && !skip) { return }

        let newTools: string[] = [] //might b ebetter to create reset method but who cares

        profileData.OwnedTools.forEach((val) => {
            let data = ToolsData.get(val)
            if (!data) { return }
            if (data.productid || (data.valuetype === ToolValueType.VBugs)) { newTools.push(val) }
        })

        profileData.OwnedTools = newTools

        this.player.SetStrength(0)
        this.player.SetBarLevel(0)

        profileData.AdditionValues.StrengthAdditionVal += 1
        this.player.SetRebirths(profileData.Values.RebirthsVal + 1)
        this.player.SetGems(profileData.Values.GemsVal + selectedRebirth.Values!.Gems! * this.player.CalculateMultiplier('gems'))

        let selectedName = 'Rokie'
        let maxWeight = 0

        RebirthTitles.forEach((val, name) => {
            if ((profileData.Values.RebirthsVal >= val.goal) && (val.goal > maxWeight)) {
                maxWeight = val.goal
                selectedName = name
            }
        })

        profileData.Config.RebirthTitle = selectedName

        for (let badge of BadgeManager.GetBadgesByType(BadgeType.Rebirth)) { this.player.ClaimBadge(badge.badgeId) }

        this.player.replica.SetValue('Profile.AdditionValues.StrengthAdditionVal', profileData.AdditionValues.StrengthAdditionVal)
        this.player.replica.SetValue('Profile.Config.RebirthTitle', profileData.Config.RebirthTitle)
        this.player.replica.SetValue('Profile.OwnedTools', profileData.OwnedTools)
        this.player.replica.SetValue('Profile.Values.RebirthsVal', profileData.Values.RebirthsVal)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '💎 Rebirth Successful!'], ['Image', 'Success']]))
    }
    */

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

        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎲 New Spin!'], ['Image', 'NewSpin']]))

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
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎁 Claimed Spin Reward!'], ['Image', 'Success']]))

        if (data.reward.Potions) { 
            this.player.UsePotion(PotionType.GemsPotion4)
            this.player.UsePotion(PotionType.StrengthPotion4)
        } //for katana sim only

        this.player.replica.SetValue('Profile.StatValues.SpinCount', profileData.StatValues.SpinCount)
    }
 
    public ClaimDailyChest() {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        if ((os.time() - profileData.StatValues.LastDailyChestTime) < 24*60*60) { return }

        profileData.StatValues.LastDailyChestTime = os.time()

        for (let i = 0; i < 1; i ++) {
            let data = this.GetChanceReward(DailyChestRewardData)
            this.ApplyReward(data.reward)
        }

        this.player.replica.SetValue('Profile.StatValues.LastDailyChestTime', profileData.StatValues.LastDailyChestTime)
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎁 Claimed Daily Chest!'], ['Image', 'Success']]))
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
        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', '🎁 Claimed Group Chest!'], ['Image', 'Success']]))
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

        profileData.Multipliers.StrengthMul += 0.1

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
        // operations with character
        this.ShootObject()
    }

    public ShootObject() {
        let sessionData = this.player.session
        let profileData = this.player.profile.Data

        let selectedWorld = WorldsData.get(sessionData.currentWorld)
        if (!selectedWorld) { return }

        let testPart = new Instance("Part")

        let flyingObject = new FlyingObjectClass(testPart, 100)

        let speed = profileData.Values.StrengthVal

        flyingObject.BindToStart(() => {
            while (flyingObject.flying && task.wait(.1)) {
                speed = profileData.Values.StrengthVal
                flyingObject.SetSpeed(speed)
            }
        })

        flyingObject.BindToStop(() => {
            this.player.SetStrength(0)
            this.player.ApplyReward(selectedWorld.slide.reward)
        })

        flyingObject.Activate()

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

    public AppendRelic(name: string, level: number, amount?: number, ignore?: boolean) {

        let profileData = this.player.profile.Data
        let finalAmount = 1

        if (amount) { finalAmount = amount }

        let relic = this.FindRelic(name, level)

        if (relic) { relic.amount += finalAmount }
        else { profileData.Relics.push({ name: name, level: level, amount: finalAmount }) }

        this.player.replica.SetValue('Profile.Relics', profileData.Relics)

        if (ignore) { return }

        Events.ReplicateEffect(this.player.instance, 'Notify', new Map([['Message', `Recieved ${name} Relic!`], ['Image', 'Gems']]))
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
        sessionData.activePassives.forEach((val, i) => { if (val.name === passiveName && val.level === level && (index < 0)) { val.onEnd(); index = i } })

        sessionData.activePassives.remove(index)
        this.AppendRelic(name, level, undefined, true)

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

    public MergeRelic(name: string, level: number) {

        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        //if (profileData.EquippedRelics.size() >= profileData.Config.MaxEquippedRelics) { return }

        let relicInfo = RelicsInfo.get(RelicPassiveNames.get(name)!)!

        let relic = this.FindRelic(name, level)
        if (!relic) { return }
        if (relic.amount < 3) { return }
        if (relic.level >= relicInfo.size()) { return }

        this.DeleteRelic(name, level, 3)
        this.AppendRelic(name, level+1)

        this.player.replica.SetValue('Profile.EquippedRelics', profileData.EquippedRelics)

    }

    public OpenRelicCaseBypass(name: string, amount: number, noeffect?: boolean) {
        let profileData = this.player.profile.Data
        let sessionData = this.player.session

        let relicCaseInfo = RelicsCases.get(name)

        print(relicCaseInfo)

        if (!relicCaseInfo) {return}

        for (let i = 0; i < amount; i++) {
            let data = this.player.GetChanceReward(relicCaseInfo.reward)
            print(data)
            this.player.ApplyReward(data.reward)
        }

        if (noeffect) { return }

        /*
        Events.ReplicateEffect.fire(this.player.instance, 'EggHatched', new Map<string, any>([
            ['EggName', name], ['Pets', pets], ['Speed', this.player.profile.Data.Multipliers.HatchSpeedMul]
        ]))
        */
    }

    public OpenRelicCase(name: string, amount: number) {
        if (!this.player.profile) { return }
        let profileData = this.player.profile.Data
        let relicCaseInfo = RelicsCases.get(name)

        print(amount, 'amount')

        //i should prob add checks here but im way too lazy today

        if (!relicCaseInfo) { return }

        switch (relicCaseInfo.valuetype) {
            case RelicCaseType.Gems:

                if (profileData.Values.WinsVal < relicCaseInfo.price*amount) {return}
                this.OpenRelicCaseBypass(name, amount)

                //this.player.session.activePassives.forEach((value) => { value.onEggOpened(eggInfo!, amount, buytype) })

                this.player.SetWins(profileData.Values.WinsVal - relicCaseInfo.price*amount)

                break
            case RelicCaseType.VBugs:
                /*

                let id = eggInfo.productid!
                if (buytype === EggBuyType.Triple) { id = eggInfo.productidx3! }

                Events.ReplicateEffect.fire(this.player.instance, EffectName.ReplicatePurchase, new Map<string, number>([['productId', id]]))

                // should rebuilt this egg system btw (esp with paid once)
                */ //indev
                break
            case RelicCaseType.Stored:

                let foundIndex = -1
                profileData.StoredRelicCases.forEach((val, index) => { if (val.name === name) { foundIndex = index } })
                print(foundIndex)
                if (foundIndex < 0) { return }
                if (profileData.StoredRelicCases[foundIndex].amount < relicCaseInfo.price*amount) { return }

                this.OpenRelicCaseBypass(name, amount)

                profileData.StoredRelicCases[foundIndex].amount -= relicCaseInfo.price*amount
                print(profileData.StoredRelicCases[foundIndex].amount)

                this.player.replica.SetValue('Profile.StoredRelicCases', profileData.StoredRelicCases)

                break
            default:
            
        }

    }

}

class PlayerBarController {
    private player: ServerPlayerComponent

    constructor(player: ServerPlayerComponent) {
        this.player = player
    }
    /*
    public SetBarLevel(level: number) {
        let profileData = this.player.profile.Data
        let currentBar = GetNextBar(profileData.StatValues.BarLevel)
        let targetBar = GetNextBar(level)

        profileData.StatValues.BarLevel = level

        profileData.AdditionalMultipliers.StrengthAdditionalMul = 
            profileData.AdditionalMultipliers.StrengthAdditionalMul - currentBar.Additional!.get('Multiplier') + targetBar.Additional!.get('Multiplier')

        let toolname = 'None'

        ToolsData.forEach((val, name) => {
            if ((val.valuetype === ToolValueType.VBugs) || val.productid) { return }
            if (val.weight === (level+1)) { toolname = name }
        })

        this.player.AppendTool(toolname)

        this.player.replica.SetValue('Profile.StatValues.BarLevel', profileData.StatValues.BarLevel)
        this.player.replica.SetValues('Profile.AdditionalMultipliers', profileData.AdditionalMultipliers)

        if (ToolsData.get(profileData.EquippedTool)!.valuetype === ToolValueType.VBugs) { return }

        this.player.EquipLastFreeTool()
    }

    public UpdateBar() {
        let profileData = this.player.profile.Data
        let bar = GetNextBar(profileData.StatValues.BarLevel)
        let additional = bar.Additional!

        let toolamount = 0

        ToolsData.forEach((val, name) => { if (val.valuetype === ToolValueType.Strength) { toolamount += 1 } })

        if (profileData.StatValues.BarLevel+1 >= 69) { return }
        if (additional.get('Strength')! as number >= profileData.Values.StrengthVal) { return }

        let level = 0

        while (profileData.Values.StrengthVal >= additional.get('Strength')!) {
            //profileData.Values.StrengthVal -= additional.get('Strength')!
            level += 1
            additional = GetNextBar(profileData.StatValues.BarLevel + level).Additional!
        }

        this.SetBarLevel(profileData.StatValues.BarLevel + level)
        this.player.SetStrength(profileData.Values.StrengthVal)
    }
    */
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