import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import {selectUser} from "../../services/selectors/selectors";
import React from "react";
type TChildElement = {
    element: JSX.Element;
}


const ProtectedRouteElement:React.FC<TChildElement> = ({ element} ) => {
    const user = useSelector(selectUser);
    if(user) {
        return element
    }
    return <Navigate to={'/login'}/>
}



export default ProtectedRouteElement
