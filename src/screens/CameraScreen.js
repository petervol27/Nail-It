import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Camera Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
});

export default CameraScreen;
