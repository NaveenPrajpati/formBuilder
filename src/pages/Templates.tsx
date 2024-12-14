import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import VectorIcon from '../components/VectorIcon';

export default function Templates({navigation}) {
  const options = [
    {
      icon: <VectorIcon iconName="plus" size={80} color="white" />,
      name: 'Blank',
    },
    {
      icon: <VectorIcon iconName="check" size={80} color="white" />,
      name: 'Quiz',
    },
  ];

  async function handleclick(params: string) {
    if (params == 'Blank') {
      navigation.navigate('Tabs', {screen: 'CreateForm'});
    }
  }

  return (
    <View className=" flex-1 p-5 bg-white">
      <ScrollView className=" mt-20">
        <Text className=" text-black text-2xl font-semibold">Your Canvas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map((item, index) => (
            <TouchableOpacity
              onPress={() => handleclick(item.name)}
              key={index}
              className=" bg-primary w-[200px] h-[170px] rounded-xl flex items-center justify-between m-2 p-2">
              <View></View>
              {item.icon}
              <Text className=" text-white font-semibold text-xl mr-1">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className=" text-black text-2xl font-semibold mt-5">
          Personal
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {options.map((item, index) => (
            <View
              key={index}
              className=" bg-gray-200 w-[200px] h-[170px] rounded-xl flex justify-between m-2 shadow-sm">
              <View className=" bg-green-200 flex-1">{item.icon}</View>
              <View className="h-50 p-4 bg-yellow-400 w-full flex items-center justify-center ">
                <Text className=" text-black font-semibold text-xl  mx-auto">
                  {item.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
