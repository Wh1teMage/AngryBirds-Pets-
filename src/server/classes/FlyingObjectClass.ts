export class FlyingObjectClass {

    private _onStart: Array<() => void> = [];
    private _onStop: Array<() => void> = [];

    private tick = .1;

    private currentVelocity = 0;
    private maxLength = 0;

    private part: BasePart;
    private startingPosition: Vector3; // make starting position initialization right in the part
    // base axis here is X

    private bodyPosition = new Instance('BodyPosition');
    private bodyVelocity = new Instance('BodyVelocity');

    public flying = false

    constructor(part: BasePart, length: number) {
        this.maxLength = length
        this.part = part
        this.startingPosition = part.Position

        this.bodyPosition.Position = this.startingPosition.mul(new Vector3(0, 0, 1))
        this.bodyPosition.MaxForce = new Vector3(0, 0, 9e9)

        this.bodyVelocity.Velocity = new Vector3(0,0,0)
        this.bodyVelocity.MaxForce = new Vector3(9e9, 0, 0)
    }

    public BindToStart(callback: () => void) {
        this._onStart.push(callback)
    }

    public BindToStop(callback: () => void) {
        this._onStop.push(callback)
    }

    public Start() { this._onStart.forEach((val) => { task.spawn(() => { val() }) }) }

    public Stop() { this._onStop.forEach((val) => { task.spawn(() => { val() }) }) }

    public SetSpeed(speed: number) { 
        this.currentVelocity = speed
    }

    public Destroy() {
        if (this.bodyPosition.Parent) { this.bodyPosition.Destroy() }
        if (this.bodyVelocity.Parent) { this.bodyVelocity.Destroy() }

        this._onStart = []
        this._onStop = []
    }

    public Activate() {
        this.Start()

        let delta = (this.startingPosition.X - this.part.Position.X)

        this.flying = true

        while (delta < this.maxLength) {
            this.bodyVelocity.Velocity = new Vector3(this.currentVelocity, 0, 0)

            task.wait(this.tick)
        }

        this.flying = false

        this.Stop()
    }

}