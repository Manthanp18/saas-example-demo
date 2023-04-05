import { useRouter } from 'next/router';
import { Context } from "../../context/AuthContext";
import { useContext, useEffect, useState } from 'react';
const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const { state, dispatch } = useContext(Context);



        // Check if the user is authenticated
        const isAuthenticated = () => {
            const userId = state?.user?._id // replace with your own cookie library or session storage
            return !!userId;
        };

        useEffect(() => {
            if (!isAuthenticated() && !['/', '/register'].includes(router.pathname)) {
                // Redirect the user to the login page if they are not authenticated
                router.push('/');
            }
        }, []);

        // Render the component if the user is authenticated
        return isAuthenticated() || ['/', '/register'].includes(router.pathname) ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
