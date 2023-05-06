import { useState } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import styles from './card.module.css';
import {
    CurrencyIcon, Counter
} from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ _id, name, image, price }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <article className={styles.card} onClick={handleModalOpen}  >
                {name === 'Краторная булка N-200i' && <Counter count="1" />}
                <img className={styles.cardImage} src={image} alt={1} />
                <div className={styles.cardPrice}>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
            </article>
            {isModalOpen && (<Modal
                isOpen={isModalOpen}
                title="Детали ингредиента"
                closeModal={handleModalClose}>
                <IngredientDetails _id={_id} />
            </Modal>)}
        </>
    )
}


Card.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired
}

Card.defaultProps = {
    name: 'Неизвестный',
    image: 'No Picture'
}


export default Card