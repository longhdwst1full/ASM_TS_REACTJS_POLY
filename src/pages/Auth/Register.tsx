import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../api/http";
import { toast } from "react-toastify";

const yupSchema = yup.object({
  email: yup
    .string()
    .required("Khong duoc de trong")
    .email("Khong dung dinh dang email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Your password is too short."),
  confirmPassword: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};
export interface initialFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<initialFormState>({
    defaultValues: initialState,
    resolver: yupResolver(yupSchema),
  });

  const handleSubmitForm = async (data: initialFormState) => {
    console.log(data, ":::::");
    try {
      const { confirmPassword, ...rest } = data;
      const result = await http.post("/register", { ...rest });
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/");
        toast.success("Đăng kí tài khoản thành công");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="overflow-hidden">
      <div className="min-h-screen bg-purple-400 flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block" />
        <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block" />
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Create An Account
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Create an account to enjoy all the services without any ads for
              free!
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              {...register("email")}
              placeholder="Email Addres"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <p className="text-red-500 my-1">{errors.email?.message}</p>

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              id="password"
            />
            <p className="text-red-500 my-1">{errors.password?.message}</p>

            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Password"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <p className="text-red-500 my-1">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
            >
              Create Account
            </button>
            <p className="mt-4 text-sm">
              Already Have An Account?
              <span className="underline cursor-pointer"> Sign In</span>
            </p>
          </div>
        </div>
        <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block" />
        <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block" />
      </div>
    </form>
  );
}
