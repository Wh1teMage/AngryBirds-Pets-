import ObjectEvent from "@rbxts/object-event";
import { RunService } from "@rbxts/services";
import { ICreatedHitbox, IHitboxData } from "shared/interfaces/HitboxData";

const hitboxes: HitboxClass[] = []
const globalFilter: Instance[] = []

let active = false
let activateRender = () => {
    if (active) {return}

    RunService.Stepped.Connect(() => {
        for (let hitbox of hitboxes) {
            hitbox.ConvertProperties()
            hitbox.CheckParts()
        }
    })
}

export class HitboxClass implements ICreatedHitbox {

    part?: BasePart | undefined;
    size?: Vector3 | undefined;
    cframe?: CFrame | undefined;
    repeats: number;

    params: OverlapParams;
    duration: number;

    hitParts: BasePart[] = [];
    onHit = new ObjectEvent<[BasePart[]]>;

    constructor(data: IHitboxData) {
        this.part = data.part
        this.size = data.size
        this.cframe = data.cframe

        this.repeats = data.repeats || 1
        this.duration = data.duration

        if (!data.filter) {data.filter = []}
        if (data.part) { data.filter?.push(data.part) }
        for (let v of globalFilter) { data.filter?.push(v) }

        let params = new OverlapParams()
        params.FilterDescendantsInstances = data.filter as Instance[]
        params.FilterType = Enum.RaycastFilterType.Exclude

        this.params = params
        
        activateRender()
    }

    public ConvertProperties() {
        if (!this.part) {return}

        this.cframe = this.part.CFrame
        this.size = this.part.Size
    }

    public CheckParts() {
        let parts = game.Workspace.GetPartBoundsInBox(this.cframe!, this.size!, this.params)
        if (parts.size() < 1) {return}

        let newParts: BasePart[] = []

        for (let part of parts) {
            if (this.hitParts.includes(part)) {continue}

            newParts.push(part)
            this.hitParts.push(part)
        }
        
        if (newParts.size() < 1) {return}
        this.onHit.Fire(newParts)
    }

    public ClearParts() {
        this.hitParts = []
    }

    public Destroy() {
        for (let connection of this.onHit.SubscribedConnections) { connection.Disconnect() }
        hitboxes.remove(hitboxes.indexOf(this))
        this.hitParts = []
    }

    public Activate() {
        hitboxes.push(this)

        for (let i = 0; i < this.repeats; i++) {
            this.ClearParts()
            task.wait(this.duration)
        }

        this.Destroy()
    }

}