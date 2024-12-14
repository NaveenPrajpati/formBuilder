import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VectorIcon from '../VectorIcon';
import GridOptions from '../GridOptions';

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
          iconName="short-text"
          iconPack="MaterialIcons"
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
          iconName="short-text"
          iconPack="MaterialIcons"
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
          iconName="linear-scale"
          iconPack="MaterialIcons"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      icon: (
        <VectorIcon
          iconName="check-box"
          iconPack="MaterialIcons"
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
          iconName="arrow-drop-down-circle"
          iconPack="MaterialIcons"
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
          iconName="radio-btn-active"
          iconPack="Fontisto"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'checkboxGrid',
      label: 'Grid',
      icon: (
        <VectorIcon
          iconName="nav-icon-grid-a"
          iconPack="Fontisto"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
    {
      name: 'multipleChoiceGrid',
      label: 'Checkbox Grid',
      icon: (
        <VectorIcon
          iconName="nav-icon-grid"
          iconPack="Fontisto"
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
          iconName="date-range"
          iconPack="MaterialIcons"
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
          iconName="clock"
          iconPack="Fontisto"
          size={30}
          color="gray"
          className=" block mr-1"
        />
      ),
    },
  ];

  function setOption(text: string) {
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
        <GridOptions
          options={options}
          onRequestClose={onRequestClose}
          setOption={setOption}
        />
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
