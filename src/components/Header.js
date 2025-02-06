import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
import { useNavigationState } from '@react-navigation/native';
import { Capitalize } from '../helpers';
import AppIcon from './AppIcon';
import { editIcon } from '../assets/icons/editIcon.png';
import profileIcon from '../assets/icons/profile.png';
import backIcon from '../assets/icons/goBackIcon.png';
const Header = () => {
  const { user } = useContext(UserContext);
  const [headerText, setHeaderText] = useState('');
  const [headerStyle, setHeaderStyle] = useState([]);
  const [headerIcon, setHeaderIcon] = useState({});
  const currentScreen = useNavigationState((state) => {
    return state?.routes[state?.index]?.name || 'Home';
  });
  const setText = () => {
    console.log(currentScreen);
    switch (currentScreen) {
      case 'HomeMain':
        setHeaderText(`Inspirations`);
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        break;
      case 'SingleDesign':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        setHeaderIcon(backIcon);
        break;
      case 'Camera':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        break;
      case 'Saved':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        break;
      case 'Profile':
        setHeaderText("Let's explore your profile!");
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        break;
    }
  };
  useEffect(() => {
    setText();
  }, [currentScreen]);
  return (
    <View style={styles.container}>
      {/* 🔥 Title & Icon in the Same Row */}
      <View style={styles.headerContent}>
        {headerIcon && (
          <TouchableOpacity style={styles.iconContainer}>
            <AppIcon iconSource={headerIcon} color={'black'} size={28} />
          </TouchableOpacity>
        )}
        <Text style={[...headerStyle]}>{headerText}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    paddingHorizontal: 22,
    paddingVertical: 42,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    elevation: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // ✅ Center the text perfectly
    position: 'relative', // ✅ Allows absolute positioning of the icon
  },
  iconContainer: {
    position: 'absolute',
    left: 0, // ✅ Push icon to the left
  },
  // specialContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
});
