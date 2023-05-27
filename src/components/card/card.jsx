import { useState } from 'react';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import { INGREDIENT_DETAILS_SET } from '../../services/actions/ingredients-details';
import styles from './card.module.css';
import {
    CurrencyIcon, Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const Card = ({ data, count }) => {

    const { name, image, price } = data;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()

    const [{ opacity, isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...data },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.1 : 1
        })
    })

    const handleModalOpen = () => {
        setIsModalOpen(true);
        dispatch({
            type: INGREDIENT_DETAILS_SET,
            item: data
        })
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <article ref={dragRef} className={styles.card} onClick={handleModalOpen}  >
                {count > 0 && <Counter count={count} />}
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
    data: ingredientsTypes.isRequired,
    count: PropTypes.number
}


export default Card