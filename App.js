import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import Spinner from './src/components/Spinner';
import { checkUserAuth } from './src/utils/auth';
import UserProvider, { UserContext } from './src/context/UserContext';
import UserDetailsScreen from './src/screens/userDetailsScreen';
import UploadDesignScreen from './src/screens/TestUpload';
import SingleDesignScreen from './src/screens/SingleDesignScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); //
      SplashScreen.hideAsync();
    };

    prepareApp();

    const unsubscribe = checkUserAuth(setUser, setIsLoading);

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <UserProvider>
    <App />
  </UserProvider>
);
