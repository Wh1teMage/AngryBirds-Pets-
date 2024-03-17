import { Service, OnStart, OnInit } from "@flamework/core";
import ObjectEvent from "@rbxts/object-event";
import { MarketplaceService, Players } from "@rbxts/services";
import { ServerPlayerFabric } from "server/components/PlayerComponent";
import { MarketCallbacks } from "server/static/MarketStatic";
import { ProductType } from "shared/enums/MarketEnums";
import { MarketNamings } from "shared/info/MarketInfo";
import { IProductData } from "shared/interfaces/ProductData";

let productCheck = (product: IProductData, userId: number) => {
    if (!product) { warn('Product Doesnt Have Any Namings!'); return }
    if (!MarketCallbacks.get(product.name)) { warn('Product Doesnt Have Any Callbacks!'); return }
    if (!Players.GetPlayerByUserId(userId)) { warn('Player Doesnt Exist!'); return }
    return true
}

let prompts = new Map<ProductType, (player: Player, productId: number) => void>([
    [ProductType.DevProduct, (player: Player, productId: number) => { MarketplaceService.PromptProductPurchase(player, productId) }],
    [ProductType.Gamepass, (player: Player, productId: number) => { MarketplaceService.PromptGamePassPurchase(player, productId) }],
])

let giftingQueue = new Map<number, number | undefined>([]) //maybe later on remake this system into array one
// in case gifts can somwhow overlap (need testings)

@Service({})
export class MarketService implements OnStart, OnInit {

    public static purchased = new ObjectEvent<[number, number]>

    private _onFailedPurchase() {

    }

    private _onSuccesfulPurchase() {
        
    }

    private _completePurchase(userId: number, productId: number, isPurchased: boolean) {

        let product = MarketNamings.get(productId) as IProductData
        let player = Players.GetPlayerByUserId(userId) as Player
        let giftId = giftingQueue.get(userId)

        if (!isPurchased) { this._onFailedPurchase(); return }
        if (!productCheck(product, userId)) { return }
        if (giftId && !Players.GetPlayerByUserId(giftId)) { warn('Gifted Player Doesnt Exist!'); return }

        if (giftId) { 
            player = Players.GetPlayerByUserId(giftId) as Player
            giftingQueue.set(userId, undefined)
        }

        MarketCallbacks.get(product.name)!(ServerPlayerFabric.GetPlayer(player))
        this._onSuccesfulPurchase()

        return ServerPlayerFabric.GetPlayer(player)!
    }

    onInit() {
        
        MarketplaceService.PromptProductPurchaseFinished.Connect((userId, productId, isPurchased) => { 
            //product dont have any DB saves (unless Bundles). Futher DB saves will be written in callbacks (profiles).
            this._completePurchase(userId, productId, isPurchased)
        })

        MarketplaceService.PromptGamePassPurchaseFinished.Connect((player, productId, isPurchased) => {
            let playerComponent = this._completePurchase(player.UserId, productId, isPurchased)
            
            if (playerComponent) { playerComponent.profile.Data.Products.push(MarketNamings.get(productId)!.name) }
        })

        MarketService.purchased.Connect((userId, productId) => {
            let playerComponent = this._completePurchase(userId, productId, true)

            if (playerComponent) { playerComponent.profile.Data.Products.push(MarketNamings.get(productId)!.name) }
        })

    }

    public static MakePurchase(userId: number, productId: number, giftId?: number) {

        let product = MarketNamings.get(productId) as IProductData
        let player = Players.GetPlayerByUserId(userId) as Player

        if (!productCheck(product, userId)) { return }
        if (giftId && !Players.GetPlayerByUserId(giftId)) { warn('Gifted Player Doesnt Exist!'); return }

        let playerComponent = ServerPlayerFabric.GetPlayer(player)

        if (giftId) {
            let giftPlayerComponent = ServerPlayerFabric.GetPlayer(player)

            if (product.checkCallback && !product.checkCallback(giftPlayerComponent)) { return }
            if (!giftPlayerComponent || !giftPlayerComponent.profile) { warn('Something Went Wrong With Data!'); return }
            if (giftPlayerComponent.profile.Data.Products.includes(product.name)) { warn('Product Was Purchased!'); return }
            if ((product.producttype === ProductType.Gamepass) && (MarketplaceService.UserOwnsGamePassAsync(giftId, productId))) { warn('Product Was Purchased!'); return }
    
            giftingQueue.set(userId, giftId)

            if (product.producttype === ProductType.Gamepass) { prompts.get(ProductType.DevProduct)!(player, product.correspondingGiftId!); return } 
        }
        else {
            if (product.checkCallback && !product.checkCallback(playerComponent)) { return }
            if (!playerComponent || !playerComponent.profile) { warn('Something Went Wrong With Data!'); return }
            if (playerComponent.profile.Data.Products.includes(product.name)) { warn('Product Was Purchased!'); return }
            if ((product.producttype === ProductType.Gamepass) && (MarketplaceService.UserOwnsGamePassAsync(userId, productId))) { warn('Product Was Purchased!'); return }
        }

        prompts.get(product.producttype)!(player, productId)
        
    }
    
    public static GamepassCheck(userId: number, productId: number) {
        let product = MarketNamings.get(productId) as IProductData
        let player = Players.GetPlayerByUserId(userId) as Player
        let playerComponent = ServerPlayerFabric.GetPlayer(player)
        
        if (!productCheck(product, userId)) { return }
        if (product.producttype !== ProductType.Gamepass) { return }
        if (playerComponent.profile.Data.Products.includes(product.name)) { return }

        this.purchased.Fire(userId, productId)
    }

    onStart() {
        
    }
}