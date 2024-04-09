import { IProduct } from "../type/products.type";
import { http } from "./http";
const createProducts = ({
  data,
}: {
  data: Omit<IProduct, "id"  >;
}) => http.post("products", data);

const productList1 = async () => await http.get<IProduct[]>(`products`);

const getOneProduct = (id: string) => http.get<IProduct>("products/" + id);

const deleteProducts = ({ id }: { id: string }) =>
  http.delete("products/" + id, {});

const udpateProducts = ({
  body,
  id,
}: {
  body: Omit<IProduct, "id">;
  id: string;
}) => {
  // console.log(accessToken,id,body," admin");
  return http.patch(`products/${id}`, body);
};

export {
  createProducts,
  deleteProducts,
  getOneProduct,
  productList1,
  udpateProducts,
};
