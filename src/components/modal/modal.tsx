import React, { Children, useContext, useState } from 'react'
import Styles from './modal.module.scss'
import { MainContext } from '../context/MainContext';

type ContainerProps = {
    children: React.ReactNode;
};

const Modal = (props: ContainerProps) => {
    const { modal, setModal, setShowEdit, setTicketData, setShowTicketDetails, setAddNewTicket } = useContext(MainContext);
    const handleCloseModal = () => {
        setTicketData({});
        setModal(false);
        setShowTicketDetails(false);
        setAddNewTicket(false)
    }
    return (
        <>
            {modal && (
                <div className={Styles.modal}>
                    <a className={Styles.opacityBg} onClick={handleCloseModal} />
                    <div className={Styles.modalContent}>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    )
}
export default Modal