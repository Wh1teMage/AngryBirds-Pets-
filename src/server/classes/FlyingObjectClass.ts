export class FlyingObjectClass {

    public BodyVelocity: BodyVelocity
    public BodyPosition: BodyPosition
    public TravelledDistance: number = 0

    private step = .1

    private part: BasePart
    private gravity: number
    private density: number

    private koef: number
    private startingVelocity: Vector3
    private position: Vector3

    private bounces: number
    private overallSum: number

    private currentBounce: number
    private bounceSum: number
    
    private _onStop: Array<(obj: FlyingObjectClass) => void> = []
    private _onStart: Array<(obj: FlyingObjectClass) => void> = []

    constructor(part: BasePart, gravity: number, density: number, velocity: Vector3, position: Vector3) { // x axes only

        this.part = part
        this.gravity = gravity
        this.density = density

        this.startingVelocity = velocity
        this.position = position
        this.koef = (velocity.X*gravity)/(velocity.Y*density)

        this.bounces = math.ceil( this.koef )
        this.overallSum = (1+this.bounces)*this.bounces/2

        this.currentBounce = this.bounces
        this.bounceSum = this.overallSum

        this.BodyVelocity = new Instance('BodyVelocity')
        this.BodyVelocity.MaxForce = new Vector3(9e99, 9e99, 9e99)
        this.BodyVelocity.Velocity = velocity

        this.BodyPosition = new Instance('BodyPosition')
        this.BodyPosition.MaxForce = new Vector3(0,0,9e99)
        this.BodyPosition.Position = new Vector3(0, 0, position.Z)

        this.BodyPosition.Parent = this.part
        this.BodyVelocity.Parent = this.part
        this.part.Position = position

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
    public AttachCamera() {
        let camera = game.Workspace.CurrentCamera
        if (!camera) { return }

        camera.CameraType = Enum.CameraType.Track
        camera.CameraSubject = this.part

        camera.CFrame = new CFrame(this.part.Position.add(new Vector3(0, this.startingVelocity.X/10, 0)), this.part.Position)
    }

    public DetachCamera(humanoid: Humanoid) {
        let camera = game.Workspace.CurrentCamera
        if (!camera) { return }

        camera.CameraType = Enum.CameraType.Custom
        camera.CameraSubject = humanoid
    }

    public Activate() {

        this.Start()

        while (true) {
            task.wait(this.step)

            this.TravelledDistance += this.BodyVelocity.Velocity.X*this.step-(this.density*this.step**2)/2
            this.BodyVelocity.Velocity = this.BodyVelocity.Velocity.add(new Vector3(-this.density*this.step, -this.gravity*this.step, 0))

            if (this.BodyVelocity.Velocity.X <= 0) break
            if (this.part.Position.Y < this.position.Y) {
                if ( this.currentBounce <= 0 ) { this.BodyVelocity.Velocity = this.BodyVelocity.Velocity.add(new Vector3(0, this.gravity*this.step, 0)); continue }

                this.bounceSum -= this.currentBounce
                this.currentBounce -= 1

                this.BodyVelocity.Velocity = new Vector3(this.BodyVelocity.Velocity.X, this.startingVelocity.Y*this.bounceSum/this.overallSum, 0)
            }

        }

        this.BodyVelocity.Velocity = new Vector3(0,0,0)

        this.Stop()

    }

}