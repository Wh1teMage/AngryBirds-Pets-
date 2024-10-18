import { DataStoreService, Workspace, Players } from "@rbxts/services"
import { IProfileData, IOrderedData, IOrderedDataService } from "shared/interfaces/ProfileData"
import { CreationUtilities } from "shared/utility/CreationUtilities"
import Functions from "shared/utility/LuaUtilFunctions"

const defaultOrdered: IOrderedData = {
    StrengthMaxVal: 0,
    WinsMaxVal: 0,
    IngameTime: 0,
}

const ignoreList: string[] = [
    '399939444', '2680486757', '3013687191', '295934777', '1080987986', '2265378525'
]

const orderedConstants = new Map<string, IOrderedDataService>()

orderedConstants.set('StrengthMaxVal', {name: 'StrengthMaxVal', maxCount: 50, values: [] })
orderedConstants.set('WinsMaxVal', {name: 'WinsMaxVal', maxCount: 50, values: [] })
orderedConstants.set('IngameTime', {name: 'IngameTime', maxCount: 50, values: [] })

export class OrderedDataService { //write get method

    static updateValues = () => {
        
        orderedConstants.forEach((value: IOrderedDataService, key: string) => {
            
            value.name = key
            let store = DataStoreService.GetOrderedDataStore(value.name)
            if (!store) { warn(value.name+' datastore doesnt exist!'); return }
            let pages = store.GetSortedAsync(false, math.min(100, value.maxCount))
            
            value.datastore = store
            value.values = []

            let counter = 0
        
            while (true) {

                counter += 1

                for (let page of pages.GetCurrentPage()) {

                    let dataValue = math.round(page.value as number)

                    pcall(() => {

                        if (dataValue > 1000) {
                            let stringData = tostring(dataValue)
                            let length = math.floor(dataValue)+1
                            dataValue = tonumber(stringData.sub(-3, length))!/100*10**tonumber(stringData.sub(1, -4))!
                        }
    
                        value.values.push({key: page.key, value: dataValue})

                    })
                }
                
                if (pages.IsFinished || counter*math.min(100, value.maxCount) >= value.maxCount) { break }

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

            if (dataValue > 1000) {

                let poweroften = math.floor(math.log(dataValue, 10))
                let suffix = math.round((dataValue/10**poweroften)*100)

                dataValue = math.round(tonumber(tostring(poweroften)+tostring(suffix))!)
            }

            value.datastore!.SetAsync(id, dataValue);
            /*

            if (existvalue) { value.datastore!.SetAsync(id, dataValue); return }

            if (value.values.size() < value.maxCount) {
                value.datastore!.SetAsync(id, dataValue)
            }
            else {
                if (value.values[value.values.size()-1] && (dataValue < (value.values[value.values.size()-1].value as number))) { return }

                value.datastore!.RemoveAsync(value.values[value.values.size()-1].key)
                value.datastore!.SetAsync(id, dataValue)
            }

            */

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
            if (!value) { continue }

            let playersUI = obj.WaitForChild('Main').WaitForChild('SurfaceGui').WaitForChild('LeaderboardFrame').WaitForChild('Players')

            for (let playerUI of playersUI.GetChildren()) {
                if (playerUI.IsA('GuiObject')) { playerUI.Destroy() }
            }

            value.values.forEach((val, index) => {

                pcall(() => { //Fuck HTTPS

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
                    objectUI.Parent = playersUI
    

                })

            })
            
        }
        
        
    }

}