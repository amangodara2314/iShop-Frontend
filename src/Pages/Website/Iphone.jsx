import React, { useContext, useEffect, useState } from "react";
import Container from "../../Components/Container";
import Card from "../../Components/Website/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MainContext } from "../../Context/Main";

const Iphone = () => {
  const { API_BASE_URL, products, productImageUrl, fetchProduct } =
    useContext(MainContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const heroProducts = products.find((p) => p.category_id.slug == "iphone");
  return (
    <Container extraClass="px-6 md:px-16 my-10">
      <div className="relative w-full h-[400px] md:h-[300px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg md:flex items-start justify-start mb-10 p-8 md:p-10 shadow-lg">
        {heroProducts && (
          <>
            <div className="text-left text-white z-10 max-w-lg">
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                {heroProducts?.name}
              </h1>
              <p className="mt-4 text-2xl">{heroProducts?.description}</p>
              <p className="mt-4 text-lg">
                Experience the latest technology with the new iPhone. A leap in
                performance, design, and capability.
              </p>
            </div>
            <img
              className="absolute w-1/2 sm:w-1/4 bottom-5 right-5 sm:bottom-10 sm:right-10 rounded-lg"
              src={`${API_BASE_URL}/${productImageUrl}${heroProducts?.image}`}
              alt={heroProducts?.name}
            />
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8 xl:gap-16">
        {products
          .filter((p) => p.category_id.slug === "iphone")
          .map((iphone, index) => (
            <Card products={iphone} key={index} />
          ))}
      </div>
    </Container>
  );
};

export default Iphone;
