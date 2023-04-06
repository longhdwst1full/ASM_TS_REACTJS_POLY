import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../type/product.type";
import { handlegetProductList } from "../../../api/productApi";
import { http } from "../../../api/http";
import { IGetUserLT } from "../../../type/user.type";
import { toast } from "react-toastify";

export default function ProductsAdmin() {
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    handlegetProductList().then((res) => {
      console.log(res);
      setProductList(res.data);
    });
  }, []);
  const handleClick = async (id: number) => {
    const getUserLS: IGetUserLT | "" = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : "";
    // if(getUserLS){

    // }
    const confirma = confirm("Bạn có thực sự muốn xóa sản phẩm không");
    if (confirma && id) {
      setProductList(productList.filter((item) => item.id !== id));
      await http.delete("products/" + id);
      toast.success("Xoá thành công sản phẩm");
    } else {
      toast.error("Không tìm thấy id");
    }
  };
  return (
    <div className="p-10 flex-1">
      <h1 className="p-2">Dien thoai</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="mb-10 flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
          <div className="flex w-64 items-center justify-start">
            <p className="p-2 mr-4">Bo chon</p>
            <div className="flex-1">
              <p className="mb-2 p-2">Danh muc san pham</p>
              <select
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <option value="">Moi chon</option>
                <option value="">Moi chon</option>
                <option value="">Moi chon</option>
                <option value="">Moi chon</option>
              </select>
            </div>
          </div>

          <Link
            className="px-8 py-3 font-semibold rounded-full bg-green-500 mr-10 text-gray-800"
            to="/admin/product-add"
          >
            Add
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center text-lg">#</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-6 py-3">
                Giá giảm
              </th>
              <th scope="col" className="px-6 py-3">
                Thương hiệu
              </th>
              <th scope="col" className="px-6 py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.map((product, index) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={product.images[0].base_url}
                      alt={product.name}
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {product.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.original_price}</td>

                  <td className="px-6 py-4">{product.brand.name}</td>
                  <td className="px-6 py-4">
                    <button className="p-2">
                      <Link
                        to={`/admin/${product.id}/edit`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={() => handleClick(product.id)}
                      className="p-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
