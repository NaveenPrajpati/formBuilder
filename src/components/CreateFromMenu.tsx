import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import VectorIcon from './VectorIcon';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {saveForm} from '../redux/slices/formSlice';

export default function CreateFromMenu() {
  const dipatch = useAppDispatch();
  const {formFields, header, description, headerImg} = useAppSelector(
    state => state.form,
  );
  const handleSaveForm = async () => {
    const formData = {
      header,
      description,
      headerImg,
      fields: formFields,
    };

    dipatch(saveForm(formData));
  };

  return (
    <View className=" flex-row justify-between items-center ">
      <View className=" flex-row items-center gap-x-5 py-2">
        <VectorIcon
          iconName="color-palette-outline"
          iconPack="Ionicons"
          size={25}
        />
        <VectorIcon iconName="print-outline" iconPack="Ionicons" size={25} />
        <VectorIcon
          iconName="view-headline"
          iconPack="MaterialIcons"
          size={30}
        />
      </View>
      <View className=" flex-row items-center gap-x-5">
        <VectorIcon
          iconName="arrow-undo-circle-outline"
          iconPack="Ionicons"
          color="black"
          size={30}
        />
        <VectorIcon
          iconName="arrow-redo-circle-outline"
          iconPack="Ionicons"
          color="black"
          size={30}
        />
        <TouchableOpacity onPress={handleSaveForm}>
          <Text className=" text-2xl text-primary font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
