import React, { useContext, useEffect, useRef, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { MainContext } from "../../../Context/Main";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function View() {
  const [toggle, setToggle] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [cate, setCate] = useState();
  const {
    openToast,
    API_BASE_URL,
    CATEGORY_URL,
    category,
    fetchCategory,
    categoryImageUrl,
  } = useContext(MainContext);

  const categoryRef = useRef();
  const slugRef = useRef();

  const titleToSlug = () => {
    const slug = categoryRef.current.value
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .toLowerCase();
    slugRef.current.value = slug;
  };

  const deleteHandler = (id) => {
    axios
      .delete(API_BASE_URL + CATEGORY_URL + "/delete/" + id)
      .then((success) => {
        if (success.data.status) {
          fetchCategory();
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
    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const image = e.target.image.files[0];
    if (name != "" && slug != "") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", image);
      if (isUpdate) {
        formData.append("oldName", cate.image);
        axios
          .put(`${API_BASE_URL + CATEGORY_URL}/update/` + cate._id, formData)
          .then((success) => {
            if (success.data.status == 1) {
              openToast(success.data.msg, "success");
              e.target.reset();
              setToggle(false);
              fetchCategory();
            } else {
              openToast(success.data.msg, "error");
            }
          })
          .catch((err) => {
            openToast("Client Side Error", "error");
          });
      } else {
        axios
          .post(`${API_BASE_URL + CATEGORY_URL}/create`, formData)
          .then((success) => {
            if (success.data.status == 1) {
              openToast(success.data.msg, "success");
              e.target.reset();
              setToggle(false);
              fetchCategory();
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
      .patch(
        API_BASE_URL + CATEGORY_URL + "/update-status/" + id + "/" + status
      )
      .then((success) => {
        if (success.data.status == 1) {
          openToast(success.data.msg, "success");
          fetchCategory();
        } else {
          openToast(success.data.msg, "error");
        }
      })
      .catch((err) => {
        openToast("Client Side Error", "error");
      });
  };
  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen z-10 justify-center items-center ${
          toggle ? "flex" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="w-[45%] p-6 bg-white rounded-2xl">
          <div className="text-lg font-semibold flex justify-between items-center">
            {isUpdate ? "Edit" : "Add"} Category
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
                Category Name
              </label>
              <input
                ref={categoryRef}
                onChange={titleToSlug}
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug
              </label>
              <input
                ref={slugRef}
                readOnly
                type="text"
                id="slug"
                name="slug"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
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
      <div className="relative overflow-x-auto shadow-md">
        <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex justify-between items-center">
          Category Listing
          <IoAddSharp
            className="cursor-pointer text-2xl bg-white font-extrabold text-black rounded-full"
            onClick={() => {
              setToggle(true);
              setUpdate(false);
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Slug
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
            {category.map((cat, index) => {
              return (
                <tr className="bg-white" key={index}>
                  <td className="px-6 py-4">{index + 1}.</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {cat.name}
                  </th>
                  <td className="px-6 py-4">{cat.slug}</td>
                  <td className="px-6 py-4">
                    <img
                      className="w-28"
                      src={API_BASE_URL + "/" + categoryImageUrl + cat.image}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 text-white">
                    {cat.status == true ? (
                      <button
                        className="p-2 rounded-sm bg-green-500"
                        onClick={() => {
                          changeStatus(cat._id, false);
                        }}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-sm bg-orange-500"
                        onClick={() => {
                          changeStatus(cat._id, true);
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
                        deleteHandler(cat._id, true);
                      }}
                    />
                    <CiEdit
                      className="text-xl text-black cursor-pointer hover:scale-125 hover:text-blue-600 duration-150"
                      onClick={() => {
                        setUpdate(true);
                        setToggle(true);
                        categoryRef.current.value = cat.name;
                        slugRef.current.value = cat.slug;
                        setCate(cat);
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
