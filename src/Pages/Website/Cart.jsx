import React, { useContext, useEffect, useState } from "react";
import Container from "../../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store";
import { MainContext } from "../../Context/Main";
import {
  changeCartQty,
  emptyCart,
  removeFromCart,
} from "../../reducers/cart.reducer";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";

function Cart(props) {
  const [Razorpay] = useRazorpay();

  const { data, total } = useSelector((store) => store.cart);
  const navigator = useNavigate();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const dispatcher = useDispatch();
  const {
    products,
    API_BASE_URL,
    productImageUrl,
    ORDER_URL,
    changeProdQty,
    removeFromDbCart,
    openToast,
    setLoading,
    allProducts,
  } = useContext(MainContext);
  const [cartProd, setCartProd] = useState(null);

  const handleRemove = (cart) => {
    dispatcher(removeFromCart({ cart }));
    if (user) {
      removeFromDbCart({ id: user._id, pId: cart._id });
    }
  };

  useEffect(() => {
    const cartProductIds = data.map((item) => item.pId);
    const updatedProducts = allProducts
      .filter((p) => cartProductIds.includes(p._id))
      .map((p) => {
        const matchingDataItem = data.find((item) => item.pId === p._id);
        return { ...p, qty: matchingDataItem.qty };
      });

    setCartProd(updatedProducts);
  }, [allProducts, data]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      e.target.name.value != "" &&
      e.target.email.value != "" &&
      e.target.contact.value != "" &&
      e.target.address.value != "" &&
      e.target.pincode.value != ""
    ) {
      const shipping_details = {
        name: e.target.name.value,
        email: e.target.email.value,
        contact: e.target.contact.value,
        address: e.target.address.value,
        pincode: e.target.pincode.value,
      };
      const payment_mode = e.target.paymentmode.value;
      const user_details = user;
      const order_total = payment_mode == 1 ? total + 50 : total;
      const product_details = cartProd;
      axios
        .post(API_BASE_URL + ORDER_URL + "/place-order", {
          order_total,
          user_details,
          product_details,
          shipping_details,
          payment_mode,
        })
        .then((success) => {
          setLoading(false);
          if (success.data.status == 1) {
            if (success.data.payment_mode == 1) {
              dispatcher(emptyCart());
              navigator("/thank-you/" + user._id);
            } else {
              initRazorPay(
                success.data.order_id,
                success.data.amount,
                success.data.razorpay_order.id,
                success.data.shipping_details
              );
            }
          } else {
            openToast(success.data.msg, "error");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  function initRazorPay(order_id, amount, razorpay_order_id, shipping_details) {
    const options = {
      key: "rzp_test_x05ld753Ga9eFk",
      amount: amount * 100,
      currency: "INR",
      name: "ISHOP",
      description: "An Ecommerce Website Build For Learning Purpose",
      image: API_BASE_URL + "/img/logo.svg",
      order_id: razorpay_order_id,
      handler: function (response) {
        axios
          .post(API_BASE_URL + ORDER_URL + "/verify", { order_id, response })
          .then((success) => {
            dispatcher(emptyCart());
            navigator("/thank-you/" + user._id);
          })
          .catch((err) => {
            openToast("Something Went Wrong", "error");
          });
      },
      prefill: {
        name: shipping_details.name,
        email: shipping_details.email,
        contact: shipping_details.contact,
      },
      theme: {
        color: "#ff4252",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      axios
        .post(API_BASE_URL + ORDER_URL + "/failed", {
          order_id,
          razorpay_order_id: response.error.metadata.order_id,
          razorpay_payment_id: response.error.metadata.payment_id,
        })
        .then((success) => {
          // openToast("Payment Failed", "error");
        })
        .catch((err) => {
          openToast("Something Went Wrong", "error");
        });
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  }
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          toggle ? "flex" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="w-full md:w-[45%] p-6 bg-white rounded-2xl">
          <div className="text-lg font-semibold flex justify-between items-center">
            Shipping Details
            <RxCross2
              onClick={() => {
                setToggle(false);
              }}
              className="cursor-pointer text-2xl font-extrabold bg-white text-black rounded-full"
            />
          </div>
          <form
            encType="multipart/form-data"
            action=""
            onSubmit={submitHandler}
          >
            <div className="my-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user?.name}
                name="name"
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                defaultValue={user?.email}
                type="email"
                required
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Contact
              </label>
              <input
                defaultValue={user?.contact}
                type="number"
                required
                id="contact"
                name="contact"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                defaultValue={user?.address}
                type="textare
                required  a"
                id="address"
                name="address"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                defaultValue={user?.pincode}
                type="number"
                required
                id="pincode"
                name="pincode"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700">
                Select Payment Method:
              </div>
              <div className="my-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentmode"
                    value="1"
                    className="mr-2"
                  />
                  <span className="text-md">Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentmode"
                    value="2"
                    className="mr-2"
                    checked
                  />
                  <span className="text-md">Online Payment</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Container extraClass={"my-16 px-2 sm:px-6 md:px-16"}>
        {data.length === 0 ? (
          <div className="text-center text-2xl text-red-600 font-semibold uppercase">
            CART is empty
          </div>
        ) : (
          <>
            <div className="md:block hidden">
              <table className="w-full">
                <thead className="text-lg font-semibold border-b hidden md:table-header-group">
                  <tr>
                    <th scope="col" className="px-6 sm:px-4 py-3">
                      PRODUCT
                    </th>
                    <th scope="col" className="px-4 sm:px-2 py-3">
                      PRICE
                    </th>
                    <th scope="col" className="px-10 sm:px-4 py-3">
                      QTY
                    </th>
                    <th scope="col" className="px-6 sm:px-2 py-3">
                      UNIT PRICE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartProd &&
                    cartProd.map((cart, index) => (
                      <tr key={index} className="py-4 border-b">
                        <th scope="row" className="px-6 sm:px-0 py-3">
                          <div className="flex items-center">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="0"
                              viewBox="0 0 15 15"
                              className="text-xl text-red-500 cursor-pointer mr-2 min-w-[20px]"
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              width="24px"
                              onClick={() => {
                                dispatcher(removeFromCart({ cart }));
                                if (user) {
                                  removeFromDbCart({
                                    id: user._id,
                                    pId: cart._id,
                                  });
                                }
                              }}
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                fill="currentColor"
                              ></path>
                            </svg>

                            <img
                              width={150}
                              src={API_BASE_URL + productImageUrl + cart?.image}
                              alt=""
                              className="mr-4"
                            />
                            <div>{cart.name}</div>
                          </div>
                        </th>
                        <td className="px-4 sm:px-2 py-3 md:table-cell hidden">
                          ₹{parseInt(cart.finalPrice) * cart.qty}
                        </td>
                        <td className="px-10 sm:px-16 py-3">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                dispatcher(
                                  changeCartQty({ id: cart._id, flag: false })
                                );
                                if (user) {
                                  changeProdQty({
                                    id: user._id,
                                    pId: cart._id,
                                    flag: false,
                                  });
                                }
                              }}
                              className="p-2 bg-[#F6F7F8] text-blue-500 px-4 mr-2"
                            >
                              -
                            </button>
                            <span className="p-[9px] bg-[#F6F7F8] px-4">
                              {cart.qty}
                            </span>
                            <button
                              onClick={() => {
                                dispatcher(
                                  changeCartQty({ id: cart._id, flag: true })
                                );
                                if (user) {
                                  changeProdQty({
                                    id: user._id,
                                    pId: cart._id,
                                    flag: true,
                                  });
                                }
                              }}
                              className="p-2 bg-[#F6F7F8] text-blue-500 px-4 ml-2"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 sm:px-4 py-3">
                          ₹{parseInt(cart.finalPrice)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden">
              {cartProd?.length === 0 ? (
                <div className="text-center text-xl text-red-600 font-semibold uppercase">
                  CART is empty
                </div>
              ) : (
                cartProd?.map((cart) => (
                  <div key={cart._id} className="flex mb-4 flex-wrap w-full">
                    <img
                      src={API_BASE_URL + productImageUrl + cart.image}
                      alt={cart.name}
                      className="w-[80px] sm:w-[150px] mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{cart.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => {
                            dispatcher(
                              changeCartQty({ id: cart._id, flag: false })
                            );
                            if (user) {
                              changeProdQty({
                                id: user._id,
                                pId: cart._id,
                                flag: false,
                              });
                            }
                          }}
                          className="p-1 bg-[#F6F7F8] text-blue-500 px-3 mr-2"
                        >
                          -
                        </button>
                        <span className="p-[5px] bg-[#F6F7F8] px-3">
                          {cart.qty}
                        </span>
                        <button
                          onClick={() => {
                            dispatcher(
                              changeCartQty({ id: cart._id, flag: true })
                            );
                            if (user) {
                              changeProdQty({
                                id: user._id,
                                pId: cart._id,
                                flag: true,
                              });
                            }
                          }}
                          className="p-1 bg-[#F6F7F8] text-blue-500 px-3 ml-2"
                        >
                          +
                        </button>
                        <p className="ml-4">₹{cart.finalPrice * cart.qty}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(cart)}
                      className="text-red-500"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between mt-12">
              <div className="mb-4 md:mb-0"></div>
              <div className="w-full md:w-72">
                <div className="flex justify-between text-xl font-semibold">
                  <div>Total</div>
                  <div>₹{total}</div>
                </div>
                <div
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    }
                    setToggle(true);
                  }}
                  className="bg-blue-500 p-3 text-center text-white mt-4 cursor-pointer"
                >
                  Check out
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Cart;
