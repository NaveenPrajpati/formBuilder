import {View, Text} from 'react-native';
import React from 'react';
import VectorIcon from './VectorIcon';

export default function FormFooter({handleAddField, setShowAddItem}) {
  return (
    <View className=" bg-purple-100  h-[100px]">
      <View className=" flex-row justify-between p-4 bg-white">
        <VectorIcon
          iconName="pluscircleo"
          iconPack="AntDesign"
          size={30}
          color="gray"
          onPress={() => setShowAddItem(true)}
        />
        <VectorIcon
          iconName="text-fields"
          iconPack="MaterialIcons"
          size={30}
          color="gray"
          onPress={() => handleAddField('info')}
        />
        <VectorIcon
          iconName="image"
          iconPack="MaterialIcons"
          size={30}
          color="gray"
          onPress={() => handleAddField('image')}
        />
        <VectorIcon
          iconName="video"
          iconPack="Octicons"
          size={30}
          color="gray"
          onPress={() => handleAddField('video')}
        />
        <VectorIcon
          iconName="tasks"
          size={30}
          color="gray"
          onPress={() => handleAddField('section')}
        />
      </View>
    </View>
  );
}
