import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import VectorIcon from './VectorIcon';

const DynamicGrid = ({options, onRequestClose, setOption}) => {
  let columnCount = 3; // Initial column count
  let rowCounter = 0; // Row counter
  const rows = [];
  const currentOptions = [...options];

  // Create rows with decreasing column counts
  while (currentOptions.length > 0) {
    rows.push(currentOptions.splice(0, columnCount)); // Take `columnCount` items
    rowCounter++;
    if (rowCounter % 2 === 0 && columnCount > 1) {
      columnCount--; // Reduce column count after every 2 rows
    }
  }

  return (
    <View className="flex-1 bg-black/40 flex justify-center items-center">
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex-row justify-center mb-4"
          style={{flexWrap: 'wrap'}}>
          {row.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="m-4 w-[100px] h-[100px] rounded-xl bg-white flex justify-center items-center p-5"
              onPress={() => setOption(item.name)}>
              {item.icon}
              <Text className="text-gray-700 font-normal text-center mt-1">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity
        className="w-[100px] h-[100px] rounded-xl bg-red-400 flex justify-center items-center mt-4"
        onPress={onRequestClose}>
        <VectorIcon
          iconName="close"
          size={30}
          color="white"
          className="block mr-1"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DynamicGrid;
