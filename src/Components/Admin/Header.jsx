import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
    </header>
  );
}

export default Header;
