import { ProductType } from "shared/enums/MarketEnums";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { IProductData } from "shared/interfaces/ProductData";
import { defaultGlobal } from "./DatastoreInfo";

export const MarketNamings = new Map<number, IProductData>([
    [1701055226, {name: 'test', producttype: ProductType.DevProduct, price: 0}],
    // Accuracy
    [1907108594, {name: 'tinypackaccuracy',     producttype: ProductType.DevProduct, price: 9}],
    [1907109345, {name: 'smallpackaccuracy',    producttype: ProductType.DevProduct, price: 99}],
    [1907109494, {name: 'mediumpackaccuracy',   producttype: ProductType.DevProduct, price: 299}],
    [1907109773, {name: 'largepackaccuracy',    producttype: ProductType.DevProduct, price: 499}],
    [1907110711, {name: 'hugepackaccuracy',     producttype: ProductType.DevProduct, price: 999}],
    [1907110840, {name: 'megapackaccuracy',     producttype: ProductType.DevProduct, price: 1299}],
    [1907110973, {name: 'megahugepackaccuracy', producttype: ProductType.DevProduct, price: 1499}],
    // Gems
    [1907111627, {name: 'tinypackgems',     producttype: ProductType.DevProduct, price: 25}],
    [1907111788, {name: 'smallpackgems',    producttype: ProductType.DevProduct, price: 99}],
    [1907111941, {name: 'mediumpackgems',   producttype: ProductType.DevProduct, price: 249}],
    [1907112107, {name: 'largepackgems',    producttype: ProductType.DevProduct, price: 599}],
    [1907112245, {name: 'hugepackgems',     producttype: ProductType.DevProduct, price: 1299}],
    [1907112416, {name: 'megapackgems',     producttype: ProductType.DevProduct, price: 2399}],
    [1907112582, {name: 'megahugepackgems', producttype: ProductType.DevProduct, price: 3999}],

    [891643068, {name: 'doublegems',     producttype: ProductType.Gamepass, correspondingGiftId: 1907116893, price: 349}],
    [891361917, {name: 'doubleaccuracy', producttype: ProductType.Gamepass, correspondingGiftId: 1907117188, price: 299}],
    [891581551, {name: '2equipped',      producttype: ProductType.Gamepass, correspondingGiftId: 1907115114, price: 399}],
    [891321914, {name: '100storage',      producttype: ProductType.Gamepass, correspondingGiftId: 1907115342, price: 199}],
    [891709004, {name: '50storage',      producttype: ProductType.Gamepass, correspondingGiftId: 1907116197, price: 99}],
    [891593436, {name: '3egghatch',      producttype: ProductType.Gamepass, correspondingGiftId: 1907116340, price: 399}],
    [891504714, {name: 'fastswing',      producttype: ProductType.Gamepass, correspondingGiftId: 1907116489, price: 699}],
    [891574490, {name: 'autorebirth',    producttype: ProductType.Gamepass, correspondingGiftId: 1907116682, price: 499}],

    [1907112938, {name: 'x2strengthpotion', producttype: ProductType.DevProduct, price: 49}],
    [1907113096, {name: 'x3strengthpotion', producttype: ProductType.DevProduct, price: 99}],
    [1907113307, {name: 'x2gemspotion', producttype: ProductType.DevProduct, price: 99}],
    [1907113417, {name: 'x3gemspotion', producttype: ProductType.DevProduct, price: 199}],
    [1907117405, {name: 'allpotions', producttype: ProductType.DevProduct, price: 2999}],
    
    [1907117658, {name: 'bundle', producttype: ProductType.DevProduct, price: 399}],

    [1907106335, {name: 'nightmare1', producttype: ProductType.DevProduct, price: 400}],
    [1907106907, {name: 'nightmare3', producttype: ProductType.DevProduct, price: 1200}],
    [1907107398, {name: 'nightmare10', producttype: ProductType.DevProduct, price: 3200}],

    [1907107991, {name: 'party1', producttype: ProductType.DevProduct, price: 200}],
    [1907108173, {name: 'party3', producttype: ProductType.DevProduct, price: 600}],
    [1907108348, {name: 'party10', producttype: ProductType.DevProduct, price: 1800}],

    [1907114211, {name: 'wingslightsaber', producttype: ProductType.DevProduct, price: 499}],
    [1907114568, {name: 'doublelightsaber', producttype: ProductType.DevProduct, price: 999}],

    [1907114731, {name: 'steampunkdoggy', producttype: ProductType.DevProduct, price: 399}],
    [1907114869, {name: 'megablock', producttype: ProductType.DevProduct, price: 199}],

    [1907117854, {name: 'buy1spin', producttype: ProductType.DevProduct, price: 19}],
    [1907117995, {name: 'buy10spin', producttype: ProductType.DevProduct, price: 199}],
    [1907118126, {name: 'buy50spin', producttype: ProductType.DevProduct, price: 499}],
    [1907118276, {name: 'buy100spin', producttype: ProductType.DevProduct, price: 1499}],

    [1888599290, {name: 'buyegg1', producttype: ProductType.DevProduct, price: 100}],
    [1888599428, {name: 'buyegg2', producttype: ProductType.DevProduct, price: 125}],
    [1888599796, {name: 'buyegg3', producttype: ProductType.DevProduct, price: 250}],
    [1888600133, {name: 'buyegg4', producttype: ProductType.DevProduct, price: 499}],
    [1888600307, {name: 'buyegg5', producttype: ProductType.DevProduct, price: 999}],
    [1888600537, {name: 'buyegg6', producttype: ProductType.DevProduct, price: 1999}],

    [1907118477, {name: 'buyshadowegg', producttype: ProductType.DevProduct, price: 49}],
])