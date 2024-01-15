import { IPetData } from "shared/interfaces/PetData";

interface Functions {
    constuctData: (target: Record<any, any>, template: Record<any, any>) => Record<any, any>
    iterateObject: (object: Record<any, any>, callback: (index: string, value: any) => void) => void
    compareObjects: (obj1: Record<any, any>, obj2: Record<any, any>, useIgnore?: boolean) => boolean
}

declare const Functions: Functions;

export = Functions;