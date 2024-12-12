import {View, Text} from 'react-native';
import React from 'react';
import VectorIcon from './VectorIcon';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center  w-full p-2 bg-white">
      <VectorIcon
        iconName="settings-outline"
        iconPack="Ionicons"
        size={20}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
      <Text
        className=" text-2xl font-bold"
        numberOfLines={1} // Ensures single-line truncation
        ellipsizeMode="tail" // Adds '...' if text overflows
        style={{flexShrink: 1}} // Allows text to shrink if necessary
      >
        All Forms
      </Text>
      <Text
        className="bg-yellow-200"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flexShrink: 1}}>
        P
      </Text>
    </View>
  );
}
