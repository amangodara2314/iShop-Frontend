import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { MainContext } from "../../Context/Main";

function MainPage(props) {
  const { loading } = useContext(MainContext);

  return (
    <>
      <div
        className={`${
          loading ? "fixed w-full h-full z-50 top-0 left-0" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="flex space-x-2 w-full justify-center items-center h-full">
          <span className="sr-only text-white">Loading...</span>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce" />
        </div>
      </div>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainPage;
