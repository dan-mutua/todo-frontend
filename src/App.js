import React, { useState, useEffect } from 'react';
import TaskService from './services/TaskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncStatus, setSyncStatus] = useState('synced'); 

  // Function to fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskService.getAllTasks();
      setTasks(data);
      setSyncStatus('synced');
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      setSyncStatus('error');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on initial render
  useEffect(() => {
    fetchTasks();
    
    // Set up an interval to sync tasks every minute
    const syncInterval = setInterval(() => {
      fetchTasks();
    }, 60000);
    
    return () => clearInterval(syncInterval);
  }, []);

  // Add a new task
  const handleAddTask = async (newTask) => {
    try {
      setSyncStatus('syncing');
      const createdTask = await TaskService.createTask(newTask);
      setTasks([createdTask, ...tasks]);
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('error');
      setError('Failed to add task. Please try again.');
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (id, completed) => {
    try {
      setSyncStatus('syncing');
      const updatedTask = await TaskService.updateTask(id, { completed });
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('error');
      setError('Failed to update task. Please try again.');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      setSyncStatus('syncing');
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      setSyncStatus('synced');
    } catch (err) {
      setSyncStatus('error');
      setError('Failed to delete task. Please try again.');
    }
  };

  // Manually trigger a sync
  const handleManualSync = () => {
    fetchTasks();
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-center">To-Do List App</h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm">
            Status: {' '}
            <span className={
              syncStatus === 'synced' ? 'text-green-500' : 
              syncStatus === 'syncing' ? 'text-blue-500' : 'text-red-500'
            }>
              {syncStatus === 'synced' ? 'Synced' : 
               syncStatus === 'syncing' ? 'Syncing...' : 'Sync Error'}
            </span>
          </p>
          <button 
            onClick={handleManualSync}
            className="text-sm text-blue-500"
            disabled={loading}
          >
            {loading ? 'Syncing...' : 'Sync now'}
          </button>
        </div>
      </header>

      <main>
        <TaskForm onAddTask={handleAddTask} />
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-3 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {loading && tasks.length === 0 ? (
          <p className="text-center my-4">Loading tasks...</p>
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggleComplete={handleToggleComplete} 
            onDelete={handleDeleteTask} 
          />
        )}
      </main>
    </div>
  );
}

export default App;