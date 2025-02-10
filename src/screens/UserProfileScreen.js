import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import {
  getUserById,
  getUserUploadedDesigns,
  followUser,
  unfollowUser,
} from '../utils/firestore';
import Header from '../components/Header';
import generalStyles from '../assets/styles/generalStyles';

const UserProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params; // ✅ Get user ID from navigation params
  const { user: loggedInUser } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState(null);
  const [userDesigns, setUserDesigns] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      const userData = await getUserById(userId);
      setProfileUser(userData);

      const designs = await getUserUploadedDesigns(userId);
      setUserDesigns(designs);

      // ✅ Check if logged-in user is already following this user
      setIsFollowing(userData.nailCrewFollowers.includes(loggedInUser.uid));
    };

    fetchUserProfile();
  }, [userId]);

  // 🔥 Handle Follow/Unfollow Toggle
  const handleFollowToggle = async () => {
    if (!profileUser) return;

    if (isFollowing) {
      await unfollowUser(loggedInUser.uid, userId);
    } else {
      await followUser(loggedInUser.uid, userId);
    }

    // ✅ Update the follow state
    setIsFollowing(!isFollowing);

    // ✅ Update logged-in user's state
    setUser((prevUser) => ({
      ...prevUser,
      nailCrewFollowing: isFollowing
        ? prevUser.nailCrewFollowing.filter((id) => id !== userId)
        : [...prevUser.nailCrewFollowing, userId],
    }));
  };

  if (!profileUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        previousScreen="UserProfile"
        isFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
      />

      {/* 🔥 Profile Section */}
      <View style={styles.profileContainer}>
        {/* 🔹 Profile Image */}
        <Image
          source={
            profileUser.profileImage ? { uri: profileUser.profileImage } : ''
          }
          style={styles.avatar}
        />

        {/* 🔹 Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{profileUser.name}</Text>

          {/* Followers & Following */}
          <View style={styles.followContainer}>
            <Text style={styles.followText}>
              {profileUser.nailCrewFollowers.length} Followers
            </Text>
            <Text style={styles.followText}>
              {profileUser.nailCrewFollowing.length} Following
            </Text>
          </View>

          {/* Country */}
          <Text style={styles.country}>{profileUser.country}</Text>
        </View>
      </View>

      {/* 🔥 Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          {profileUser.bio ? profileUser.bio : 'No bio yet'}
        </Text>
      </View>

      {/* 🔥 Designs Section */}
      <View style={styles.designsContainer}>
        <Text style={styles.sectionTitle}>{profileUser.name}'s Designs</Text>

        <FlatList
          data={userDesigns}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No designs uploaded yet.</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.designCard, index % 3 === 2 && { marginRight: 0 }]}
              onPress={() =>
                navigation.navigate('SingleDesign', {
                  design: item,
                  previousScreen: 'UserProfile',
                })
              }
            >
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row', // ✅ Profile Image on the Left, Text on Right
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  followContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  followText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 15,
  },
  country: {
    fontSize: 16,
    marginTop: 5,
  },
  bioContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bioText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  designsContainer: {
    flex: 1,
  },
  row: {
    justifyContent: 'flex-start',
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
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});
