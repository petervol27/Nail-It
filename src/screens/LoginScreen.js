import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AppIcon from '../components/AppIcon';
import hashIcon from '../assets/icons/hashtag.png';
import googleIcon from '../assets/icons/google.png';
import appleIcon from '../assets/icons/apple.png';
import instaIcon from '../assets/icons/insta.png';
import passwordIcon from '../assets/icons/password.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      alert('Logged in succesfully!');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <AppIcon iconSource={hashIcon} color={'black'} />

      <AppIcon iconSource={passwordIcon} color={'black'} />
      <Text style={[styles.title, generalStyles.marginBtmXL]}>Log in</Text>
      <TextInput
        style={generalStyles.input}
        placeholder="enter email address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[generalStyles.input, generalStyles.marginTopSM]}
        placeholder="enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonMain,
          generalStyles.smallerButton,
          generalStyles.marginBtmLG,
          generalStyles.marginTopMD,
        ]}
        onPress={handleLogin}
      >
        <Text style={generalStyles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonBlack,
          generalStyles.marginBtmSM,
        ]}
      >
        <View style={styles.buttonContainer}>
          <AppIcon iconSource={googleIcon} color="white" size={20} />
          <Text style={[styles.BtnTextFlex, generalStyles.buttonText]}>
            Log in With Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonBlack,
          generalStyles.marginBtmSM,
        ]}
      >
        <View style={styles.buttonContainer}>
          <AppIcon iconSource={instaIcon} color="white" size={20} />
          <Text style={[styles.BtnTextFlex, generalStyles.buttonText]}>
            Log in With Instagram
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonBlack,
          generalStyles.marginBtmSM,
        ]}
      >
        <View style={styles.buttonContainer}>
          <AppIcon iconSource={appleIcon} color="white" size={20} />
          <Text style={[styles.BtnTextFlex, generalStyles.buttonText]}>
            Log in With Apple
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },

  link: {
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },
  BtnTextFlex: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
