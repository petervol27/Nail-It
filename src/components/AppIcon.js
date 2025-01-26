import { Image, StyleSheet } from 'react-native';

const AppIcon = ({ iconSource, color, social = false, size = null }) => {
  return (
    <Image
      source={iconSource}
      style={[
        styles.icon,
        { tintColor: color },
        size && { width: size, height: size },
        social && { marginStart: 15 },
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
