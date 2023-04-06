import { IProduct } from "../type/product.type";
import { http } from "./http";

const handlegetProductList = async () => {
  const result = await http.get<IProduct[]>("products");

  return result;
};
const handlegetProduct = async (id: string) => {
  const data = await http.get<IProduct>("products/" + id);
  return data;
};
const addProduct = async (data: Omit<IProduct, "id">) => {
  return http.post<IProduct>("products", data);
};
const updateProduct = async ({
  data,
  id,
}: {
  data: Omit<IProduct, "id">;
  id: string;
}) => {
  http.patch("products/" + id, data);
};


export {
  handlegetProductList,
  handlegetProduct,
  addProduct,
  updateProduct,
  
};
