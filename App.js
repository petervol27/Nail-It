import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import Spinner from './src/components/Spinner';
import { checkUserAuth } from './src/utils/auth';
import UserProvider, { UserContext } from './src/context/UserContext';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
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
