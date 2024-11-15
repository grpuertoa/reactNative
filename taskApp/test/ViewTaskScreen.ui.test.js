import React, { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskItem from '../components/TaskItem';

describe('TaskItem', () => {
  const mockTask = { _id: '1', title: 'Tarea 1', description: 'Descripción 1', completed: false };

  //Show correctly task data
  test('muestra correctamente los datos de la tarea', () => {
    const { getByText } = render(
      <TaskItem 
        item={mockTask}
        isEditing={false}  
        updatedTask={{}}
        handleEdit={jest.fn()}
        handleSave={jest.fn()}
        handleDelete={jest.fn()}
        handleChange={jest.fn()}
        onEditStart={jest.fn()}
      />
    );

    expect(getByText('Tarea 1')).toBeTruthy();
    expect(getByText('Descripción 1')).toBeTruthy();
    expect(getByText('No Terminada')).toBeTruthy();
  });

  //Get correctly to the edition mode
  test('entra en modo de edición al presionar "Modificar"', async () => {
    const handleEditMock = jest.fn();  

    const TestComponent = () => {
      const [isEditing, setIsEditing] = useState(false);

      
      return (
        <TaskItem
          item={mockTask}
          isEditing={isEditing}
          updatedTask={{ title: '', description: '', completed: false }}
          handleEdit={handleEditMock}
          handleSave={jest.fn()}
          handleDelete={jest.fn()}
          handleChange={jest.fn()}
          onEditStart={() => {
            setIsEditing(true);  
            handleEditMock(mockTask);  
          }}
        />
      );
    };

    const { getByText, getByTestId } = render(<TestComponent />);

    const modifyButton = getByText('Modificar');
    
    // Simulate press modify button
    fireEvent.press(modifyButton);

    expect(handleEditMock).toHaveBeenCalledWith(mockTask);

    // Wait for modidy inputs to appear 
    await waitFor(() => getByTestId('input-title'));

    // Verify the inputs active in mody are the expected ones
    expect(getByTestId('input-title')).toBeTruthy();
    expect(getByTestId('input-description')).toBeTruthy();
  });

  //Delte function when button is pressed
  test('muestra y llama a la función handleDelete cuando presionas el botón de eliminar', () => {
    const handleDeleteMock = jest.fn();
    const { getByText } = render(
      <TaskItem 
        item={mockTask}
        isEditing={true} 
        updatedTask={{}}
        handleEdit={jest.fn()}
        handleSave={jest.fn()}
        handleDelete={handleDeleteMock}
        handleChange={jest.fn()}
        onEditStart={jest.fn()}
      />
    );

    const deleteButton = getByText('Eliminar');
    fireEvent.press(deleteButton);

    expect(handleDeleteMock).toHaveBeenCalledWith(mockTask._id);
  });

  //Check the save button on edit mode
  test('llama a handleSave cuando presionas "Guardar" en modo de edición', () => {
    const handleSaveMock = jest.fn();
    const { getByText } = render(
      <TaskItem 
        item={mockTask}
        isEditing={true}  
        updatedTask={{}}
        handleEdit={jest.fn()}
        handleSave={handleSaveMock}
        handleDelete={jest.fn()}
        handleChange={jest.fn()}
        onEditStart={jest.fn()}
      />
    );

    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);

    expect(handleSaveMock).toHaveBeenCalledWith(mockTask._id);  
  });
});
