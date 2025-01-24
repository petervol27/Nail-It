import { View, Text, StyleSheet } from 'react-native';
const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
});

export default FeedScreen;
