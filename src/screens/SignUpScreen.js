import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import generalStyles from '../assets/styles/generalStyles';
import passwordIcon from '../assets/icons/password.png';
import hashIcon from '../assets/icons/hashtag.png';
import AppIcon from '../components/AppIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);

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
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      enableOnAndroid={true}
      extraHeight={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[generalStyles.title, generalStyles.marginBtmXL]}>
            Sign Up
          </Text>
          <View
            style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}
          >
            <TextInput
              style={[generalStyles.marginStrtSM, generalStyles.textInput]}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          </View>
          <View
            style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}
          >
            <AppIcon iconSource={hashIcon} color={'black'} size={20} />
            <TextInput
              ref={emailInputRef}
              style={generalStyles.textInput}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </View>
          <View
            style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}
          >
            <AppIcon iconSource={passwordIcon} color={'black'} size={20} />
            <TextInput
              ref={passwordInputRef}
              style={generalStyles.textInput}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="off"
              textContentType="oneTimeCode"
              returnKeyType="next"
              onSubmitEditing={() => repeatPasswordInputRef.current?.focus()}
            />
          </View>
          <View
            style={[generalStyles.inputContainer, generalStyles.marginBtmSM]}
          >
            <AppIcon iconSource={passwordIcon} color={'black'} size={20} />
            <TextInput
              ref={repeatPasswordInputRef}
              style={generalStyles.textInput}
              placeholder="Enter password again"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleNext}
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
              I agree to the{' '}
              <Text style={styles.linkText}>Terms & Conditions</Text>
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
