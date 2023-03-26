import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const toast = useToast();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const { token } = await response.json();
            localStorage.setItem('token', token);
            toast({
                title: 'Account created.',
                description: 'We have created your account for you.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    type="text"
                    name="username"
                    ref={register({ required: true })}
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
                    ref={register({ required: true })}
                />
                {errors.email && <span>This field is required</span>}
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    name="password"
                    ref={register({ required: true })}
                />
                {errors.password && (
                    <span>This field is required</span>
                )}
            </FormControl>
            <Button type="submit" mt={4}>
                Register
            </Button>
        </form>
    );
};
