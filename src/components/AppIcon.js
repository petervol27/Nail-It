import { Image, StyleSheet } from 'react-native';

const AppIcon = ({ iconSource, color, size = null }) => {
  return (
    <Image
      source={iconSource}
      style={[
        styles.icon,
        { tintColor: color },
        size && { width: size, height: size },
      ]}
      resizeMode="contain"
    />
  );
};

export default AppIcon;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
});
