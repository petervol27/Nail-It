import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import generalStyles from '../assets/styles/generalStyles';
import { logoutUser } from '../utils/auth';
const SavedScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    if (refreshing) return;

    setRefreshing(true);

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });

      setRefreshing(false);
    }, 1500);
  }, [refreshing, navigation]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} //
          colors={['#C85D7C']} //
          tintColor={'#C85D7C'} //
        />
      }
    >
      <Text style={styles.text}>Pull down to refresh the app!</Text>
      <TouchableOpacity
        style={[generalStyles.button, generalStyles.buttonMain]}
        onPress={() => logoutUser()}
      >
        <Text style={generalStyles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SavedScreen;
