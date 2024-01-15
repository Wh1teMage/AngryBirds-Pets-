export class CreationUtilities {

    static SurfaceGui(parent: BasePart) {

        let surface = new Instance('SurfaceGui')

        surface.Parent = parent

        return surface

    }

}