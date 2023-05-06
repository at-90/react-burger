import PropTypes from 'prop-types'
import {
    ConstructorElement, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './draggable-item.module.css';


const DraggableItem = ({ item }) => {

    return (
        <article className={styles.item}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image} />
        </article>
    )
}

DraggableItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired
    })
}


export default DraggableItem