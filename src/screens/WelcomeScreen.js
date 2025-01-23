import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import welcome from '../assets/images/welcome.png';
import generalStyles from '../assets/styles/generalStyles';
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={welcome} style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[generalStyles.button, generalStyles.buttonMain]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, styles.textLogin]}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[generalStyles.button, generalStyles.buttonWhite]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={[styles.buttonText, styles.textSignup]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  textLogin: {
    color: '#fff',
  },
  textSignup: {
    color: '#A96BAE',
  },
});

export default WelcomeScreen;
