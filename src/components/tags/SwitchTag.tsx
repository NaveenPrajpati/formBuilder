import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';

export default function SwitchTag({
  onValueChange,
  isEnabled,
  setIsEnabled,
  label,
}) {
  return (
    <View className=" flex-row items-center">
      <Text className=" text-black mr-1 text-xl font-medium">{label}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={isEnabled}
      />
    </View>
  );
}
