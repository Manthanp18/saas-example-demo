import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Context } from "../context/AuthContext";
import NextLink from "next/link";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { state, dispatch } = useContext(Context);
  console.log({ state })

  const { register, handleSubmit, formState: { errors }, } = useForm({
    mode: "onChange",
  });
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/login', data);
      if (response.data.message) {
        toast({
          title: response.data.message,
          description: response.data.description,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        const { token } = await response.data;
        const { _id } = response.data
        await localStorage.setItem('auth-token', token);
        await localStorage.setItem('_id', _id);
        await dispatch({
          type: "LOGGED_IN_USER",
          payload: response.data
        })
        await toast({
          title: 'Successfully Logged in.',
          description: 'Redirecting to Inspirations.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="username_email" isRequired>
            <FormLabel>Username/Email</FormLabel>
            <Input
              type="text"
              name="username_email"
              {...register("username_email", {
                required: "This field is required"
              })}
            />
            {errors.email && <span>This field is required</span>}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <span>This field is required</span>
            )}
          </FormControl>
          <div className="flex flex-col justify-center items-center mt-6">
            <button
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Login
            </button>
            <p>
              Don't have an account? <NextLink href="/register">SignUp</NextLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
