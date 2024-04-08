import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { toast } from "react-toastify";
import { cateList } from "../../../api/categories";
import { deleteProducts, productList1 } from "../../../api/productApi";
import { IProduct } from "../../../type/products.type";

type ProductType = IProduct[];
export default function ListProduct() {
  // get category list
  const { data: categoryList } = useQuery({
    queryKey: ["getCategory"],
    queryFn: cateList,
  });

  const [products, setProductList] = useState<ProductType>([]);

  const getDataList = useQuery({
    queryKey: ["Products"],
    queryFn: () => productList1(),
    onSuccess: ({ data }: { data: ProductType }) => {
      console.log(data);
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

  const deleteProductsMutation = useMutation({
    mutationFn: (id: string) => deleteProducts({ id }),
    onSuccess: () => {
      toast.success("Xoa thanh cong");
    },
  });

  return (
    <>
      {getDataList.data?.data && products && (
        <>
          <h1 className=" text-4xl font-semibold py-5 text-center">
            List Products
          </h1>

          <ul>
            <li>
              <select
                name=""
                className="border p-2 border-red-200 rounded-lg my-2"
              >
                <option value="">Loc san pham</option>
                <option value="price">Gia tăng dần</option>
                <option value="price_desc">Gia giảm dần</option>
                <option value="updatedAt">CreateAd </option>
              </select>
            </li>
          </ul>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" colSpan={2} className="px-6 text-center py-3">
                    <Link
                      to="/admin/product/add"
                      className="p-2  text-blue-600"
                    >
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
                      <td className="px-6 py-4">
                        <img
                          className="!max-w-44 !object-cover !max-h-44"
                          src={product?.image}
                          alt={product.name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {categoryList?.data &&
                          categoryList?.data.map((item: any) => {
                            if (item.id === product.categoryId) {
                              return item.name;
                            }
                          })}
                      </td>
                      <td className="px-6 py-4">
                        {product.price ? product.price : "1000"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/product/${product.id}/edit`}
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
      )}
      <Outlet />
    </>
  );
}
