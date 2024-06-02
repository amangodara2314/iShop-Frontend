import React, { useContext } from "react";
import { IoStarSharp } from "react-icons/io5";
import { MainContext } from "../../Context/Main";
import {
  addToCart,
  removeFromCart,
  lsToCart,
  changeCartQty,
} from "../../reducers/cart.reducer";
import { useDispatch, useSelector } from "react-redux";
import store from "../../Store";
function Card({ products, extra }) {
  const { user } = useSelector((store) => store.user);
  const dispatcher = useDispatch();
  const { API_BASE_URL, productImageUrl, cartToDb, formatter } =
    useContext(MainContext);
  const stars = [];
  if (products?.rating != undefined) {
    for (let i = 0; i < products.rating; i++) {
      stars.push(<IoStarSharp key={i} className="text-yellow-400 mb-2" />);
    }
  }

  return (
    <div
      className={`w-[270px] h-[420px] myBorder shadow-sm px-4 ${extra} relative`}
    >
      <div className="w-full h-[153px] my-12">
        <img
          className="w-full h-full"
          src={API_BASE_URL + "/" + productImageUrl + products.image}
          alt=""
        />
        <hr className="mt-8" />
      </div>
      <div className="text-center">
        <div className="font-semibold text-md">{products.name}</div>
        <div className="flex flex-col items-center mt-4">
          {stars}
          <div className="font-bold text-red-500">
            {formatter(parseInt(products.finalPrice))}{" "}
            <span className="line-through ml-2 text-gray-400 font-normal text-sm">
              {formatter(products.price)}
            </span>
          </div>
          <div className="mt-2">
            {products.discount == 0 ? "" : `${products.discount}% off`}
          </div>
          <div
            className={`absolute text-sm top-0 left-0 bg-red-500 px-2 py-1 font-bold text-white ${
              products.bestSeller ? "" : "hidden"
            }`}
          >
            HOT
          </div>
          <button
            onClick={() => {
              dispatcher(
                addToCart({
                  pId: products._id,
                  qty: 1,
                  price: products.finalPrice,
                })
              );
              if (user) {
                cartToDb({ id: user._id, pId: products._id });
              }
            }}
            className="mt-2 bg-blue-500 py-2 w-full text-white"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
