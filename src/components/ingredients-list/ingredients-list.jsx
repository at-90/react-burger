import Card from '../card/card';
import styles from './ingredients-list.module.css';


const IngredientsList = ({ ingredients }) => {
    return (
        <ul className={[styles.container, 'pt-6 pb-10'].join(' ')}>
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

export default IngredientsList