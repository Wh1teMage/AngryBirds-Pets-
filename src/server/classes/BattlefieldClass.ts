import { IRewardData } from "shared/interfaces/RewardData"
import { Workspace, Players } from "@rbxts/services"
import { Events } from "server/network"
import { ServerPlayerFabric } from "server/components/PlayerComponent"
import { BattlefieldOperationStatus } from "shared/enums/ReplicationEnums"

let BattlefieldObjects = new Map<Part, BattlefieldClass>()

export class BattlefieldClass { //basically a component
    public part: Part
    public rewards: IRewardData[]

    public maxPlayersAlive = 3
    public timeBetween = 60*5
    public delayTime = 10
    public maxMatchTime = 5*60

    public activePlayers = new Map<Player, Part>()
    public playersLeft: string[] = []

    private _period = .3
    private _active = false

    constructor(part: Part, rewards: IRewardData[]) {
        this.part = part
        this.rewards = rewards
    }

    public AddPlayer(player: Player, part: Part) {
        if (this._active) { return }
        this.activePlayers.set(player, part)
    }

    public RemovePlayer(player: Player) {
        if (!this._active) { return }
        this.activePlayers.delete(player)
    }

    public UpdatePlayersInRadius() {
        let radius = this.part.Size.Magnitude/2

        this.activePlayers.forEach((val, player) => {
            if (!player.Character || !player.Character.PrimaryPart) { return }
            if (player.Character.PrimaryPart?.Position.sub(this.part.Position).Magnitude > radius) { return }

            let humanoid = player.Character.FindFirstChild('Humanoid') as Humanoid

            if (!humanoid || humanoid.Health <= 50) { this.RemovePlayer(player); this.playersLeft.unshift(player.Name) }
        })

    }

    public InvitePlayers() {
        Players.GetPlayers().forEach((val) => {
            Events.ManageBattlefield.fire(val, BattlefieldOperationStatus.SendInvite)
        })
    }

    public AcceptInvite(player: Player) {
        let character = player.Character
        if (!character || !character.PrimaryPart) { return }

        let instaReplica = Workspace.WaitForChild('InstaReplica')
        let arenaSpawns = instaReplica.WaitForChild('ArenaSpawns')!.GetChildren() as Part[]
        let selectedPart: Part = arenaSpawns[0]

        for (let i = 0; i < arenaSpawns.size(); i++) {
            let wasFound = false
            let part = arenaSpawns[i]

            this.activePlayers.forEach((val) => {
                if (val === part) { wasFound = true }
            })

            if (!wasFound) { selectedPart = part; break }
        }

        this.AddPlayer(player, selectedPart)
        character.PivotTo(selectedPart.CFrame)
        task.wait(.1)
        character.PrimaryPart.Anchored = true

        //Countdown Event (or on client?)

    }

    public GiveReward() {

        this.activePlayers.forEach((val, player) => {
            this.playersLeft.unshift(player.Name)
        })

        for (let i = 0; i < this.maxPlayersAlive; i++) {
            if (!this.playersLeft[i]) { continue }
            let player = Players.FindFirstChild(this.playersLeft[i]) as Player
            if (!player) { continue }

            let component = ServerPlayerFabric.GetPlayer(player)
            if (!component) { continue }
            //if (i === 0) { component.profile.Data.StatValues.BattleWins += 1 }

            //component.replica.SetValue('Profile.StatValues.BattleWins', component.profile.Data.StatValues.BattleWins)
            component.ApplyReward(this.rewards[i])
        }

        this.activePlayers.forEach((part, player) => {
            let character = player.Character
            if (!character || !character.PrimaryPart) { return }
            character.PrimaryPart.Anchored = false

            let component = ServerPlayerFabric.GetPlayer(player)
            if (!component) { return }

            component.UseWorldTeleport(component.profile.Data.Config.MaxWorld)
        })

        this.activePlayers = new Map()
    }


    public RenderBattle() {
        if (this.activePlayers.size() < this.maxPlayersAlive) {
            this.activePlayers.forEach((part, player) => {
                let character = player.Character
                if (!character || !character.PrimaryPart) { return }
                character.PrimaryPart.Anchored = false
    
                //(character.FindFirstChild('Humanoid') as Humanoid).Health = 0
                Events.ManageBattlefield.fire(player, BattlefieldOperationStatus.FailedToStart)

                let component = ServerPlayerFabric.GetPlayer(player)
                if (!component) { return }

                component.UseWorldTeleport(component.profile.Data.Config.MaxWorld)
            })

            this.activePlayers = new Map()

            return
        }

        this._active = true

        this.activePlayers.forEach((part, player) => {
            Events.ManageBattlefield.fire(player, BattlefieldOperationStatus.StartCountdown)
        })

        task.wait(4.5)

        this.activePlayers.forEach((part, player) => {
            let character = player.Character
            if (!character || !character.PrimaryPart) { return }

            character.PrimaryPart.Anchored = false
        })

        let startTime = os.clock()
        
        while (((os.clock() - startTime) < this.maxMatchTime) && (this.activePlayers.size() > 1)) {
            print(this.activePlayers, this.playersLeft, (os.clock() - startTime))
            task.wait(this._period)
            this.UpdatePlayersInRadius()
        }

        this._active = false
        this.GiveReward()
        Events.ManageBattlefield.fire(Players.GetPlayers(), BattlefieldOperationStatus.Ended, new Map([['Players', this.playersLeft]]))
    }

    public Start() {

        this.InvitePlayers()
        task.wait(this.delayTime)
        this.RenderBattle()
        task.wait(this.timeBetween)
        this.Start()

    }
}

export class BattlefieldClassFabric {

    static CreateBattlefield(part: Part, rewards: IRewardData[]) {
        if (BattlefieldClassFabric.GetBattlefield(part)) { return BattlefieldClassFabric.GetBattlefield(part) }

        let object = new BattlefieldClass(part, rewards)
        BattlefieldObjects.set(part, object)

        task.spawn(() => {
            object.Start()
        })

        return object
    }

    static GetBattlefield(part: Part) {
        return BattlefieldObjects.get(part)
    }

}