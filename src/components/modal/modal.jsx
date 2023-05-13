import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css';

const modalRoot = document.querySelector("#modal");

const Modal = ({ title, closeModal, children, typeModal }) => {

    const modalConentStyles = typeModal === 'big' ? 'pt-10 pr-10 pl-10 pb-30' : 'pt-10 pr-10 pl-10 pb-15';

    const overlayRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal(false);
        }
    }

    const handleModalClose = (e) => {
        closeModal(false);
    };

    useEffect(() => {
        overlayRef.current.focus();
    }, [])


    return createPortal(
        <>
            <ModalOverlay closeModal={handleModalClose} onClick={closeModal} >
                <div className={modalStyles.modal} onClick={(e) => { e.stopPropagation() }} ref={overlayRef} tabIndex={-1} onKeyDown={handleKeyDown}>
                    <div className={[modalStyles.modalHeader, 'pt-10 pr-7 pl-10'].join(' ')}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <button type="button" className={modalStyles.btnClose} onClick={closeModal} >
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    <div className={modalConentStyles} >
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </>, modalRoot
    )
};


Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node).isRequired,
        PropTypes.node.isRequired
    ]).isRequired,
    title: PropTypes.string,
    typeModal: PropTypes.string
}

Modal.defaultProps = {
    closeModal() { },
    title: '',
    isOpen: false,
    typeModal: 'info'
}


export default Modal