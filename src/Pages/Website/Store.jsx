import React, { useContext, useState, useEffect, useCallback } from "react";
import Container from "../../Components/Container";
import { MainContext } from "../../Context/Main";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../Components/Website/Card";
import { Link, useSearchParams } from "react-router-dom";

function Store(props) {
  const {
    API_BASE_URL,
    categoryImageUrl,
    products,
    category,
    colors,
    fetchProduct,
    fetchCategory,
    fetchColor,
  } = useContext(MainContext);
  const [selColor, setSelColor] = useState(null);
  const [selCategory, setSelCategory] = useState(null);
  const [limit, setLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (searchParams.get("limit")) {
      setLimit(searchParams.get("limit"));
    }
    if (searchParams.get("color")) {
      setSelColor(searchParams.get("color"));
    }
    if (searchParams.get("category_slug")) {
      setSelCategory(searchParams.get("category_slug"));
    }
  }, []);

  useEffect(() => {
    fetchProduct(limit, selColor, selCategory);
    let query = {
      limit,
    };
    if (selColor) {
      query.color = selColor;
    }
    if (selCategory) {
      query.category_slug = selCategory;
    }
    setSearchParams(query);
  }, [limit, selColor, selCategory]);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 120);
    const g = Math.floor(Math.random() * 120);
    const b = Math.floor(Math.random() * 120);
    return [r, g, b];
  };

  const generateRandomGradient = useCallback(() => {
    const startColor = generateRandomColor();
    const endColor = generateRandomColor();
    return `linear-gradient(to right, rgb(${startColor.join(
      ","
    )}), rgb(${endColor.join(",")}))`;
  }, []);

  return (
    <Container extraClass="px-6 md:px-16 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col gap-6">
          <div className="py-4 px-4 rounded bg-[#F6F7F8]">
            <span className="font-bold text-xl">CATEGORY</span>
            <ul className="mt-3">
              {category.map((cat, index) => (
                <Link to={`/store/${cat.slug}`} key={index}>
                  <li
                    className={`mt-1 cursor-pointer duration-150 ${
                      cat.slug === selCategory
                        ? "text-blue-500 font-bold"
                        : "font-semibold"
                    }`}
                    onClick={() => {
                      setSelCategory(
                        selCategory === cat.slug ? null : cat.slug
                      );
                    }}
                  >
                    {cat.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="py-4 px-4 rounded bg-[#F6F7F8]">
            <span className="font-bold text-xl">COLOR</span>
            <div className="flex gap-2 flex-wrap mt-5">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className={`h-8 w-8 p-1 rounded-full duration-150 ${
                    selColor === color._id ? "border-[2px] border-black" : ""
                  }`}
                  style={{ background: color.code }}
                  onClick={() => {
                    setSelColor(selColor === color._id ? null : color._id);
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <Slider {...settings} className="mb-10">
            {category.map((cat, index) => (
              <div key={index} className={`relative h-[340px]`}>
                <div
                  className="w-full h-full"
                  style={{ background: generateRandomGradient() }}
                >
                  <div className="pt-16 ml-16 font-bold text-5xl text-white">
                    {cat.name}
                    <Link to={`/store/${cat.slug}`}>
                      <div
                        className="text-sm font-semibold mt-2"
                        onClick={() => {
                          setSelCategory(cat.slug);
                        }}
                      >
                        SHOP NOW
                      </div>
                    </Link>
                  </div>
                  <img
                    className="absolute w-40 lg:w-72 bottom-10 right-16"
                    src={`${API_BASE_URL}/${categoryImageUrl}${cat.image}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </Slider>
          <div className="p-4 w-full my-8 bg-[#F6F7F8] flex flex-wrap items-center justify-between">
            <div className="">
              <span>Show</span>
              <select
                name=""
                id=""
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="bg-transparent ml-2 px-2 py-1 myBorderSmall"
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="">All</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap mb-16 lg:justify-start justify-center">
            {products.map((p, i) => (
              <Card products={p} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Store;
