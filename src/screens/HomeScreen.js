import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getDesigns } from '../utils/firestore';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import inspirationCard from '../assets/images/card_inspiration.png';
const HomeScreen = ({ navigation }) => {
  const [designs, setDesigns] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const designList = await getDesigns();
        setDesigns(designList.length > 0 ? designList : null); // ✅
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
      <View style={styles.content}>
        {/* <Image source={inspirationCard} /> */}
        {loading ? (
          <Spinner />
        ) : designs === null ? (
          <></>
        ) : (
          <FlatList
            data={designs}
            keyExtractor={(item) => item.id}
            style={{ padding: 0, margin: 0 }}
            renderItem={({ item }) => (
              <View style={styles.designCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Test')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Upload New Design</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 20,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
  },
  content: {
    flex: 1,
    marginTop: 60,
    margin: 0,
    padding: 0,
  },
  designCard: {
    marginBottom: 20,
    padding: 0,
    margin: 0,
    width: '100%',
    resizeMode: 'cover',

    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
  },
});
