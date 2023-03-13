import { useState } from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("/api/register", formData);
            // localStorage.setItem("auth-token", response)
            router.push("/dashboard")
            console.log(response.data); // do something with the response
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <Box maxWidth="500px" mx="auto" my="10">
            <form>
                <FormControl id="username" isRequired mb="3">
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="email" isRequired mb="3">
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormControl>

                <FormControl id="password" isRequired mb="3">
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </FormControl>

                {error && (
                    <Box bg="red.100" p="3" color="red.900" mb="3" borderRadius="md">
                        {error}
                    </Box>
                )}

                <Button
                    type="submit"
                    onClick={handleSubmit}
                    isLoading={loading}
                    loadingText="Submitting"
                    colorScheme="teal"
                >
                    Register
                </Button>
            </form>
        </Box>
    );
}
