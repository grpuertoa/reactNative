// Component for showing each task in read or edit 
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

//Task Item for read or edit
const TaskItem = ({
  item,
  isEditing,
  updatedTask,
  handleEdit,
  handleSave,
  handleDelete,
  handleChange,
  onEditStart,
}) => {
  return (
    <View style={styles.taskContainer}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={updatedTask.title}
            onChangeText={(text) => handleChange('title', text)}
            placeholder="Título de la tarea"
          />
          <TextInput
            style={styles.input}
            value={updatedTask.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Descripción de la tarea"
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={updatedTask.completed}
              onValueChange={(newValue) => handleChange('completed', newValue)}
            />
            <Text style={styles.statusText}>Tarea completada</Text>
          </View>
          <View style={styles.buttonGroup}>
            <Button title="Guardar" onPress={() => handleSave(item._id)} style={styles.smallButton} />
            <Button title="Cancelar" onPress={handleEdit} style={styles.smallButton} />
            <Button title="Eliminar" color="red" onPress={() => handleDelete(item._id)} style={styles.smallButton} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.status}>{item.completed ? 'Terminada' : 'No Terminada'}</Text>
          <View style={styles.buttonGroup}>
            <Button title="Modificar" onPress={() => onEditStart(item)} style={styles.smallButton} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  smallButton: {
    fontSize: 12,
    padding: 5,
    marginHorizontal: 5,
  },
});

export default TaskItem;
