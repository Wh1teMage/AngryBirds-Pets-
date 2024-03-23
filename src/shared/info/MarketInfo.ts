import { ProductType } from "shared/enums/MarketEnums";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { IProductData } from "shared/interfaces/ProductData";

export const MarketNamings = new Map<number, IProductData>([
    [1701055226, {name: 'test', producttype: ProductType.DevProduct}],
    // Accuracy
    [1762885895, {name: 'tinypackaccuracy',     producttype: ProductType.DevProduct}],
    [1762886150, {name: 'smallpackaccuracy',    producttype: ProductType.DevProduct}],
    [1762886258, {name: 'mediumpackaccuracy',   producttype: ProductType.DevProduct}],
    [1762886345, {name: 'largepackaccuracy',    producttype: ProductType.DevProduct}],
    [1762886496, {name: 'hugepackaccuracy',     producttype: ProductType.DevProduct}],
    [1762886599, {name: 'megapackaccuracy',     producttype: ProductType.DevProduct}],
    [1762886688, {name: 'megahugepackaccuracy', producttype: ProductType.DevProduct}],
    // Wins
    [1762886863, {name: 'tinypackwins',     producttype: ProductType.DevProduct}],
    [1762886977, {name: 'smallpackwins',    producttype: ProductType.DevProduct}],
    [1762887049, {name: 'mediumpackwins',   producttype: ProductType.DevProduct}],
    [1762887130, {name: 'largepackwins',    producttype: ProductType.DevProduct}],
    [1762887254, {name: 'hugepackwins',     producttype: ProductType.DevProduct}],
    [1762887397, {name: 'megapackwins',     producttype: ProductType.DevProduct}],
    [1762887501, {name: 'megahugepackwins', producttype: ProductType.DevProduct}],
    // Gems
    [1762887630, {name: 'tinypackgems',     producttype: ProductType.DevProduct}],
    [1762887698, {name: 'smallpackgems',    producttype: ProductType.DevProduct}],
    [1762887934, {name: 'mediumpackgems',   producttype: ProductType.DevProduct}],
    [1762888203, {name: 'largepackgems',    producttype: ProductType.DevProduct}],
    [1762888316, {name: 'hugepackgems',     producttype: ProductType.DevProduct}],
    [1762888398, {name: 'megapackgems',     producttype: ProductType.DevProduct}],
    [1762888472, {name: 'megahugepackgems', producttype: ProductType.DevProduct}],

    [734124643, {name: 'doublegems',     producttype: ProductType.Gamepass, correspondingGiftId: 1768845971}],
    [722529168, {name: 'instantpower',   producttype: ProductType.Gamepass, correspondingGiftId: 1762884215}],
    [722039542, {name: '100storage',     producttype: ProductType.Gamepass, correspondingGiftId: 1762884055}],
    [722093443, {name: '250storage',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883948}],
    [722545023, {name: 'fasthatch',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883764}],
    [721794896, {name: '3egghatch',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883606}],
    [721905653, {name: 'doubleaccuracy', producttype: ProductType.Gamepass, correspondingGiftId: 1762883449}],
    [721820866, {name: 'doublewins',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883298}],
    [722507170, {name: 'triplewins',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883126}],
    [722111374, {name: '3equipped',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883009}],
    [721938617, {name: '5equipped',      producttype: ProductType.Gamepass, correspondingGiftId: 1762882789}],
    [722336327, {name: 'doublestars',    producttype: ProductType.Gamepass, correspondingGiftId: 1762882615}],
    [722092789, {name: 'vippass',        producttype: ProductType.Gamepass, correspondingGiftId: 1762884549}],
    [733950750, {name: 'autorebirth',    producttype: ProductType.Gamepass, correspondingGiftId: 1768846202}],

    [722093437, {name: 'luck1', producttype: ProductType.Gamepass}],
    [1779469996, {name: 'luck2', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1')) { return false }
        return true
    },}],
    [1779470301, {name: 'luck3', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1') || !player.profile.Data.Products.includes('luck2')) { return false }
        return true
    },}],

    [1762897969, {name: 'rebirthskip1', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 0) { return false }
        return true
    },}],
    [1762898131, {name: 'rebirthskip2', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 1) { return false }
        return true
    },}],
    [1762898290, {name: 'rebirthskip3', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 2) { return false }
        return true
    },}],
    [1762898515, {name: 'rebirthskip4', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 3) { return false }
        return true
    },}],
    [1762898792, {name: 'rebirthskip5', producttype: ProductType.DevProduct}],

    [1762884667, {name: 'x2winspotion', producttype: ProductType.DevProduct}],
    [1779471423, {name: 'luckpotion', producttype: ProductType.DevProduct}],
    [1779471655, {name: 'goldpotion', producttype: ProductType.DevProduct}],
    [1779471915, {name: 'voidpotion', producttype: ProductType.DevProduct}],
    [1779472537, {name: 'allpotions', producttype: ProductType.DevProduct}],
    
    [1779423116, {name: 'bundle', producttype: ProductType.DevProduct}],
    [1779439494, {name: 'cavepack', producttype: ProductType.DevProduct}],
    [1779439942, {name: 'neonpack', producttype: ProductType.DevProduct}],
    [1779440646, {name: 'spacepack', producttype: ProductType.DevProduct}],

    [1762896093, {name: 'buy1spin', producttype: ProductType.DevProduct}],
    [1762896251, {name: 'buy10spin', producttype: ProductType.DevProduct}],
    [1762896353, {name: 'buy100spin', producttype: ProductType.DevProduct}],
])