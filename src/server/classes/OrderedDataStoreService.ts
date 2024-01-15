import { DataStoreService } from "@rbxts/services"
import { IProfileData, IOrderedData, IOrderedDataService } from "shared/interfaces/ProfileData"
import Functions from "shared/utility/LuaUtilFunctions"

const defaultOrdered: IOrderedData = {
    coins: 0
}
const ignoreList : string[] = []

const orderedConstants = new Map<string, IOrderedDataService>()

orderedConstants.set('coins', {name: '', maxCount: 100, values: [] })

export class OrderedDataService { //write get method

    static updateValues = () => {
        
        orderedConstants.forEach((value: IOrderedDataService, key: string) => {
            
            value.name = key
            let store = DataStoreService.GetOrderedDataStore(value.name)
            if (!store) { warn(value.name+' datastore doesnt exist!'); return }
            let pages = store.GetSortedAsync(true, 100)
        
            value.datastore = store
            value.values = []
        
            while (!pages.IsFinished) {

                for (let page of pages.GetCurrentPage()) {
                    value.values.push(page)
                }
                
                pages.AdvanceToNextPageAsync()
            }
            
        })
        
    }

    static saveValues = (id: string, data: IProfileData) => {
        
        if (ignoreList.includes(id)) { return }

        let formattedData = Functions.constuctData(data, defaultOrdered) as IOrderedData

        orderedConstants.forEach((value: IOrderedDataService, key: string) => {

            let dataValue = formattedData[value.name as keyof typeof defaultOrdered]
            let existvalue = value.values.find((val) => val.key === id)
            if (existvalue) { value.datastore!.SetAsync(id, dataValue); return }

            if (value.values.size() < value.maxCount) {
                value.datastore!.SetAsync(id, dataValue)
            }
            else {
                if (dataValue < (value.values[value.values.size()].value as number)) { return }

                value.datastore!.RemoveAsync(value.values[value.values.size()].key)
                value.datastore!.SetAsync(id, dataValue)
            }

        })
        
    }

}