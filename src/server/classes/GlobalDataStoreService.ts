import { DataStoreService } from "@rbxts/services"
import { Events } from "server/network"
import { defaultGlobal } from "shared/info/DatastoreInfo"

export class GlobalDataService {

    static datastore = DataStoreService.GetDataStore('Global') //basically GetGlobalDataStore
    static values = defaultGlobal

    static setValue(scope: string, value: number) {
        GlobalDataService.datastore.SetAsync(scope, value)
        GlobalDataService.values.set(scope, value)

        Events.ReplicateEffect.broadcast('LimitedPets', new Map<string, Map<string, number>>([['Info', GlobalDataService.values]]))
    }

    static updateValues() {

        defaultGlobal.forEach((val, scope) => {
            let value = GlobalDataService.datastore.GetAsync(scope)
            GlobalDataService.values.set(scope, value[0] as number)
        })

        Events.ReplicateEffect.broadcast('LimitedPets', new Map<string, Map<string, number>>([['Info', GlobalDataService.values]]))
    }

    static getValue(scope: string) {
        return GlobalDataService.values.get(scope)
    }

}