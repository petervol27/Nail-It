import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Notification Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 120,
  },
});

export default NotificationScreen;
