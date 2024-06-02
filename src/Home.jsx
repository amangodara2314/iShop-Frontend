import React, { useContext, useEffect, useState, useRef } from "react";
import Container from "./Components/Container";
import Card from "./Components/Website/Card";
import { MainContext } from "./Context/Main";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function Home(props) {
  let { products, category, fetchProduct, fetchCategory, formatter } =
    useContext(MainContext);
  const [selCategory, setSelCategory] = useState(0);
  const [prod, setProd] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchProduct();
    function handleResize() {
      setSlidesToShow(getSlidesToShow());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getSlidesToShow() {
    if (window.innerWidth < 899) {
      return 1;
    } else if (window.innerWidth >= 900 && window.innerWidth < 1150) {
      return 2;
    } else {
      return 3;
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  useEffect(() => {
    if (selCategory == 0) {
      setProd(products);
    } else {
      let data = products.filter((p) => {
        if (p.category_id._id == selCategory) {
          return true;
        } else {
          return false;
        }
      });
      setProd(data);
    }
  }, [selCategory, products]);

  return (
    <>
      <div className="banner-bg relative h-[650px] my-8">
        <Container>
          <img
            src="img/2_corousel.png"
            className="absolute bottom-0 right-0 md:right-24 h-[60%] md:h-[95%] w-[365px] md:w-[571px]"
            alt=""
          />
        </Container>
      </div>

      <div className="text-center">
        <Container>
          <span className="font-bold text-2xl uppercase">Best Seller</span>
          <ul className="mt-4 font-semibold flex gap-10 justify-center">
            <li
              onClick={() => {
                setSelCategory(0);
              }}
              className={`${
                selCategory == 0
                  ? "text-blue-500 border-b-2 border-blue-500 "
                  : ""
              }cursor-pointer duration-100`}
            >
              All
            </li>
            {category.map((cat, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelCategory(cat._id);
                  }}
                  className={`${
                    selCategory == cat._id
                      ? "text-blue-500 border-b-2 border-blue-500 "
                      : ""
                  }cursor-pointer duration-100`}
                >
                  {cat.name}
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
      <div className="mb-8">
        <Container extraClass={"flex gap-4 mt-8 flex-wrap justify-center"}>
          {prod &&
            prod
              .filter((p) => p.bestSeller)
              .map((p, i) => {
                return <Card products={p} key={i} />;
              })}
        </Container>
      </div>
      {/* <div className="text-center font-bold my-28 text-sm cursor-pointer">
        <span>LOAD MORE</span>
      </div> */}
      <div className="bluebg h-[600px] relative">
        <Container>
          <div className="flex flex-col gap-2 pl-[40px] pt-[100px] md:pt-[145px] px-4 md:pl-[80px] text-white">
            <span className="text-3xl md:text-5xl font-bold">
              iPhone 15 Pro Max
            </span>
            <span className="text-base md:text-2xl w-full md:w-[380px]">
              Performance and design. Taken right to the edge.
            </span>
            <span className="cursor-pointer font-semibold">SHOP NOW</span>
          </div>
          <img
            src="img/2_corousel.png"
            className="absolute bottom-0 right-0 md:right-24 h-[60%] md:h-[95%] w-[365px] md:w-[571px]"
            alt=""
          />
        </Container>
      </div>
      <div className="">
        <Container
          extraClass={
            "flex flex-col items-center md:flex-row justify-center gap-10 my-32"
          }
        >
          <div className="flex flex-col items-center w-[300px] md:w-[330px] gap-4 mt">
            <img width={"60px"} src="img/shipping.svg" alt="" />
            <span className="font-bold text-lg md:text-xl mt-2 my-4">
              FREE SHIPPING
            </span>
            <p className="text-center text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <div className="flex flex-col items-center w-[300px] md:w-[330px] gap-4 mt">
            <img width={"40px"} src="img/refund.svg" alt="" />
            <span className="font-bold text-lg md:text-xl mt-2 my-4">
              100% REFUND
            </span>
            <p className="text-center text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
          <div className="flex flex-col items-center w-[300px] md:w-[330px] gap-4 mt">
            <img width={"35px"} src="img/support.svg" alt="" />
            <span className="font-bold text-lg md:text-xl mt-2 my-4">
              SUPPORT 24/7
            </span>
            <p className="text-center text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </Container>
      </div>
      <div className="my-10">
        <div className="text-center text-lg md:text-2xl font-semibold mb-8">
          FEATURED PRODUCTS
        </div>
        <div className="px-4 md:px-52 relative">
          <GrPrevious
            onClick={previous}
            className="absolute top-[25%] text-3xl md:text-5xl left-4 md:left-36 cursor-pointer"
          />
          <Slider {...settings} ref={sliderRef}>
            {products.map((pro, index) => {
              return (
                <div key={index} className={slidesToShow === 1 ? "" : "px-8"}>
                  <Card
                    products={pro}
                    extra={slidesToShow === 1 ? "mx-auto" : ""}
                  />
                </div>
              );
            })}
          </Slider>
          <GrNext
            onClick={next}
            className="absolute top-[25%] text-3xl md:text-5xl right-4 md:right-40 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
