import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ViewTaskScreen from '../screens/ViewTask';  
import { useTasks } from '../hooks/useTasks';   

// Mock useTasks hook
jest.mock('../hooks/useTasks', () => ({
  useTasks: jest.fn(),
}));

describe('ViewTaskScreen', () => {
  beforeEach(() => {
    // Reset mocks 
    useTasks.mockReset();
  });

  // Verify that tasks are rendered correctly
  test('renders tasks correctly', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1', description: 'Description 1', completed: false },
      { _id: '2', title: 'Task 2', description: 'Description 2', completed: true },
    ];

    // Mock the return value of the useTasks hook
    useTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      removeTask: jest.fn(),
      editTask: jest.fn(),
    });

    // Render the screen
    const { getByText } = render(<ViewTaskScreen navigation={{}} />);

    // Verify that the tasks are rendered correctly
    await waitFor(() => {
      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 2')).toBeTruthy();
    });
  });

  //Verify loading indicator while tasks are being fetched
  test('shows loading indicator while tasks are loading', async () => {
    // Simulate the loading state
    useTasks.mockReturnValue({
      tasks: [],
      loading: true,
      error: null,
      removeTask: jest.fn(),
      editTask: jest.fn(),
    });

    const { getByText, getByTestId } = render(<ViewTaskScreen navigation={{}} />);

    // Verify that the loading indicator is displayed
    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Cargando tareas...')).toBeTruthy();
  });

// Handle errors while loading tasks
test('handles error when loading tasks', async () => {
    // Simula un estado de error
    useTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: 'Error al cargar tareas',
      removeTask: jest.fn(),
      editTask: jest.fn(),
    });
  
    const { getByText } = render(<ViewTaskScreen navigation={{}} />);
  
    // Verificar que el mensaje de error se muestre correctamente
    expect(getByText('Error al cargar tareas')).toBeTruthy();
  });

  //Navigate to CreateTask screen with "Create Task"
  test('navigates to CreateTask with "Create Task" button', async () => {
    // Mock tasks
    const mockTasks = [
      { _id: '1', title: 'Task 1', description: 'Description 1', completed: false },
    ];
  
    useTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      removeTask: jest.fn(),
      editTask: jest.fn(),
    });
  
    const navigation = { navigate: jest.fn() };
    const { getByText } = render(<ViewTaskScreen navigation={navigation} />);
  
    // verify button with correct text
    const createButton = getByText('Crear Tarea');
    expect(createButton).toBeTruthy();
  
    fireEvent.press(createButton);
  
    // Verify the navigation function was called
    expect(navigation.navigate).toHaveBeenCalledWith('CreateTask');
  });
});
