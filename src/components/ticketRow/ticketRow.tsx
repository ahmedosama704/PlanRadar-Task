import React, { useContext } from 'react'
import Styles from './ticketRow.module.scss'
import { MainContext } from '../context/MainContext';
interface RowType {
    data: DataTypes;
    index: any;
    itemHeight: number;
    itemPosition: number;
}
interface DataTypes {
    id?: number;
    subject?: string;
    status?: string;
    priority?: string;
    description?: string;
}
const TicketRow: React.FC<RowType> = (props) => {
    const data = props.data;
    const { setTicketData, setModal, setShowTicketDetails } = useContext(MainContext);
    const priorityBg = data.priority == "High" ? "red" : data.priority == "Medium" ? "orange" : "#00cfb2"

    const showDetailsModal = () => {
        setModal(true);
        setTicketData(data);
        setShowTicketDetails(true)
    }
    return (
        <div className={Styles.rowItem} key={data.id} style={{ top: (props.itemPosition + props.index) * props.itemHeight }}>
            <div className={Styles.priority}><span style={{ background: priorityBg }}> {data.priority}</span></div>
            <div className={Styles.subject}>    <img src='/images/to-do-list.png' /> [{data.id}] {data.subject}</div>
            <div className={Styles.status}>{data.status}</div>
            <div className={Styles.buttons}>
                <button onClick={showDetailsModal}> Details </button>
            </div>
        </div>
    )
}
export default TicketRow 