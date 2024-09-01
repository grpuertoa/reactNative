import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Alert, Image, Dimensions } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';

const CreateTask = ({ navigation }) => {
  const { addTask } = useTasks();  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El título de la tarea es obligatorio.');
      return;
    }

    try {
      await addTask({ title, description, completed: false });
      Alert.alert('Éxito', 'Tarea creada con éxito.');
      navigation.navigate('Home'); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la tarea. Inténtalo de nuevo.');
    }
  };

  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.6 * 0.4;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        iconSource={require('../assets/create.jpg')}
        title="Crear Tarea"
      />
      <Image
        source={require('../assets/create.jpg')}
        style={[styles.image, { height: imageHeight }]}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Crear Tarea" onPress={handleCreate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    resizeMode: 'contain', 
    marginBottom: 20,
    marginTop: -200,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CreateTask;
