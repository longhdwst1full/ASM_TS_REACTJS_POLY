import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../type/product.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addProduct,
  handlegetProduct,
  updateProduct,
} from "../../../api/productApi";
import { toast } from "react-toastify";

const validateProduct = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  original_price: yup.string(),
  // brand: yup.string(),
});
const initializeState = {
  name: "",
  description: "",
  images: [
    {
      base_url: "",
      is_gallery: true,
      label: null,
      large_url: "",
      medium_url: "",
      position: null,
      small_url: "",
      thumbnail_url: "",
    },
  ],
  price: "",
  brand: {
    name: "",
    slug: "",
  },
  original_price: "",
  speechSynthesis: [
    {
      name: "",
      attributes: {
        code: "",
        name: "",
        value: "",
      },
    },
  ],
};
export default function ProductAdd() {
  const { id } = useParams();
  const idParam = id as string | "";
  const isAdd = useMatch("/admin/product-add");
  const isModel = Boolean(isAdd);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handlegetProduct(id).then((product) => {
        // console.log(product);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("description", product.description);
        setValue("original_price", product.original_price);
        // setValue("",product.original_price)
      });
    }
  }, []);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<Omit<IProduct, "id">>({
    defaultValues: initializeState,
    resolver: yupResolver(validateProduct),
  });

  const handleSubmitForm = async (data: Omit<IProduct, "id">) => {
    if (isModel) {
      try {
        await addProduct(data).then(() => {
          toast.success("add success");
          reset();
          navigate("/admin");
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      try {
        if (idParam) {
          await updateProduct({ data, id: idParam }).then(() => {
            toast.success("update success");
            reset();
            navigate("/admin");
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="max-h-[100vh] flex-1">
      <section className="p-7 bg-[#E5E5E5]  ">
        <h1 className="pb-3 font-bold text-2xl px-3 text-gray-500">
          {isModel ? " Thêm sản phẩm mới" : " Sửa sản phẩm"}
        </h1>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="grid grid-cols-2 gap-12 w-full"
        >
          <div className="flex h-fit mt-12 overflow-hidden flex-col shadow-[0px_2px_0px_rgba(90,97,105,0.11)] rounded-xl bg-white ">
            <div className=" h-[250px] overflow-hidden flex flex-col justify-center items-center ">
              <button
                type="button"
                className=" px-3.5 py-2.5 mt-3.5 font-semibold rounded bg-[#00B0D7] hover:bg-[#007BFF] text-gray-800"
              >
                Them moi
              </button>
              Them anh
            </div>
            <input
              className="border-t-2 border-t-gray-400/20 border-x-0 w-full inline-block h-[100px] p-3 outline-none items-start"
              placeholder="Mo ta ngan"
            />
          </div>

          <div className="grid grid-cols-2 shadow-sm px-2">
            <p className="flex flex-col col-span-2 py-4 px-3 mb-4 border-b-2 border-slate-300/95 font-semibold text-lg text-gray-600">
              Thong tin san pham
            </p>
            <div className="col-span-2">
              <label htmlFor="firstname" className="pb-2">
                Ten san pham
              </label>
              <input
                id="firstname"
                type="text"
                {...register("name")}
                className="w-full py-2 px-2.5 mt-2 mb-2.5  rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
              />
              {errors.name?.message && (
                <p className="my-1 text-red-500">{errors.name?.message}</p>
              )}
            </div>

            <div className="col-span-full grid grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="lastname" className="text-sm">
                  Danh muc
                </label>
                <select
                  id="lastname"
                  placeholder="Last name"
                  {...register("brand.name")}
                  className="w-full py-2 px-2.5 mt-2 mb-2.5 rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
                >
                  <option value="">IPhone</option>
                  <option value="">IPhone</option>
                  <option value="">IPhone</option>
                  <option value="">IPhone</option>
                </select>
                {/* {errors.brand?.message && (
                  <p className="my-1 text-red-500">Ban chua chon Brand</p>
                )} */}
              </div>
            </div>
            <div className="col-span-full grid gap-5  grid-cols-2">
              <div className="col-span-1">
                <label htmlFor="email" className="text-sm">
                  Gia goc
                </label>
                <input
                  id="email"
                  {...register("price")}
                  placeholder="Email"
                  className="w-full py-2 px-2.5 mt-2 mb-2.5 rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
                />
                {errors.price?.message && (
                  <p className="my-1 text-red-500">{errors.price?.message}</p>
                )}
              </div>
              <div className="col-span-1">
                <label htmlFor="address" className="text-sm">
                  Gia khuyen mai
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("original_price")}
                  placeholder=""
                  className="w-full py-2 px-2.5 mt-2 mb-2.5  rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
                />
                {errors.original_price?.message && (
                  <p className="my-1 text-red-500">
                    {errors.original_price?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="state" className="text-sm">
                Dac diem noi bat
              </label>
              <input
                id="state"
                type="text"
                placeholder=""
                className="w-full py-2 h-[100px] px-2.5 mt-2 mb-2.5 rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="zip" className="text-sm">
                Mo ta dai
              </label>
              <input
                {...register("description")}
                id="zip"
                type="text"
                placeholder=""
                className="w-full py-2 h-[100px] px-2.5 mb-32.5 mt-2.5 rounded-md focus:ring focus:ring-opacity-75 outline-none  focus:ring-violet-400 border-[#E1E5EB] text-gray-900"
              />
              {errors.description?.message && (
                <p className="my-1 text-red-500">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className=" px-3.5 py-2.5 mt-3.5 font-semibold rounded bg-[#00B0D7] hover:bg-[#007BFF] text-gray-800"
              >
                {isModel ? "Thêm mới " : "Update"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
