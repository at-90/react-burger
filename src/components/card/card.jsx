import { useState } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import styles from './card.module.css';
import {
    CurrencyIcon, Counter
} from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ data }) => {

    const { name, image, price } = data
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
                title="Детали ингредиента"
                closeModal={handleModalClose}>
                <IngredientDetails data={data} />
            </Modal>)}
        </>
    )
}


Card.propTypes = {
    data: ingredientsTypes.isRequired
}


export default Card