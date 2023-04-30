import {
    ConstructorElement, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './draggable-item.module.css';


const DraggableItem = ({ item }) => {
    // console.log({ name, image, price });
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

export default DraggableItem