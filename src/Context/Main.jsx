import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dbToCart } from "../reducers/cart.reducer";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;

export const MainContext = createContext();

function Main(props) {
  const dispatcher = useDispatch();
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categoryImageUrl, setCategoryImageUrl] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const CATEGORY_URL = process.env.REACT_APP_CATEGORY_URL;
  const COLOR_URL = process.env.REACT_APP_COLOR_URL;
  const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL;
  const USER_URL = process.env.REACT_APP_USER_URL;
  const CART_URL = process.env.REACT_APP_CART_URL;
  const ORDER_URL = process.env.REACT_APP_ORDER_URL;
  const TRANSACTION_URL = process.env.REACT_APP_TRANSACTION_URL;
  const ADMIN_PIN = process.env.REACT_APP_ADMIN_PIN;
  const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;

  const [loading, setLoading] = useState(false);

  const openToast = (msg, flag) => {
    toast(msg, { type: flag });
  };
  const formatter = (amount) => {
    const formatt = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return amount % 1 === 0
      ? formatt.format(amount).replace(/\.00$/, "")
      : formatt.format(amount);
  };
  const fetchCategory = () => {
    axios
      .get(`${API_BASE_URL + CATEGORY_URL}`)
      .then((success) => {
        setCategory(success.data.data);
        setCategoryImageUrl(success.data.imageBaseUrl);
      })
      .catch((err) => console.log(err));
  };

  const fetchColor = () => {
    axios
      .get(`${API_BASE_URL + COLOR_URL}`)
      .then((success) => {
        setColors(success.data.color);
      })
      .catch((err) => console.log(err));
  };

  const fetchProduct = (limit = 0, color = null, category_slug = null) => {
    const urlQuery = new URLSearchParams({ limit, color, category_slug });
    axios
      .get(`${API_BASE_URL + PRODUCT_URL}?${urlQuery}`)
      .then((success) => {
        setProducts(success.data.products.filter((p) => p.status));
        setProductImageUrl(success.data.imageBaseUrl);
      })
      .catch((err) => console.log(err));
  };

  const fetchAllProduct = (limit = 0, color = null, category_slug = null) => {
    const urlQuery = new URLSearchParams({ limit, color, category_slug });
    axios
      .get(`${API_BASE_URL + PRODUCT_URL}?${urlQuery}`)
      .then((success) => {
        setAllProducts(success.data.products);
      })
      .catch((err) => console.log(err));
  };

  const removeFromDbCart = (data) => {
    axios
      .delete(API_BASE_URL + CART_URL + "/delete-product", { data })
      .then()
      .catch();
  };

  const stateToCart = (id, data) => {
    axios
      .post(API_BASE_URL + CART_URL + "/state-to-cart/" + id, data)
      .then((success) => {
        const prod = success.data.cart.map((c) => {
          return {
            pId: c.pId._id,
            qty: c.qty,
            price: c.pId.finalPrice,
          };
        });
        dispatcher(dbToCart({ data: prod }));
      })
      .catch((err) => console.log(err));
  };

  const cartToDb = (data) => {
    axios
      .post(API_BASE_URL + CART_URL + "/carttodb", data)
      .then((success) => {})
      .catch((err) => console.log(err));
  };

  const changeProdQty = (data) => {
    axios
      .put(API_BASE_URL + CART_URL + "/change-qty", data)
      .then((success) => {})
      .catch((err) => console.log(err));
  };

  const fetchOrders = (id) => {
    axios
      .get(API_BASE_URL + ORDER_URL + "/get/" + id)
      .then((success) => {
        if (success.data.status == 1) {
          setOrders(success.data.order);
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchColor();
    fetchCategory();
    fetchProduct();
    fetchAllProduct();
  }, []);

  return (
    <MainContext.Provider
      value={{
        openToast,
        API_BASE_URL,
        CATEGORY_URL,
        category,
        fetchCategory,
        categoryImageUrl,
        COLOR_URL,
        colors,
        fetchColor,
        PRODUCT_URL,
        CART_URL,
        products,
        productImageUrl,
        fetchProduct,
        USER_URL,
        stateToCart,
        cartToDb,
        changeProdQty,
        removeFromDbCart,
        ORDER_URL,
        loading,
        setLoading,
        fetchOrders,
        orders,
        allProducts,
        setAllProducts,
        Cookies,
        transactions,
        setTransactions,
        TRANSACTION_URL,
        ADMIN_PIN,
        ADMIN_URL,
        fetchAllProduct,
        formatter,
      }}
    >
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
}

export default Main;
