import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SingleDesignScreen from '../screens/SingleDesignScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import FollowersListScreen from '../screens/FollowerListScreen';
import UploadModal from '../components/UploadModal';
import AppIcon from '../components/AppIcon';
import { UserContext } from '../context/UserContext';

// Icons
import homeIcon from '../assets/icons/home.png';
import profileIcon from '../assets/icons/profile.png';
import savedIcon from '../assets/icons/heart.png';
import plusIcon from '../assets/icons/plusIcon.png';
import notificationIcon from '../assets/icons/notification.png';
import messageIcon from '../assets/icons/message.png';
import logo from '../assets/icons/logo.png';
import UploadPreviewScreen from '../screens/UploadPreviewScreen';
import InstructionsScreen from '../screens/InstructionsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="SingleDesign" component={SingleDesignScreen} />
    <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
    <HomeStack.Screen name="FollowersList" component={FollowersListScreen} />
    <HomeStack.Screen name="UploadPreview" component={UploadPreviewScreen} />
    <HomeStack.Screen name="Instructions" component={InstructionsScreen} />
  </HomeStack.Navigator>
);

const TabNavigator = () => {
  const { user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false); // ✅ Control modal visibility

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          animation: 'fade',
          tabBarIcon: ({ focused }) => {
            let iconSource;
            let size = null;

            if (route.name === 'Home') {
              iconSource = homeIcon;
            } else if (route.name === 'MyProfile') {
              iconSource = profileIcon;
            } else if (route.name === 'Saved') {
              iconSource = savedIcon;
            } else if (route.name === 'Notifications') {
              iconSource = notificationIcon;
            }

            const activeColor = focused ? 'white' : 'black';
            return (
              <AppIcon
                iconSource={iconSource}
                color={activeColor}
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

        {/* ✅ Upload Button replaces the CameraScreen */}
        <Tab.Screen
          name="Upload"
          component={View}
          options={{
            headerTransparent: true,
            tabBarButton: () => (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={1}
              >
                <View style={styles.iconWrapper}>
                  <AppIcon iconSource={plusIcon} size={42} color={'#C85D7C'} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="MyProfile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* ✅ Upload Modal */}
      <UploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  logo: {
    width: 67,
    height: 33,
    resizeMode: 'contain',
    marginStart: 12,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 12,
    gap: 10,
  },
  uploadButton: {
    position: 'absolute',
    top: -30, // ✅ Moves button slightly above tab bar
    borderWidth: 2,
    width: 72, // ✅ Adjust size to fit the icon circle properly
    height: 72,
    borderRadius: 35, // ✅ Ensures it remains a perfect circle
    borderColor: '#C85D7C',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // ✅ Adds internal spacing
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
