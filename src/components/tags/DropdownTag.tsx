import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const emojisWithIcons = [
  {title: 'happy', icon: 'emoticon-happy-outline'},
  {title: 'cool', icon: 'emoticon-cool-outline'},
  {title: 'lol', icon: 'emoticon-lol-outline'},
  {title: 'sad', icon: 'emoticon-sad-outline'},
  {title: 'cry', icon: 'emoticon-cry-outline'},
  {title: 'angry', icon: 'emoticon-angry-outline'},
  {title: 'confused', icon: 'emoticon-confused-outline'},
  {title: 'excited', icon: 'emoticon-excited-outline'},
  {title: 'kiss', icon: 'emoticon-kiss-outline'},
  {title: 'devil', icon: 'emoticon-devil-outline'},
  {title: 'dead', icon: 'emoticon-dead-outline'},
  {title: 'wink', icon: 'emoticon-wink-outline'},
  {title: 'sick', icon: 'emoticon-sick-outline'},
  {title: 'frown', icon: 'emoticon-frown-outline'},
];
const DropdownTag = ({option, value, onValueChange}) => {
  const [isFocus, setIsFocus] = useState(false);

  const arr = option.map(item => {
    return {
      title: item,
    };
  });

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View>
      <SelectDropdown
        data={arr}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          onValueChange(selectedItem);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {/* {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )} */}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Choose'}
              </Text>
              <Icon
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              {/* <Icon name={item.icon} style={styles.dropdownItemIconStyle} /> */}
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

export default DropdownTag;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
