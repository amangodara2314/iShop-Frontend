import React, { useContext, useState } from "react";
import Container from "../Container";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { PiShoppingBag } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../reducers/user.reducer";
import { emptyCart } from "../../reducers/cart.reducer";
import { MainContext } from "../../Context/Main";
import Cookies from "js-cookie";

function Header(props) {
  const [toggle, setToggle] = useState(false);
  const { formatter } = useContext(MainContext);
  const { data, total } = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatcher = useDispatch();
  const navItems = [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "STORE",
      url: "/store",
    },
    {
      name: "IPHONE",
      url: "/iphone",
    },
    {
      name: "WATCH",
      url: "/watch",
    },
    {
      name: "MACBOOK",
      url: "/macbook",
    },
  ];
  return (
    <header>
      <div className="shadow-sm">
        <Container
          extraClass={
            "p-2 flex px-[100px] lg:px-16 gap-16 items-center justify-between hidden md:flex"
          }
        >
          <div className="flex gap-10 items-center">
            <div className="flex gap-2 items-center">
              <FaRegUser />
              {user.user == null ? (
                <Link to="/login">Login</Link>
              ) : (
                <div className="flex items-center gap-5">
                  <Link
                    to=""
                    onClick={() => {
                      Cookies.remove("ishopToken");
                      dispatcher(logout());
                      dispatcher(emptyCart());
                    }}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10 text-sm font-semibold">
            <div className="flex gap-4 items-center">
              <Link to="/orders">Orders</Link>

              <Link to="/cart" className="flex items-center gap-2">
                <PiShoppingBag />
                {data.length} Items
              </Link>
              <span className="text-gray-500 ml-2">{formatter(total)}</span>
            </div>
          </div>
        </Container>
      </div>
      <div className="">
        <Container
          extraClass={
            "flex justify-between items-center md:justify-center px-6 pt-[16px] md:pt-16"
          }
        >
          <img src="img/logo.svg" alt="logo" />
          <GiHamburgerMenu
            className="md:hidden text-xl"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        </Container>
      </div>
      <div className="">
        <Container extraClass={"flex flex-col items-center"}>
          <nav>
            <ul className="md:flex hidden font-semibold gap-10 mt-8">
              {navItems.map((item, index) => {
                return (
                  <Link key={index} to={item.url}>
                    <li>{item.name}</li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </Container>
      </div>
      {/* Reponsive Navbar */}
      <div
        className={`fixed ${
          toggle ? "right-0" : "right-[-100%]"
        } duration-300 w-full h-full backdrop-blur-md top-0 md:hidden flex flex-col px-10 pt-6 gap-8 z-50 bg-white bg-opacity-90`}
      >
        <div className="flex justify-between items-center mb-4">
          <img src="img/logo.svg" alt="logo" className="h-8" />
          <ImCross
            onClick={() => setToggle(!toggle)}
            className="text-lg cursor-pointer"
          />
        </div>
        <div className="border-b-2 border-black pb-2 mb-4">
          <div className="flex justify-between gap-4">
            <div className="flex justify-between items-center text-sm">
              <Link
                to="/cart"
                onClick={() => {
                  setToggle(false);
                }}
                className="flex items-center gap-2"
              >
                <PiShoppingBag /> {data.length} Items
              </Link>
              <span className="text-gray-500 ml-6">{formatter(total)}</span>
            </div>
            <div className="flex gap-2 items-center">
              <FaRegUser />
              {user.user == null ? (
                <Link to="/login">Login</Link>
              ) : (
                <Link
                  to=""
                  onClick={() => {
                    Cookies.remove("ishopToken");
                    dispatcher(logout());
                    dispatcher(emptyCart());
                  }}
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
          {/* <div className="flex gap-2 justify-between items-center mt-2">
              <div className="text-sm flex items-center gap-3">
                EN <IoMdArrowDropdown />
              </div>
              <div className="text-sm flex items-center gap-3">
                $ <IoMdArrowDropdown />
              </div>
            </div> */}
        </div>
        {/* <div className="relative w-full mb-4">
          <input
            type="text"
            className="p-3 w-full rounded-full border focus:outline-none focus:border-blue-500"
            placeholder="Search..."
          />
          <IoSearchSharp className="absolute text-gray-400 top-3 right-5 text-xl" />
        </div> */}
        <ul className="flex flex-col gap-4 font-semibold text-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              onClick={() => {
                setToggle(false);
              }}
            >
              <li className="p-2 bg-white bg-opacity-90 rounded-lg shadow">
                {item.name}
              </li>
            </Link>
          ))}
          <Link
            to={"/orders"}
            onClick={() => {
              setToggle(false);
            }}
          >
            <li className="p-2 bg-white bg-opacity-90 rounded-lg shadow uppercase">
              Orders
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
