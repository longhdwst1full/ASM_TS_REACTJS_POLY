import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cateList, deleteCate } from "../../../api/categories";
import { ICategory } from "../../../type/category.type";

type ProductType = Pick<ICategory, "name" | "id">[];

export default function ListCate() {
  const { data: categoryList } = useQuery({
    queryKey: ["getCategory"],
    queryFn: cateList,
  });

  const [products, setProductList] = useState<ProductType>([]);
  const accessToken = useMemo(() => {
    const dataLS = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
    return dataLS.accessToken;
  }, []);
  // delete
  // product
  const deleteProductsMutation = useMutation({
    mutationFn: (id: string) => deleteCate({ id, accessToken }),
    onSuccess: () => {
      toast.success("Xoa thanh cong");
    },
  });

  const getDataList = useQuery({
    queryKey: ["category"],
    queryFn: cateList,
    onSuccess: ({ data }: { data: ProductType }) => {
      setProductList(data);
    },
  });

  const handleDelete = (id: string) => {
    const ab = confirm("Are you sure you want to delete");
    if (ab) {
      setProductList(products.filter((item) => item.id !== id));
      deleteProductsMutation.mutateAsync(id);
    }
  };

  return (
    <>
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h1 className=" text-4xl font-semibold py-5 text-center">
            List Category
          </h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>

                <th scope="col" colSpan={2} className="px-6 text-center py-3">
                  <Link to="/admin/category/add" className="p-2  text-blue-600">
                    Add
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>

                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/admin/category/${product.id}/edit`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}
