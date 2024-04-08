import { IProduct } from "./products.type";

export interface ICategory {
  name: string;
  products: Pick<IProduct, "id">[];

  id: string;
}
