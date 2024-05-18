import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      assignedTo,
    };

    try {
      const response = await axios.post('http://localhost:3000/tasks', taskData);
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Descrição:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </label>
      <label>
        Data de Vencimento:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <label>
        Atribuído a:
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
      </label>
      <button type="submit">Criar Tarefa</button>
    </form>
  );
};

export default TaskForm;