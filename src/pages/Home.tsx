import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import VectorIcon from '../components/VectorIcon';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white overflow-hidden">
      <View className="flex-grow flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          className="border rounded-full w-fit p-6 flex-row items-center">
          <VectorIcon iconName="google" size={40} className="mr-2" />
          <Text className="text-black text-2xl font-bold mr-2">
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
