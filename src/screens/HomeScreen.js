import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import cameraIcon from '../assets/icons/camera.png';
import { getDesigns, getUserDocument } from '../utils/firestore';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AppIcon from '../components/AppIcon';

import { UserContext } from '../context/UserContext';
const screenWidth = Dimensions.get('window').width;
const padding = 20; // ✅ Adjust based on total padding
const tabWidth = (screenWidth - padding) / 2; // ✅ Ensures correct width
const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [designs, setDesigns] = useState([]);
  const [filterDesigns, setFilterDesigns] = useState('all');
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: filterDesigns === 'all' ? 10 : tabWidth + 10, // ✅ Moves underline correctly
      duration: 300,
      useNativeDriver: false, // ✅ Required for layout animations
    }).start();
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const designList = await getDesigns();
        setDesigns(designList);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
      setLoading(false);
    };

    fetchDesigns();
  }, [filterDesigns]);

  const filteredDesigns =
    filterDesigns === 'all'
      ? designs
      : designs.filter((design) => following.includes(design.creatorId));
  return (
    <View style={styles.container}>
      <Header marginTop={-20} />
      {/* 🔥 Buttons for Filtering */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            filterDesigns === 'all' && styles.activeNav, // ✅ Border applied to full button
          ]}
          onPress={() => setFilterDesigns('all')}
        >
          <Text style={styles.navText}>For You</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            filterDesigns === 'following' && styles.activeNav, // ✅ Border applied to full button
          ]}
          onPress={() => setFilterDesigns('following')}
        >
          <Text style={styles.navText}>Following</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.underline,
            {
              width: tabWidth - 20, // ✅ Keeps width consistent
              left: underlinePosition, // ✅ Now using `left` instead of `translateX`
              opacity: 1, // ✅ Always visible
            },
          ]}
        />
      </View>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Test')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Upload New Design</Text>
      </TouchableOpacity> */}
      {loading ? (
        <Spinner />
      ) : filteredDesigns.length === 0 ? ( // ✅ Show message if no designs
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You're not following anyone yet.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDesigns}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleDesign', { design: item })
              } // ✅ Navigate on click
              style={styles.designCard}
            >
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.iconContainer}>
                  <AppIcon
                    iconSource={cameraIcon}
                    size={20}
                    color={'#C85D7C'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
    marginTop: 80,
    position: 'relative',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  navText: {
    fontSize: 20,
    fontWeight: 400,
  },

  underline: {
    position: 'absolute',
    bottom: 8, // 🔥 Moves it closer to the text but keeps click area
    height: 1, // ✅ Slightly thicker for better visibility
    backgroundColor: '#000',
    borderRadius: 5,
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
  row: {
    justifyContent: 'space-between', // ✅ Ensures spacing between columns
    paddingHorizontal: 10,
  },
  designCard: {
    width: '48%', // ✅ Each item takes half of the screen width
    aspectRatio: 1, // ✅ Ensures square shape
    marginBottom: 10,
    backgroundColor: '#fff', // ✅ Ensures shadow looks proper
    shadowColor: '#000', // ✅ Stronger shadow effect
    shadowOpacity: 0.15, // 🔥 Increase for darker shadow
    shadowRadius: 5, // 🔥 More spread for depth
    shadowOffset: { width: 0, height: 4 }, // 🔥, // 🔥 More depth
    elevation: 8, // ✅ Stronger Android shadow
  },
  imageWrapper: {
    position: 'relative', // ✅ Allows absolute positioning of icon
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 8,
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
});
