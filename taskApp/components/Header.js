// Header compatible for any module
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ iconSource, title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;