import {View, Text} from 'react-native';
import React from 'react';
import VectorIcon from './VectorIcon';

export default function CreateFromMenu() {
  return (
    <View className=" flex-row justify-between items-center">
      <View className=" flex-row items-center gap-x-5 py-2">
        <VectorIcon
          iconName="color-palette-outline"
          iconPack="Ionicons"
          size={25}
        />
        <VectorIcon iconName="print-outline" iconPack="Ionicons" size={25} />
        <VectorIcon iconName="menu-outline" iconPack="Ionicons" size={25} />
      </View>
      <View className=" flex-row items-center gap-x-5">
        <VectorIcon
          iconName="arrow-undo-circle-outline"
          iconPack="Ionicons"
          size={25}
        />
        <VectorIcon
          iconName="arrow-redo-circle-outline"
          iconPack="Ionicons"
          size={25}
        />

        <Text className=" text-xl text-purple-700 font-semibold">Save</Text>
      </View>
    </View>
  );
}
