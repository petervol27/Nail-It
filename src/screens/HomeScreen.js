import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import downloadIcon from '../assets/icons/downloadIcon.png';
import shareIcon from '../assets/icons/shareIcon.png';
import heartIcon from '../assets/icons/heart.png';
import cameraIcon from '../assets/icons/camera.png';
import { getDesigns } from '../utils/firestore';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AppIcon from '../components/AppIcon';
import { timeAgo } from '../helpers';
import generalStyles from '../assets/styles/generalStyles';
const HomeScreen = ({ navigation }) => {
  const [designs, setDesigns] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const designList = await getDesigns();
        setDesigns(designList.length > 0 ? designList : null);
      } catch (error) {
        console.error('Error fetching designs:', error);
      }
      setLoading(false);
    };

    fetchDesigns();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Test')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Upload New Design</Text>
      </TouchableOpacity> */}
      {loading ? (
        <Spinner />
      ) : designs === null ? (
        <></>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={designs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              width: '100%',
              flexGrow: 1,
              margin: 0,
              padding: 0,
            }}
            style={{
              flex: 1,
              width: '100%',
              padding: 0,
              margin: 0,
            }}
            renderItem={({ item }) => (
              <View style={styles.designCard}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                  >
                    <View style={styles.imageIconContainer}>
                      <AppIcon
                        iconSource={cameraIcon}
                        style={styles.imageIcon}
                        color={'white'}
                      />
                    </View>
                  </ImageBackground>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.secondaryText}>{item.likes} likes</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.creator}>
                      {item.creatorName} | {item.creatorCountry}
                    </Text>
                    <Text style={styles.secondaryText}>
                      {timeAgo(item.createdAt)}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AppIcon
                      iconSource={shareIcon}
                      designIcon={true}
                      size={20}
                      color={'#040404'}
                    />
                    <AppIcon
                      iconSource={downloadIcon}
                      designIcon={true}
                      size={20}
                      color={'#040404'}
                    />
                    <AppIcon
                      iconSource={heartIcon}
                      size={20}
                      color={'#040404'}
                    />
                  </View>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    marginTop: 60,
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
});
