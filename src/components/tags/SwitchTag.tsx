import {View, Text, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';

export default function SwitchTag({onValueChange, isEnabled, label}) {
  return (
    <View className=" flex-row items-center">
      <Text className=" text-black mr-1 text-xl font-normal ">{label}</Text>
      <ToggleSwitch
        isOn={isEnabled}
        onColor="#22c55e"
        offColor="gray"
        // label={label}
        labelStyle={{color: 'black', fontWeight: '900'}}
        size="large"
        onToggle={onValueChange}
      />
    </View>
  );
}
