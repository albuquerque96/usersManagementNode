import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data.tasks);
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`/tasks/${task._id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
