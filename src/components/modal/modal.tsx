import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

type TModal = {
    title: string;
    children?: React.ReactNode;
    typeModal: string;
    closeModal: ()=>void;
}

const Modal: React.FC<TModal> = ({ title,   children, typeModal , closeModal}) => {

    const modalContentStyles = typeModal === 'big' ? 'pt-10 pr-10 pl-10 pb-30' : 'pt-10 pr-10 pl-10 pb-15';

    const overlayRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    useEffect(() => {
        overlayRef.current?.focus();
    }, [])


    return createPortal(
        <>
            <ModalOverlay  onClick={closeModal} >
                <div className={modalStyles.modal} onClick={(e) => { e.stopPropagation() }} ref={overlayRef} tabIndex={-1} onKeyDown={handleKeyDown}>
                    <div className={[modalStyles.modalHeader, 'pt-10 pr-7 pl-10'].join(' ')}>
                        <h2 className="text text_type_main-large">{title}</h2>
                        <button type="button" className={modalStyles.btnClose} onClick={closeModal} >
                            <CloseIcon type="primary" />
                        </button>
                    </div>
                    <div className={modalContentStyles} >
                        {children}
                    </div>
                </div>
            </ModalOverlay>
        </>, modalRoot
    )
};



export default Modal