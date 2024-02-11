import { BaseComponent } from "@flamework/components"
import { BillboardComponent, BillboardFabric } from "client/components/UIComponents/BillboardComponent"
import { ButtonComponent, ButtonFabric } from "client/components/UIComponents/ButtonComponent"
import { FrameComponent, FrameFabric } from "client/components/UIComponents/FrameComponent"
import { ImageFabric } from "client/components/UIComponents/ImageComponent"
import { SurfaceComponent, SurfaceFabric } from "client/components/UIComponents/SurfaceComponent"

interface IGlobalObject {
    name: string,
    objComponent: string, //Enum in future
    children?: IGlobalObject[]
}

interface IPathObject {
    [key: string]: IPathObject & { get: (<T>() => T) }
}

const ComponentNames = new Map<string, (obj: Instance) => any>

ComponentNames.set('Frame', (obj) => {return FrameFabric.CreateFrame(obj as Frame)})
ComponentNames.set('Image', (obj) => {return ImageFabric.CreateImage(obj as ImageLabel)})
ComponentNames.set('Button', (obj) => {return ButtonFabric.CreateButton(obj as GuiButton)})
ComponentNames.set('Surface', (obj) => {return SurfaceFabric.CreateSurface(obj as SurfaceGui)})
ComponentNames.set('Billboard', (obj) => {return BillboardFabric.CreateBillboard(obj as BillboardGui)})



let createComponentPath = (parent: Instance, globalObject: IGlobalObject[]) => {
    let objectPath: IPathObject = {} //{ [name: string]: IPathObject<<T>() => T> }

    for (let obj of globalObject) {

        let children = {}
        if (obj.children) { children = createComponentPath(parent.WaitForChild(obj.name), obj.children) }

        if (!ComponentNames.get(obj.objComponent) || !parent.WaitForChild(obj.name, 1)) { warn(obj.name+' GuiComponent Wasnt Found!'); continue}
        let objComponent = ComponentNames.get(obj.objComponent)!(parent.WaitForChild(obj.name))
        
        objectPath[obj.name] = { ...children, get: <T>() => {return objComponent as T }} as unknown as (IPathObject & {get: <T>() => T})
    }

    return objectPath
}


export class ComponentsInitializer {

    public static InitializeObject(globalObject: IGlobalObject[], parent: Instance): IPathObject {
        let path = {};
        pcall(() => {path = createComponentPath(parent, globalObject)})
        if (!path) warn('GuiPath Doesnt Exist!');
        return path as IPathObject
    }

}