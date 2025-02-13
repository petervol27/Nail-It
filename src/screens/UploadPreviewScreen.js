import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppIcon from '../components/AppIcon';
import downloadIcon from '../assets/icons/downloadIcon.png';
import facebookIcon from '../assets/icons/facebook.png';
import whatsappIcon from '../assets/icons/whatsapp.png';
import instagramIcon from '../assets/icons/insta.png';
import generalStyles from '../assets/styles/generalStyles';
import {
  downloadImage,
  shareToInstagram,
  shareToFacebook,
  shareToWhatsApp,
} from '../helpers';
import { UserContext } from '../context/UserContext';
import { createDesign } from '../utils/firestore';

const UploadPreviewScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const { imageUri } = route.params;

  const [downloading, setDownloading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [designTitle, setDesignTitle] = useState('');
  const [uploadType, setUploadType] = useState(null);

  // ✅ Download image
  const handleDownload = () => downloadImage(imageUri, setDownloading);

  // ✅ Social Media Sharing
  const handleInstagramShare = () => shareToInstagram(imageUri);
  const handleFacebookShare = () => shareToFacebook(imageUri);
  const handleWhatsappShare = () => shareToWhatsApp(imageUri);

  // ✅ Trigger the modal
  const triggerUpload = (type) => {
    setUploadType(type);
    setModalVisible(true);
  };

  // ✅ Handle Upload
  const handleUpload = async () => {
    if (!designTitle.trim()) {
      alert('Please enter a title for your design.');
      return;
    }

    const isPrivate = uploadType === 'private';
    const designData = {
      title: designTitle,
      imageUrl: imageUri,
      creatorId: user.uid,
      creatorName: user.name,
      creatorCountry: user.country || 'Unknown',
      private: isPrivate,
    };

    const newDesign = await createDesign(designData);
    if (newDesign) {
      alert(
        `Design ${
          isPrivate ? 'saved to profile' : 'shared to inspirations'
        } successfully!`
      );
      setModalVisible(false);
      setDesignTitle('');
      if (isPrivate) {
        // 🚀 Navigate to Profile & Clear Stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main', params: { screen: 'MyProfile' } }],
        });
      } else {
        // 🚀 Navigate to Home & Clear Stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }
    } else {
      alert('Failed to upload design.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🖼️ Image Preview */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        {/* 🚀 Overlay Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleWhatsappShare}
          >
            <AppIcon iconSource={whatsappIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleFacebookShare}
          >
            <AppIcon iconSource={facebookIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleInstagramShare}
          >
            <AppIcon iconSource={instagramIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDownload}>
            <AppIcon iconSource={downloadIcon} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔘 Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.buttonBlack,
            generalStyles.marginBtmSM,
          ]}
          onPress={() => triggerUpload('public')}
        >
          <Text style={generalStyles.buttonText}>Share to Inspirations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[generalStyles.button, generalStyles.buttonBlack]}
          onPress={() => triggerUpload('private')}
        >
          <Text style={generalStyles.buttonText}>Save to My Profile only</Text>
        </TouchableOpacity>
      </View>

      {/* 🛠️ Title Input Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Design Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Design Title"
              placeholderTextColor="#aaa"
              value={designTitle}
              onChangeText={setDesignTitle}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleUpload}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadPreviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { flex: 1 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  iconButton: {
    backgroundColor: '#C85D7C',
    padding: 15,
    borderRadius: 30,
  },
  buttonContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    width: '100%',
    padding: 10,
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#C85D7C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 5,
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
