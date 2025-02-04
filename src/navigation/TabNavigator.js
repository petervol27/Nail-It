import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AppIcon from '../components/AppIcon';
import homeIcon from '../assets/icons/home.png';
import profileIcon from '../assets/icons/profile.png';
import savedIcon from '../assets/icons/heart.png';
import feedIcon from '../assets/icons/grid.png';
import cameraIcon from '../assets/icons/camera.png';
import messageIcon from '../assets/icons/message.png';
import logo from '../assets/images/logo.png';
import SavedScreen from '../screens/SavedScreen';
import FeedScreen from '../screens/FeedScreen';
import CameraScreen from '../screens/CameraScreen';
import { Image, StyleSheet } from 'react-native';
import InstructionsScreen from '../screens/InstructionsScreen';
import { UserContext } from '../context/UserContext';
import Spinner from '../components/Spinner';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setInitialRoute(user.hasSeenInstructions ? 'Home' : 'Instructions');
    }
  }, [user]);
  if (!initialRoute) {
    return <Spinner />;
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        animation: 'fade',
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let size = null;
          if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Profile') {
            iconSource = profileIcon;
          } else if (route.name === 'Saved') {
            iconSource = savedIcon;
          } else if (route.name === 'Feed') {
            iconSource = feedIcon;
          } else if (route.name === 'Camera') {
            iconSource = cameraIcon;
            size = 28;
          } else if (route.name === 'Instructions') {
            return null;
          }
          const isCameraTab = route.name === 'Camera';
          const activeColor = isCameraTab ? 'black' : 'white';
          const inactiveColor = isCameraTab ? '#C85D7C' : 'black';
          return (
            <AppIcon
              iconSource={iconSource}
              color={focused ? activeColor : inactiveColor}
              size={size}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#C85D7C',
          paddingBottom: 5,
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#C85D7C',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 116,
          shadowColor: '#C85D7C',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },

        headerTitle: '',
        headerLeft: () => <Image source={logo} style={styles.logo} />,
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <AppIcon iconSource={messageIcon} color={'black'} />
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIconStyle: {
            position: 'absolute',
            bottom: 50,
            width: 50,
            height: 50,
            borderRadius: 35,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#C85D7C',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
        }}
      />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {!initialRoute && (
        <Tab.Screen name="Instructions" component={InstructionsScreen} />
      )}
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 31,
    fontSize: 26,
    resizeMode: 'contain',
    marginStart: 12,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 12,
    gap: 10,
  },
});
