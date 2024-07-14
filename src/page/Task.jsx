import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Task = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [completeDate, setCompleteDate] = useState('');
    const navigate = useNavigate();

    const createTask = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch('http://localhost:5007/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, startDate, completeDate }),
            });
    
            if (response.ok) {
                navigate('/home');
            } else {
                console.error("Failed to create task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };


    return (
        <div className="container mx-auto p-4 max-w-lg mb-5">
            <h1 className="text-2xl font-bold mb-4 mt-4">Create Task</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border border-gray-400 p-2 mb-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Description"
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border border-gray-400 p-2 mb-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="date"
                    placeholder="Start Date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="border border-gray-400 p-2 mb-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="date"
                    placeholder="Complete Date"
                    required
                    value={completeDate}
                    onChange={e => setCompleteDate(e.target.value)}
                    className="border border-gray-400 p-2 mb-2 w-full rounded"
                />
            </div>
            <button
                onClick={createTask}
                className="bg-blue-500 text-white p-2 w-full rounded"
            >
                Create
            </button>
        </div>
    );
};


