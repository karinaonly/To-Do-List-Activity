import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";

function todolistFunction() {
    const [tasks, setTasks] = useState([
    ]);
    const [newTask, setNewTask] = useState("");

    function taskInput(event) {
        setNewTask(event.target.value);
    }

    function createTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, checked: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function handleCheckbox(index) {
        const updatedTasks = [...tasks];
        const task = { ...updatedTasks[index] };
        task.checked = !task.checked;
        updatedTasks.splice(index, 1);

        if (task.checked) {
            setTasks([task, ...updatedTasks]);
        } else {
            setTasks([...updatedTasks, task]); 
        }
    }

    return (
        <div className="mainDiv flex flex-col items-center w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
            <div className='flex flex-col items-center w-[300px] space-y-2'>
                <h1>To-Do List</h1>
                <input
                type="text"
                placeholder="Add a task..."
                value={newTask}
                onChange={taskInput}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition duration-200"
                />
                <button
                onClick={createTask}
                className="addButton"
                >
                Add
                </button>
            </div>
            <div className='min-w-[400px] mt-4'>
                <ol>
                    {tasks.map((task, index) => (
                        <li className="flex justify-between items-center px-5 py-2">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="checkbox"
                                    key={index}
                                    checked={task.checked}
                                    onChange={() => handleCheckbox(index)}
                                    className="custom-checkbox"
                                />
                                <div className="text-container">
                                    <span className={task.checked ? "line-through" : ""}>
                                        {task.text}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteTask(index)}
                                className="delete-button"
                                >
                                <MdDelete size={25} />
                            </button>

                        </li>

                    ))}
                </ol>
            </div>
        </div>
    );
}

export default todolistFunction;
