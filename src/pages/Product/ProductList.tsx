import { useQuery } from "@tanstack/react-query";

import { productList1 } from "../../api/productApi";
import Product from "../../components/Product";
import { IProduct } from "../../type/products.type";

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: () => productList1(),
  });
  // console.log(data)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
        </div>
      ) : (
        <main className="w-[calc(100%-10%)] m-auto">
          <h1 className="text-3xl font-bold py-2.5">Điện thoại nổi bật </h1>

          {  data?.data && (
            <>
              <div className="w-[calc(100%-2%)] m-auto grid grid-cols-5 gap-x-6 gap-y-10">
                {(data?.data as IProduct[]).map((product, index) => (
                  <Product product={product} key={index} />
                ))}
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}
