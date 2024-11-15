import { getTasks, createTask, updateTask, deleteTask } from '../services/TaskService';
import { REACT_APP_API_URL } from '@env';

const API_URL = `${REACT_APP_API_URL}/tasks`;

describe('TaskService', () => {
  beforeEach(() => {
    // Reset mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // getTasks Test
  test('getTasks fetches tasks successfully', async () => {
    const mockResponse = { tasks: [{ id: 1, title: 'Test Task' }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getTasks();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  test('getTasks throws error if fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.reject('Error'),
    });

    await expect(getTasks()).rejects.toThrow('Error fetching tasks');
  });

  // createTask Test
  test('createTask creates a new task successfully', async () => {
    const newTask = { title: 'New Task' };
    const mockResponse = { id: 1, title: 'New Task' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await createTask(newTask);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(API_URL, expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }));
  });

  test('createTask throws error if fetch fails', async () => {
    const newTask = { title: 'New Task' };
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(createTask(newTask)).rejects.toThrow('Error creating task');
  });

  // updateTask Test
  test('updateTask updates a task successfully', async () => {
    const updatedTask = { title: 'Updated Task' };
    const mockResponse = { id: 1, title: 'Updated Task' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await updateTask(1, updatedTask);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, expect.objectContaining({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    }));
  });

  test('updateTask throws error if fetch fails', async () => {
    const updatedTask = { title: 'Updated Task' };
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(updateTask(1, updatedTask)).rejects.toThrow('Error updating task');
  });

  // deleteTask Test 
  test('deleteTask deletes a task successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
    });

    await expect(deleteTask(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`, expect.objectContaining({
      method: 'DELETE',
    }));
  });

  test('deleteTask throws error if fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(deleteTask(1)).rejects.toThrow('Error deleting task');
  });
});
