import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dataUser, setDataUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setDataUser(JSON.parse(user));
    }
  }, []);
  
  return (
    <header className="bg-red-500">
      <div className="w-[1200px] bg-red-500 mx-auto flex items-center gap-4 justify-center py-2">
        <div className="w-[50px]">
          <Link to={"/"}>
            <img src="./anhhtus-logo 2.png" alt="" />
          </Link>
        </div>
        <div className="flex-1">
          <input
            className="w-full rounded-md border-none outline-none p-2"
            placeholder="Search.."
            type="text"
          />
        </div>
        <div className=" flex justify-center gap-2 items-center">
          <Link to={"/cart"}>
            <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2  ">
              <img src="../Layer 2.png" alt="" />
            </button>
          </Link>
          {dataUser ? (
            <>
              <div className="flex items-center p-2 space-x-4">
                <img
                  src="https://source.unsplash.com/100x100/?portrait"
                  className="w-12 h-12 rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:focus:ring-yellow-900">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
