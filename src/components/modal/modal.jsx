import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css';

const modalRoot = document.querySelector("#modal");

const Modal = ({ title, closeModal, children, isOpen, typeContent }) => {

    const modalElement = useMemo(() => document.createElement('div'), []);
    const modalConentStyles = typeContent === 'order' ? 'pt-10 pr-10 pl-10 pb-30' : 'pt-10 pr-10 pl-10 pb-15';

    const handleModalClose = (e) => {
        closeModal(false);
    };

    useEffect(() => {

        if (isOpen) {
            modalRoot.append(modalElement)
            return () => {
                modalRoot.removeChild(modalElement)
            }
        }

    }, [])


    if (isOpen) {
        return createPortal(
            <>
                <ModalOverlay closeModal={handleModalClose} onClick={closeModal} >
                    <div className={modalStyles.modal} onClick={(e) => { e.stopPropagation() }}>
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
    }

    return null


};


Modal.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    typeContent: PropTypes.string
}

Modal.defaultProps = {
    closeModal() { },
    title: '',
    isOpen: false,
    typeContent: 'info'
}


export default Modal