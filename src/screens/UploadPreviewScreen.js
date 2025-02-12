import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppIcon from '../components/AppIcon';
import downloadIcon from '../assets/icons/downloadIcon.png';
import facebookIcon from '../assets/icons/facebook.png';
import whatsappIcon from '../assets/icons/whatsapp.png';
import instagramIcon from '../assets/icons/insta.png';
import generalStyles from '../assets/styles/generalStyles';

const UploadPreviewScreen = () => {
  const route = useRoute();
  const { imageUri } = route.params;

  return (
    <View style={styles.container}>
      {/* ✅ Top Section (Image) */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />

        {/* ✅ Overlay Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <AppIcon iconSource={whatsappIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AppIcon iconSource={facebookIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AppIcon iconSource={instagramIcon} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <AppIcon iconSource={downloadIcon} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Bottom Section (Buttons) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.buttonBlack,
            generalStyles.marginBtmSM,
            generalStyles.smallestButton,
          ]}
        >
          <Text style={generalStyles.buttonText}>Share to Inspirations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            generalStyles.button,
            generalStyles.buttonBlack,
            generalStyles.smallestButton,
          ]}
        >
          <Text style={generalStyles.buttonText}>Save to My Profile only</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  iconButton: {
    backgroundColor: '#C85D7C',
    padding: 15,
    borderRadius: 30,
  },
  buttonContainer: {
    flex: 0.4, // ✅ Takes the other half of the screen
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
