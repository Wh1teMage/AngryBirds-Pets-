import { ProductType } from "shared/enums/MarketEnums";
import { IServerPlayerComponent } from "shared/interfaces/PlayerData";
import { IProductData } from "shared/interfaces/ProductData";

export const MarketNamings = new Map<number, IProductData>([
    [1701055226, {name: 'test', producttype: ProductType.DevProduct}],
    // Accuracy
    [1762885895, {name: 'tinypackaccuracy', producttype: ProductType.DevProduct}],
    [1762886150, {name: 'smallpackaccuracy', producttype: ProductType.DevProduct}],
    [1762886258, {name: 'mediumpackaccuracy', producttype: ProductType.DevProduct}],
    [1762886345, {name: 'largepackaccuracy', producttype: ProductType.DevProduct}],
    [1762886496, {name: 'hugepackaccuracy', producttype: ProductType.DevProduct}],
    [1762886599, {name: 'megapackaccuracy', producttype: ProductType.DevProduct}],
    [1762886688, {name: 'megahugepackaccuracy', producttype: ProductType.DevProduct}],
    // Wins
    [1762886863, {name: 'tinypackwins', producttype: ProductType.DevProduct}],
    [1762886977, {name: 'smallpackwins', producttype: ProductType.DevProduct}],
    [1762887049, {name: 'mediumpackwins', producttype: ProductType.DevProduct}],
    [1762887130, {name: 'largepackwins', producttype: ProductType.DevProduct}],
    [1762887254, {name: 'hugepackwins', producttype: ProductType.DevProduct}],
    [1762887397, {name: 'megapackwins', producttype: ProductType.DevProduct}],
    [1762887501, {name: 'megahugepackwins', producttype: ProductType.DevProduct}],
    // Gems
    [1762887630, {name: 'tinypackgems', producttype: ProductType.DevProduct}],
    [1762887698, {name: 'smallpackgems', producttype: ProductType.DevProduct}],
    [1762887934, {name: 'mediumpackgems', producttype: ProductType.DevProduct}],
    [1762888203, {name: 'largepackgems', producttype: ProductType.DevProduct}],
    [1762888316, {name: 'hugepackgems', producttype: ProductType.DevProduct}],
    [1762888398, {name: 'megapackgems', producttype: ProductType.DevProduct}],
    [1762888472, {name: 'megahugepackgems', producttype: ProductType.DevProduct}],

    [734124643, {name: 'doublegems', producttype: ProductType.Gamepass}],
    [722093437, {name: 'luck1', producttype: ProductType.Gamepass}],
    [722436217, {name: 'luck2', producttype: ProductType.Gamepass, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1')) { return false }
        return true
    },}],
    [722472169, {name: 'luck3', producttype: ProductType.Gamepass, checkCallback: (player: IServerPlayerComponent) => {
        if (!player.profile.Data.Products.includes('luck1') || !player.profile.Data.Products.includes('luck2')) { return false }
        return true
    },}],
])