import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import {useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../services/selectors/selectors";

type TChildElement = {
	element: JSX.Element;
}

const AuthElement :React.FC<TChildElement>= ({element}) => {
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } };
	const {isLoggedIn, user} = useAppSelector(selectUser)

	return !!isLoggedIn && !!user ? <Navigate to={from}  replace={true}/> : element
};

export default AuthElement;