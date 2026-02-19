import React, { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import StatCard from '../components/StatiticCard.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { useNavigate } from "react-router-dom";
import TaskModal from "../components/TaskModal.jsx";
import { ImFileEmpty } from "react-icons/im";
import SearchTask from "../components/SearchTask.jsx";
import { addTaskApi, getTasksApi, getStatsApi ,taskDeleteApi,taskUpdateApi} from "../services/taskService.js";
import { toast } from 'react-toastify';

const DashboardPage = ({ user, setUser }) => {
    const navigate = useNavigate();

    // Task and filter states
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'MEDIUM', status: 'TODO' });
    const [editTaskId, setEditTaskId] = useState(null);
    const [modalMode, setModalMode] = useState("create");

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        todo: 0,
        inProgress: 0,
        done: 0
    });

    const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    // Fetch stats
    const fetchStats = async () => {
        try {
            const response = await getStatsApi();
            if (response?.success) {
                setStats(response.data);
            } else {
                toast.error(response?.message || 'Failed to fetch stats');
            }
        } catch (error) {
            console.error('Stats fetch error:', error);
            toast.error(error?.message || 'Failed to fetch stats');
        }
    };

    // Fetch tasks with filters & pagination
    const fetchTasks = async (pageNumber = 1) => {
        try {
            const payload = {
                page: pageNumber,
                limit,
                status: activeTab === 'all' ? undefined : activeTab,
                priority: priorityFilter === 'ALL' ? undefined : priorityFilter,
                search: searchTerm?.trim() || undefined
            };

            const response = await getTasksApi(payload);

            if (response?.success) {
                setTasks(response.data);
                setPage(response.page);
                setTotalPages(Math.ceil(response.total / response.limit));
            } else {
                toast.error(response?.message || 'Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Fetch Tasks Error:', error);
            toast.error(error?.response?.data?.message || error?.message || 'Failed to load tasks');
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchStats();
        fetchTasks(1);
    }, []);

    // Fetch tasks on filters change
    useEffect(() => {
        fetchTasks(1);
    }, [activeTab, priorityFilter, searchTerm]);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    // Handle task delete
    const handleDeleteTask = async (id) => {
        try {
            // API Call
            const response = await taskDeleteApi(id);

            if (response?.success) {
                // Update tasks
                setTasks(prev => prev.filter(t => t.id !== id));

                // Update stats
                fetchStats();

                toast.success('Task deleted successfully');
            } else {
                toast.error(response?.message || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Delete Task Error:', error);
            toast.error(error || 'Something went wrong while deleting the task');
        }
    };
    const handleEditClick = (task) => {
        setNewTask(task);
        setEditTaskId(task.id);
        setModalMode("edit");
        setShowModal(true);
    };

    //task update handler
    const handleUpdateTask = async () => {
        if (!newTask.title.trim()) {
            toast.error('Please enter a task title');
            return;
        }

        try {
            //without user id
            const payload = {
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                priority: newTask.priority
            };
            const response = await taskUpdateApi(editTaskId, payload);

            if (response?.success) {
                // Update tasks
                setTasks(prev =>
                    prev.map(task =>
                        task.id === editTaskId ? { ...task, ...response.data } : task
                    )
                );

                // Reset modal
                setShowModal(false);
                setEditTaskId(null);
                setModalMode("create");
                setNewTask({ title: '', description: '', priority: 'MEDIUM', status: 'TODO' });

                // Update stats
                fetchStats();

                toast.success('Task updated successfully');
            } else {
                toast.error(response?.message || 'Failed to update task');
            }
        } catch (error) {
            console.error('Update Task Error:', error);
            toast.error(error || 'Something went wrong while updating the task');
        }
    };


    const handleAddTask = async () => {
        if (!newTask.title.trim()) {
            toast.error('Please enter a task title');
            return;
        }

        try {
            const payload = { ...newTask, user_id: user.id };
            const response = await addTaskApi(payload);

            if (response?.success) {
                setTasks(prev => [...prev, response.data]);
                setNewTask({ title: '', description: '', priority: 'MEDIUM', status: 'TODO' });
                setShowModal(false);
                toast.success('Task created successfully');
                fetchStats(); // update stats after adding
            } else {
                toast.error(response?.message || 'Failed to create task');
            }
        } catch (error) {
            console.error('Add Task Error:', error);
            toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
        }
    };

    // Pagination component
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn-pagination ${i === page ? 'btn-pagination-active' : ''}`}
                    onClick={() => fetchTasks(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="pagination-container mt-3 d-flex gap-2 justify-content-center align-items-center">
                {/* Previous Button */}
                <button
                    className="btn-orange-theme"
                    disabled={page === 1}
                    onClick={() => fetchTasks(page - 1)}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                <div className="d-flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={`btn-gray-theme ${p === page ? 'active-page' : ''}`}
                            onClick={() => fetchTasks(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    className="btn-orange-theme"
                    disabled={page === totalPages}
                    onClick={() => fetchTasks(page + 1)}
                >
                    Next
                </button>
            </div>

        );
    };

    return (
        <DashboardLayout userName={user?.name} onLogout={handleLogout}>
            {/* Header */}
            <div className="home-header mt-3">
                <div className="header-content">
                    <h3 className="header-title">DASHBOARD</h3>
                    <p className="header-subtitle text-muted">Manage your tasks efficiently</p>
                </div>
                <button className="btn-theme" onClick={() => setShowModal(true)}>+ New Task</button>
            </div>

            {/* Stats */}
            <div className="row mb-4 mt-5">
                <div className="col-md-2"><StatCard label="Total Tasks" value={stats.total} /></div>
                <div className="col-md-2"><StatCard label="To Do" value={stats.todo} /></div>
                <div className="col-md-2"><StatCard label="In Progress" value={stats.inProgress} /></div>
                <div className="col-md-2"><StatCard label="Completed" value={stats.done} /></div>
                <div className="col-md-3"><StatCard label="Completion Rate" value={`${completionRate}%`} extra={completionRate >= 80 ? 'Great!' : 'Keep Going'} /></div>
            </div>

            {/* Tabs */}
            <div className="tasks-section card border-0 shadow-lg">
                <div className="card-body p-4">
                    <div className="tabs-container mb-4">
                        {['all', 'TODO', 'IN_PROGRESS', 'DONE'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'tab-btn-active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'all' ? 'All Tasks' :
                                    tab === 'TODO' ? 'To Do' :
                                        tab === 'IN_PROGRESS' ? 'In Progress' :
                                            'Completed'}
                            </button>
                        ))}
                    </div>

                    {/* Search & Priority Filter */}
                    <SearchTask
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        priorityFilter={priorityFilter}
                        setPriorityFilter={setPriorityFilter}
                    />

                    {/* Task List */}
                    <div className="task-list">
                        {tasks.length === 0 ? (
                            <div className="text-center">
                                <div className="mt-2 mb-3"><ImFileEmpty size={24} /></div>
                                <h4 className="empty-title text-theme-green">No tasks found</h4>
                                <p className="empty-text text-muted">
                                    Create your first task or adjust filters.
                                </p>
                            </div>
                        ) : (
                            tasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDeleteTask}
                                    onEdit={handleEditClick}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {renderPagination()}
                </div>
            </div>

            {/* Task Modal */}
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
