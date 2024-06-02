import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="text-white min-h-screen flex flex-col justify-between col-span-1 bg-gray-900">
      <div className="py-8 px-4">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase mb-6">
          Ishop Admin
        </h1>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
            >
              Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin/colors"
              className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
            >
              Colors
            </Link>
          </li>
          <li>
            <Link
              to="/admin/product"
              className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-300 flex items-center gap-2"
            >
              Product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
