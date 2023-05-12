import { useState, useEffect, useContext, useReducer } from 'react';
import { IngredientsContext, ProductsContext, TotalSumContext } from '../../services/productsContext';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from './burger-constructor.module.css';
import DraggableItem from '../draggable-item/draggable-item';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const BurgerConstructor = () => {

    const { ingredients } = useContext(IngredientsContext);
    const { totalSum, totalSumDispatcher } = useContext(TotalSumContext);

    const buns = ingredients.filter(elem => elem.type === 'bun');

    const rundomBun = buns[Math.floor(Math.random() * buns.length)];

    const orderList = ingredients.filter(elem => elem.type !== 'bun');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    useEffect(
        () => {
            let total = 2 * rundomBun.price;
            orderList.map(item => (total += 1 * item.price));
            console.log(total);
            totalSumDispatcher({ type: 'calculate', payload: total });
        },
        [ingredients, totalSumDispatcher]
    );

    return (
        <div className={burgerConstructorStyles.order}>

            {buns.length && <ConstructorElement
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
            {buns.length && <ConstructorElement
                type="top"
                isLocked={true}
                text={`${rundomBun.name} (низ)`}
                price={rundomBun.price}
                thumbnail={rundomBun.image}
            />}

            <div className={[burgerConstructorStyles.amount, 'pt-10'].join(' ')}>
                <div className={[burgerConstructorStyles.amountValue, 'mr-10'].join(' ')}>
                    <span className={"text text_type_digits-medium"}>
                        {totalSum.sum}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleModalOpen}>Оформить заказ</Button>
            </div>
            {isModalOpen && (<Modal
                isOpen={isModalOpen}
                title=""
                typeContent="order"
                closeModal={handleModalClose}>
                <OrderDetails />
            </Modal>)}
        </div>
    )
}



export default BurgerConstructor