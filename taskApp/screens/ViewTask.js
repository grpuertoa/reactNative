import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';  
import TaskItem from '../components/TaskItem';  

// View task screen
const ViewTaskScreen = ({ navigation }) => {
  const { tasks, loading, error, removeTask, editTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: '', description: '', completed: false });

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setUpdatedTask({ title: task.title, description: task.description, completed: task.completed });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            removeTask(id);
            if (editingTask === id) setEditingTask(null);
          },
        },
      ]
    );
  };

  const handleSave = (id) => {
    editTask(id, { ...updatedTask, _id: id });
    setEditingTask(null);
  };

  const handleChange = (field, value) => {
    setUpdatedTask((prev) => ({ ...prev, [field]: value }));
  };

  const renderItem = ({ item, drag }) => (
    <TaskItem
      item={item}
      isEditing={editingTask === item._id} 
      updatedTask={updatedTask}
      handleEdit={() => handleEdit(item)}  
      handleSave={handleSave}
      handleDelete={handleDelete}
      handleChange={handleChange}
      onEditStart={handleEdit}
    />
  );

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" testID="loading-indicator" />
        <Text style={styles.loadingText} testID="loading-text">Cargando tareas...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Crear Tarea"
        onPress={() => navigation.navigate('CreateTask')}
        style={styles.createButton}
      />
      <View style={styles.sectionContainer}>
        <Header 
          iconSource={require('../assets/pending.png')} 
          title="Tareas Pendientes"
        />
        <DraggableFlatList
          data={pendingTasks}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          onDragEnd={({ data }) => handleDragEnd(data, 'pendiente')}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.sectionContainer}>
        <Header 
          iconSource={require('../assets/done.png')} 
          title="Tareas Completadas"
        />
        <DraggableFlatList
          data={completedTasks}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          onDragEnd={({ data }) => handleDragEnd(data, 'completada')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  createButton: {
    marginBottom: 10,
  },
  sectionContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: '#f9f9f9',
  },
  separator: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  loadingText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default ViewTaskScreen;
