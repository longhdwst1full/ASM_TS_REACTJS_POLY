import React from "react";
import Header from "../../components/Header";
import Sibar from "./Sibar";
import { Outlet } from "react-router-dom";

export default function LayputAdmin() {
  return (
    <div>
      <Header />
      <main className="flex min-h-[100vh]">
        <Sibar />
        <Outlet />
      </main>
    </div>
  );
}
