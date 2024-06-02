import React, { useContext, useEffect, useState } from "react";
import Container from "../../Components/Container";
import { MainContext } from "../../Context/Main";
import { useSelector } from "react-redux";

const Orders = () => {
  const { fetchOrders, orders, API_BASE_URL, productImageUrl } =
    useContext(MainContext);
  const { user } = useSelector((store) => store.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders per page

  useEffect(() => {
    if (user) {
      fetchOrders(user?._id);
    }
  }, [user]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container extraClass={"px-6 py-10 min-h-screen mt-4"}>
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg p-2 sm:p-8 overflow-y-auto">
        {orders?.length === 0 ? (
          <p className="text-gray-500 font-bold">You have no orders yet.</p>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-gray-700 mb-6">
              My Orders
            </h2>
            <div className="space-y-8">
              {currentOrders?.map((order) => (
                <div
                  key={order?._id}
                  className="bg-white p-2 sm:p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center flex-wrap">
                    <h3 className="text-md sm:text-xl font-semibold text-gray-700">
                      Order #{order?._id}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(order?.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Items:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {order?.product_details.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <img
                            src={API_BASE_URL + productImageUrl + item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-full shadow-sm mr-4"
                          />
                          <div>
                            <p className="text-gray-700">{item.name}</p>
                            <p className="text-gray-500 text-sm">
                              Qty: {item.qty}
                              <span className="ml-4">Price: {item.price}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Shipping Details:
                    </h4>
                    <div className="mt-2">
                      <p className="text-gray-700">
                        <strong>Name:</strong> {order?.shipping_details?.name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Email:</strong> {order?.shipping_details?.email}
                      </p>
                      <p className="text-gray-700">
                        <strong>Contact:</strong>{" "}
                        {order?.shipping_details?.contact}
                      </p>
                      <p className="text-gray-700">
                        <strong>Address:</strong>{" "}
                        {order?.shipping_details?.address}
                      </p>
                      <p className="text-gray-700">
                        <strong>Pincode:</strong>{" "}
                        {order?.shipping_details?.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">
                      Total: ${order?.order_total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <ul className="flex justify-center mt-4">
              {Array.from(
                { length: Math.ceil(orders?.length / ordersPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer mx-1 px-3 py-1 rounded-full ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </Container>
  );
};

export default Orders;
