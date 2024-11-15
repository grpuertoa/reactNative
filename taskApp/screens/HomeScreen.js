import React from 'react';
import { View, Button, StyleSheet, SafeAreaView, Image, Dimensions, Text } from 'react-native';

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        testID="homeImage"  
        source={require('../assets/toDo.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        <Button
          testID="viewTasksButton"  
          title="Ver Tareas"
          onPress={() => navigation.navigate('ViewTask')}
        />
      </View>
      <Text style={styles.footerText}>Powered by Gabriel Puerto</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: height * 0.6,
    marginBottom: 20,
    marginTop: -200,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    width: '100%',
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;
