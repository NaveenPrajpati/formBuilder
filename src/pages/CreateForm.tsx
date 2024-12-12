import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from '../components/VectorIcon';
import CreateFromMenu from '../components/CreateFromMenu';
import AddOptions from '../components/modals/AddOptions';
import SwitchTag from '../components/tags/SwitchTag';

export default function CreateForm() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [formFields, setFormFields] = useState([]);

  const names = {
    short: 'Short answer',
    info: 'Info',
    paragraph: 'Paragraph',
    linearScale: 'Linear Scale',
    checkbox: 'Checkboxs',
    dropdown: 'Dropdown',
    multipleChoice: 'Multiple Choice',
    multipleChoiceGrid: 'Multiple Choice Grid',
    checkboxGrid: 'Checkbox Grid',
    date: 'Date',
    time: 'Time',
  };

  const data = [
    {
      id: 'unique_id', // Unique identifier
      type:
        'Text' |
        'Grid' |
        'Checkbox' |
        'CheckboxGrid' |
        'MultipleChoiceGrid' |
        'MultipleChoice' |
        'Dropdown' |
        'Date' |
        'Time',
      label: 'Your Question', // Label for the question
      options: [], // Options for fields like Dropdown, Multiple Choice, Checkbox Grid
      rows: [], // Rows for Grid-type questions
      columns: [], // Columns for Grid-type questions
      required: false, // Is the question mandatory
      image: null, // Image associated with the question
      settings: {
        includeYear: false, // For Date field
        includeTime: false, // For Time field
      },
    },
  ];

  const addField = type => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: '',
      required: false,
      image: null,
      options:
        type === 'multipleChoice' || type === 'dropdown' || type === 'checkbox'
          ? ['Option 1']
          : [],
      rows:
        type === 'checkboxGrid' || type === 'multipleChoiceGrid'
          ? ['Row 1']
          : [],
      columns:
        type === 'checkboxGrid' || type === 'multipleChoiceGrid'
          ? ['Column 1']
          : [],
      settings:
        type === 'date' || type === 'time'
          ? {includeYear: false, includeTime: false}
          : {},
    };

    setFormFields(prevFields => [...prevFields, newField]);
  };
  const updateField = (id, key, value) => {
    setFormFields(prevFields =>
      prevFields.map(field =>
        field.id === id ? {...field, [key]: value} : field,
      ),
    );
  };

  const deleteField = id => {
    setFormFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  return (
    <View className="bg-purple-100 flex justify-between  flex-1 ">
      <ScrollView className=" p-4">
        <CreateFromMenu />
        <View className=" p-4 border-t-4 border-l-4 border-purple-700 rounded-lg bg-white ">
          <TextInput
            placeholder="First form"
            className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black"
          />
          <TextInput
            placeholder="This is my first form"
            className=" border-b-[1px] border-gray-200"
          />
        </View>

        {/* check data */}
        {formFields.map(field => (
          <View key={field.id} className="p-4  rounded-lg bg-white mt-4">
            <View className=" flex-row gap-x-2 bg-gray-100 rounded-md p-2 items-center">
              <VectorIcon iconName="list" color="black" />
              <Text className=" text-lg text-gray-600">
                {names[field.type]}
              </Text>
            </View>

            <TextInput
              placeholder="Question"
              value={field.label}
              onChangeText={text => updateField(field.id, 'label', text)}
              className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl mt-2"
            />

            {/* Type-Specific Inputs */}
            {field.type === 'checkbox' ||
            field.type === 'multipleChoice' ||
            field.type === 'dropdown' ? (
              <View>
                {field.options.map((option, index) => (
                  <View className=" mt-2 flex-row items-center justify-between gap-x-2">
                    <View className=" flex-row items-center gap-x-1">
                      {field?.type === 'dropdown' && <Text>{index + 1}</Text>}
                      {field?.type === 'checkbox' && (
                        <VectorIcon iconName="square" size={20} />
                      )}
                      {field?.type === 'multipleChoice' && (
                        <VectorIcon iconName="circle" size={20} />
                      )}
                      <TextInput
                        key={index}
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChangeText={text => {
                          const updatedOptions = [...field.options];
                          updatedOptions[index] = text;
                          updateField(field.id, 'options', updatedOptions);
                        }}
                        className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl "
                      />
                    </View>
                    <VectorIcon iconName="square" size={20} />
                  </View>
                ))}
                <View className=" flex-row justify-between items-center mt-2">
                  <TouchableOpacity
                    onPress={() => {
                      updateField(field.id, 'options', [
                        ...field.options,
                        `Option ${field.options.length + 1}`,
                      ]);
                    }}>
                    <Text className=" text-blue-500 font-semibold">
                      Add choice
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className=" text-blue-500 font-semibold">
                      Reorder
                    </Text>
                  </TouchableOpacity>
                </View>
                {field.type === 'multipleChoice' && (
                  <SwitchTag label={'Other...'} />
                )}
              </View>
            ) : null}

            {field.type === 'checkboxGrid' ||
            field.type === 'multipleChoiceGrid' ? (
              <View>
                {/* Rows */}
                {field.rows.map((row, index) => (
                  <View className=" mt-2 flex-row items-center justify-between gap-x-2">
                    <View className=" flex-row items-center gap-x-1">
                      <Text>{index + 1}.</Text>
                      <TextInput
                        key={`row-${index}`}
                        placeholder={`Row ${index + 1}`}
                        value={row}
                        onChangeText={text => {
                          const updatedRows = [...field.rows];
                          updatedRows[index] = text;
                          updateField(field.id, 'rows', updatedRows);
                        }}
                        className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl "
                      />
                    </View>
                    <VectorIcon iconName="square" size={20} />
                  </View>
                ))}

                <View className=" flex-row justify-between items-center mt-2">
                  <TouchableOpacity
                    onPress={() => {
                      updateField(field.id, 'rows', [
                        ...field.rows,
                        `Row ${field.rows.length + 1}`,
                      ]);
                    }}>
                    <Text className=" text-blue-500 font-semibold">
                      Add row
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className=" text-blue-500 font-semibold">
                      Reorder
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Columns */}
                {field.columns.map((column, index) => (
                  <View className=" mt-2 flex-row items-center justify-between gap-x-2">
                    <View className=" flex-row items-center gap-x-1">
                      <Text>{index + 1}.</Text>
                      <TextInput
                        key={`column-${index}`}
                        placeholder={`Column ${index + 1}`}
                        value={column}
                        onChangeText={text => {
                          const updatedColumns = [...field.columns];
                          updatedColumns[index] = text;
                          updateField(field.id, 'columns', updatedColumns);
                        }}
                        className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl "
                      />
                    </View>
                    <VectorIcon iconName="square" size={20} />
                  </View>
                ))}

                <View className=" flex-row justify-between items-center mt-2">
                  <TouchableOpacity
                    onPress={() => {
                      updateField(field.id, 'columns', [
                        ...field.columns,
                        `Column ${field.columns.length + 1}`,
                      ]);
                    }}>
                    <Text className=" text-blue-500 font-semibold">
                      Add column
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className=" text-blue-500 font-semibold">
                      Reorder
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {field.type === 'date' || field.type === 'time' ? (
              <View>
                <Text>Settings:</Text>
                {field.type === 'date' && (
                  <View>
                    <Switch
                      value={field.settings.includeYear}
                      onValueChange={value =>
                        updateField(field.id, 'settings', {
                          ...field.settings,
                          includeYear: value,
                        })
                      }
                    />
                    <Text>Include Year</Text>
                  </View>
                )}
                {field.type === 'time' && (
                  <View>
                    <Switch
                      value={field.settings.includeTime}
                      onValueChange={value =>
                        updateField(field.id, 'settings', {
                          ...field.settings,
                          includeTime: value,
                        })
                      }
                    />
                    <Text>Include Time</Text>
                  </View>
                )}
              </View>
            ) : null}

            <View className=" flex-row items-center gap-x-2 justify-end mt-2">
              {field.type != 'info' && (
                <SwitchTag
                  label={'Required'}
                  isEnabled={isEnabled}
                  setIsEnabled={setIsEnabled}
                  onValueChange={isEnabled}
                />
              )}
              <VectorIcon
                iconName="copy-outline"
                iconPack="Ionicons"
                size={25}
              />
              <VectorIcon
                iconName="delete"
                iconPack="AntDesign"
                size={25}
                onPress={() => deleteField(field.id)}
              />
              <VectorIcon
                iconName="dots-three-vertical"
                iconPack="Entypo"
                size={25}
              />
            </View>
          </View>
        ))}
      </ScrollView>
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
            onPress={() => addField('info')}
          />
          <VectorIcon
            iconName="image"
            iconPack="MaterialIcons"
            size={30}
            color="gray"
          />
          <VectorIcon
            iconName="video"
            iconPack="Octicons"
            size={30}
            color="gray"
          />
          <VectorIcon
            iconName="pluscircleo"
            iconPack="AntDesign"
            size={30}
            color="gray"
          />
        </View>
      </View>
      {showAddItem && (
        <AddOptions
          addField={addField}
          onRequestClose={() => setShowAddItem(false)}
        />
      )}
    </View>
  );
}
