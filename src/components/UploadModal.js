import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AppIcon from './AppIcon';
import generalStyles from '../assets/styles/generalStyles';

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
      navigation.navigate('Main', {
        screen: 'Home',
        params: {
          screen: 'UploadPreview',
          params: { imageUri: result.assets[0].uri },
        },
      });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* ✅ Close modal when clicking outside */}
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[
              generalStyles.button,
              generalStyles.buttonMain,
              generalStyles.marginBtmSM,
            ]}
            onPress={() => handleImagePick(false)}
          >
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[generalStyles.button, generalStyles.buttonMain]}
            onPress={() => handleImagePick(true)}
          >
            <Text style={styles.optionText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
    paddingHorizontal: 60,
    paddingVertical: 100,
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
});
