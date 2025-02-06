import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { getDesigns } from '../utils/firestore';
import AppIcon from '../components/AppIcon';
import cameraIcon from '../assets/icons/camera.png';
import shareIcon from '../assets/icons/shareIcon.png';
import downloadIcon from '../assets/icons/downloadIcon.png';
import heartIcon from '../assets/icons/heart.png';
import Header from '../components/Header';

const SingleDesignScreen = ({ route }) => {
  const { user } = useContext(UserContext);
  const { design } = route.params;
  const [relatedDesigns, setRelatedDesigns] = useState([]);

  useEffect(() => {
    const fetchRelatedDesigns = async () => {
      const allDesigns = await getDesigns();
      const filteredDesigns = allDesigns.filter(
        (item) => item.id !== design.id
      );
      setRelatedDesigns(filteredDesigns.slice(0, 6));
    };

    fetchRelatedDesigns();
  }, [design.id]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {/* 🔥 Display the Selected Design */}
          <View style={styles.designCard}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{ uri: design.imageUrl }}
                style={styles.image}
              >
                {/* 🔥 Absolute Position Fix: Now relative to imageContainer */}
                <TouchableOpacity style={styles.absoluteIcon}>
                  <AppIcon iconSource={cameraIcon} color={'white'} size={20} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>

          {/* 🔥 Design Info */}
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.secondaryText}>{design.likes} likes</Text>
              <Text style={styles.title}>{design.title}</Text>
              <Text style={styles.creator}>
                {design.creatorName} | {design.creatorCountry}
              </Text>
              <Text style={styles.secondaryText}>2 days ago</Text>
            </View>

            {/* 🔥 Icons Section */}
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <AppIcon iconSource={shareIcon} size={20} color={'#040404'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AppIcon
                  iconSource={downloadIcon}
                  size={20}
                  color={'#040404'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AppIcon iconSource={heartIcon} size={20} color={'#040404'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 🔥 "Try It On" Button */}
          <TouchableOpacity style={styles.tryButton}>
            <Text style={styles.tryButtonText}>Try It On</Text>
          </TouchableOpacity>

          {/* 🔥 "You Might Also Like" Section */}
          <Text style={styles.sectionTitle}>You Might Also Like</Text>
          <View style={styles.relatedGrid}>
            {relatedDesigns.map((item) => (
              <TouchableOpacity key={item.id} style={styles.relatedCard}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.relatedImage}
                  />
                  {/* 🔥 Absolute Position Fix for Related Designs */}
                  <TouchableOpacity style={styles.absoluteIcon}>
                    <AppIcon
                      iconSource={cameraIcon}
                      size={20}
                      color={'#C85D7C'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleDesignScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 60,
  },
  designCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  imageContainer: {
    position: 'relative', // ✅ Makes absolute icons relative to this container
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  absoluteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // ✅ Slight transparency
    padding: 8,
    borderRadius: 20, // ✅ Circle around icon
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: 16,
    color: 'gray',
  },
  secondaryText: {
    fontSize: 14,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tryButton: {
    backgroundColor: '#C85D7C',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  tryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  relatedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
