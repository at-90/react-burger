import styles from './feed-page.module.css';
import {useMemo} from 'react';
import {useEffect} from "react";
import Preloader from "../../components/preloader/preloader";
import {useDispatch} from "react-redux";
import OrderItem from "../../components/order-item/order-item";
import {WS_CONNECTION_START, WS_CONNECTION_END} from "../../services/actions/ws";
import {useAppSelector} from "../../hooks/hooks";
import {  TOrderItemComposition} from "../../constants/types";
import {wsUrl} from "../../constants/api";

const FeedPage = () => {

    const { orders, total, totalToday } = useAppSelector((store) => store.server);
    const dispatch = useDispatch();

    const ordersDone =  useMemo(() => {
        return orders.filter((item: TOrderItemComposition) => item.status === 'done').slice(0, 10).map((item) => item.number);
    }, [orders]);

    const ordersInProd =  useMemo(() => {
        return orders.filter((item: TOrderItemComposition) => { return item.status === 'created' || item.status === 'pending'}).slice(0, 10).map((item) => item.number);
    }, [orders]);


    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${wsUrl}/all`
        });
        return () => {
            dispatch({ type: WS_CONNECTION_END, payload: "disconnect" });
        };
    }, [dispatch]);

    return <main className="mainContainer">

            <div className="mainPanel">
                <div className="pt-10 pb-5">
                    <h1 className={`text text_type_main-large mb-3`}>Лента заказов</h1>
                    <article className={styles.article}>

                        <div className={`scrollList `}>
                            {orders && orders.length > 0 ? (
                                orders.map((elem: TOrderItemComposition) => {
                                    return <OrderItem order={elem} key={elem._id} type="feedItem" />;
                                })
                            ) : (
                                <Preloader />
                            )}
                        </div>
                    </article >
                </div>
            </div>
            <div className="mainPanel">

                <div className={`${styles.ordersStatus} pt-20`}>
                    <div className={styles.column50}>
                        <div className="text text_type_main-medium mb-6">Готовы:</div>
                        <div className={styles.ordersDone}>
                            {
                                ordersDone.map((elem) =>
                                        <div key={elem} >
                                            <span className={ `${styles.green} text text_type_digits-default` }>{elem}</span>
                                        </div>)
                            }
                        </div>
                    </div>
                    <div className={styles.column50}>
                        <div className="text text_type_main-medium mb-6">В работе:</div>
                        <div className={styles.ordersDone}>
                            {
                                ordersInProd.map((elem) =>
                                    <div key={elem} >
                                        <span className={ `text text_type_digits-default` }>{elem}</span>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.feed__summary}>
                    <div className={`mt-15 ${styles.feed__summary_completedallthetime}`}>
                        <div className="text text_type_main-medium">
                            Выполнено за все время:
                        </div>
                        <div className="text text_type_digits-large">
                            {new Intl.NumberFormat("ru-RU").format(total)}
                        </div>
                    </div>
                    <div className={`mt-15 ${styles.feed__summary_completedtoday}`}>
                        <div className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </div>
                        <div className="text text_type_digits-large">
                            {new Intl.NumberFormat("ru-RU").format(totalToday)}
                        </div>
                    </div>
                </div>

            </div>

    </main >

}

export default FeedPage
