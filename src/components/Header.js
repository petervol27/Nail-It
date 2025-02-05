import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
import { useNavigationState } from '@react-navigation/native';
import { Capitalize } from '../helpers';
import AppIcon from './AppIcon';
import { editIcon } from '../assets/icons/editIcon.png';
import profileIcon from '../assets/icons/profile.png';
const Header = () => {
  const { user } = useContext(UserContext);
  const [headerText, setHeaderText] = useState('');
  const [headerStyle, setHeaderStyle] = useState([]);
  // const [headerIcon, setHeaderIcon] = useState({});
  const currentScreen = useNavigationState((state) => {
    return state?.routes[state?.index]?.name || 'Home';
  });
  const setText = () => {
    console.log(currentScreen);
    switch (currentScreen) {
      case 'Home':
        setHeaderText(`Hey ${Capitalize(user.name)}!`);
        setHeaderStyle([
          generalStyles.title,
          generalStyles.titleSection,
          generalStyles.titleHeader,
        ]);
        break;
      case 'Feed':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
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
      <Text style={[...headerStyle]}>{headerText}</Text>
      {/* <View style={styles.specialContainer}>
        {currentScreen === 'Profile' && (
          <AppIcon iconSource={profileIcon} color={'blue'} />
        )}
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    paddingHorizontal: 22,
    paddingVertical: 42,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999, // ensures this is on top
    elevation: 10,
  },
  // specialContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
});
