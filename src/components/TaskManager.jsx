import { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(`Failed to load tasks: ${err.message}`);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newTask = await taskService.createTask({
        title: trimmedTitle,
        completed: false
      });
      
      setTasks(prevTasks => [...prevTasks, newTask]);
      setTitle('');
    } catch (err) {
      setError(`Failed to create task: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error && error.includes('empty')) {
      setError('');
    }
  };

  return (
    <div className="container">
      <div className="task-form">
        <h1>Task Manager</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter task title..."
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>

      <div className="tasks-list">
        <h2 className="tasks-header">Tasks</h2>
        
        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Create your first task using the form above</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <span className="task-title">{task.title}</span>
              <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;