import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // console.log(user);
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
      toast.success("🚀 Welcome!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error("🙅‍♀️ Uh oh! Email or Password is incorrect", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen flex ">
      <div
        className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder
  relative
  before:absolute
  before:w-full
  before:h-full
  before:-z-10
  before:bg-gradient-to-r
  before:from-[#ad84d8]
  before:to-[#ad69a4]
  before:left-0
  before:top-0
  before:blur-[5px] py-10 px-16"
      >
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email}
              required
              type="email"
              placeholder="Enter email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password}
              required
              type="password"
              placeholder="Password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
