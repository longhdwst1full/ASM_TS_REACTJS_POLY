import { ICategory } from "../type/category.type";
import { http } from "./http";

const createCate = ({ data }: { data: Pick<ICategory, "name"> }) =>
  http.post("/categories", data);

const cateList = async () => http.get<ICategory[]>("/categories");

const getOneCate = (id: string) => http.get<ICategory>("/categories/" + id);

const deleteCate = ({ id }: { id: string; accessToken: string }) =>
  http.delete("/categories/" + id);

const udpateCate = ({
  body,
  id,
}: {
  body: Pick<ICategory, "name">;
  id: string;
}) => {
  return http.patch(`/categories/${id}`, body, {});
};

export { createCate, cateList, udpateCate, getOneCate, deleteCate };
