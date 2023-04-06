import { ICartList } from "../type/carrt.type";
import { http } from "./http";

export const getCartList = async () => {
  return await http.get<ICartList[]>("orders?_expand=product");
};
export const addtoCartUser = async (buyCount: number, idProduct: number) => {
  return http.post<{ buyCount: number; idProduct: number }>("orders", {
    count: buyCount,
    productId: idProduct,
  });
};
export const descCount = async (count: number, idProduct: number) => {
  return http.patch<ICartList>("orders/" + idProduct, { count: count });
};
export const deleteCart = async (id: number) => {
  return await http.delete<ICartList>("orders/" + id);
};
