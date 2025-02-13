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
import { getDesigns } from '../utils/firestore';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AppIcon from '../components/AppIcon';
import { UserContext } from '../context/UserContext';

const screenWidth = Dimensions.get('window').width;
const padding = 20;
const tabWidth = (screenWidth - padding) / 2;

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [designs, setDesigns] = useState([]);
  const [filterDesigns, setFilterDesigns] = useState('all');
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const underlinePosition = useRef(new Animated.Value(0)).current;

  const hasCheckedInstructions = useRef(false); // ✅ Prevents infinite loop

  useEffect(() => {
    if (!hasCheckedInstructions.current && user && !user.hasSeenInstructions) {
      hasCheckedInstructions.current = true; // ✅ Ensures it runs only once
      setTimeout(() => {
        navigation.replace('Instructions'); // ✅ Uses replace to avoid back button issue
      }, 100);
    }
  }, [user]); // ✅ Runs only when user updates

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: filterDesigns === 'all' ? 10 : tabWidth + 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [filterDesigns]); // ✅ Runs only when filter changes

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const designList = await getDesigns();
        const publicDesigns = designList.filter((design) => !design.private);
        setDesigns(publicDesigns);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
      setLoading(false);
    };

    if (user?.nailCrewFollowing && Array.isArray(user.nailCrewFollowing)) {
      setFollowing(user.nailCrewFollowing); // ✅ Ensures following is set correctly
    }

    fetchDesigns();
  }, [filterDesigns, user]); // ✅ Ensures correct dependency handling

  const filteredDesigns =
    filterDesigns === 'all'
      ? designs
      : designs.filter((design) => following.includes(design.creatorId));

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDesigns}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* 🔥 Header stays in ListHeaderComponent */}
            <Header />

            {/* 🔥 Navigation Tabs */}
            <View style={styles.navContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  filterDesigns === 'all' && styles.activeNav,
                ]}
                onPress={() => setFilterDesigns('all')}
              >
                <Text style={styles.navText}>For You</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  filterDesigns === 'following' && styles.activeNav,
                ]}
                onPress={() => setFilterDesigns('following')}
              >
                <Text style={styles.navText}>Following</Text>
              </TouchableOpacity>

              <Animated.View
                style={[
                  styles.underline,
                  {
                    width: tabWidth - 20,
                    left: underlinePosition,
                    opacity: 1,
                  },
                ]}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SingleDesign', { design: item })
            }
            style={styles.designCard}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.iconContainer}>
                <AppIcon iconSource={cameraIcon} size={20} color={'#C85D7C'} />
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          loading ? (
            <Spinner />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You're not following anyone yet.
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
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
    height: 2,
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  designCard: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  imageWrapper: {
    position: 'relative',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
  },
});
