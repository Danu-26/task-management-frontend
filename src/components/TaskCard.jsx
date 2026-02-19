import React from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const TaskCard = ({ task, onDelete,onEdit }) => {
    const statusClasses = {
        TODO: 'badge bg-dark',
        IN_PROGRESS: 'badge bg-warning text-dark',
        DONE: 'badge bg-success',
    };

    const priorityClasses = {
        LOW: 'badge bg-info text-dark',
        MEDIUM: 'badge bg-warning text-dark',
        HIGH: 'badge bg-danger',
    };


    return (
        <div className="card mb-3 border-theme-green">
            <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                    <h5>{task.title}</h5>
                    {task.description && <p className="text-muted">{task.description}</p>}
                    <div className="d-flex gap-2">
                        <span className={statusClasses[task.status]}>{task.status}</span>
                        <span className={priorityClasses[task.priority]}>{task.priority}</span>
                    </div>
                </div>
                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(task)}>️ <CiEdit /> Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}><MdDeleteOutline /> Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
