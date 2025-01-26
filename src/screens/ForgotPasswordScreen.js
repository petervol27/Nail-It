import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import generalStyles from '../assets/styles/generalStyles';
import AppIcon from '../components/AppIcon';
import hashIcon from '../assets/icons/hashtag.png';
import forgotPass from '../assets/images/forgotPass.png';
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
      }
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Success',
        'Password reset email sent. Please check your inbox.'
      );
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
    >
      <View style={styles.topContainer}>
        <Image source={forgotPass} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={[generalStyles.title, generalStyles.marginBtmLG]}>
          Forgot Password?
        </Text>
        <View style={generalStyles.inputContainer}>
          <AppIcon iconSource={hashIcon} color={'black'} size={20} />
          <TextInput
            placeholder="enter email address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.buttonMain,
            generalStyles.smallerButton,
            generalStyles.marginTopSM,
          ]}
          onPress={handlePasswordReset}
        >
          <Text style={generalStyles.buttonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    flex: 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    flex: 0.4,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
