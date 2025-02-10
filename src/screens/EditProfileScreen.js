import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { updateUserProfile } from '../utils/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import AppIcon from '../components/AppIcon';
import cameraIcon from '../assets/icons/camera.png';
import generalStyles from '../assets/styles/generalStyles';
import Header from '../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { COUNTRIES } from '../utils/constants';

const MAX_BIO_LENGTH = 50;

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [uploading, setUploading] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);

  const [countries, setCountries] = useState(
    COUNTRIES.map((country) => ({
      label: country,
      value: country,
    }))
  );

  // 🔥 Handle Profile Image Update
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Allow access to media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // 🔥 Upload Image to Firebase Storage
  const uploadImage = async (uri) => {
    try {
      setUploading(true);
      const storage = getStorage();
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // 🔥 Handle Bio Character Limit
  const handleBioChange = (text) => {
    if (text.length <= MAX_BIO_LENGTH) {
      setBio(text);
    }
  };

  // 🔥 Handle Save Profile Changes
  const handleSave = async () => {
    let updatedProfileImage = profileImage;

    if (profileImage !== user.profileImage) {
      updatedProfileImage = await uploadImage(profileImage);
      if (!updatedProfileImage) {
        Alert.alert('Upload Failed', 'Profile image update failed');
        return;
      }
    }

    const updates = {
      name,
      country,
      bio,
      profileImage: updatedProfileImage,
    };

    const success = await updateUserProfile(user.uid, updates);
    if (success) {
      setUser((prevUser) => ({ ...prevUser, ...updates }));
      Alert.alert('Profile Updated', 'Your changes have been saved.');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <FlatList
        ListHeaderComponent={
          <View style={styles.listContainer}>
            {/* 🔥 Profile Image Section */}
            <View style={styles.profileImageContainer}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.placeholderAvatar} />
              )}
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={handleImagePick}
              >
                <AppIcon iconSource={cameraIcon} color="black" size={20} />
              </TouchableOpacity>
            </View>

            {/* 🔥 Name Input */}
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            {/* 🔥 Country Selector (Dropdown) */}
            <Text style={styles.label}>Country</Text>
            <View style={styles.dropdownWrapper}>
              <DropDownPicker
                open={countryOpen}
                value={country}
                items={countries}
                setOpen={setCountryOpen}
                setValue={setCountry}
                setItems={setCountries}
                placeholder="Select your country"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                closeOnBackPressed={true}
                closeOnBlur={true}
              />
            </View>

            {/* 🔥 Bio Input with Character Counter */}
            <Text style={styles.label}>Bio</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={bio}
                onChangeText={handleBioChange}
                placeholder="Write something about yourself..."
                multiline
              />
              <Text style={styles.charCount}>
                {bio.length}/{MAX_BIO_LENGTH}
              </Text>
            </View>

            {/* 🔥 Save Button */}
            <TouchableOpacity
              style={[
                generalStyles.button,
                generalStyles.buttonBlack,
                generalStyles.marginTopLG,
              ]}
              onPress={handleSave}
              disabled={uploading}
            >
              <Text style={generalStyles.buttonText}>
                {uploading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        }
        data={[]} // ✅ FlatList requires data; use empty array for layout purposes
        keyExtractor={() => 'dummy'} // ✅ Prevents warning about missing keys
      />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 30,
  },
  input: {
    width: '85%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  dropdownWrapper: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    width: '100%',
    alignSelf: 'center',
    borderColor: '#ccc',
    borderRadius: 8,
  },
  textAreaContainer: {
    position: 'relative',
    width: '85%',
  },
  textArea: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    fontSize: 12,
    color: 'gray',
  },
});
