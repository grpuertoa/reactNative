import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/TaskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Read all tasks in services
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //Add new task in service
  const addTask = async (task) => {
    try {
      await createTask(task);
      fetchTasks(); 
    } catch (err) {
      setError(err.message);
    }
  };

  //Edit task on services
  const editTask = async (id, task) => {
    try {
      await updateTask(id, task);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  //Delete task on services
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();  
    } catch (err) {
      setError(err.message);
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask };
};
