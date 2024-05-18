import { ProductType } from "shared/enums/MarketEnums";

export interface IProductData {
    name: string,
    price?: number,
    producttype: ProductType,
    correspondingGiftId?: number,
    checkCallback?: (player: any) => boolean
}