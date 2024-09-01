import { REACT_APP_API_URL } from '@env';


//For testing on android emulators
const API_URL = `${REACT_APP_API_URL}/tasks`;

//Communication with backend
export const getTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching tasks');
  }
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Error creating task');
  }
  return response.json();
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Error updating task');
  }
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting task');
  }
};
