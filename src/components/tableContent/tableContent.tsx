import React from 'react'
import Styles from './tableContent.module.scss'

const TableContent: React.FC = () => {
    return (
        <div className={Styles.rowItem}>
            <div className={Styles.priority}> <h3> Priority</h3> </div>
            <div className={Styles.subject}>  <h3> Ticket </h3> </div>
            <div className={Styles.status}> <h3> Status</h3> </div>
        </div>
    )
}
export default TableContent 