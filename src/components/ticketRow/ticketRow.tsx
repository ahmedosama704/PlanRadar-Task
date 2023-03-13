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
    const { setShowDetails, setTicketData } = useContext(MainContext);
    const priorityBg = data.priority == "High" ? "red" : data.priority == "Medium" ? "orange" : "#00cfb2"
    return (
        <div className={Styles.rowItem} key={data.id} style={{ top: (props.itemPosition + props.index) * props.itemHeight }}>
            <div className={Styles.priority}><span style={{ background: priorityBg }}> {data.priority}</span></div>
            <div className={Styles.subject}>  <img src='/images/to-do-list.png' /> {data.subject}</div>
            <div className={Styles.status}>{data.status}</div>
            <div className={Styles.buttons}>
                <button onClick={() => { setShowDetails(true); setTicketData(data) }}> Details </button>
            </div>
        </div>
    )
}
export default TicketRow 