import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
import { useNavigationState } from '@react-navigation/native';
import { Capitalize } from '../helpers';

const Header = () => {
  const { user } = useContext(UserContext);
  const [headerText, setHeaderText] = useState('');
  const [headerStyle, setHeaderStyle] = useState([]);
  const currentScreen = useNavigationState((state) => {
    return state?.routes[state?.index]?.name || 'Home';
  });
  const setText = () => {
    console.log(currentScreen);
    switch (currentScreen) {
      case 'Home':
        setHeaderText(`Hello ${Capitalize(user.name)}!`);
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
      case 'Saved':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
      case 'Profile':
        setHeaderText('Inspirations');
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
    }
  };
  useEffect(() => {
    setText();
  }, [currentScreen]);
  return (
    <View style={styles.container}>
      <Text style={[...headerStyle]}>{headerText}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: -140,
    paddingHorizontal: 22,
    paddingVertical: 42,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
