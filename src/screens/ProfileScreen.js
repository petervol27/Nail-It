import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { logoutUser } from '../utils/auth';
import generalStyles from '../assets/styles/generalStyles';

const ProfileScreen = () => {
  const handleSignout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              logoutUser().then((response) => alert(response));
            } catch (error) {
              alert(error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity
        style={[generalStyles.button, generalStyles.buttonMain]}
        onPress={handleSignout}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
export default ProfileScreen;
