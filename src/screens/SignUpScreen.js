import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import generalStyles from '../assets/styles/generalStyles';
import passwordIcon from '../assets/icons/password.png';
import hashIcon from '../assets/icons/hashtag.png';
import AppIcon from '../components/AppIcon';
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const toggleAgree = () => {
    setAgreed(!agreed);
  };
  const handleNext = async () => {
    if (!agreed) {
      alert('Please agree to the Terms & Conditions to continue.');
      return;
    }
    if (!email || !password || !name) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== repeatPassword) {
      alert("Passwords don't match!");
      return;
    }
    navigation.navigate('UserDetails', { name, email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
    >
      <Text style={[generalStyles.title, generalStyles.marginBtmXL]}>
        Sign Up
      </Text>
      <View style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}>
        <TextInput
          style={generalStyles.marginStrtSM}
          placeholder="enter you name"
          value={name}
          onChangeText={setName}
        ></TextInput>
      </View>
      <View style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}>
        <AppIcon iconSource={hashIcon} color={'black'} size={20} />
        <TextInput
          placeholder="enter email address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}>
        <AppIcon iconSource={passwordIcon} color={'black'} size={20} />
        <TextInput
          placeholder="enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}>
        <AppIcon iconSource={passwordIcon} color={'black'} size={20} />
        <TextInput
          placeholder="enter password again"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />
      </View>
      <View
        style={[
          styles.checkboxRow,
          generalStyles.marginBtmSM,
          generalStyles.marginStrtXL,
        ]}
      >
        <TouchableOpacity
          style={[styles.checkbox, agreed && styles.checkboxChecked]}
          onPress={toggleAgree}
        >
          {agreed && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.linkText}>Terms & Conditions</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[
          generalStyles.button,
          generalStyles.buttonMain,
          generalStyles.smallestButton,
        ]}
        onPress={handleNext}
      >
        <Text style={[generalStyles.buttonText]}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#ced4da',
    backgroundColor: '#ced4da',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#A96BAE',
    borderColor: '#A96BAE',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    marginLeft: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
