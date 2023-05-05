import Card from '../card/card';
import PropTypes from 'prop-types'
import styles from './ingredients-list.module.css';


const IngredientsList = ({ ingredients }) => {
    return (
        <ul className={[styles.container, 'pt-6 pb-10'].join(' ')}>
            {console.log(ingredients)}
            {
                ingredients.map(({ _id, name, image, price }) => {
                    return (
                        < li className="ingredient" key={_id} >
                            <Card name={name} image={image} price={price} />
                        </li>
                    )

                })
            }

        </ul>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.string
    })).isRequired
}


export default IngredientsList