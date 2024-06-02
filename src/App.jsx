import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./Components/Website/MainPage";
import Home from "./Home";
import Main from "./Pages/Admin/Main";
import Dashboard from "./Pages/Admin/Dashboard";
import CategoryView from "./Pages/Admin/Category/View";
import ProductView from "./Pages/Admin/Product/View";
import ColorView from "./Pages/Admin/Color/View";
import Store from "./Pages/Website/Store";
import { lsToCart } from "./reducers/cart.reducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cart from "./Pages/Website/Cart";
import Login from "./Pages/Website/Login";
import Signup from "./Pages/Website/Signup";
import { lsLogin } from "./reducers/user.reducer";
import ThankYou from "./Pages/Website/ThankYou";
import Orders from "./Pages/Website/Orders";
import OrderView from "./Pages/Admin/Orders/View";
import AdminLogin from "./Pages/Admin/Login/View";
import Iphone from "./Pages/Website/Iphone";
import Mac from "./Pages/Website/Mac";
import Watch from "./Pages/Website/Watch";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/store/:category_slug?",
        element: <Store />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/iphone",
        element: <Iphone />,
      },
      {
        path: "/macbook",
        element: <Mac />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/thank-you/:id",
    element: <ThankYou />,
  },
  {
    path: "/admin",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "category",
        element: <CategoryView />,
      },
      {
        path: "product",
        element: <ProductView />,
      },
      {
        path: "colors",
        element: <ColorView />,
      },
      {
        path: "orders",
        element: <OrderView />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
]);

function App() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(lsLogin());
    dispatcher(lsToCart());
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
