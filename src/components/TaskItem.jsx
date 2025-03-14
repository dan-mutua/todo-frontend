import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="border rounded p-3 mb-2 flex justify-between items-center">
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id, !task.completed)}
            className="mr-2"
          />
          <h3 
            className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </h3>
        </div>
        {task.description && (
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(task._id)}
        className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm"
      >
        Delete
      </button>
    </div>
  );
};
