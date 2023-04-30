import styles from './card.module.css';
import {
    CurrencyIcon, Counter
} from "@ya.praktikum/react-developer-burger-ui-components";

const Card = ({ name, image, price }) => {
    return (
        <article className={styles.card}>
            {name === 'Краторная булка N-200i' && <Counter count="1" />}
            <img className={styles.cardImage} src={image} alt={1} />
            <div className={styles.cardPrice}>
                <span className="text text_type_digits-default">{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </article>
    )
}

export default Card