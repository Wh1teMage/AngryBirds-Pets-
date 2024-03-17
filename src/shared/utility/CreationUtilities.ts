
export class CreationUtilities {

    static SurfaceGui(parent: BasePart) {

        let surface = new Instance('SurfaceGui')
        surface.Parent = parent

        return surface

    }

    static Weld(p0: BasePart, p1: BasePart) {

        let weld = new Instance('WeldConstraint')
        weld.Part0 = p0
        weld.Part1 = p1
        weld.Parent = p0

        print(weld)

    }

}