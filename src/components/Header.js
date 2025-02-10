import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import generalStyles from '../assets/styles/generalStyles';
import { useNavigationState, useNavigation } from '@react-navigation/native';
import AppIcon from './AppIcon';
import backIcon from '../assets/icons/goBackIcon.png';
import editIcon from '../assets/icons/editIcon.png';

const Header = ({ isFollowing, onFollowToggle }) => {
  const { user } = useContext(UserContext);
  const nav = useNavigation();
  const [headerText, setHeaderText] = useState('');
  const [headerStyle, setHeaderStyle] = useState([]); // ✅ Keeping headerStyle as state
  const [headerIcon, setHeaderIcon] = useState(null);

  const currentScreen = useNavigationState((state) => {
    return state?.routes[state?.index]?.name || 'Home';
  });

  useEffect(() => {
    switch (currentScreen) {
      case 'HomeMain':
        setHeaderText(`Inspirations`);
        setHeaderStyle([generalStyles.title, generalStyles.titleHeader]);
        setHeaderIcon(null);
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
      case 'MyProfile':
        setHeaderText("Let's explore your profile!");
        setHeaderStyle([
          generalStyles.title,
          generalStyles.titleHeader,
          generalStyles.titleHeaderSmall,
        ]);
        setHeaderIcon(backIcon);
        break;
      case 'EditProfile':
        setHeaderText('Edit Profile');
        setHeaderStyle([
          generalStyles.title,
          generalStyles.titleHeader,
          generalStyles.titleHeaderSmall,
        ]);
        setHeaderIcon(backIcon);
        break;
      case 'UserProfile':
        setHeaderText('');
        setHeaderIcon(backIcon);
        break;
      case 'FollowersList':
        setHeaderText('My nail art crew');
        setHeaderStyle([
          generalStyles.title,
          generalStyles.titleHeader,
          generalStyles.titleHeaderSmall,
        ]);
        setHeaderIcon(backIcon);
        break;
    }
  }, [currentScreen]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={[styles.container]}>
        <View style={styles.headerContent}>
          {headerIcon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => nav.goBack()}
            >
              <AppIcon iconSource={headerIcon} color={'black'} size={28} />
            </TouchableOpacity>
          )}
          <Text style={[...headerStyle]}>{headerText}</Text>
          {currentScreen === 'MyProfile' && (
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => nav.navigate('EditProfile')}
            >
              <AppIcon iconSource={editIcon} color={'#040404'} size={24} />
            </TouchableOpacity>
          )}
          {currentScreen === 'UserProfile' && (
            <TouchableOpacity
              style={[
                styles.followContainer,
                generalStyles.button,
                isFollowing
                  ? [generalStyles.buttonFollowing]
                  : [generalStyles.buttonFollow],
              ]}
              onPress={onFollowToggle}
            >
              <Text style={generalStyles.buttonTextSM}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#fff',
  },
  container: {
    height: 80, // ✅ Keeps the header's space intact
    paddingVertical: 20,
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // ✅ Centers the text
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    left: 20, // ✅ Aligns back button to the left
  },
  editIconContainer: {
    position: 'absolute',
    right: 20, // ✅ Moves edit button to the far right
  },
  followContainer: {
    position: 'absolute',
    right: 5,
  },
});
