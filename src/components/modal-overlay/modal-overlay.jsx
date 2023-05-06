import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ children, closeModal }) => {

    const overlayRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal(false);
        }
    }

    useEffect(() => {
        overlayRef.current.focus();
    }, []);

    return (
        <div className={styles.modalOverlay} onClick={closeModal} ref={overlayRef} tabIndex={-1} onKeyDown={handleKeyDown}>
            {children}
        </div>
    )
}


ModalOverlay.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

ModalOverlay.defaultProps = {
    closeModal() { }
}


export default ModalOverlay