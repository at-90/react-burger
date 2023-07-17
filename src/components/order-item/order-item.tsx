import {TIngredient, TOrderItem} from "../../constants/types";
import {useMemo} from "react";
import {Link,useLocation} from "react-router-dom";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {selectIngredients} from "../../services/selectors/selectors";
import styles from './order-item.module.css';
import {useAppSelector} from "../../hooks/hooks";

const OrderItem = (props: TOrderItem) => {

    const { order ,  type } = props;
    const location = useLocation();
    const {items : ingredients} =  useAppSelector(selectIngredients);


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

   const orderIngredients  = useMemo(() => {
            return order?.ingredients.map((id) => {
                return ingredients.find((ingredient:TIngredient) => ingredient._id === id
                );
            })
        }, [ingredients, order]);

    const length =  orderIngredients.length;

    let orderPrice = useMemo(() => {
        return orderIngredients.reduce<any>((result, elem ) => result + elem?.price ?? 0, 0);
    }, [orderIngredients]);

    return (
        <Link
            to={type==='profile'
                ?`/profile/orders/${order.number}`
                : `/feed/${order.number}`}
            state = {{ background: location }}
            className={`p-6 ${styles.orderInfo}`} >

            <div className={`${styles.card}`}>
                <div className={`${styles.header}`}>
                    <div className={`text text_type_digits-default ${styles.order__number}`}>
                        #{order.number}
                    </div>
                    <div className={`text text_type_main-default text_color_inactive ${styles.order__date}`}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </div>
                </div>
                <div className={`text_type_main-medium ${styles.caption}`}>
                    {order.name}

                    {location.pathname !== "/feed" && (
                        <div className={`pt-2 text text_type_main-small ${styles.orderInfo__status_complete}`}>
                            {orderStatus()}
                        </div>
                    )}
                </div>
                <div className={`${styles.footer}`}>
                    <div className={`${styles.order__items}`}>
                        {
                            orderIngredients?.map((elem,i) => {
                            if( i < 5){
                                return (
                                    <div className={`${styles.order__image}`} key={i} style={{zIndex:length*2-i}}>
                                        <div className={`${styles.order__imageWrapper}`}>
                                            <img src={elem?.image} alt={`${elem?.name}`} />
                                        </div>
                                    </div>
                                )
                                }
                            if( i === 5) {
                                return (
                                    <div className={`${styles.order__image}`} key={i} style={{zIndex:length*2-i}}>
                                        <div className={`${styles.order__imageWrapper}`}>
                                            <img src={elem?.image} alt={`${elem?.name}`} />
                                            <p className={`${styles.more} text text_type_digits-default`}>{'+' + (length - 5)}</p>
                                        </div>
                                    </div>
                                )
                            }
                            })
                        }
                    </div>
                    <div className={`${styles.order__sum}`}>
                        <div className="text text_type_digits-default">{orderPrice}</div>
                        <div> <CurrencyIcon type="primary" /> </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderItem