import React, {useState} from 'react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import StatCard from '../components/StatiticCard.jsx';
import TaskCard from '../components/TaskCard.jsx';
import {useNavigate} from "react-router-dom";
import TaskModal from "../components/TaskModal.jsx";
import { ImFileEmpty } from "react-icons/im";
import SearchTask from "../components/SearchTask.jsx";
import {addTaskApi} from "../services/taskService.js";
import { toast } from 'react-toastify';

const DashboardPage = ({user,setUser}) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        status: 'TODO'
    });
    const [editTaskId, setEditTaskId] = useState(null);
    const [modalMode, setModalMode] = useState("create");
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('ALL');
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Finish project report', description: 'Complete Q4', status: 'TODO', priority: 'HIGH' },
        { id: 2, title: 'Review team feedback', description: '', status: 'IN_PROGRESS', priority: 'MEDIUM' },
        { id: 3, title: 'Setup meeting with client', description: '', status: 'DONE', priority: 'LOW' },
    ]);

    const userName =user?.name;

    //Dashboard statistic data
    const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'TODO').length,
        inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
        done: tasks.filter(t => t.status === 'DONE').length,
    };
    const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    //Logout Call
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);

        // Redirect to login page after logout
        navigate('/login');
    }

    //Based on search or tab filter tasks
    const filteredTasks = tasks
        .filter(task =>
            activeTab === 'all' ? true : task.status === activeTab
        )
        .filter(task =>
            priorityFilter === 'ALL' ? true : task.priority === priorityFilter
        )
        .filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

    //Handle Delete
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    }

    //Handle edit button click
    const handleEditClick = (task) => {
        setNewTask(task);
        setEditTaskId(task.id);
        setModalMode("edit");
        setShowModal(true);
    };

    //API call for update edited task
    const handleUpdateTask = () => {
        setTasks(tasks.map(task =>
            task.id === editTaskId ? { ...task, ...newTask } : task
        ));
        setShowModal(false);
        setEditTaskId(null);
        setModalMode("create");
        setNewTask({
            title: '',
            description: '',
            priority: 'MEDIUM',
            status: 'TODO'
        });
    };

    //Handle Add a new task
    const handleAddTask = async () => {
        try {
            //Title Validation
            if (!newTask.title.trim()) {
                toast.error('Please enter a task title');
                return;
            }
           //console.log(user.id)
            const payload = {
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                priority: newTask.priority,
                user_id: user.id
            };

            const response = await addTaskApi(payload);

            if (response?.success) {
                const createdTask = response.data;

                // Update state
                setTasks((prev) => [...prev, createdTask]);

                // Reset form
                setNewTask({
                    title: '',
                    description: '',
                    priority: 'MEDIUM',
                    status: 'TODO'
                });

                setShowModal(false);

                // Success toast
                toast.success('Task created successfully');
            } else {
                toast.error(response?.message || 'Failed to create task');
            }
        } catch (error) {
            console.error('Add Task Error:', error);

            const message =
                error?.response?.data?.message ||
                error.message ||
                'Something went wrong while creating task';

            toast.error(message);
        }
    };



    return (
        <DashboardLayout userName={userName} onLogout={handleLogout}>

            {/* Header */}
            <div className="home-header mt-3">
                <div className="header-content">
                    <h3 className="header-title">DASHBOARD</h3>
                    <p className="header-subtitle text-muted">Manage your tasks efficiently</p>
                </div>
                <button className="btn-theme" onClick={() => setShowModal(true)}>
                    + New Task
                </button>
            </div>
            <div className="row mb-4 mt-5">
                <div className="col-md-2"><StatCard label="Total Tasks" value={stats.total} /></div>
                <div className="col-md-2"><StatCard label="To Do" value={stats.todo} /></div>
                <div className="col-md-2"><StatCard label="In Progress" value={stats.inProgress} /></div>
                <div className="col-md-2"><StatCard label="Completed" value={stats.done} /></div>
                <div className="col-md-3"><StatCard label="Completion Rate" value={`${completionRate}%`} extra={completionRate>=80 ? 'Great!' : 'Keep Going'} /></div>
            </div>

            {/* Tabs */}
            <div className="tasks-section card border-0 shadow-lg">
                <div className="card-body  p-4">
                    {/* Tab Buttons */}
                    <div className="tabs-container mb-4">
                        {['all', 'TODO', 'IN_PROGRESS', 'DONE'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'tab-btn-active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'all'
                                    ? 'All Tasks'
                                    : tab === 'TODO'
                                        ? 'To Do'
                                        : tab === 'IN_PROGRESS'
                                            ? 'In Progress'
                                            : 'Completed'}
                            </button>
                        ))}
                    </div>
                    {/* Search & Filter Component */}
                    <SearchTask
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                    />

                    {/* Task List */}
                    <div className="task-list">
                        {filteredTasks.length === 0 ? (
                            <div className="text-center">
                                <div className="mt-2 mb-3"><ImFileEmpty size={24} /></div>
                                <h4 className="empty-title text-theme-green">No tasks found</h4>
                                <p className="empty-text text-muted">
                                    {tasks.length === 0
                                        ? 'Create your first task to get started!'
                                        : 'Try adjusting your search or filters'}
                                </p>
                            </div>
                        ) : (
                            filteredTasks.map(task => (
                                <div key={task.id} className="task-item">
                                    <TaskCard
                                        task={task}
                                        onDelete={handleDeleteTask}
                                        onEdit={handleEditClick}
                                    />

                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <TaskModal
                show={showModal}
                newTask={newTask}
                setNewTask={setNewTask}
                handleAddTask={handleAddTask}
                handleUpdateTask={handleUpdateTask}
                mode={modalMode}
                onClose={() => {
                    setShowModal(false);
                    setModalMode("create");
                }}
            />

        </DashboardLayout>
    );
};

export default DashboardPage;
