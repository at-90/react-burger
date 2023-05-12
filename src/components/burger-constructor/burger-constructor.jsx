import { useState, useEffect, useContext, useMemo } from 'react';
import { IngredientsContext, ProductsContext, TotalSumContext } from '../../services/productsContext';
import { sendApiOrderDetails } from '../../utils/getApiData';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from './burger-constructor.module.css';
import DraggableItem from '../draggable-item/draggable-item';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { API_ORDERS } from '../../constants/api';


const BurgerConstructor = () => {

    const { ingredients } = useContext(IngredientsContext);
    const { totalSum, totalSumDispatcher } = useContext(TotalSumContext);

    const buns = ingredients.filter(elem => elem.type === 'bun');
    const rundomBun = useMemo(() => { return buns[Math.floor(Math.random() * buns.length)] }, [buns]);

    const orderList = ingredients.filter(elem => elem.type !== 'bun');

    const [order, setOrder] = useState({});

    const orderStructure = useMemo(() => {

        let idArray = [rundomBun._id];
        orderList.forEach(elem => idArray.push(elem._id));
        return idArray

    }, [orderList])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleCheckout = async () => {

        const getOrder = async () => {
            const result = await sendApiOrderDetails(API_ORDERS, orderStructure);

            if (result.success) {
                setOrder(result)
            }
            else {
                return false
            }
        }
        await getOrder();
        handleModalOpen()
    }

    useEffect(
        () => {
            let total = 2 * rundomBun.price;
            orderList.map(item => (total += 1 * item.price));
            totalSumDispatcher({ type: 'calculate', payload: total });
        },
        [ingredients, totalSumDispatcher, order]
    );


    return (
        <div className={burgerConstructorStyles.order}>

            {<ConstructorElement
                type="top"
                isLocked={true}
                text={`${rundomBun.name} (верх)`}
                price={rundomBun.price}
                thumbnail={rundomBun.image}
            />}
            <div className="scrollList scrollList-short mt-4 mb-4 pr-2 nmr-4">
                <div className={burgerConstructorStyles.orderList}>
                    {orderList.map((elem) => {
                        return <DraggableItem item={elem} key={elem._id} />
                    })
                    }
                </div>
            </div>
            {<ConstructorElement
                type="top"
                isLocked={true}
                text={`${rundomBun.name} (низ)`}
                price={rundomBun.price}
                thumbnail={rundomBun.image}
                extraClass="constructor-element_pos_bottom"
            />}

            <div className={[burgerConstructorStyles.amount, 'pt-10'].join(' ')}>
                <div className={[burgerConstructorStyles.amountValue, 'mr-10'].join(' ')}>
                    <span className={"text text_type_digits-medium"}>
                        {totalSum.sum}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleCheckout}>Оформить заказ</Button>
            </div>
            {isModalOpen && (<Modal
                isOpen={isModalOpen}
                title=""
                typeContent="order"
                closeModal={handleModalClose}>
                <OrderDetails order={order.order} />
            </Modal>)}
        </div>
    )
}

export default BurgerConstructor