import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import styles from './ingredients-list.module.css';


const IngredientsList = ({ ingredients }) => {

    return (

        <ul className={[styles.container, 'pt-6 pb-10'].join(' ')}>

            {
                ingredients.map((elem) => {
                    const { _id } = elem
                    return (
                        < li className="ingredient" key={_id} >
                            <Card data={elem} />
                        </li>
                    )

                })
            }

        </ul>

    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes).isRequired
}


export default IngredientsList