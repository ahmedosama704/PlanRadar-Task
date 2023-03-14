import React, { useState, useContext } from 'react';
import Styles from './addNewModal.module.scss';
import { useQuery } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';
import { addTicket, getTickets } from '../constants/ticketsApi';
import Modal from './../modal/modal';
import { MainContext } from '../context/MainContext';

interface DataTypes {
    id?: number;
    subject: string;
    status: string;
    priority: string;
    description: string;
}


const AddNewModal = () => {
    const { setAddNewTicket, setModal } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [subjectAlert, setSubjectAlert] = useState<boolean>(false)
    const [statusAlert, setStatusAlert] = useState<boolean>(false)
    const [priorityAlert, setPriorityAlert] = useState<boolean>(false)
    const [descriptionAlert, setDescriptionAlert] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [formData, setFormData] = useState<DataTypes>({
        subject: "",
        status: "",
        priority: "",
        description: "",
    });
    const webQueryClient = useQueryClient();
    const {
        data
    } = useQuery('tickets', getTickets);

    const addMutation = useMutation(addTicket, {
        onSuccess: () => {
            webQueryClient.invalidateQueries("tickets")
        }
    })
    // status data
    const status = [
        { key: "0", value: "Select Status" },
        { key: "1", value: "To Do" },
        { key: "2", value: "Doing" },
        { key: "3", value: "Done" }
    ];
    // priority data
    const priority = [
        { key: "0", value: "Select Priority" },
        { key: "1", value: "High" },
        { key: "2", value: "Medium" },
        { key: "3", value: "Low" }
    ];



    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        // Form validation
        if (formData.subject.length < 3) {
            setSubjectAlert(true)
        } else {
            setSubjectAlert(false)
        }

        if (formData.status.length < 2) {
            setStatusAlert(true)
        } else {
            setStatusAlert(false)
        }

        if (formData.priority.length < 3) {
            setPriorityAlert(true)
        } else {
            setPriorityAlert(false)
        }

        if (formData.description.length < 3) {
            setDescriptionAlert(true)
        } else {
            setDescriptionAlert(false)
        }
        // Check form data before submiting  
        if (formData.subject.length > 3 && formData.status.length > 2 && formData.priority.length > 3 && formData.description.length > 3) {
            addMutation.mutate({
                id: data.length,
                subject: formData.subject,
                status: formData.status,
                priority: formData.priority,
                description: formData.description,
            });
            setTimeout(() => {
                setMessage("Ticket Added")
                setIsLoading(false);
                handleCloseModal();
            }, 1000)
        } else {
            setTimeout(() => {
                setMessage("Please check form validation")
                setIsLoading(false);
            }, 1000)
        }

    };

    const handleCloseModal = () => {
        setModal(false);
        setAddNewTicket(false)
    }

    return (
        <Modal>
            {isLoading ? (
                <div className="loader modalLoader">
                    <div className="loading"> </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={Styles.form}>
                    <h5 className={Styles.message}> {message}</h5>
                    <div>
                        <label>Subject * {subjectAlert && <span className={Styles.alert}> Please insert ticket subject  </span>}</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                    </div>
                    <div>
                        <label> Status * {statusAlert && <span className={Styles.alert}> Please choose ticket status  </span>}</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            {status.map((item) =>
                                <option key={item.key} value={item.value}> {item.value}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label> Priority * {priorityAlert && <span className={Styles.alert}> Please choose ticket priority  </span>} </label>
                        <select name="priority" value={formData.priority} onChange={handleChange}>
                            {priority.map((item) =>
                                <option key={item.key} value={item.value}> {item.value}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label> Description * {descriptionAlert && <span className={Styles.alert}> Please insert ticket description </span>}</label>
                        <textarea rows={5} name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <button type="submit" className={Styles.save}>  Save  </button>
                    <button onClick={handleCloseModal} className={Styles.close}>  Close  </button>
                </form>
            )}
        </Modal>
    )
}
export default AddNewModal