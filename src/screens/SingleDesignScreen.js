import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
  Share,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import {
  getDesigns,
  getDesignById,
  toggleLikeDesign,
} from '../utils/firestore';
import AppIcon from '../components/AppIcon';
import cameraIcon from '../assets/icons/camera.png';
import shareIcon from '../assets/icons/shareIcon.png';
import downloadIcon from '../assets/icons/downloadIcon.png';
import heartIcon from '../assets/icons/heart.png';
import filledHeartIcon from '../assets/icons/filledHeart.png';
import Header from '../components/Header';
import { timeAgo } from '../helpers';
import generalStyles from '../assets/styles/generalStyles';
import Spinner from '../components/Spinner';

import { downloadImage } from '../helpers';
const SingleDesignScreen = ({ route, navigation }) => {
  const { design, previousScreen } = route.params || {};
  const { user } = useContext(UserContext);
  const [relatedDesigns, setRelatedDesigns] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(design.likes);

  // ✅ Handle Android Back Button
  useEffect(() => {
    const fetchUpdatedDesign = async () => {
      try {
        const updatedDesign = await getDesignById(design.id); // ✅ Fetch from Firestore
        if (updatedDesign) {
          setIsLiked(updatedDesign.likedBy?.includes(user.uid)); // ✅ Update like state
          setLikesCount(updatedDesign.likes); // ✅ Update like count
        }
      } catch (error) {
        console.error('Error fetching updated design:', error);
      }
    };

    const fetchRelatedDesigns = async () => {
      const allDesigns = await getDesigns();
      const filteredDesigns = allDesigns.filter(
        (item) => item.id !== design.id
      );
      setRelatedDesigns(filteredDesigns.slice(0, 6));
    };

    fetchUpdatedDesign(); // ✅ Fetch latest likes state
    fetchRelatedDesigns();
  }, [design.id]);

  const shareDesign = async (design) => {
    try {
      const shareMessage = `
          🎨 **${design.title}**
          ❤️ ${design.likes} Likes
          👤 By ${design.creatorName} from ${design.creatorCountry}

          Check out this amazing design on Nail It! 🚀
          ${design.imageUrl}
        `;

      await Share.share({
        message: shareMessage,
        url: design.imageUrl,
        title: design.title,
      });
    } catch (error) {
      console.error('Error sharing design:', error);
      Alert.alert('Error', 'Could not share the design.');
    }
  };

  const handleDownload = () => {
    downloadImage(design.imageUrl, setDownloading);
  };

  const toggleLike = async () => {
    try {
      await toggleLikeDesign(design.id, user.uid); // ✅ Firestore function

      setIsLiked((prev) => !prev); // ✅ Instant UI update
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1)); // ✅ Update like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <Modal transparent={true} animationType="fade" visible={!!downloading}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Spinner />
            <Text style={styles.loadingText}>Downloading Image...</Text>
          </View>
        </View>
      </Modal>
      {/* 🔥 FlatList handles scrolling, and this View is the Header Content */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={relatedDesigns}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} // ✅ Allows scrolling inside a parent FlatList if needed
          contentContainerStyle={{ backgroundColor: '#fff' }}
          ListHeaderComponent={
            <View>
              {/* 🔥 Main Design */}
              <View style={styles.content}>
                <View style={styles.designCard}>
                  <View>
                    <ImageBackground
                      source={{ uri: design.imageUrl }}
                      style={styles.image}
                    >
                      <View style={styles.mainIconContainer}>
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
                      <Text style={styles.secondaryText}>
                        {likesCount} likes
                      </Text>
                      <Text style={styles.title}>{design.title}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (design.creatorId !== user.uid) {
                            navigation.navigate('UserProfile', {
                              userId: design.creatorId,
                            });
                          } else {
                            navigation.navigate('MyProfile'); // ✅ Redirect to own profile
                          }
                        }}
                      >
                        <Text style={styles.creatorText}>
                          {design.creatorName}, {design.creatorCountry}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.secondaryText}>
                        {timeAgo(design.createdAt)}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => shareDesign(design)}>
                        <AppIcon
                          iconSource={shareIcon}
                          size={20}
                          color={'#040404'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          handleDownload(design.imageUrl, setDownloading)
                        }
                      >
                        <AppIcon
                          iconSource={downloadIcon}
                          size={20}
                          color={'#040404'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={toggleLike}>
                        <AppIcon
                          iconSource={isLiked ? filledHeartIcon : heartIcon}
                          size={20}
                          color={isLiked ? 'red' : '#040404'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* 🔥 "Try It On" Button */}
              <TouchableOpacity
                style={[
                  generalStyles.button,
                  generalStyles.buttonMain,
                  generalStyles.smallerButton,
                ]}
              >
                <Text style={[generalStyles.buttonText]}>Try It On</Text>
              </TouchableOpacity>

              {/* 🔥 "You Might Also Like" Section Title */}
              <Text style={styles.sectionTitle}>You Might Also Like</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedCard}
              onPress={() => {
                navigation.replace('SingleDesign', { design: item });
              }}
            >
              <View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.relatedImage}
                />
                <View style={styles.imageIconContainer}>
                  <AppIcon
                    iconSource={cameraIcon}
                    size={20}
                    color={'#C85D7C'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SingleDesignScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
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
    bottom: 12,
    right: 8,
    width: 32, // ✅ Circle size
    height: 32,
    borderRadius: 16, // ✅ Makes it a perfect circle
    backgroundColor: 'white', // ✅ White background
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // ✅ Optional: Shadow for better visibility
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5, // ✅ Android shadow
  },
  mainIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    backgroundColor: '#C85D7C',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginStart: 15,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  relatedCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  relatedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
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
