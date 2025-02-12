import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AppIcon from './AppIcon';
import cameraIcon from '../assets/icons/camera.png';
// import galleryIcon from '../assets/icons/galleryIcon.png';

const UploadModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  // ✅ Handle selecting an image (Gallery or Camera)
  const handleImagePick = async (fromCamera) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      alert('Permission required to access media.');
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

    if (!result.canceled) {
      onClose();
      navigation.navigate('UploadPreview', { imageUri: result.assets[0].uri });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Upload Image</Text>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleImagePick(false)}
          >
            <AppIcon iconSource={cameraIcon} size={24} />
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleImagePick(true)}
          >
            <AppIcon iconSource={cameraIcon} size={24} />
            <Text style={styles.optionText}>Take a Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UploadModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#C85D7C',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
  },
});
