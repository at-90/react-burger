import Card from '../card/card';
import PropTypes from 'prop-types';
import { ingredientsTypes } from '../../constants/data-types';
import styles from './ingredients-list.module.css';
import { useSelector } from 'react-redux';


const IngredientsList = ({ ingredients }) => {

    const { buns, components } = useSelector(store => store.burgerConstructor);
    let counts = {};

    buns.length && (counts[buns[0]._id] = 2)
    components.forEach(elem => {
        let count = counts[elem._id] ?? 0;
        counts[elem._id] = 1 * ++count;
    })

    return (

        <ul className={[styles.container, 'pt-6 pb-10'].join(' ')}>

            {
                ingredients.map((elem) => {
                    const { _id } = elem
                    return (
                        < li className="ingredient" key={_id} >
                            <Card data={elem} count={counts[_id]} />
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