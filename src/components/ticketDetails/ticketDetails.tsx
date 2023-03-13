import React, { useContext, useState } from 'react'
import Styles from './ticketDetails.module.scss'
import { MainContext } from '../context/MainContext';
import EditTicket from './../editTicket/editTicket';

interface DataTypes {
    id?: number;
    subject?: string;
    status?: string;
    priority?: string;
    description?: string;
}

const TicketDetails: React.FC = () => {
    const { setShowDetails, ticketData, setTicketData } = useContext(MainContext);
    const [showEdit, setShowEdit] = useState(false);
    const data: DataTypes = ticketData;
    const priorityBg = data.priority == "High" ? "red" : data.priority == "Medium" ? "orange" : "#00cfb2"

    const handleCloseModal = () => {
        setShowEdit(false);
        setShowDetails(false);
        setTicketData({});
    }
    return (
        <div className={Styles.ticketDetails}>
            <a className={Styles.opacityBg} onClick={handleCloseModal} />
            <div className={Styles.modal}>
                {showEdit ? (<EditTicket data={data} handleCloseModal={handleCloseModal} />) : (
                    <div>
                        <h2> {data.subject} </h2>
                        <div className={Styles.rowItem}>
                            <div className={Styles.priority}>  Priority : <span style={{ background: priorityBg }}> {data.priority} </span>  </div>
                            <div className={Styles.status}>  Status : {data.status} </div>
                        </div>
                        <p> {data.description} </p>

                        <div className={Styles.buttons}>
                            <button onClick={() => { setShowEdit(true); }}> Edit  </button>
                            <button onClick={handleCloseModal}> Close </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default TicketDetails