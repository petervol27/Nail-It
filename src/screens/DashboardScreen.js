import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from '../components/Spinner';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <Spinner />
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

export default DashboardScreen;
