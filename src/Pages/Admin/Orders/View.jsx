import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MainContext } from "../../../Context/Main";

function View(props) {
  const { orders, fetchOrders } = useContext(MainContext);
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);
  const [filters, setFilters] = useState({
    status: "all",
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="p-6 bg-blue-50 flex-1">
      <h1 className="text-3xl font-semibold mb-6 text-blue-800">Orders</h1>
      <Stats orders={orders} />
      <Filters
        filters={filters}
        orders={orders}
        onFilterChange={handleFilterChange}
      />
      <RecentTransactions filters={filters} />
    </div>
  );
}

const Stats = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Total Orders"
        value={orders.length}
        color="bg-green-400"
      />
      <StatCard
        title="Cash On Devlivery"
        value={orders.filter((a) => a.payment_mode == 1).length}
        color="bg-yellow-300"
      />
      <StatCard
        title="Online Payment"
        value={orders.filter((a) => a.payment_mode == 2).length}
        color="bg-red-300"
      />
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${color}`}>
      <div className="text-xl font-semibold text-black">{title}</div>
      <div className="text-3xl font-bold mt-2 text-black">{value}</div>
    </div>
  );
};

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-800">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-gray-700">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};

const RecentTransactions = ({ filters }) => {
  const { orders } = useContext(MainContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  const filteredTransactions = orders?.filter((order) => {
    if (
      filters.fromDate &&
      new Date(order.date) <= new Date(filters.fromDate)
    ) {
      return false;
    }
    if (filters.toDate && new Date(order.date) >= new Date(filters.toDate)) {
      return false;
    }
    return true;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        Recent Orders
      </h2>
      <table className="min-w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 px-6 text-left text-blue-800">Order ID</th>
            <th className="py-3 px-6 text-left text-blue-800">User Email</th>
            <th className="py-3 px-6 text-left text-blue-800">Amount</th>
            <th className="py-3 px-6 text-left text-blue-800">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions?.map((order) => (
            <tr key={order._id} className="border-b border-blue-200">
              <td className="py-3 px-6 text-gray-700">{order._id}</td>
              <td className="py-3 px-6 text-gray-700">
                {order.user_details.email}
              </td>
              <td className="py-3 px-6 text-gray-700">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(order.order_total)}
              </td>
              <td className="py-3 px-6 text-gray-700">
                {new Intl.DateTimeFormat("en-GB").format(new Date(order.date))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredTransactions.length}
        paginate={paginate}
      />
    </div>
  );
};
const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="pagination flex gap-1">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className="page-link px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:bg-blue-600"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default View;
