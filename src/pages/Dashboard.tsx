import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import VectorIcon from '../components/VectorIcon';
import {screenW} from '../utils/style';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addField, addHeader, getForms} from '../redux/slices/formSlice';
import {useNavigation} from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  const {allFroms} = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getForms());
  }, []);

  async function onClick(item) {
    item.fields.map(it => {
      dispatch(addField(it));
    });
    dispatch(addHeader({field: 'header', data: item.header}));
    dispatch(addHeader({field: 'description', data: item.description}));
    dispatch(addHeader({field: 'headerImg', data: item.headerImg}));
    navigation.navigate('Tabs', {
      screen: 'CreateForm',
    });
  }

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
        data={allFroms}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onClick(item)}
            className={` ${
              (index + 1) % 2 == 0 ? 'bg-gray-50' : ''
            } p-2 mt-2 flex-row justify-between`}>
            <View className=" flex-row  items-center gap-x-2">
              <Image
                source={{uri: item?.headerImg}}
                alt="no imag"
                width={50}
                height={50}
                resizeMode="contain"
                className=" h-20 w-20"
              />
              <View>
                <Text className=" text-black text-xl font-medium">
                  {item?.header}
                </Text>
                <View className=" flex-row gap-x-2 items-center">
                  <VectorIcon
                    iconName="list"
                    color="white"
                    size={10}
                    className=" bg-purple-700 p-[2px]"
                  />
                  <Text className=" text-black text-lg font-medium">
                    {item?.createdAt}
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
