import { IProduct } from "./product.type";

export interface ICart{
    count: number;
    productId: number;
    id: number;
}


export interface ICartList{
    product:IProduct
    count: number;
    productId: number;
    id: number;
}