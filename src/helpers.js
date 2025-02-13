import { Timestamp } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { Alert, Linking, Platform } from 'react-native';

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const timeAgo = (timestamp) => {
  const now = new Date();
  const createdDate =
    timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const diffMs = now - createdDate;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
};

export const downloadImage = async (imageUri, setDownloading) => {
  try {
    setDownloading(true);

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required to save images.');
      setDownloading(false);
      return;
    }

    const isLocalFile = imageUri.startsWith('file://');
    let fileUri = imageUri;

    if (!isLocalFile) {
      const fileName = imageUri.split('/').pop();
      fileUri = `${FileSystem.documentDirectory}${fileName}`;
      const downloadedFile = await FileSystem.downloadAsync(imageUri, fileUri);
      fileUri = downloadedFile.uri;
    }

    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync('Nail It Designs', asset, false);
    Alert.alert('✅ Download Successful!', 'Image saved to your gallery.');
  } catch (error) {
    console.log('❌ Error downloading image:', error);
    Alert.alert('Error', 'Failed to download image.');
  } finally {
    setDownloading(false);
  }
};

export const shareToInstagram = async (imageUri) => {
  try {
    // ✅ Ensure permissions
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission || permission.status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable media permissions.');
      return;
    }

    // 🖼️ Prepare the image
    const fileName = imageUri.split('/').pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // 🔄 Download the file if needed
    if (!fileInfo.exists) {
      const download = await FileSystem.downloadAsync(imageUri, fileUri);
      if (download.status !== 200) {
        throw new Error('Failed to download image.');
      }
    }

    // 🚀 Open Instagram directly
    const instagramURL = `instagram-stories://share?source=${fileUri}`;
    const canOpen = await Linking.canOpenURL(instagramURL);

    if (canOpen) {
      await Linking.openURL(instagramURL);
      console.log('✅ Shared directly to Instagram!');
    } else {
      Alert.alert(
        'Instagram Not Installed',
        'Please install Instagram to share directly.'
      );
    }
  } catch (error) {
    console.error('❌ Failed to share directly to Instagram:', error);
    Alert.alert('Error', 'Unable to share directly. Please try again.');
  }
};

export const shareToFacebook = async (imageUri) => {
  try {
    // ✅ Step 1: Ensure media permissions
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission || permission.status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable media permissions.');
      return;
    }

    // 🖼️ Step 2: Prepare the image file
    const fileName = imageUri.split('/').pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // 🔄 Step 3: Download image if it doesn't exist locally
    if (!fileInfo.exists) {
      const download = await FileSystem.downloadAsync(imageUri, fileUri);
      if (download.status !== 200) {
        throw new Error('Failed to download image.');
      }
    }

    // 🚀 Step 4: Open Facebook with the shared image
    const facebookURL = `fb://facewebmodal/f?href=${encodeURIComponent(
      fileUri
    )}`;
    const canOpen = await Linking.canOpenURL(facebookURL);

    if (canOpen) {
      await Linking.openURL(facebookURL);
      console.log('✅ Shared directly to Facebook!');
    } else {
      Alert.alert(
        'Facebook Not Installed',
        'Please install Facebook to share directly.'
      );
    }
  } catch (error) {
    console.error('❌ Failed to share directly to Facebook:', error);
    Alert.alert('Error', 'Unable to share directly. Please try again.');
  }
};

export const shareToWhatsApp = async (
  imageUri,
  message = 'Check out this nail design!'
) => {
  try {
    // ✅ Step 1: Ensure permission
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Denied', 'Please enable media permissions.');
      return;
    }

    // 🖼️ Step 2: Prepare file
    const fileName = imageUri.split('/').pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    // 🔄 Step 3: Download if missing
    if (!fileInfo.exists) {
      const download = await FileSystem.downloadAsync(imageUri, fileUri);
      if (download.status !== 200) {
        throw new Error('Failed to download image.');
      }
    }

    // 🚀 Step 4: Attempt to open WhatsApp
    const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const canOpen = await Linking.canOpenURL(whatsappURL);

    if (canOpen) {
      await Linking.openURL(whatsappURL);
      console.log('✅ Shared to WhatsApp!');
    } else {
      Alert.alert('WhatsApp Not Installed', 'Please install WhatsApp.');
    }
  } catch (error) {
    console.error('❌ WhatsApp Sharing Failed:', error);
    Alert.alert('Error', 'Unable to share to WhatsApp.');
  }
};
