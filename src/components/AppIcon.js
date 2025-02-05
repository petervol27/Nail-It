import { Image, StyleSheet } from 'react-native';

const AppIcon = ({
  iconSource,
  color,
  social = false,
  size = null,
  designIcon = false,
}) => {
  return (
    <Image
      source={iconSource}
      style={[
        styles.icon,
        { tintColor: color },
        size && { width: size, height: size },
        social && { marginStart: 15 },
        designIcon && { opacity: 0.8 },
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
