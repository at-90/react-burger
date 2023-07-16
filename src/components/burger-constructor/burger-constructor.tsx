import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
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
import { ADD_BUN, ADD_INGREDIENT, CONSTRUCTOR_UPDATE, CONSTRUCTOR_RESET } from '../../services/actions/burger-constructor';
import uuid from 'react-uuid';
import {useNavigate} from "react-router-dom";

type TIngredientDragType = {
    id: string;
    type: string,
    index: number;
}

type TIngredient = {
    id:string;
    type: string
    name: string;
    price: number;
    image: string;
    dragId: number;

}

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((store:any)  => store.user.isLoggedIn);

    const getStoreComponents = ((store:any) => store.burgerConstructor.components)
    const getStoreBuns = ((store:any) => store.burgerConstructor.buns)
    const getStoreTotalSum = ((store:any) => store.burgerConstructor.totalSum)
    const getStoreOrderDetails = ((store:any) => store.orderDetails)


    const orderList = useSelector(getStoreComponents);
    const buns = useSelector(getStoreBuns);
    const totalSum = useSelector(getStoreTotalSum);
    const orderDetails = useSelector(getStoreOrderDetails);

    const bun = buns[0] ?? null;

    const cart = useMemo(() => { return [...buns, ...orderList] }, [orderList, buns])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [, dropTargetRef] = useDrop<TIngredientDragType>({
        accept: "ingredient",
        drop(item ) {

            if (item.type === 'bun') {
                dispatch({
                    type: ADD_BUN,
                    item: {
                        ...item,
                        dragId: uuid()
                    }
                });
            } else {
                dispatch({
                    type: ADD_INGREDIENT,
                    item: {
                        ...item,
                        dragId: uuid(),
                    }
                });
            }

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
        dispatch({
            type: CONSTRUCTOR_RESET,
        });
    }

    const handleCheckout = () => {
        if(isLoggedIn){
            dispatch({type: ORDER_DETAILS_RESET});
            dispatch<any>(checkout(cart));
            handleModalOpen();
        }else{
            navigate('/login')}
    }

    useEffect(
        () => {
            let total = 0;
            cart.map(item => (total += 1 * item.price));
            dispatch({ type: 'CONSTRUCTOR_TOTALSUM', totalSum: total });
        },
        [orderList, buns, orderDetails]
    );

    const moveCard = useCallback((dragIndex:number, hoverIndex: number) => {

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
                            {orderList.map((elem: TIngredient, index: number) => {
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
                                {totalSum}
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