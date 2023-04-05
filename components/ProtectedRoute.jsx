
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Context } from "../../context/AuthContext";


const ProtectedRoute = ({ children }) => {

    const { state, dispatch } = useContext(Context);
    const user = state.user._id
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [router, user]);

    return <>{user ? children : null}</>;
};

export default ProtectedRoute;