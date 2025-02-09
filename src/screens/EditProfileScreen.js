import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { updateUserProfile } from '../utils/firestore';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [profileImage, setProfileImage] = useState(user.profileImage);

  // 🔥 Handle Image Upload
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 🔥 Handle Profile Update
  const handleSave = async () => {
    const updatedData = { name, bio, profileImage };
    const success = await updateUserProfile(user.uid, updatedData);

    if (success) {
      setUser({ ...user, ...updatedData });
      navigation.goBack();
    } else {
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔥 Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </TouchableOpacity>

      {/* 🔥 Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* 🔥 Bio Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Tell us about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      {/* 🔥 Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#C85D7C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
