import PropTypes from 'prop-types';
import {useMemo} from "react";
import { ingredientsTypes } from '../../constants/data-types';
import { useParams } from "react-router-dom";
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ingredients}) => {

    const { ingredientId } = useParams();

    const ingredientInfo = useMemo(() => {
        return ingredients.find((elem) => elem._id === ingredientId);
    }, [ingredients, ingredientId]);

    if (!ingredientInfo) {

        return null;
    }


    return (

        ingredientInfo &&
        <div className={`${styles.details}`}>
            <div className={`ml-5 mr-5 mb-4 ${styles.detailsImage}`}>
                <img src={ingredientInfo.image_large} alt={ingredientInfo.name} />
            </div>
            <h2 className={`mb-8 text text_type_main-medium ${styles.detailsTitle}`}>
                {ingredientInfo.name}
            </h2>
            <div className={`${styles.detailsInfo}`}>
                <dl className={[styles.detailsInfoElement, `text text_type_main-small text_color_inactive`].join(' ')}>
                    <dt>Калории, ккал</dt>
                    <dd className="text text_type_digits-default mt-2">{ingredientInfo.calories}</dd>
                </dl>
                <dl className={[styles.detailsInfoElement, `text text_type_main-small text_color_inactive`].join(' ')}>
                    <dt>Белки, г</dt>
                    <dd className="text text_type_digits-default mt-2">{ingredientInfo.proteins}</dd>
                </dl>
                <dl className={[styles.detailsInfoElement, `text text_type_main-small text_color_inactive`].join(' ')}>
                    <dt>Жиры, г</dt>
                    <dd className="text text_type_digits-default mt-2">{ingredientInfo.fat}</dd>
                </dl>
                <dl className={[styles.detailsInfoElement, `text text_type_main-small text_color_inactive`].join(' ')}>
                    <dt>Углеводы, г</dt>
                    <dd className="text text_type_digits-default mt-2">{ingredientInfo.carbohydrates}</dd>
                </dl>
            </div>
        </div>
    )
}


IngredientDetails.propTypes = {
    data: ingredientsTypes.isRequired
}

export default IngredientDetails