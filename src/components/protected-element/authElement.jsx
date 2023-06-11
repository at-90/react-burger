import React from 'react';
import {useSelector} from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import {getCookie} from "../../utils/cookie";


const AuthElement = ({element}) => {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };

	const user = useSelector(state => state.user.user );
	const isLoggedIn = getCookie('atoken');

	return !!isLoggedIn && !!user ? <Navigate to={from}  replace={true}/> : element
};

export default AuthElement;