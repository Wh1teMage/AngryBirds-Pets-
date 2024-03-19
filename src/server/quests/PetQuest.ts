import { PassiveClass, PassiveDecorator } from "server/classes/PassiveClass";
import { ServerPlayerComponent, ServerPlayerFabric } from "server/components/PlayerComponent";
import { PetQuestsData } from "shared/info/QuestInfo";
import { PassiveValues } from "shared/interfaces/PassiveData";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { HttpService } from "@rbxts/services";

interface Data {
    data: {
        name: string,
        displayName: string,
        id: number
    }[]
    nextPageCursor: string
}

interface otherData {
    name: string
    displayName: string
    userId: number
}

const FollowIds = [
	399939444,
	2680486757,
	3013687191,
]

let GetFollowings = (userId: number, itercallback: (followings: otherData[], ended: boolean) => void, cursor?: string) => {
	let followings: otherData[] = []
	let ended = false
	let url = ("https://friends.roproxy.com/v1/users/%s/followings?limit=100").format(tostring(userId))

	if (ended) { return {} }
	
	if(typeOf(cursor) === "string") {
		url = ("%s&cursor=%s").format(url, cursor!);
    }

	let values = pcall(() => { return HttpService.JSONDecode(HttpService.GetAsync(url)) as Data }  ) 

    if (!values[0]) { return {} }
    let decoded = values[1] as Data

	for (let following of decoded.data) {
		followings.push({
			name: following.name,
			displayName: following.displayName,
			userId: following.id,
		})
	}
	
	itercallback(followings, ended)
	
	if (!decoded.nextPageCursor) { return followings } 

	let nextFollowings = GetFollowings(userId, itercallback, decoded.nextPageCursor) as otherData[]
	for (let obj of nextFollowings) {
		followings.push(obj)
    }

	return followings
}

let CheckFollowings = (userId: number, onfinishedcallback: (found: boolean, ids: number[]) => void) => {
	
	task.spawn(() => {
		let ids = table.clone(FollowIds)
		let found = true
		
		GetFollowings(userId, (followings, ended) => {
			for (let following of followings) {
				let index = ids.indexOf(following.userId)
				
				if (index) {ids.remove(index)}
				if (ids.size() <= 0) { ended = true; break }
            }
			
        })
		
		if (ids.size() > 0) { found = false }
		
		onfinishedcallback(found, ids)
    })
	
}

@PassiveDecorator('PetQuest')
export class PetQuest extends PassiveClass {

    public name = 'PetQuest'
    public description = 'fuck me'

    public setOwner = (player: Player) => {
        this.player = player
    };

    public onStart = () => {

        if (!this.player) { return }
        let component = ServerPlayerFabric.GetPlayer(this.player) 
        if (!component) { return }

        let profileData = component.profile.Data
        let sessionData = component.session

        if (profileData.CompletedQuests.includes('PetQuest1')) { return }

		CheckFollowings(this.player.UserId, (passed, leftids) => {

            component.session.leftToFollow = leftids
            component.replica.SetValue('Session.leftToFollow', component.session.leftToFollow)
            print(component.session.leftToFollow, 'leftidsleftidsleftidsleftids')
			if (!passed || profileData.CompletedQuests.includes('PetQuest1')) { return }

			//profileData.CompletedQuests.push('PetQuest1')
            component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)
        })

    }
    /*
    public onValueChanged = (value: PassiveValues) => {

        if (!this.component) { return }
                     
        let profileData = this.component.profile.Data
        let sessionData = this.component.session

        PetQuestsData.forEach((value, key) => {
            if (profileData.CompletedQuests.includes(key)) { return }
            if (value.checkCallback) { value.checkCallback(this.component as IServerPlayerComponent) }
        })

        this.component.replica.SetValue('Profile.CompletedQuests', profileData.CompletedQuests)

    }
    */
}