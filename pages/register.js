import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        mode: "onChange",
    });
    const toast = useToast();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register', data);
            console.log(response)
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
                localStorage.setItem('auth-token', token);
                toast({
                    title: 'Account created.',
                    description: 'We have created your account for you.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            {...register("username", {
                                required: "This field is required",
                            })}
                        />
                        {errors.username && (
                            <span>This field is required</span>
                        )}
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            {...register("email", {
                                required: "This field is required",
                                pattern: {
                                    value:
                                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Please Enter a valid Email",
                                },
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
                                pattern: {
                                    value:
                                        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                    message:
                                        "Password must be contain UpperCase, LowerCase, Number/special Charecter and min 8 charecters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span>This field is required</span>
                        )}
                    </FormControl>
                    <Button type="submit" mt={4}>
                        Register
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Register