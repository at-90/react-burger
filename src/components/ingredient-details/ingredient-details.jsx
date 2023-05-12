import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ data }) => {

    const ingredientInfo = data;

    return (

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
    item: ingredientsTypes.isRequired
}

export default IngredientDetails