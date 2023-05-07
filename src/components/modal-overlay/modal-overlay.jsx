import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, closeModal }) => {

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            {children}
        </div>
    )
}


ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node).isRequired,
        PropTypes.node.isRequired
    ])
}

ModalOverlay.defaultProps = {
    closeModal() { }
}


export default ModalOverlay