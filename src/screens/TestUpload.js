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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid'; // Generates unique file names

const UploadDesignScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePick = async () => {
    if (Platform.OS === 'web') {
      alert('Image picking is not supported on web.');
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    console.log('Permission granted, opening image picker...');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // 🔥 Convert image to blob and upload to Firebase Storage
  const uploadImageToFirebase = async (localUri) => {
    try {
      setUploading(true);
      const storage = getStorage(); // ✅ Correctly initialize Firebase Storage
      const fileName = `${uuid.v4()}.jpg`; // Unique file name
      const storageRef = ref(storage, `uploads/${fileName}`);

      console.log('Uploading image to Firebase Storage:', localUri);

      // ✅ Convert the image URI to a Blob for upload
      const response = await fetch(localUri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob); // ✅ Upload the image as a Blob
      console.log('Image uploaded successfully.');

      // ✅ Get the Firebase Storage URL
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async () => {
    if (!title || !image) {
      alert('Please enter a title and select an image');
      return;
    }

    setUploading(true);
    const downloadUrl = await uploadImageToFirebase(image); // ✅ Upload first
    if (!downloadUrl) {
      alert('Image upload failed');
      setUploading(false);
      return;
    }

    const designData = {
      title,
      imageUrl: downloadUrl || '', // ✅ Ensure it's not undefined
      creatorId: user?.uid || 'unknown', // ✅ Ensure creatorId exists
      creatorName: user?.name || 'Anonymous',
      creatorCountry: user?.country || 'Unknown',
    };

    const newDesign = await createDesign(designData);
    if (newDesign) {
      alert('Design uploaded successfully!');
      navigation.goBack();
    }
    setUploading(false);
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
      <Button
        title={uploading ? 'Uploading...' : 'Upload Design'}
        onPress={handleUpload}
        disabled={uploading} // Prevent multiple uploads
      />
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
