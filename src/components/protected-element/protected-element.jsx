import {useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import {selectUser} from "../../services/selectors/selectors";


const ProtectedRouteElement = ({ element} ) => {
    const user = useSelector(selectUser);
    if(user) {
        return element
    }
    return <Navigate to={'/login'}/>
}

export default ProtectedRouteElement
