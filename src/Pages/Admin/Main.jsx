import React, { useContext, useEffect } from "react";
import Sidebar from "../../Components/Admin/Sidebar";
import Header from "../../Components/Admin/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Main";

function Main(props) {
  const navigate = useNavigate();
  const { admin, Cookies } = useContext(MainContext);
  useEffect(() => {
    if (!Cookies.get("ishopAdminToken")) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="grid grid-cols-5">
      <Sidebar />
      <div className="col-span-4">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
