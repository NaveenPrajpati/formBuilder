import {View, Text, Image} from 'react-native';
import React from 'react';
import VectorIcon from './VectorIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks';

export default function Header({navigation, route, options, back}) {
  const {selectedForm} = useAppSelector(state => state.form);
  return (
    <View className="flex-row justify-between items-center  w-full py-2 px-6 bg-white">
      {route?.name == 'FormList' ? (
        <VectorIcon
          iconName="settings-outline"
          iconPack="Ionicons"
          size={22}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      ) : (
        <VectorIcon
          iconName="arrow-back-ios"
          iconPack="MaterialIcons"
          size={20}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Text
        className=" text-2xl font-bold"
        numberOfLines={1} // Ensures single-line truncation
        ellipsizeMode="tail" // Adds '...' if text overflows
        style={{flexShrink: 1}} // Allows text to shrink if necessary
      >
        {route.name == 'FormList' ? 'All Forms' : `${selectedForm.header}`}
      </Text>
      <View className=" flex-row items-center gap-x-4">
        <Image
          source={require('../../assets/images/crown.png')}
          width={20}
          height={20}
          className="h-8 w-8"
        />
        {route.name != 'FormList' && (
          <VectorIcon
            iconName="share-2"
            iconPack="Feather"
            size={22}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      </View>
    </View>
  );
}
