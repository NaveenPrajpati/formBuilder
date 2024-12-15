import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VectorIcon from '../components/VectorIcon';
import {screenW} from '../utils/style';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  addField,
  addHeader,
  deleteForm,
  getForms,
  setSelectedForm,
} from '../redux/slices/formSlice';
import {useNavigation} from '@react-navigation/native';
import {formatDateTime} from '../utils/utilityFunctions';
import {Button, Dialog, Divider, List, Menu, Portal} from 'react-native-paper';
import {formTypes} from '../utils/types';

export default function FormList() {
  const [visible, setVisible] = useState(false);
  const [infoToShow, setInfoToShow] = useState(null);
  const navigation = useNavigation();
  const {allForms} = useAppSelector(state => state.form);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchForms = async () => {
      try {
        await dispatch(getForms());
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, [dispatch]);

  async function onClick(item: formTypes) {
    await dispatch(setSelectedForm(item));
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
        data={allForms}
        keyExtractor={item => item._id}
        initialNumToRender={10}
        getItemLayout={(data, index) => ({
          length: 70,
          offset: 70 * index,
          index,
        })}
        renderItem={({item, index}) => (
          <View
            className={` ${
              (index + 1) % 2 == 0 ? 'bg-gray-50' : ''
            } p-2 mt-2 flex-row justify-between`}>
            <TouchableOpacity
              onPress={() => onClick(item)}
              className=" flex-row  items-center gap-x-2">
              <Image
                source={{uri: item?.headerImg}}
                alt="no imag"
                width={50}
                height={50}
                resizeMode="contain"
                className=" h-20 w-20 bg-gray-200"
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
                  <Text className=" text-gray-400 text-lg font-normal">
                    {formatDateTime(item?.createdAt)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setInfoToShow(item);
                setVisible(true);
              }}
              className=" flex-row items-center gap-x-4  p-2">
              <VectorIcon
                iconName="dots-three-horizontal"
                iconPack="Entypo"
                size={20}
              />
            </TouchableOpacity>
          </View>
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
      <Portal>
        {infoToShow && (
          <Pressable
            onPress={() => setInfoToShow(null)}
            className=" bg-black/30 flex-1 justify-end transition-all duration-1000 ">
            <View className=" bg-white z-10 rounded-lg">
              <View
                className={`  p-4 mt-2 flex-row justify-between border-b-[1px] border-gray-200`}>
                <View className=" flex-row  items-center gap-x-2">
                  <Image
                    source={{uri: infoToShow?.headerImg}}
                    alt="no imag"
                    width={50}
                    height={50}
                    resizeMode="contain"
                    className=" h-20 w-20 bg-orange-200"
                  />
                  <View>
                    <Text className=" text-black text-xl font-medium">
                      {infoToShow?.header}
                    </Text>
                    <View className=" flex-row gap-x-2 items-center">
                      <VectorIcon
                        iconName="list"
                        color="white"
                        size={10}
                        className=" bg-purple-700 p-[2px]"
                      />
                      <Text className=" text-gray-400 text-lg font-medium">
                        {formatDateTime(infoToShow?.createdAt)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <List.Section className=" px-4">
                <List.Item
                  title="Share"
                  left={() => <List.Icon icon="share" />}
                />
                <List.Item
                  title="Duplicate Form"
                  left={() => <List.Icon icon="copy" />}
                />
                <List.Item
                  title="Edit Form Link"
                  left={() => <List.Icon icon="clip" />}
                />
                <List.Item
                  onPress={() => {
                    setVisible(true);
                  }}
                  title="Delete Form"
                  left={() => <List.Icon icon="delete" />}
                />
              </List.Section>
            </View>
          </Pressable>
        )}
        {visible && (
          <Dialog
            visible={true}
            onDismiss={() => {
              setVisible(false);
            }}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text className="">
                Are you sure you want to delete this form
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={async () => {
                  await dispatch(deleteForm(infoToShow?._id));
                  setInfoToShow(null);
                  setVisible(false);
                }}>
                Delete
              </Button>
            </Dialog.Actions>
          </Dialog>
        )}
      </Portal>
    </View>
  );
}
