import React, { useContext, useEffect, useRef, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { MainContext } from "../../../Context/Main";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";

function View() {
  const {
    openToast,
    API_BASE_URL,
    category,
    COLOR_URL,
    colors,
    fetchColor,
    fetchCategory,
    PRODUCT_URL,
    allProducts,
    productImageUrl,
    fetchAllProduct,
  } = useContext(MainContext);
  const [toggle, setToggle] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState();
  const [isSearchable, setIsSearchable] = useState(true);
  const nameRef = useRef();
  const slugRef = useRef();
  const [selCategory, setSelCategory] = useState(null);
  const [selColors, setSelColors] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    if (editProduct != null || editProduct != undefined) {
      setSelCategory({
        label: editProduct.category_id.name,
        value: editProduct.category_id._id,
      });
      setSelColors(
        editProduct.colors.map((color) => {
          return { label: color.name, value: color._id };
        })
      );
    } else {
      setSelCategory(null);
      setSelColors([]);
    }
  }, [editProduct]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const priceRef = useRef();
  const discountRef = useRef();
  const discountPercentageRef = useRef();

  const deleteHandler = (id) => {
    axios
      .delete(API_BASE_URL + PRODUCT_URL + "/delete/" + id)
      .then((success) => {
        if (success.data.status == 1) {
          fetchAllProduct();
          openToast(success.data.msg, "success");
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => {
        openToast("Client Side Error", "error");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.name.value != "" && e.target.price != "") {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("slug", e.target.slug.value);
      formData.append("price", e.target.price.value);
      formData.append("discountPercentage", e.target.discountPercentage.value);
      formData.append("discount", discountRef.current.value);
      formData.append("category", selCategory.value);
      const val = selColors.map((color) => color.value);
      formData.append("colors", JSON.stringify(val));
      formData.append("image", file);
      if (isUpdate) {
        formData.append("oldName", editProduct.image.name);
        axios
          .put(`${API_BASE_URL + PRODUCT_URL}/update/` + id, formData)
          .then((success) => {
            if (success.data.status == 1) {
              openToast(success.data.msg, "success");
              e.target.reset();
              fetchAllProduct();
              setToggle(false);
            } else {
              openToast(success.data.msg, "error");
            }
          })
          .catch((err) => {
            openToast("Client Side Error", "error");
          });
      } else {
        axios
          .post(`${API_BASE_URL + PRODUCT_URL}/create`, formData)
          .then((success) => {
            if (success.data.status == 1) {
              fetchAllProduct();
              openToast(success.data.msg, "success");
              e.target.reset();
              setToggle(false);
            } else {
              openToast(success.data.msg, "error");
            }
          })
          .catch((err) => {
            openToast("Client Side Error", "error");
          });
      }
    }
  };

  const changeStatus = (id, status) => {
    axios
      .patch(API_BASE_URL + PRODUCT_URL + "/update-status/" + id + "/" + status)
      .then((success) => {
        if (success.data.status == 1) {
          fetchAllProduct();
          openToast(success.data.msg, "success");
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => {
        openToast("Client Side Error", "error");
      });
  };
  const discountCalc = () => {
    const price = parseInt(priceRef.current.value);
    const discountper = parseInt(discountPercentageRef.current.value);
    if (!isNaN(price) && !isNaN(discountper)) {
      const d = price * (discountper / 100);
      discountRef.current.value = price - d;
    }
    if (priceRef.current.value == "") {
      discountPercentageRef.current.value = 0;
      discountRef.current.value = 0;
    }
    if (discountPercentageRef.current.value == "") {
      discountRef.current.value = price;
    }
  };
  const titleToSlug = () => {
    const slug = nameRef.current.value
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .toLowerCase();
    slugRef.current.value = slug;
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen z-10 justify-center items-center ${
          toggle ? "flex" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="w-[55%] p-6 bg-white rounded-2xl">
          <div className="text-lg font-semibold flex justify-between items-center">
            {isUpdate ? "Edit" : "Add"} Color
            <RxCross2
              onClick={() => {
                setToggle(false);
                setEditProduct(null);
              }}
              className="cursor-pointer text-2xl font-extrabold bg-white text-black rounded-full"
            />
          </div>
          <form
            encType="multipart/form-data"
            action=""
            onSubmit={submitHandler}
          >
            <div className="bg-white rounded my-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productName"
                >
                  Product Name
                </label>
                <input
                  onChange={titleToSlug}
                  ref={nameRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productName"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="productSlug"
                >
                  Product Slug
                </label>
                <input
                  ref={slugRef}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="productSlug"
                  type="text"
                  name="slug"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 col-span-2">
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    onChange={discountCalc}
                    ref={priceRef}
                    min={0}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    name="price"
                  />
                </div>
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="discount"
                  >
                    Discount
                  </label>
                  <input
                    onChange={discountCalc}
                    ref={discountPercentageRef}
                    defaultValue={0}
                    min={0}
                    max={99}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="discount"
                    type="number"
                    name="discountPercentage"
                  />
                </div>
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="priceAfterDiscount"
                  >
                    Price After Discount
                  </label>
                  <input
                    ref={discountRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="priceAfterDiscount"
                    type="number"
                    readOnly
                    name="discount"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 col-span-2">
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Category
                  </label>
                  <Select
                    onChange={(option) => {
                      setSelCategory(option);
                    }}
                    value={selCategory}
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={isSearchable}
                    name="category"
                    options={category.map((cate) => {
                      return {
                        label: cate.name,
                        value: cate._id,
                      };
                    })}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Colors
                  </label>
                  <Select
                    onChange={(options) => {
                      setSelColors(options);
                    }}
                    value={selColors}
                    closeMenuOnSelect={false}
                    isMulti
                    options={colors.map((color) => {
                      return {
                        label: color.name,
                        value: color._id,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor=""
                >
                  Image
                </label>
                <div className="text-gray-600 text-sm my-2 flex gap-2 items-center">
                  <FileUploader handleChange={handleChange} name="file" />
                  {file?.name}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md">
        <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex justify-between items-center">
          Product Listing
          <IoAddSharp
            className="cursor-pointer text-2xl bg-white font-extrabold text-black rounded-full"
            onClick={() => {
              setToggle(true);
              setUpdate(false);
              nameRef.current.value = "";
              slugRef.current.value = "";
              priceRef.current.value = "";
              discountPercentageRef.current.value = 0;
              discountRef.current.value = "";
            }}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((p, index) => {
              return (
                <tr className="bg-white" key={index}>
                  <td className="px-6 py-4">{index + 1}.</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {p.name}
                  </th>
                  <td className="px-6 py-4 text-gray-500">
                    {p.category_id.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-[70px] h-[30px">
                      <ul>
                        {p.colors.map((color) => {
                          return (
                            <li
                              className="font-semibold"
                              style={{ color: color.code }}
                            >
                              {color.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-normal">
                    <ul>
                      <li>Price : {p.price}</li>
                      <li>Discount : {p.discount}%</li>
                      <li className="text-black font-semibold">
                        Final Price : {p.finalPrice}
                      </li>
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-black font-semibold">
                    <img
                      className="w-28"
                      src={API_BASE_URL + productImageUrl + p.image}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 text-white">
                    {p.status == true ? (
                      <button
                        className="p-2 rounded-sm bg-green-500"
                        onClick={() => {
                          changeStatus(p._id, false);
                        }}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-sm bg-orange-500"
                        onClick={() => {
                          changeStatus(p._id, true);
                        }}
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-5 text-lg">
                    <MdDelete
                      className="text-black cursor-pointer hover:scale-125 hover:text-red-600 duration-150"
                      onClick={() => {
                        deleteHandler(p._id, true);
                      }}
                    />
                    <CiEdit
                      className="text-xl text-black cursor-pointer hover:scale-125 hover:text-blue-600 duration-150"
                      onClick={() => {
                        setUpdate(true);
                        setToggle(true);
                        setId(p._id);
                        setFile(null);
                        setEditProduct(p);
                        nameRef.current.value = p.name;
                        slugRef.current.value = p.slug;
                        priceRef.current.value = p.price;
                        discountPercentageRef.current.value = p.discount;
                        discountRef.current.value = p.finalPrice;
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default View;
