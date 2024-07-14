import React, { useState, useEffect } from 'react';
import { useAuth } from "../store/auth"; 
import { Link } from 'react-router-dom';

export const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [completeDate, setCompleteDate] = useState('');
    const [taskId, setTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const {user} = useAuth();

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch('http://localhost:5007/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                console.error("Failed to fetch tasks:", data.message);
                setTasks([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    const fetchTaskById = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5007/api/task/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTitle(data.title);
                setDescription(data.description);
                setStartDate(data.startDate);
                setCompleteDate(data.completeDate);
                setTaskId(data._id);
            } else {
                console.error("Failed to fetch task:", data.message);
            }
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5007/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== id));
            } else {
                const data = await response.json();
                console.error("Failed to delete task:", data.message);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTask = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5007/api/task/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, startDate, completeDate }),
            });
            const data = await response.json();
            if (response.ok) {
                setTasks(tasks.map(task => (task._id === taskId ? data : task)));
                setTitle('');
                setDescription('');
                setStartDate('');
                setCompleteDate('');
                setTaskId(null);
            } else {
                console.error("Failed to update task:", data.message);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    
    return (
        <div className="container mx-auto p-4 md:p-16 xl:px-24">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-base font-bold md:text-2xl xl:text-2xl">Task Manager</h1>
                <h2 className="text-base font-bold md:text-2xl xl:text-2xl">Welcome, {user ? user.username : `user`}</h2>
                <Link to="/task" className="bg-blue-500 text-white p-2 rounded">Add Task</Link>
            </div>
            {taskId && (
                <div className="mb-4 max-w-md mx-auto mt-3">
                    <h2 className="text-xl font-bold mb-2">Update Task</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="border border-gray-400 p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="border border-gray-400 p-2 rounded"
                        />
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="border border-gray-400 p-2 rounded"
                        />
                        <input
                            type="date"
                            placeholder="Complete Date"
                            value={completeDate}
                            onChange={e => setCompleteDate(e.target.value)}
                            className="border border-gray-400 p-2 rounded"
                        />
                    </div>
                    <button
                        onClick={updateTask}
                        className="bg-green-500 text-white p-2 w-full rounded mt-4"
                    >
                        Update Task
                    </button>
                </div>
            )}
            <div className="mt-4 max-w-2xl mx-auto md:mt-6 xl:mt-8">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task._id} className="border p-4 mb-4 rounded shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2
                                        onClick={() => fetchTaskById(task._id)}
                                        className="text-xl font-bold cursor-pointer"
                                    >
                                        {task.title}
                                    </h2>
                                    <p className="text-gray-600">Complete Date: {formatDate(task.completeDate)}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => fetchTaskById(task._id)}
                                        className="bg-yellow-500 text-white p-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {taskId === task._id && (
                                <div className="mt-2">
                                    <p>Description: {task.description}</p>
                                    <p>Start Date: {formatDate(task.startDate)}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center">You have no tasks yet. <Link to="/task" className="text-blue-500">Add a task</Link></p>
                )}
            </div>
        </div>
    );
};