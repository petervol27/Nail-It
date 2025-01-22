// Home and Profile tabs
<NavigationContainer>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#A96BAE', // Active tab color (e.g., orange)
      tabBarInactiveTintColor: 'gray', // Inactive tab color
      tabBarStyle: {
        backgroundColor: '#ffffff', // Tab bar background color
        paddingBottom: 5, // Adjust padding
      },
      headerStyle: {
        backgroundColor: '#A96BAE', // Header background color
      },
      headerTintColor: '#fff', // Header text color
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
</NavigationContainer>;
