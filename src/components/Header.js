import { useState } from 'react';
import { Text, View } from 'react-native';

const Header = () => {
  const [userName, setUserName] = useState('');
  return (
    <View>
      <Text>Hello {userName}</Text>
    </View>
  );
};

export default Header;
