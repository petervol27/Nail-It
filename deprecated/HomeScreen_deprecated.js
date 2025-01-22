import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import nails_login from '../assets/splash_nails.jpg';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={nails_login}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>Home Screen</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default HomeScreen;
