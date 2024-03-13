import { ProductType } from "shared/enums/MarketEnums";
import { IProductData } from "shared/interfaces/ProductData";

export const MarketNamings = new Map<number, IProductData>([
    [1701055226, {name: 'test', producttype: ProductType.DevProduct}],
    [1762885895, {name: 'tinypackaccuracy', producttype: ProductType.DevProduct}],
])