import PropTypes from 'prop-types';
import iconDone from '../../images/icon-done.svg';
import styles from './order-details.module.css';

const OrderDetails = ({ order }) => {
    return (
        <>
            <p className={[styles.orderNumber, 'text text_type_digits-large mb-8'].join(' ')}>{order.number}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img className={[styles.iconDone, 'mb-15'].join(' ')} src={iconDone} alt="Готов" />
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

OrderDetails.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number.isRequired
    }).isRequired
}

OrderDetails.defaultProps = {
    order: {
        number: 0
    }
}


export default OrderDetails