import React, {useEffect} from 'react';
import {useAuth} from "../../context/auth";
import {useLocation, useNavigate} from "react-router-dom";

const LogOut = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
/*
    useEffect(() => {
        auth?.logout();
        navigate('/login', { fromTo: location, replace: true });
    }, [auth, location, navigate]);
*/

useEffect(() => {
    if (auth && auth.logout) {
auth.logout();
       navigate('/login', { fromTo: location, replace: true });
}
   }, [auth, location, navigate]);
    return <></>;
};

export default LogOut;