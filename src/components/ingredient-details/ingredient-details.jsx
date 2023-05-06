import { useState, useEffect } from 'react';
import { API_INGREDIENTS } from '../../constants/api.js';
import { getDataResource } from '../../utils/getApiData.js';
import ErrorBoundary from '../error/error-boundary';
import PropTypes from 'prop-types'
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ _id }) => {

    const [ingredientInfo, setIngredientInfo] = useState({});
    const [error, setError] = useState(false);

    const getData = async function (url) {

        const result = await getDataResource(url);

        if (result) {
            const ingredient = result.find(elem => elem._id === _id);
            setIngredientInfo(ingredient)
            setError(false)
        }
        else {

            setError(true)
        }
    }

    useEffect(() => {
        getData(API_INGREDIENTS)
    }, [_id])

    return (
        <ErrorBoundary errorApp={error}>
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
        </ErrorBoundary>
    )
}


IngredientDetails.propTypes = {
    _id: PropTypes.string.isRequired
}



export default IngredientDetails