import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import VectorIcon from '../components/VectorIcon';
import {screenW} from '../utils/style';

export default function Dashboard({navigation}) {
  return (
    <View className=" flex-1 p-4 bg-white relative" style={{width: screenW}}>
      <View className=" my-2 bg-gray-100 rounded-md py-2 px-6 flex-row gap-x-2 items-center">
        <VectorIcon
          iconName="search"
          size={20}
          className=" mr-1 text-gray-500"
        />
        <TextInput
          placeholder="Search for forms"
          className=" placeholder:text-lg placeholder:text-gray-500"
        />
      </View>
      <FlatList
        data={['Form 1', 'Form 2', 'Item 3', 'Item 4']}
        keyExtractor={item => item}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateForm')}
            className={` ${
              (index + 1) % 2 == 0 ? 'bg-gray-100' : ''
            } p-2 mt-2 flex-row justify-between`}>
            <View className=" flex-row  items-center gap-x-2">
              <Image
                source={require('../../assets/images/assign.png')}
                alt="no imag"
                width={50}
                height={50}
                resizeMode="contain"
                className=" h-20 w-20"
              />
              <View>
                <Text className=" text-black text-lg font-medium">{item}</Text>
                <View className=" flex-row gap-x-2 items-center">
                  <Image
                    source={require('../../assets/images/assign.png')}
                    alt="no imag"
                    width={50}
                    height={50}
                    resizeMode="contain"
                    className=" h-6 w-6"
                  />
                  <Text className=" text-black text-lg font-medium">
                    {Date.now()}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className=" flex-row items-center gap-x-4  p-2">
              <VectorIcon
                iconName="dots-three-horizontal"
                iconPack="Entypo"
                size={20}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Templates')}
        className=" bg-purple-800 p-8 rounded-full absolute bottom-10 right-4">
        <VectorIcon
          iconName="plus"
          size={30}
          color="white"
          iconPack="AntDesign"
        />
      </TouchableOpacity>
    </View>
  );
}
