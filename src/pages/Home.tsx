import {View, Text, Button, TouchableOpacity, Image} from 'react-native';
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
          className="border rounded-full w-fit p-6 flex-row gap-x-2 items-center">
          <Image
            source={require('../../assets/images/search.png')}
            width={30}
            height={30}
            className=" h-12 w-12"
            resizeMode="contain"
          />
          <Text className="text-black text-2xl font-bold mr-2">
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
