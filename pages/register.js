import React, { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ username, email, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            toast.error(`🙅‍♀️ Uh oh! Password didn't matched!!!`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        try {
            const { data } = await axios.post("/api/user/register", {
                username,
                email,
                password,
            });
            localStorage.setItem("auth-token", data)
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
            console.log({ data })
        } catch (err) {
            toast.error(err.response.data ? err.response.data.message : `🙅‍♀️ Uh oh! Email or Password is incorrect`, {
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
                    Register your account 🔐
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
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter username"
                            {...register("username", {
                                required: "This field is required",
                            })}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Please Enter a valid Email",
                                },
                            })}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                            placeholder="Password"
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                required: true,
                            })}
                            placeholder="Confirm your Password"
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-6">
                        <button
                            type="submit"
                            className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Register
                        </button>
                        <p>
                            Already have an account?{" "}
                            <NextLink
                                href="/"
                            >
                                Login here
                            </NextLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register