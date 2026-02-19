import React from 'react';
import { IoCreateOutline } from "react-icons/io5";

const TaskModal = ({ show,
                       newTask,
                       setNewTask,
                       handleAddTask,
                       handleUpdateTask,
                       mode = "create",
                       onClose
}) => {


    if (!show) return null;
    const isEdit = mode === "edit";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title text-theme-green"><IoCreateOutline size={28}/> {isEdit ? "Edit Task":"Create New Task"}</h4>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body mt-3">
                    <div className="form-group mb-3">
                        <label className="form-label text-theme-green fw-bold">Task Title <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-theme-green fw-bold">Description</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter task description (optional)"
                            rows="3"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-theme-green fw-bold">Priority</label>
                            <select
                                className="form-select"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label text-theme-green fw-bold">Status</label>
                            <select
                                className="form-select"
                                value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="modal-footer gap-3">
                    <button className="btn btn-gray-theme" onClick={onClose}>
                        Cancel
                    </button>

                    {isEdit ? (
                        <button className="btn btn-orange-theme" onClick={handleUpdateTask}>
                            Update Task
                        </button>
                    ) : (
                        <button className="btn btn-orange-theme" onClick={handleAddTask}>
                            Create Task
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default TaskModal;
