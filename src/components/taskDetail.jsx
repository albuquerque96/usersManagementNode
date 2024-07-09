import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskById } from '../services/taskService';

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
        setTask(response.data.task);
      } catch (error) {
        setError('Failed to fetch task');
      }
    };

    fetchTask();
  }, [taskId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.done ? 'Completed' : 'Incomplete'}</p>
      <p>Assigned To: {task.assignedTo}</p>
      <p>Created On: {new Date(task.createdOn).toLocaleString()}</p>
    </div>
  );
};

export default TaskDetail;
