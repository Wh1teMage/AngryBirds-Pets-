import { WorldType } from "shared/enums/WorldEnums"
import { WorldsData } from "shared/info/WorldInfo"
import { IWorldData } from "shared/interfaces/WorldData"

export class FlyingObjectClass {

    public BodyVelocity: BodyVelocity
    public BodyPosition: BodyPosition
    public Distance: number = 0

    private delta = .03

    private part: BasePart
    private gravity: number
    private density: number

    private currentVelocity: Vector3
    private energy: number
    
    private startingPosition: Vector3
    private endingPosition: Vector3

    private minY: number
    private angle: number
    private energyLoss: number


    private _onStop: Array<(obj: FlyingObjectClass) => void> = []
    private _onStart: Array<(obj: FlyingObjectClass) => void> = []

    constructor(part: BasePart, power: number, worldtype: WorldType) { // x axes only

        let world = WorldsData.get(worldtype)!

        this.part = part
        this.gravity = world.gravity
        this.density = world.density

        this.startingPosition = world.startingPosition
        this.endingPosition = world.endingPosition

        this.minY = world.minY
        this.angle = world.angle
        this.energyLoss = world.energyLoss

        this.currentVelocity = new Vector3(0, power*math.sin(math.rad(this.angle)), -power*math.cos(math.rad(this.angle))).div(this.density).div(this.delta)
        this.energy = this.currentVelocity.Magnitude**2/2

        print(this.energy, 'CURRENT ENERGY', power, this.currentVelocity.Z)

        this.BodyVelocity = new Instance('BodyVelocity')
        this.BodyVelocity.MaxForce = new Vector3(9e99, 9e99, 9e99)
        this.BodyVelocity.Velocity = this.currentVelocity

        this.BodyPosition = new Instance('BodyPosition')
        this.BodyPosition.MaxForce = new Vector3(9e99,0,0)
        this.BodyPosition.Position = new Vector3(this.startingPosition.X, 0, 0)

        this.BodyPosition.Parent = this.part
        this.BodyVelocity.Parent = this.part
        this.part.Position = this.startingPosition

    }

    public Start() {
        this._onStart.forEach((value) => value(this))
    }

    public Stop() {
        this._onStop.forEach((value) => value(this))
    }

    public BindToStart(callback: (obj: FlyingObjectClass) => void) {
        this._onStart.push(callback)
    }

    public BindToStop(callback: (obj: FlyingObjectClass) => void) {
        this._onStop.push(callback)
    }

    // make this part local
    /*
    public AttachCamera() {
        let camera = game.Workspace.CurrentCamera
        if (!camera) { return }

        camera.CameraType = Enum.CameraType.Track
        camera.CameraSubject = this.part

        camera.CFrame = new CFrame(this.part.Position.add(new Vector3(0, this.startingVelocity.Z/10, 0)), this.part.Position)
    }

    public DetachCamera(humanoid: Humanoid) {
        let camera = game.Workspace.CurrentCamera
        if (!camera) { return }

        camera.CameraType = Enum.CameraType.Custom
        camera.CameraSubject = humanoid
    }
    */

    public Activate() {

        this.Start()

        while ((this.energy > 1) && (math.abs(this.currentVelocity.Z) > .25)) {

            this.BodyVelocity.Velocity = this.currentVelocity
            this.part.AssemblyAngularVelocity = (this.currentVelocity.add(new Vector3(this.currentVelocity.Z * math.random(),0,0))).div(10)

            this.Distance += math.abs(this.currentVelocity.Z)*this.delta
            this.currentVelocity = this.currentVelocity.sub(new Vector3(0, this.gravity, 0)) 
            print(this.minY)
            
            if (this.part.Position.Z < this.endingPosition.Z) {
                this.part.Position = new Vector3(this.startingPosition.X, this.part.Position.Y, this.startingPosition.Z) 
                this.currentVelocity = this.currentVelocity.mul((100-this.energyLoss)/100)  
            }
            
            if ((this.part.Position.Y+this.currentVelocity.Y*this.delta < this.minY) && (this.currentVelocity.Y < 0)) {
                this.currentVelocity = this.currentVelocity.mul(new Vector3(1, -1, 1)) 
                this.currentVelocity = this.currentVelocity.mul((100-this.energyLoss)/100)  
            }
            
            this.energy = this.currentVelocity.Magnitude^2/2
            
            task.wait(this.delta)

        }

        this.BodyVelocity.Velocity = new Vector3(0,0,0)

        this.Stop()

    }

}