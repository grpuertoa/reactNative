import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
            <TouchableOpacity onPress={() => handleSave(item._id)} style={styles.smallButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit} style={styles.smallButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item._id)} style={[styles.smallButton, styles.deleteButton]}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.status}>{item.completed ? 'Terminada' : 'No Terminada'}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={() => onEditStart(item)} style={styles.smallButton}>
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
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
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 0,
    backgroundColor: '#007bff',  
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    maxWidth: '45%',  
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 13,  
    color: '#fff',
    textAlign: 'center',
  },
});

export default TaskItem;
