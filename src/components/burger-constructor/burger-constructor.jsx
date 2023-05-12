import { useState, useEffect } from 'react';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import imageStatic from '../../images/bun-02.png'
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types.js';
import burgerConstructorStyles from './burger-constructor.module.css';
import DraggableItem from '../draggable-item/draggable-item';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const BurgerConstructor = ({ data }) => {

    const orderList = data;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className={burgerConstructorStyles.order}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={imageStatic}
            />
            <div className="scrollList scrollList-short mt-4 mb-4 pr-2 nmr-4">
                <div className={burgerConstructorStyles.orderList}>
                    {orderList.filter(elem => elem.name !== 'Краторная булка N-200i').map((elem) => {

                        return <DraggableItem item={elem} key={elem._id} />

                    })
                    }
                </div>
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={1255}
                thumbnail={imageStatic}
            />

            <div className={[burgerConstructorStyles.amount, 'pt-10'].join(' ')}>
                <div className={[burgerConstructorStyles.amountValue, 'mr-10'].join(' ')}>
                    <span className={"text text_type_digits-medium"}>
                        610
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientsTypes).isRequired
}


export default BurgerConstructor