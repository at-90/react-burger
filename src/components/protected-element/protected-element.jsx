import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import Preloader from "../preloader/preloader";
import {getCookie} from "../../utils/cookie";

const ProtectedRouteElement = ({ element} ) => {
    const user = useSelector(state => state.user.user );
    const isLoggedIn = getCookie('atoken');

    if(!!isLoggedIn && !!user){
        return element
    }


    return <Navigate to={'/login'}/>
}

export default ProtectedRouteElement
