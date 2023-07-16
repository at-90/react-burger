import {useAppSelector} from "../../hooks/hooks";
import {useDispatch} from "react-redux";
import {
    WS_CONNECTION_ORDERS_END,
    WS_CONNECTION_ORDERS_START,
} from "../../services/actions/ws";
import {wsUrl} from "../../constants/api";
import {useEffect} from "react";
import OrderItem from "../order-item/order-item";
import Preloader from "../preloader/preloader";
import {getCookie} from "../../utils/cookie";

const ProfileOrders = () => {

    const { orders } = useAppSelector((store) => store.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie("atoken");

        dispatch({
            type: WS_CONNECTION_ORDERS_START,
            payload: `${wsUrl}?token=${token}`,
        });
        return () => {
            dispatch({
                type: WS_CONNECTION_ORDERS_END,
                payload: "disconnect",
            });
        };
    }, [dispatch]);



    return <div style={{height:'100%',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className={`scrollList`}>
        {orders?.length > 0 ? (

            orders.map((order) => {
                return (
                    <OrderItem order={order} key={order._id} type="profile" />
                );
            })

        ) : (
            <div className="text text_type_main-default">Вы еще не создавали заказы</div>
        )}
        </div>
    </div>
}

export default ProfileOrders
