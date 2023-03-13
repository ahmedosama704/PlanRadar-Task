import React, { useState, useEffect } from 'react'
import Styles from './editTicket.module.scss'
import { useMutation, useQueryClient } from 'react-query'
import { updateTicket } from '../constants/ticketsApi'
interface PropsType {
    data: DataTypes;
    handleCloseModal: void | any
}
interface DataTypes {
    id?: number;
    subject?: string;
    status?: string;
    priority?: string;
    description?: string;
}


const EditTicket: React.FC<PropsType> = (props) => {
    const data = props.data;
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [formData, setFormData] = useState<any>({
        subject: "",
        status: "",
        priority: "",
        description: "",
    });
    const webQueryClient = useQueryClient();
    const updateMutation = useMutation(updateTicket, {
        onSuccess: () => {
            webQueryClient.invalidateQueries("tickets")
        }
    })

    const status = [
        { key: "0", value: "To Do" },
        { key: "1", value: "Doing" },
        { key: "2", value: "Done" }
    ];

    const priority = [
        { key: "0", value: "High" },
        { key: "1", value: "Medium" },
        { key: "2", value: "Low" }
    ];

    useEffect(() => {
        setFormData(
            {
                subject: data.subject,
                status: data.status,
                priority: data.priority,
                description: data.description,
            }
        )

    }, [data.id])

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        updateMutation.mutate({
            ...data,
            subject: formData.subject,
            status: formData.status,
            priority: formData.priority,
            description: formData.description,
        });
        setTimeout(() => {
            setMessage("Ticket Updated")
            setIsLoading(false);
        }, 1000)
    };

    return (
        <div>
            {isLoading ? (
                <div className="loader modalLoader">
                    <div className="loading"> </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={Styles.form}>
                    <h5 className={Styles.message}> {message}</h5>
                    <div>
                        <label>Subject</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                    </div>
                    <div>
                        <label> Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            {status.map((item) =>
                                <option key={item.key} value={item.value}> {item.value}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label> Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            {priority.map((item) =>
                                <option key={item.key} value={item.value}> {item.value}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label> Description </label>
                        <textarea rows={5} name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <button type="submit" className={Styles.save}>  Save  </button>
                    <button onClick={props.handleCloseModal} className={Styles.close}>  Close  </button>
                </form>
            )}
        </div>
    )
}
export default EditTicket