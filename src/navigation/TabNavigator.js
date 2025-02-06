import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // ✅ Added Stack Navigator
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SingleDesignScreen from '../screens/SingleDesignScreen'; // ✅ Import the screen
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import CameraScreen from '../screens/CameraScreen';
import NotificationScreen from '../screens/NotificationScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import AppIcon from '../components/AppIcon';
import Spinner from '../components/Spinner';
import { UserContext } from '../context/UserContext';

// Import icons
import homeIcon from '../assets/icons/home.png';
import profileIcon from '../assets/icons/profile.png';
import savedIcon from '../assets/icons/heart.png';
import plusIcon from '../assets/icons/plusIcon.png';
import notificationIcon from '../assets/icons/notification.png';
import messageIcon from '../assets/icons/message.png';
import logo from '../assets/images/logo.png';
// import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator(); // ✅ Create a stack navigator for Home

// ✅ Stack Navigator for Home + SingleDesignScreen
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <HomeStack.Screen name="Instructions" component={InstructionsScreen} /> */}
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="SingleDesign" component={SingleDesignScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => {
  const { user } = useContext(UserContext);
  // const nav = useNavigation();
  // useEffect(() => {
  //   if (user && !user.hasSeenInstructions) {
  //     nav.replace('Instructions');
  //   }
  // }, [user]);

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
          } else if (route.name === 'Notifications') {
            iconSource = notificationIcon;
          } else if (route.name === 'Camera') {
            iconSource = plusIcon;
            size = 28;
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
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
