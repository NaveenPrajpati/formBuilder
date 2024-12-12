import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VectorIcon from '../VectorIcon';

type proptype = {
  onRequestClose: () => void;
  addField: (e: string) => void;
};

export default function AddOptions({onRequestClose, addField}: proptype) {
  const options = [
    {
      name: 'short',
      label: 'Short answer',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'paragraph',
      label: 'Paragraph',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'linearScale',
      label: 'Linear Scale',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'checkbox',
      label: 'Checkboxs',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'dropdown',
      label: 'Dropdown',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'multipleChoice',
      label: 'Multiple Choice',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'multipleChoiceGrid',
      label: 'Multiple Choice Grid',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'checkboxGrid',
      label: 'Checkbox Grid',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'date',
      label: 'Date',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'time',
      label: 'Time',
      icon: (
        <VectorIcon
          iconName="close"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
  ];

  function setOption(text: String) {
    onRequestClose();
    addField(text);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}>
      <View className=" flex-1">
        <View className=" flex-1 bg-black/40 flex-row flex-wrap">
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="m-5 w-[100px] h-[100px] rounded-md bg-white flex justify-center items-center"
              onPress={() => setOption(item.name)}>
              <VectorIcon
                iconName="close"
                size={30}
                color="gray"
                className=" block mr-1"
              />
              <Text className=" text-gray-500">{item.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            className="w-[100px] h-[100px] rounded-md bg-red-400 flex justify-center items-center"
            onPress={onRequestClose}>
            <VectorIcon
              iconName="close"
              size={30}
              color="white"
              className=" block mr-1"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
