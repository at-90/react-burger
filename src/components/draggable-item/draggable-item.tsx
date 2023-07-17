
import { useRef } from 'react';
import { CONSTRUCTOR_REMOVE_ITEM } from '../../services/actions/burger-constructor';
import {
    ConstructorElement, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from './draggable-item.module.css';
import {  TIngredient} from "../../constants/types";
import {useAppDispatch} from "../../hooks/hooks";

type TDraggableItem = {
    item: TIngredient;
    index: number ;
    moveCard: (dragIndex: number, hoverIndex: number)=> void;
}

const DraggableItem :React.FC<TDraggableItem> = ({ item, index, moveCard }) => {

    const dispatch = useAppDispatch()
    const handleRemove = () => {

        dispatch({
            type: CONSTRUCTOR_REMOVE_ITEM,
            dragId: item.dragId
        })
    }

    const ref = useRef<HTMLElement>(null);
    const [{ handlerId  }, drop] = useDrop({

        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },

        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item._id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    if (item.type !== 'bun') drag(drop(ref));

    const preventDefault = ()=>(e: Event) => e.preventDefault();

    return (
        <article
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
            className={styles.item} >
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={handleRemove} />
        </article>
    )
}

export default DraggableItem