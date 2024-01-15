export interface IHitboxData {
    part?: BasePart
    size?: Vector3
    cframe?: CFrame
    repeats?: number

    filter?: Instance[]

    duration: number
}

export interface ICreatedHitbox extends IHitboxData {
    hitParts: BasePart[]
}