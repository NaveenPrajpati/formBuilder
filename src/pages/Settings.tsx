import {View, Text} from 'react-native';
import React from 'react';
import VectorIcon from '../components/VectorIcon';

export default function Settings() {
  return (
    <View className=' flex-1 bg-gray-200 p-5'>
      <Text>Google Account</Text>

      <View className=' flex-row justify-between items-center bg-white rounded-md p-4'>
        <View className=' flex-row items-center gap-x-4 '>
          <VectorIcon iconName='share' size={20}/>
          <Text>Privacy policy</Text>
        </View>
        <View>
          <VectorIcon iconName='arrow-right' size={20}/>
        </View>
      </View>
      <View className=' flex-row justify-between items-center bg-white rounded-md p-4 mt-1'>
        <View className=' flex-row items-center gap-x-4 '>
          <VectorIcon iconName='share' size={20}/>
          <Text>Privacy policy</Text>
        </View>
        <View>
          <VectorIcon iconName='arrow-right' size={20}/>
        </View>
      </View>
    </View>
  );
}
