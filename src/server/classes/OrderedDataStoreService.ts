import { DataStoreService, Workspace, Players } from "@rbxts/services"
import { IProfileData, IOrderedData, IOrderedDataService } from "shared/interfaces/ProfileData"
import { CreationUtilities } from "shared/utility/CreationUtilities"
import Functions from "shared/utility/LuaUtilFunctions"

const defaultOrdered: IOrderedData = {
    StrengthVal: 0,
    RebirthsVal: 0,
    WinsVal: 0,
    IngameTime: 0,
    RobuxSpent: 0,
}
const ignoreList: string[] = [
    //'399939444', '2680486757', '3013687191', '295934777', '1080987986'
]

const orderedConstants = new Map<string, IOrderedDataService>()

orderedConstants.set('StrengthVal', {name: 'StrengthVal', maxCount: 50, values: [] })
orderedConstants.set('WinsVal', {name: 'WinsVal', maxCount: 50, values: [] })
orderedConstants.set('IngameTime', {name: 'IngameTime', maxCount: 50, values: [] })
orderedConstants.set('RobuxSpent', {name: 'RobuxSpent', maxCount: 50, values: [] })
orderedConstants.set('RebirthsVal', {name: 'RebirthsVal', maxCount: 50, values: [] })

export class OrderedDataService { //write get method

    static updateValues = () => {
        
        orderedConstants.forEach((value: IOrderedDataService, key: string) => {
            
            value.name = key
            let store = DataStoreService.GetOrderedDataStore(value.name)
            if (!store) { warn(value.name+' datastore doesnt exist!'); return }
            let pages = store.GetSortedAsync(false, 100)
            
            value.datastore = store
            value.values = []
        
            while (true) {

                for (let page of pages.GetCurrentPage()) {
                    value.values.push(page)
                }
                
                if (pages.IsFinished) { break }

                pages.AdvanceToNextPageAsync()
            }
            
        })
        
    }

    static saveValues = (id: string, data: IProfileData) => {
        
        if (ignoreList.includes(id)) { return }

        let formattedData = Functions.constuctData(data, defaultOrdered) as IOrderedData

        orderedConstants.forEach((value: IOrderedDataService, key: string) => {

            let dataValue = math.round(formattedData[value.name as keyof typeof defaultOrdered])
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

    static getValues = () => {

        let values = new Map<string, {key: string, value: unknown}[]>()

        orderedConstants.forEach((value: IOrderedDataService, key: string) => {
            values.set(value.name, value.values)
        })

        return values

    }

    static replicateLeaderboardValues = () => {

        let leaderboards = Workspace.WaitForChild('Leaderboards')
        let template = leaderboards.WaitForChild('Templates').WaitForChild('Template')

        for (let obj of leaderboards.GetChildren()) {
            if (!obj.IsA('Model')) { continue }

            let value = orderedConstants.get(obj.Name)!

            value.values.forEach((val, index) => {

                let playerId = tonumber(val.key)!;
                let icon = Players.GetUserThumbnailAsync(playerId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size100x100);

                let objectUI = template.Clone();
                let stats = objectUI.WaitForChild('Stats') as GuiObject;

                if (index < 3) { 
                    objectUI = obj.WaitForChild('Main').WaitForChild('SurfaceGui').WaitForChild('LeaderboardFrame').WaitForChild('Top').WaitForChild(tostring(index+1))
                    stats = objectUI as ImageLabel
                }

                (objectUI.WaitForChild('Nickname') as TextLabel).Text = '@'+tostring(Players.GetNameFromUserIdAsync(playerId));
                (objectUI.WaitForChild('PlayerIcon') as ImageLabel).Image = icon[0];
                (objectUI.WaitForChild('Number') as TextLabel).Text = '#'+tostring(index+1);
                (stats.WaitForChild('Stats') as TextLabel).Text = CreationUtilities.getSIPrefixSymbol(val.value as number);

                if (obj.Name === 'IngameTime') {
                    let hours = math.round((val.value as number) / 3600);
                    (stats.WaitForChild('Stats') as TextLabel).Text = CreationUtilities.getSIPrefixSymbol(hours as number)+'h'
                }

                if (index < 3) { return }
                objectUI.Parent = obj.WaitForChild('Main').WaitForChild('SurfaceGui').WaitForChild('LeaderboardFrame').WaitForChild('Players')

            })
            
        }
        
    }

}