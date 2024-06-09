import { ProductType } from "shared/enums/MarketEnums";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { IProductData } from "shared/interfaces/ProductData";
import { defaultGlobal } from "./DatastoreInfo";

export const MarketNamings = new Map<number, IProductData>([
    [1701055226, {name: 'test', producttype: ProductType.DevProduct, price: 0}],
    // Accuracy
    [1762885895, {name: 'tinypackaccuracy',     producttype: ProductType.DevProduct, price: 39}],
    [1762886150, {name: 'smallpackaccuracy',    producttype: ProductType.DevProduct, price: 69}],
    [1762886258, {name: 'mediumpackaccuracy',   producttype: ProductType.DevProduct, price: 219}],
    [1762886345, {name: 'largepackaccuracy',    producttype: ProductType.DevProduct, price: 359}],
    [1762886496, {name: 'hugepackaccuracy',     producttype: ProductType.DevProduct, price: 559}],
    [1762886599, {name: 'megapackaccuracy',     producttype: ProductType.DevProduct, price: 899}],
    [1762886688, {name: 'megahugepackaccuracy', producttype: ProductType.DevProduct, price: 1199}],
    // Wins
    [1762886863, {name: 'tinypackwins',     producttype: ProductType.DevProduct, price: 39}],
    [1762886977, {name: 'smallpackwins',    producttype: ProductType.DevProduct, price: 69}],
    [1762887049, {name: 'mediumpackwins',   producttype: ProductType.DevProduct, price: 219}],
    [1762887130, {name: 'largepackwins',    producttype: ProductType.DevProduct, price: 359}],
    [1762887254, {name: 'hugepackwins',     producttype: ProductType.DevProduct, price: 559}],
    [1762887397, {name: 'megapackwins',     producttype: ProductType.DevProduct, price: 899}],
    [1762887501, {name: 'megahugepackwins', producttype: ProductType.DevProduct, price: 1199}],
    // Gems
    [1762887630, {name: 'tinypackgems',     producttype: ProductType.DevProduct, price: 39}],
    [1762887698, {name: 'smallpackgems',    producttype: ProductType.DevProduct, price: 69}],
    [1762887934, {name: 'mediumpackgems',   producttype: ProductType.DevProduct, price: 219}],
    [1762888203, {name: 'largepackgems',    producttype: ProductType.DevProduct, price: 359}],
    [1762888316, {name: 'hugepackgems',     producttype: ProductType.DevProduct, price: 559}],
    [1762888398, {name: 'megapackgems',     producttype: ProductType.DevProduct, price: 899}],
    [1762888472, {name: 'megahugepackgems', producttype: ProductType.DevProduct, price: 1199}],

    [734124643, {name: 'doublegems',     producttype: ProductType.Gamepass, correspondingGiftId: 1768845971, price: 349}],
    [722529168, {name: 'instantpower',   producttype: ProductType.Gamepass, correspondingGiftId: 1762884215, price: 799}],
    [722039542, {name: '100storage',     producttype: ProductType.Gamepass, correspondingGiftId: 1762884055, price: 79}],
    [722093443, {name: '250storage',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883948, price: 179}],
    [722545023, {name: 'fasthatch',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883764, price: 129}],
    [721794896, {name: '3egghatch',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883606, price: 379}],
    [721905653, {name: 'doubleaccuracy', producttype: ProductType.Gamepass, correspondingGiftId: 1762883449, price: 249}],
    [721820866, {name: 'doublewins',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883298, price: 349}],
    [722507170, {name: 'triplewins',     producttype: ProductType.Gamepass, correspondingGiftId: 1762883126, price: 649}],
    [722111374, {name: '3equipped',      producttype: ProductType.Gamepass, correspondingGiftId: 1762883009, price: 249}],
    [721938617, {name: '5equipped',      producttype: ProductType.Gamepass, correspondingGiftId: 1762882789, price: 399}],
    [722336327, {name: 'doublestars',    producttype: ProductType.Gamepass, correspondingGiftId: 1762882615, price: 449}],
    [722092789, {name: 'vippass',        producttype: ProductType.Gamepass, correspondingGiftId: 1762884549, price: 449}],
    [733950750, {name: 'autorebirth',    producttype: ProductType.Gamepass, correspondingGiftId: 1768846202, price: 129}],

    [722093437, {name: 'luck1', producttype: ProductType.Gamepass, price: 99}],
    [1779469996, {name: 'luck2', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1')) { return false }
        return true
    }, price: 649}],
    [1779470301, {name: 'luck3', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1') || !player.profile.Data.Products.includes('luck2')) { return false }
        return true
    }, price: 1199}],

    [1762897969, {name: 'rebirthskip1', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 0) { return false }
        return true
    }, price: 99}],
    [1762898131, {name: 'rebirthskip2', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 1) { return false }
        return true
    }, price: 149}],
    [1762898290, {name: 'rebirthskip3', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 2) { return false }
        return true
    }, price: 249}],
    [1762898515, {name: 'rebirthskip4', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (player.profile.Data.StatValues.RebirthSkips !== 3) { return false }
        return true
    }, price: 349}],
    [1762898792, {name: 'rebirthskip5', producttype: ProductType.DevProduct, price: 499}],

    [1762884667, {name: 'x2winspotion', producttype: ProductType.DevProduct, price: 109}],
    [1779471423, {name: 'luckpotion', producttype: ProductType.DevProduct, price: 59}],
    [1779471655, {name: 'goldpotion', producttype: ProductType.DevProduct, price: 129}],
    [1779471915, {name: 'voidpotion', producttype: ProductType.DevProduct, price: 169}],
    [1779472537, {name: 'allpotions', producttype: ProductType.DevProduct, price: 1799}],
    
    [1779423116, {name: 'bundle', producttype: ProductType.DevProduct, price: 499}],
    [1779439494, {name: 'cavepack', producttype: ProductType.DevProduct, price: 149}],
    [1779439942, {name: 'neonpack', producttype: ProductType.DevProduct, price: 149}],
    [1779440646, {name: 'spacepack', producttype: ProductType.DevProduct, price: 449}],
    [1779438971, {name: 'starterpack', producttype: ProductType.DevProduct, price: 99}],
    [1762896804, {name: 'unlocksessiongifts', producttype: ProductType.DevProduct, price: 499}],

    [1762896093, {name: 'buy1spin', producttype: ProductType.DevProduct, price: 49}],
    [1762896251, {name: 'buy10spin', producttype: ProductType.DevProduct, price: 399}],
    [1762896353, {name: 'buy100spin', producttype: ProductType.DevProduct, price: 2299}],

    [1762885561, {name: '25storage',     producttype: ProductType.DevProduct, price: 49}],
    [1762885322, {name: '1equipped', producttype: ProductType.DevProduct, price: 99}],

    [1779420282, {name: 'limited1', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (defaultGlobal.get('Limited1')! < 0) { return false }
        return true
    }, price: 649}],
    [1779420957, {name: 'limited2', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (defaultGlobal.get('Limited2')! < 0) { return false }
        return true
    }, price: 1549}],
    [1779421279, {name: 'limited3', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (defaultGlobal.get('Limited3')! < 0) { return false }
        return true
    }, price: 9999}],

    [1762894442, {name: 'nightmare1', producttype: ProductType.DevProduct, price: 400}],
    [1762894847, {name: 'nightmare3', producttype: ProductType.DevProduct, price: 1200}],
    [1762894981, {name: 'nightmare10', producttype: ProductType.DevProduct, price: 3200}],

    [1763283579, {name: 'shadow1', producttype: ProductType.DevProduct, price: 99}],
    [1763283812, {name: 'shadow3', producttype: ProductType.DevProduct, price: 249}],
    [1763283954, {name: 'shadow10', producttype: ProductType.DevProduct, price: 499}],

    [1762895173, {name: 'party1', producttype: ProductType.DevProduct, price: 150}],
    [1762895301, {name: 'party3', producttype: ProductType.DevProduct, price: 450}],
    [1762895396, {name: 'party10', producttype: ProductType.DevProduct, price: 1200}],

    [1762884433, {name: 'diamond1', producttype: ProductType.DevProduct, price: 149}],
    [1782683273, {name: 'diamond3', producttype: ProductType.DevProduct, price: 439}],

    [1779476876, {name: 'luminousstone', producttype: ProductType.DevProduct, price: 99}],
    [1779477226, {name: 'strongshield', producttype: ProductType.DevProduct, price: 249}],
    [1779477513, {name: 'lightsaber', producttype: ProductType.DevProduct, price: 449}],

    [1802315798, {name: 'voidskip', producttype: ProductType.DevProduct, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.session.selectedVoid) { return false }
        return true
    }, price: 199}],
])