import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { createDesign } from '../utils/firestore';
import { UserContext } from '../context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const UploadDesignScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    console.log('handleImagePick function triggered'); // Debugging Log

    if (Platform.OS === 'web') {
      alert('Image picking is not supported on web.');
      return;
    }

    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    console.log('Permission granted, opening image picker...'); // Debugging Log

    // Launch image library picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images', // 🛠 Fix: Use new MediaType syntax
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log('Image picker result:', result); // Debugging Log

    // 🛠 Fix: Check if result is valid
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      console.log('Image selected:', result.assets[0].uri); // Debugging Log
    } else {
      console.log('User canceled image picker or no image returned.'); // Debugging Log
    }
  };

  const handleUpload = async () => {
    if (!title || !image) {
      alert('Please enter a title and select an image');
      return;
    }

    console.log('Uploading image:', image);

    const designData = {
      title,
      imageUrl: image, // Need to upload to Firebase Storage first
      creatorId: user.uid,
      creatorName: user.name,
      creatorCountry: user.country,
    };

    const newDesign = await createDesign(designData);
    if (newDesign) {
      alert('Design uploaded successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter design title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Pick an Image" onPress={handleImagePick} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
      <Button title="Upload Design" onPress={handleUpload} />
    </View>
  );
};

export default UploadDesignScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
  },
});
