import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={openDrawer}>
        <Text>☰</Text> {/* You can use an icon here instead */}
      </TouchableOpacity>
      <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
        Your App Name
      </Text>
    </View>
  );
};

export default CustomHeader;