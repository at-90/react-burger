import React from 'react';
import {useSelector} from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import {getCookie} from "../../utils/cookie";

type TChildElement = {
	element: JSX.Element;
}

const AuthElement :React.FC<TChildElement>= ({element}) => {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };

	const user = useSelector((state:any) => state.user.user );
	const isLoggedIn = getCookie('atoken');

	return !!isLoggedIn && !!user ? <Navigate to={from}  replace={true}/> : element
};

export default AuthElement;