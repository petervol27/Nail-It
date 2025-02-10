import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { getUserById, followUser, unfollowUser } from '../utils/firestore';
import { UserContext } from '../context/UserContext';
import Header from '../components/Header';
import generalStyles from '../assets/styles/generalStyles';

const FollowersListScreen = ({ route, navigation }) => {
  const { followers } = route.params; // ✅ User IDs of followers
  const { user: loggedInUser, setUser } = useContext(UserContext);
  const [followersData, setFollowersData] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!followers || followers.length === 0) return;

      try {
        const followersDetails = await Promise.all(
          followers.map(async (followerId) => {
            const followerData = await getUserById(followerId);
            return {
              id: followerId,
              ...followerData,
              isFollowing: loggedInUser.nailCrewFollowing.includes(followerId), // ✅ Check if following
            };
          })
        );
        setFollowersData(followersDetails);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [followers, loggedInUser.nailCrewFollowing]);

  // 🔥 Follow/Unfollow Logic
  const handleFollowToggle = async (targetUserId) => {
    if (!targetUserId) return;

    try {
      const isCurrentlyFollowing =
        loggedInUser.nailCrewFollowing.includes(targetUserId);

      if (isCurrentlyFollowing) {
        await unfollowUser(loggedInUser.uid, targetUserId);
      } else {
        await followUser(loggedInUser.uid, targetUserId);
      }

      // ✅ Update button state in the list
      setFollowersData((prev) =>
        prev.map((f) =>
          f.id === targetUserId ? { ...f, isFollowing: !f.isFollowing } : f
        )
      );

      // ✅ Update global user context
      setUser((prevUser) => ({
        ...prevUser,
        nailCrewFollowing: isCurrentlyFollowing
          ? prevUser.nailCrewFollowing.filter((id) => id !== targetUserId)
          : [...prevUser.nailCrewFollowing, targetUserId],
      }));
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header previousScreen="Profile" />
      <FlatList
        data={followersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.followerCard}>
            {/* 🔥 User Profile Picture (Navigates to UserProfile) */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UserProfile', { userId: item.id })
              }
            >
              {item.profileImage ? (
                <Image
                  source={{ uri: item.profileImage }}
                  style={styles.followerAvatar}
                />
              ) : (
                <View style={styles.followerAvatar}></View>
              )}
            </TouchableOpacity>

            {/* 🔥 User Name */}
            <Text style={styles.followerName}>{item.name}</Text>

            {/* 🔥 Follow/Unfollow Button */}
            <TouchableOpacity
              style={[
                generalStyles.button,
                item.isFollowing,
                generalStyles.buttonFollow,
              ]}
              onPress={() => handleFollowToggle(item.id)}
            >
              <Text style={{ color: '#fff' }}>
                {item.isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FollowersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  followerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  followerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
  followerName: {
    fontSize: 18,
    fontWeight: 300,
  },
});
