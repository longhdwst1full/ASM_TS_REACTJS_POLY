import React from "react";
import Header from "../../components/Header";
import Sibar from "./Sibar";
import { Outlet } from "react-router-dom";

export default function LayputAdmin() {
  return (
    <div>
      <Header />
      <main className=" grid grid-cols-12 min-h-[100vh]">
        <Sibar />
        <div className="col-span-9">

        <Outlet />
        </div>
      </main>
    </div>
  );
}
