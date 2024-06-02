import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Main";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducers/user.reducer";

function Signup(props) {
  const { API_BASE_URL, USER_URL, openToast, Cookies, setLoading, loading } =
    useContext(MainContext);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (
      (e.target.name.value != "",
      e.target.email.value != "",
      e.target.password.value != "")
    ) {
      axios
        .post(API_BASE_URL + USER_URL + "/create", data)
        .then((success) => {
          if (success.data.status == 1) {
            setLoading(false);
            e.target.reset();
            Cookies.set("ishopToken", success.data.token);
            dispatcher(login({ user: success.data.user }));
            openToast("Account Created Successfully", "success");
            navigate("/");
          } else {
            setLoading(false);
            openToast(success.data.msg, "error");
          }
        })
        .catch((err) => {
          setLoading(false);
          openToast("Client Side Error", "error");
        });
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen mt-2">
      <div
        className={`${
          loading ? "fixed w-full h-full z-50 top-0 left-0" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="flex space-x-2 w-full justify-center items-center h-full">
          <span className="sr-only text-white">Loading...</span>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
        <Link
          to="/Home"
          className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-48 mb-2 mr-2" src="img/logo.svg" alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={submitHandler}
              action=""
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div> */}
                  {/* <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div> */}
                </div>
                {/* <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Forgot password?
            </a> */}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
