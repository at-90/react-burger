import { useState, useEffect } from 'react';
import { API_INGREDIENTS } from '../../constants/api.js';
import { getDataResource } from '../../utils/getApiData.js';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import imageStatic from '../../images/bun-02.png'
import burgerConstructorStyles from './burger-constructor.module.css';
import DraggableItem from '../draggable-item/draggable-item';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";


const BurgerConstructor = () => {

    const [orderList, setOrderList] = useState([]);
    const [error, setError] = useState(false);

    const getData = async function (url) {

        const result = await getDataResource(url);

        if (result) {
            const order = result.map(elem => {

                const { _id, name, image, type, price } = elem;

                return {
                    _id, name, image, type, price
                }
            });

            setOrderList(order);
            setError(false)
        }
        else {
            setError(true)
        }
    }

    useEffect(() => {
        getData(API_INGREDIENTS);
    }, [])



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

export default BurgerConstructor