import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { TotalSumContext } from '../../services/productsContext';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { checkout } from '../../services/actions/order-details';
import { ORDER_DETAILS_RESET } from '../../services/actions/order-details';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import burgerConstructorStyles from './burger-constructor.module.css';
import DraggableItem from '../draggable-item/draggable-item';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';
import { addIngredient, CONSTRUCTOR_UPDATE } from '../../services/actions/burger-constructor';



const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const orderList = useSelector(store => store.burgerConstructor.components);
    const buns = useSelector(store => store.burgerConstructor.buns);
    const bun = buns[0] ?? null;
    const { totalSum, totalSumDispatcher } = useContext(TotalSumContext);

    const cart = useMemo(() => { return [...buns, ...orderList] }, [orderList, buns])

    const orderDetails = useSelector(store => store.orderDetails);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [, dropTargetRef] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addIngredient(item))
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleCheckout = () => {

        dispatch({
            type: ORDER_DETAILS_RESET
        });
        dispatch(checkout(cart));
        handleModalOpen()
    }

    useEffect(
        () => {
            let total = 0;
            orderList.map(item => (total += 1 * item.price));
            totalSumDispatcher({ type: 'calculate', payload: total });
        },
        [orderList, totalSumDispatcher, orderDetails]
    );

    const moveCard = useCallback((dragIndex, hoverIndex) => {

        const dragCard = orderList[dragIndex];
        const newCards = [...orderList]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        dispatch({
            type: CONSTRUCTOR_UPDATE,
            components: newCards,
        })

    }, [orderList, dispatch]);

    return (

        <div ref={dropTargetRef} className={burgerConstructorStyles.order}>
            {(orderList.length || buns.length)
                ? <>
                    {bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    }

                    <div className="scrollList scrollList-short mt-4 mb-4 pr-2 nmr-4">
                        <div className={burgerConstructorStyles.orderList}>
                            {orderList.map((elem, index) => {
                                return <DraggableItem item={elem} key={elem.dragId} index={index} moveCard={moveCard} />
                            })
                            }
                        </div>
                    </div>

                    {bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass="constructor-element_pos_bottom"
                        />
                    }

                    <div className={[burgerConstructorStyles.amount, 'pt-10'].join(' ')}>
                        <div className={[burgerConstructorStyles.amountValue, 'mr-10'].join(' ')}>
                            <span className={"text text_type_digits-medium"}>
                                {totalSum.sum}
                            </span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button htmlType="button" type="primary" size="large" onClick={handleCheckout}>Оформить заказ</Button>
                    </div>
                    {isModalOpen && orderDetails.order && <Modal
                        title=""
                        typeModal="big"
                        closeModal={handleModalClose}>
                        <OrderDetails order={orderDetails.order.order} />

                    </Modal>}
                </>
                : <div className={burgerConstructorStyles.cta}>Перетащите ингредиенты</div>
            }
        </div>

    )
}



export default BurgerConstructor