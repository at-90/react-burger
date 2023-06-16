import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import { INGREDIENT_DETAILS_SET } from '../../services/actions/ingredients-details';
import { Link, useLocation } from "react-router-dom";
import styles from './card.module.css';
import {
    CurrencyIcon, Counter
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

const Card = ({ data, count }) => {

    const location = useLocation();
    const ingredientId = data['_id'];

    const { name, image, price } = data;

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

          dispatch({
            type: INGREDIENT_DETAILS_SET,
            item: data
        })

    }

    return <Link
            key={ingredientId}
            to ={`/ingredients/${ingredientId}`}
            state = {{ background: location }}
            ref={dragRef}
            onClick={handleModalOpen}>
            <article  className={styles.card} >
                {count > 0 && <Counter count={count} />}
                <img className={styles.cardImage} src={image} alt={1} />
                <div className={styles.cardPrice}>
                    <span className="text text_type_digits-default">{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
            </article>
        </Link>
}


Card.propTypes = {
    data: ingredientsTypes.isRequired,
    count: PropTypes.number
}


export default Card