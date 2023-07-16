import React, { useEffect, useMemo, useState } from "react";

import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useLocation, useParams } from "react-router-dom";

import styles from './order-composition-page.module.css'
import {AppDispatch} from "../../constants/types";
import {useDispatch} from "react-redux";
import {TIngredient, TOrderItemComposition} from "../../constants/types";
import {useAppSelector} from "../../hooks/hooks";
import {selectIngredients} from "../../services/selectors/selectors";
import { getOrder} from "../../services/actions/order-details";


const OrderCompositionPage = () => {

    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();

    const [order, setOrder] = useState<TOrderItemComposition>({
        _id: "",
        ingredients: [],
        name: "",
        number: 0,
        status: "",
        createdAt: "",
        updatedAt: "",
    });

    const {items : ingredients} = useAppSelector(selectIngredients);

    const {currentOrder} = useAppSelector((state) => state.orderDetails);

    useEffect(() => {
        if (currentOrder) {
            setOrder({
                createdAt: currentOrder.createdAt,
                ingredients: currentOrder.ingredients,
                name: currentOrder.name,
                number: currentOrder.number,
                status: currentOrder.status,
                updatedAt: currentOrder.updatedAt,
                _id: currentOrder._id,
            });
        }

    }, [currentOrder]);

    enum orderStatusList {
        created = "Создан",
        pending = "Готовится",
        done = "Выполнен"
    }

    const orderStatus = ()=> {
        if (order.status === 'created') return orderStatusList.created
        if (order.status === 'pending') return orderStatusList.pending
        if (order.status === 'done') return orderStatusList.done
    }

    const orderIngredients: TIngredient[] = useMemo(() => {

        return Array.from(new Set<TIngredient>(
            order?.ingredients.map((id) => {
                    return ingredients.find((ingredient: TIngredient) => ingredient._id === id);
                })
        ));

    }, [ingredients, order]);


    const countIngredients = useMemo(() => {

        return order?.ingredients.reduce(
            (count: { [key: string]: number }, i) => {
                if (count.hasOwnProperty(i)) {
                    count[i] += 1;
                } else {
                    count[i] = 1;
                }
                return count;
            },
            {}
        );

    }, [  orderIngredients]);


    const orderPrice = useMemo(() => {
        let price = 0;
        order?.ingredients.forEach((id) => {
            const ingredient = orderIngredients.find((item) => item._id === id);
            if (ingredient) {
                price += ingredient.price;
            }
        });
        return price;
    }, [orderIngredients, order]);

    useEffect(() => {
        if (id) {
            dispatch(getOrder(id));
        }
    }, [id]);


    return <div className={styles.card}>
            <div className={`text text_type_digits-default`} >
                #{order?.number}
            </div>
            <div className={`text text_type_main-medium mt-10`} >
                {order?.name}
            </div>
            <div className={`text text_type_main-default mt-3 `} style={{color: order?.status === 'done' ? '#00CCCC' : '#FFFFFF'}}>
                {orderStatus()}
            </div>
            <div className={`text text_type_main-medium mt-15`} >
                Состав:
            </div>
            <div className={`mt-6  scrollList ${styles.scrollList}`} >
                {orderIngredients.map(
                    (orderIngredient: TIngredient, index: number) => {
                        return (
                            <div className={`${styles.ingredient}`} key={index}>
                                <div className={`${styles.ingredient__image}`}>
                                    <div className={`${styles.ingredient__imageWrapper}`}>
                                         <img src={orderIngredient?.image} alt={orderIngredient?.name} />
                                    </div>
                                </div>
                                <div className={`text text_type_main-default`}>
                                    {orderIngredient?.name}
                                </div>
                                <div className={`${styles.price}`}>
                                    <span className="text text_type_digits-default">
                                      {countIngredients
                                          ? `${countIngredients[orderIngredient._id]}`
                                          : ""}
                                        x {orderIngredient?.price}
                                    </span>
                                    <span>
                                      <CurrencyIcon type="primary" />
                                    </span>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
            <div className={`mt-10 ${styles.footer}`}>
                <div className={`text text_type_main-default text_color_inactive ${styles.orderPage__summ_datetime}`} >
                    <FormattedDate date={new Date(order.createdAt)} />
                </div>
                <div className={`${styles.price}`}>
                    <span className="text text_type_digits-default">{orderPrice}</span>
                    <span>
                      <CurrencyIcon type="primary" />
                    </span>
                </div>
            </div>
    </div>
}

export default OrderCompositionPage
