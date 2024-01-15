
import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Profile, ProfileMetaData } from "@rbxts/profileservice/globals";
import ProfileService from "@rbxts/profileservice";
import { LoadProfile } from "server/services/DataStoreService";
import { IProfileData } from "shared/interfaces/ProfileData";
import { Replica, ReplicaService } from "@rbxts/replicaservice";
import { PlayerDataReplica } from "shared/interfaces/PlayerData";
import { ICharacter, ISessionData, SessionData } from "shared/interfaces/SessionData";
import { Events } from "server/network";
import { EffectName } from "shared/enums/EffectEnums";
import { CharacterFabric } from "./CharacterComponent";
import { IDBPetData, Sizes } from "shared/interfaces/PetData";
import { PetUtilities } from "shared/utility/PetUtilities";
import { petUpgradeConfig } from "shared/configs/PetConfig";
import Functions from "shared/utility/LuaUtilFunctions";
import { AbilityFabric } from "server/classes/AbilityClass";
import { BuyType, EggValueType } from "shared/interfaces/EggData";
import { BuyTypeConfig } from "shared/configs/EggConfig";
import { EggsData } from "shared/info/EggInfo";
import { ITradingPlayer, TradeUpdateStatus } from "shared/interfaces/TradeData";
import { Trade } from "server/classes/TradeClass";
import { Players } from "@rbxts/services";
import { PetModelManager } from "server/classes/PetModelClass";

const ReplicaToken = ReplicaService.NewClassToken('PlayerData')

@Component({})
export class ServerPlayerComponent extends BaseComponent<{}, Player> implements OnStart {
    
    public profile!: Profile<IProfileData, ProfileMetaData>;
    public replica!: PlayerDataReplica
    public session: ISessionData = table.clone(SessionData)
    
    //private _character!: ICharacter
    private _playerPetController = new PlayerPetController(this)
    private _playerEggController = new PlayerEggController(this)
    private _playerValueController = new PlayerValueController(this)
    private _playerTradeController = new PlayerTradeController(this)

    public FindPet = (pet: IDBPetData) => this._playerPetController.FindPet(pet)
    public AppendPet = (pet: IDBPetData | undefined) => this._playerPetController.AppendPet(pet)
    public RemovePet = (pet: IDBPetData) => this._playerPetController.RemovePet(pet)

    public EquipPet = (pet: IDBPetData) => this._playerPetController.EquipPet(pet)
    public UnequipPet = (pet: IDBPetData) => this._playerPetController.UnequipPet(pet)

    public EvolvePetSize = (pet: IDBPetData) => this._playerPetController.EvolvePetSize(pet)
    public CheckSpaceForPets = (value: number) => this._playerPetController.CheckSpaceForPets(value)

    public SetWins = (value: number) => this._playerValueController.SetWins(value)
    public SetStrength = (value: number) => this._playerValueController.SetStrength(value)

    public BuyEgg = (name: string, buytype: BuyType) => this._playerEggController.BuyEgg(name, buytype)
    public OpenEggBypass = (name: string, buytype: BuyType) => this._playerEggController.OpenEggBypass(name, buytype)

    public SetupTrade = (trade: Trade) => this._playerTradeController.SetupTrade(trade)
    public UpdateTrade = (pet: IDBPetData, status: TradeUpdateStatus) => this._playerTradeController.UpdateTrade(pet, status)

    onStart() {
        this.initProfile()
        this.initReplica()
        
        this.instance.CharacterAppearanceLoaded.Connect((character) => {
            CharacterFabric.CreateCharacter(character, this) 
            //this._character = character as ICharacter
            //this.session.character = character as ICharacter
        })

        if (this.instance.Character) { 
            CharacterFabric.CreateCharacter(this.instance.Character, this); 
            //this._character = this.instance.Character as ICharacter 
            //this.session.character = this.instance.Character as ICharacter
        }
        else this.instance.CharacterAdded.Wait()
        
        for (let pet of this.profile.Data.EquippedPets) {
            PetModelManager.AddPet(this.instance, pet)
        }

        task.spawn(() => {
            /*
            for (let i = 0; i<100; i++) {
                
                this.AppendPet(
                    {
                        name: 'Cat',
                        additional: {
                            size: Sizes.Normal,
                            void: true,
                        }
                    }
                )

                this.EquipPet(
                    {
                        name: 'Cat',
                        additional: {
                            size: Sizes.Normal,
                            void: true,
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

                    this.session.character!.Humanoid.WalkSpeed = 120
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

    public SetStrength(value: number) {
        this.player.profile.Data.Values.Strength = value
        this.player.replica.SetValue('Profile.Values.Strength', value)
    }

    public SetWins(value: number) {
        this.player.profile.Data.Values.Wins = value
        this.player.replica.SetValue('Profile.Values.Wins', value)
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
    /*
    public RecieveTrade(startedPlayer: Player) {
        if (!ServerPlayerFabric.GetPlayer(startedPlayer)) { return }

        let sessionData = this.player.session
        let otherSessionData = ServerPlayerFabric.GetPlayer(startedPlayer)!.session
        let trade = new TradeClass(startedPlayer, this.player.instance)

        sessionData.tradeRequests = []
        otherSessionData.tradeRequests = []
        
        sessionData.activeTrade = trade
        otherSessionData.activeTrade = trade
    }

    public RequestTrade(requestedPlayer: Player) {
        let sessionData = this.player.session
        if (sessionData.activeTrade) { return }

        sessionData.tradeRequests.push(requestedPlayer)

        // trade event
    }
    */
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

    /*
    public GetPlayersTrade(player: Player) {
        for (let trade of ActiveTrades) {
            if (trade.requiredPlayer.player === player || trade.requiredPlayer.player === player) { return trade }
        }
        return false
    }

    public UpdateTrade(player: Player, pet: IDBPetData, status: TradeOperationStatus) {
        if (!TradeManager.GetPlayersTrade(player)) { return }


    }
    */
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

        if (!this.player.CheckSpaceForPets(amount)) {return}
        if (!eggInfo) {return}

        switch (eggInfo.valuetype) {
            case EggValueType.Wins:

                if (profileData.Values.Wins < eggInfo.price) {return}

                for (let i = 0; i < amount; i++) {
                    let petName = PetUtilities.RandomWeight(eggInfo.petchances, profileData.Config.Luck)
                    this.player.AppendPet(PetUtilities.NameToDBPetWithEgg(petName, eggInfo.name)!)
                }

                this.player.SetWins(profileData.Values.Wins - eggInfo.price)

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

    public CheckSpaceForPets(value: number) {
        let profileData = this.player.profile.Data
        if (profileData.Pets.size()+profileData.EquippedPets.size()+value > profileData.Config.MaxPets) return false;
        return true
    }

    public EquipPet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        if (profileData.EquippedPets.size()+1 > profileData.Config.MaxEquippedPets) { return }

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { petIndex = index } })
        print(petIndex)
        if (petIndex < 0) { return }

        profileData.Pets.remove(petIndex)
        profileData.EquippedPets.push(pet)

        PetModelManager.AddPet(this.player.instance, pet)

        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
        this.player.replica.SetValue('Profile.EquippedPets', profileData.EquippedPets)
    }

    public UnequipPet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let equippedPetIndex = -1

        profileData.EquippedPets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { equippedPetIndex = index } })
        print(equippedPetIndex)
        if (equippedPetIndex < 0) { return }

        profileData.EquippedPets.remove(equippedPetIndex)
        profileData.Pets.push(pet)

        PetModelManager.RemovePet(this.player.instance, pet)

        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
        this.player.replica.SetValue('Profile.EquippedPets', profileData.EquippedPets)
    }

    public FindPet(pet: IDBPetData) {
        let foundPet;
        let profileData = this.player.profile.Data

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { foundPet = value } })
        return foundPet
    }

    public AppendPet(pet: IDBPetData | undefined) {
        if (!pet) { return }
        if (!this.CheckSpaceForPets(1)) {return}

        this.player.profile.Data.Pets.push(pet)
        this.player.replica.SetValue('Profile.Pets', this.player.profile.Data.Pets)
    }

    public RemovePet(pet: IDBPetData) {
        let profileData = this.player.profile.Data
        let petIndex = -1

        profileData.Pets.forEach((value, index) => { if (Functions.compareObjects(pet, value)) { petIndex = index } })
        if (petIndex < 0) { return }

        profileData.Pets.remove(petIndex)
        this.player.replica.SetValue('Profile.Pets', profileData.Pets)
    }

    public EvolvePetSize(pet: IDBPetData) {
        let globalPass = 0
        this.player.profile.Data.Pets.forEach((value) => { if (PetUtilities.ComparePets(pet, value)) { globalPass = 1 } })
        if (globalPass === 0) { return }
        if (!petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize) { return }

        let passed = this._upgradePet(pet, petUpgradeConfig.SizeUpgrades[pet.additional.size].requirements as Map<never, number>, 'size')
        if (!passed) { return }

        let formatted = pet
        formatted.additional.size = petUpgradeConfig.SizeUpgrades[pet.additional.size].nextSize as Sizes

        this.AppendPet(formatted)
    }

}