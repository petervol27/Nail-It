import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { createDesign } from '../utils/firestore';
import { UserContext } from '../context/UserContext';
import * as ImagePicker from 'expo-image-picker';
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
