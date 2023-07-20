
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from "../../services/selectors/selectors";
import React from "react";
import { useAppSelector } from "../../hooks/hooks";
type TChildElement = {
    element: JSX.Element;
    anonymous?: boolean
}


const ProtectedRouteElement: React.FC<TChildElement> = ({ element, anonymous = false }) => {

    const { user, isLoggedIn } = useAppSelector(selectUser);

    if (user && isLoggedIn) {
        return element
    }
    return <Navigate to={'/login'} />
}



export default ProtectedRouteElement
