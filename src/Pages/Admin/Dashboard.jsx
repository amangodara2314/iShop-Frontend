import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../Context/Main";
import axios from "axios";
import Cookies from "js-cookie";

function Dashboard(props) {
  const { transactions, setTransactions, TRANSACTION_URL, API_BASE_URL } =
    useContext(MainContext);
  const fetchTransactions = () => {
    const token = Cookies.get("ishopAdminToken");

    axios
      .get(API_BASE_URL + TRANSACTION_URL + "/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((success) => {
        setTransactions(success.data.transaction);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
      <h1 className="text-3xl font-semibold mb-6 text-blue-800">
        Transactions
      </h1>
      <Stats transactions={transactions} />
      <Filters
        filters={filters}
        transactions={transactions}
        onFilterChange={handleFilterChange}
      />
      <RecentTransactions filters={filters} />
    </div>
  );
}

const Stats = ({ transactions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        title="Total Revenue"
        value={new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(
          transactions
            .filter((transaction) => transaction.payment_status)
            .reduce((t, a) => {
              return t + a.amount;
            }, 0)
        )}
        color="bg-green-400"
      />
      <StatCard
        title="Successfull Transactions"
        value={
          transactions.filter((transaction) => transaction.payment_status)
            .length
        }
        color="bg-yellow-300"
      />
      <StatCard
        title="Failed Transactions"
        value={
          transactions.filter((transaction) => !transaction.payment_status)
            .length
        }
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
          <label className="block mb-2 text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </select>
        </div>
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
  const { transactions } = useContext(MainContext);
  const filteredTransactions = transactions?.filter((transaction) => {
    if (
      filters.status !== "all" &&
      transaction.payment_status.toString() !== filters.status
    ) {
      return false;
    }
    if (
      filters.fromDate &&
      new Date(transaction.date) < new Date(filters.fromDate)
    ) {
      return false;
    }
    if (
      filters.toDate &&
      new Date(transaction.date) > new Date(filters.toDate)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        Recent Transactions
      </h2>
      <table className="min-w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-3 px-6 text-left text-blue-800">Order ID</th>
            <th className="py-3 px-6 text-left text-blue-800">User Email</th>
            <th className="py-3 px-6 text-left text-blue-800">Amount</th>
            <th className="py-3 px-6 text-left text-blue-800">Date</th>
            <th className="py-3 px-6 text-left text-blue-800">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions?.map((transaction) => (
            <tr key={transaction._id} className="border-b border-blue-200">
              <td className="py-3 px-6 text-gray-700">
                {transaction.order_id}
              </td>
              <td className="py-3 px-6 text-gray-700">
                {transaction.userId.email}
              </td>
              <td className="py-3 px-6 text-gray-700">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(transaction.amount)}
              </td>
              <td className="py-3 px-6 text-gray-700">
                <td className="py-3 px-6 text-gray-700">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(transaction.date)
                  )}
                </td>
              </td>
              <td
                className={`py-3 px-6 font-bold ${
                  transaction.payment_status ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.payment_status ? "Success" : "Failed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
