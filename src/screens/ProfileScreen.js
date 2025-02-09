import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { getUserUploadedDesigns, getSavedDesigns } from '../utils/firestore';
import Header from '../components/Header';

const screenWidth = Dimensions.get('window').width;
const padding = 20;
const tabWidth = (screenWidth - padding) / 2;

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('Gallery');
  const [galleryDesigns, setGalleryDesigns] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const underlinePosition = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === 'Gallery' ? 15 : tabWidth - 85,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const uploadedDesigns = await getUserUploadedDesigns(user.uid);
      const savedDesignsData = await getSavedDesigns(user.uid);

      setGalleryDesigns(uploadedDesigns);
      setSavedDesigns(savedDesignsData);
    };

    fetchData();
  }, [user]);

  return (
    <View style={styles.container}>
      <Header previousScreen="Profile" />
      <FlatList
        ListHeaderComponent={
          <View>
            {/* 🔥 Profile Info */}
            <View style={styles.profileHeader}>
              {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.placeholderAvatar} />
              )}
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.bio}>{user.bio || 'No bio yet'}</Text>

              {/* 🔥 Followers & Following */}
              <View style={styles.followContainer}>
                <Text style={styles.followText}>
                  {user.nailCrewFollowers.length} Followers
                </Text>
                <Text style={styles.followText}>
                  {user.nailCrewFollowing.length} Following
                </Text>
              </View>
            </View>

            {/* 🔥 My Nail Art Crew (Followers List) */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Nail Art Crew</Text>
                <TouchableOpacity onPress={() => alert('test')}>
                  <Text style={styles.showAll}>Show All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={user.nailCrewFollowers.slice(0, 5)}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.followersList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.followerCard}
                    onPress={() => alert('test')}
                  >
                    <Image
                      source={{ uri: item.profilePicture }}
                      style={styles.followerAvatar}
                    />
                    <Text style={styles.followerName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* 🔥 Tabs for Gallery & My Designs */}
            <View style={styles.navContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  activeTab === 'Gallery' && styles.activeNav,
                ]}
                onPress={() => setActiveTab('Gallery')}
              >
                <Text style={styles.navText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  activeTab === 'My Designs' && styles.activeNav,
                ]}
                onPress={() => setActiveTab('My Designs')}
              >
                <Text style={styles.navText}>My Designs</Text>
              </TouchableOpacity>

              <Animated.View
                style={[
                  styles.underline,
                  {
                    width: tabWidth - 40,
                    left: underlinePosition,
                    transform: [{ translateX: underlinePosition }],
                  },
                ]}
              />
            </View>
          </View>
        }
        data={activeTab === 'Gallery' ? galleryDesigns : savedDesigns}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'Gallery'
                ? 'No designs uploaded yet.'
                : 'No saved designs yet.'}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.designCard, index % 3 === 2 && { marginRight: 0 }]}
            onPress={() =>
              navigation.navigate('SingleDesign', {
                design: item,
                previousScreen: 'Profile',
              })
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  followText: {
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showAll: {
    fontSize: 14,
    color: '#C85D7C',
    textDecorationLine: 'underline',
  },
  followersList: {
    marginTop: 10,
  },
  followerCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  followerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  followerName: {
    fontSize: 12,
    marginTop: 5,
  },
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  navText: {
    fontSize: 18,
    fontWeight: '400',
  },
  underline: {
    position: 'absolute',
    bottom: 8,
    height: 1,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  row: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  designCard: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
