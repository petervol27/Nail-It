import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 120,
  },
});

export default HomeScreen;
