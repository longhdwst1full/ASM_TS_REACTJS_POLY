import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../../type/product.type";
import { handlegetProduct } from "../../../api/productApi";
import { handlegetProductList } from "../../../api/productApi";

export default function ProductsAdmin() {
  const [productList, setProductList] = useState<I[]|[]>([]);

  useEffect(() => {
    handlegetProductList().then((res) => {
      console.log(res);
      setProductList(res.data);
    });
  }, []);

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
                Thành tiền
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Ẩn/hiện
              </th>
              <th scope="col" className="px-6 py-3">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.map((product,index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index+1}</div>
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
                      <div className="text-base font-semibold">{product.name}</div>
                      <div className="font-normal text-gray-500">
                        neil.sims@flowbite.com
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">React Developer</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <label
                        htmlFor="AcceptConditions"
                        className="relative h-8 w-14 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="AcceptConditions"
                          className="peer sr-only [&:checked_+_span_svg[data-unchecked-icon]]:hidden [&:checked_+_span_svg[data-checked-icon]]:block"
                        />
                        <span className="absolute inset-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition peer-checked:translate-x-6 peer-checked:text-green-600">
                          <svg
                            data-unchecked-icon
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <svg
                            data-checked-icon
                            xmlns="http://www.w3.org/2000/svg"
                            className="hidden h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500" />
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
