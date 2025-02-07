import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
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
import { timeAgo } from '../helpers';

const SingleDesignScreen = ({ route }) => {
  const { design } = route.params;
  const { user } = useContext(UserContext);
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
    <View style={styles.container}>
      <Header marginTop={-25} />

      {/* 🔥 FlatList handles scrolling, and this View is the Header Content */}
      <View style={{ flex: 1, marginTop: 40 }}>
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
                      <Text style={styles.secondaryText}>
                        {design.likes} likes
                      </Text>
                      <Text style={styles.title}>{design.title}</Text>
                      <Text style={styles.creator}>
                        {design.creatorName} | {design.creatorCountry}
                      </Text>
                      <Text style={styles.secondaryText}>
                        {timeAgo(design.createdAt)}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity>
                        <AppIcon
                          iconSource={shareIcon}
                          size={20}
                          color={'#040404'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <AppIcon
                          iconSource={downloadIcon}
                          size={20}
                          color={'#040404'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <AppIcon
                          iconSource={heartIcon}
                          size={20}
                          color={'#040404'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* 🔥 "Try It On" Button */}
              <TouchableOpacity style={styles.tryButton}>
                <Text style={styles.tryButtonText}>Try It On</Text>
              </TouchableOpacity>

              {/* 🔥 "You Might Also Like" Section Title */}
              <Text style={styles.sectionTitle}>You Might Also Like</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id} style={styles.relatedCard}>
              <View style={styles.imageContainer}>
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
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 50,
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
});
