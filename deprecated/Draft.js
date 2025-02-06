import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import downloadIcon from '../assets/icons/downloadIcon.png';
import shareIcon from '../assets/icons/shareIcon.png';
import heartIcon from '../assets/icons/heart.png';
import filledHeartIcon from '../assets/icons/filledHeart.png';
import cameraIcon from '../assets/icons/camera.png';
import {
  getDesigns,
  getUserDocument,
  toggledSavedDesign,
  likeDesign,
} from '../utils/firestore';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AppIcon from '../components/AppIcon';
import { timeAgo } from '../helpers';

import { Alert, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { UserContext } from '../context/UserContext';

const SingleDesignScreen = ({ route }) => {
  const { design } = route.params;
  const { user } = useContext(UserContext);
  const [relatedDesigns, setRelatedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [likeAnimation] = useState(new Animated.Value(0));
  const userId = user?.uid;
  useEffect(() => {
    const fetchRelatedDesigns = async () => {
      const allDesigns = await getDesigns();
      const filteredDesigns = allDesigns.filter(
        (item) => item.id !== design.id // ✅ Exclude the current design
      );
      setRelatedDesigns(filteredDesigns.slice(0, 6)); // ✅ Show only 6 related designs
    };

    fetchRelatedDesigns();
  }, [design.id]);
  // const shareDesign = async (design) => {
  //   try {
  //     const shareMessage = `
  //         🎨 **${design.title}**
  //         ❤️ ${design.likes} Likes
  //         👤 By ${design.creatorName} from ${design.creatorCountry}

  //         Check out this amazing design on Nail It! 🚀
  //         ${design.imageUrl}
  //       `;

  //     await Share.share({
  //       message: shareMessage,
  //       url: design.imageUrl,
  //       title: design.title,
  //     });
  //   } catch (error) {
  //     console.error('Error sharing design:', error);
  //     Alert.alert('Error', 'Could not share the design.');
  //   }
  // };
  // const downloadImage = async (imageUrl, setDownloading) => {
  //   try {
  //     setDownloading(true);
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Premission required');
  //       setDownloading(false);
  //       return;
  //     }
  //     const fileName = imageUrl.split('/').pop();
  //     const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  //     const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);
  //     const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
  //     await MediaLibrary.createAlbumAsync('Nail It Designs', asset, false);
  //     Alert.alert('Download Succesful!');
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert(error);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };
  return (
    <View style={styles.container}>
      <Header />
      {/* <Modal transparent={true} animationType="fade" visible={downloading}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Spinner />
                  <Text style={styles.loadingText}>Downloading Image...</Text>
                </View>
              </View>
            </Modal> */}
      <View style={styles.content}>
        <View style={styles.designCard}>
          <View>
            <ImageBackground
              source={{ uri: design.imageUrl }}
              style={styles.image}
            >
              <View style={styles.imageIconContainer}>
                <TouchableOpacity>
                  <AppIcon
                    iconSource={cameraIcon}
                    style={styles.imageIcon}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.secondaryText}>{design.likes} likes</Text>
              <Text style={styles.title}>{design.title}</Text>
              <Text style={styles.creator}>
                {design.creatorName} | {design.creatorCountry}
              </Text>
              <Text style={styles.secondaryText}>
                {timeAgo(design.createdAt)}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity
              // onPress={() => shareDesign(design)}
              >
                <AppIcon
                  iconSource={shareIcon}
                  designIcon={true}
                  size={20}
                  color={'#040404'}
                />
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={() => downloadImage(design.imageUrl, setDownloading)}
              >
                <AppIcon
                  iconSource={downloadIcon}
                  designIcon={true}
                  size={20}
                  color={'#040404'}
                />
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={async () => {
              //   await toggledSavedDesign(userId, design.id);
              //   setSavedDesigns((prev) =>
              //     prev.includes(design.id)
              //       ? prev.filter((id) => id !== design.id)
              //       : [...prev, design.id]
              //   );
              // }}
              >
                <AppIcon
                  iconSource={
                    // savedDesigns.includes(design.id) ? filledHeartIcon : heartIcon
                    heartIcon
                  }
                  size={20}
                  // color={savedDesigns.includes(design.id) ? 'red' : '#040404'}
                  color={'#040404'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SingleDesignScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    marginTop: 50,
    wdith: '100%',
  },

  designCard: {
    flex: 1,
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  imageIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#C85D7C',
    // padding: 8,
    paddingEnd: 10,
    paddingStart: 10,
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    zIndex: 999,
    elevation: 10,
  },

  iconContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-evenly',
  },
  textContainer: {
    flex: 0.5,
  },
  secondaryText: { fontWeight: 200, fontSize: 14, marginVertical: 2 },
  creator: { fontWeight: 300, fontSize: 14, marginVertical: 2 },
  title: { fontSize: 18, fontWeight: 300 },
  loadingText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
});
