import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
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
      <Text style={[generalStyles.title, generalStyles.marginBtmXL]}>
        Log in
      </Text>
      <View style={generalStyles.inputContainer}>
        <AppIcon iconSource={hashIcon} color={'black'} size={20} />
        <TextInput
          placeholder="enter email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={[generalStyles.inputContainer, generalStyles.marginTopSM]}>
        <AppIcon iconSource={passwordIcon} color={'black'} size={20} />
        <TextInput
          placeholder="enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonMain,
          generalStyles.smallestButton,
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
        <View style={generalStyles.buttonContainer}>
          <AppIcon iconSource={instaIcon} color="white" social={true} />
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
        <View style={generalStyles.buttonContainer}>
          <AppIcon iconSource={googleIcon} color="white" social={true} />
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
        <View style={generalStyles.buttonContainer}>
          <AppIcon iconSource={appleIcon} color="white" social={true} />
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

  link: {
    color: 'black',
    marginTop: 15,
    textAlign: 'center',
  },
  BtnTextFlex: {
    flex: 1,
    marginEnd: 25,
  },
});

export default LoginScreen;
