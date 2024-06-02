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
  const [id, setId] = useState();
  const {
    openToast,
    API_BASE_URL,
    CATEGORY_URL,
    category,
    COLOR_URL,
    colors,
    fetchColor,
  } = useContext(MainContext);

  const colorRef = useRef();
  const CodeRef = useRef();

  const deleteHandler = (id) => {
    axios
      .delete(API_BASE_URL + COLOR_URL + "/delete/" + id)
      .then((success) => {
        if (success.data.status) {
          fetchColor();
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
    const data = {
      name: e.target.name.value,
      code: e.target.color.value,
    };
    if (data.name != "" && data.code != "") {
      const formData = new FormData();
      if (isUpdate) {
        axios
          .put(`${API_BASE_URL + COLOR_URL}/update/` + id, data)
          .then((success) => {
            if (success.data.status == 1) {
              fetchColor();
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
      } else {
        axios
          .post(`${API_BASE_URL + COLOR_URL}/create`, data)
          .then((success) => {
            if (success.data.status == 1) {
              openToast(success.data.msg, "success");
              fetchColor();
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
      .patch(API_BASE_URL + COLOR_URL + "/update-status/" + id + "/" + status)
      .then((success) => {
        if (success.data.status == 1) {
          fetchColor();
          openToast(success.data.msg, "success");
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
            {isUpdate ? "Edit" : "Add"} Color
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
                Color Name
              </label>
              <input
                ref={colorRef}
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <input
                ref={CodeRef}
                type="color"
                id="color"
                name="color"
                className="mt-1 px-2 py-1 h-[41px] w-full border rounded-md focus:outline-none focus:border-blue-500"
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
          Color Listing
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
                Color Name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
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
            {colors.map((c, index) => {
              return (
                <tr className="bg-white" key={index}>
                  <td className="px-6 py-4">{index + 1}.</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {c.name}
                  </th>
                  <td className="px-6 py-4">
                    <div
                      className="w-[70px] h-[30px]"
                      style={{ backgroundColor: c.code }}
                    ></div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {c.status == true ? (
                      <button
                        className="p-2 rounded-sm bg-green-500"
                        onClick={() => {
                          changeStatus(c._id, false);
                        }}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="p-2 rounded-sm bg-orange-500"
                        onClick={() => {
                          changeStatus(c._id, true);
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
                        deleteHandler(c._id, true);
                      }}
                    />
                    <CiEdit
                      className="text-xl text-black cursor-pointer hover:scale-125 hover:text-blue-600 duration-150"
                      onClick={() => {
                        setUpdate(true);
                        setToggle(true);
                        colorRef.current.value = c.name;
                        CodeRef.current.value = c.code;
                        setId(c._id);
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
