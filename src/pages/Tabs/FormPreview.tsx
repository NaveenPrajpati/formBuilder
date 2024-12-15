import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import VectorIcon from '../../components/VectorIcon';
import CreateFromMenu from '../../components/CreateFromMenu';
import AddOptions from '../../components/modals/AddOptions';
import SwitchTag from '../../components/tags/SwitchTag';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addField,
  addHeader,
  deleteField,
  updateField,
} from '../../redux/slices/formSlice';
import DropdownTag from '../../components/tags/DropdownTag';
import axios from 'axios';
import {ResponseCreateApi} from '../../service/endPoints';
import {axiosInstance} from '../../service/interceptor';
export default function FormPreview() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [fieldResponses, setFieldResponses] = useState({});
  const dispatch = useAppDispatch();
  const {selectedForm} = useAppSelector(state => state.form);

  async function submitAnswer() {
    const formattedResponses = Object.entries(fieldResponses).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    );

    try {
      const response = await axiosInstance.post(ResponseCreateApi, {
        formId: 'your-form-id', // Replace with your actual form ID
        answers: formattedResponses,
      });
      console.log('Response submitted:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  }
  const handleResponseChange = (fieldId, value) => {
    if (!fieldId) return;
    setFieldResponses(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleMultipleChoiceChange = (fieldId, option) => {
    if (!fieldId || !option) return;

    const existingAnswers = fieldResponses[fieldId] || [];
    const updatedAnswers = existingAnswers.includes(option)
      ? existingAnswers.filter(o => o !== option)
      : [...existingAnswers, option];

    setFieldResponses(prev => ({
      ...prev,
      [fieldId]: updatedAnswers,
    }));
  };

  const handleUpdateField = (id, key, value) => {
    dispatch(updateField({id, key, value}));
  };

  const handleClearForm = () => {
    setFieldResponses({});
  };

  const handleGridChange = (fieldId, rowIndex, columnIndex) => {
    const key = `${rowIndex}-${columnIndex}`;
    const existingAnswers = fieldResponses[fieldId] || [];
    const updatedAnswers = existingAnswers.includes(key)
      ? existingAnswers.filter(k => k !== key)
      : [...existingAnswers, key];

    setFieldResponses(prev => ({
      ...prev,
      [fieldId]: updatedAnswers,
    }));
  };

  console.log(fieldResponses);

  return (
    <View className="bg-purple-100 flex justify-between  flex-1 ">
      <ScrollView className=" p-4 ">
        <View className="mt-2 bg-gray-100  h-[100px] flex justify-center items-center rounded-lg">
          <Image
            source={{uri: selectedForm?.headerImg}}
            alt="no img"
            width={200}
            height={100}
            className=" w-full h-full rounded-lg"
          />
        </View>
        <View className=" p-4 border-t-8  border-purple-700 rounded-2xl bg-white mt-4">
          <Text className=" font-normal text-3xl capitalize">
            {selectedForm?.header}
          </Text>
          <Text className=" font-medium mt-4">{selectedForm?.description}</Text>
        </View>

        {selectedForm?.fields.map((field, index) => (
          <View key={field.id} className="p-4  rounded-lg bg-white mt-4">
            <View className="  rounded-md p-2 flex-row">
              <Text className=" text-lg text-black capitalize mr-1">
                {field.question}
              </Text>
              {field.required && (
                <VectorIcon iconName="star" color="red" size={8} />
              )}
            </View>

            {(field.type === 'short' || field.type === 'paragraph') && (
              <TextInput
                placeholder="Your answer"
                value={fieldResponses[field?.id] || ''}
                onChangeText={text => handleResponseChange(field.id, text)}
                className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-gray-400 text-lg mt-2"
              />
            )}

            {field.type === 'dropdown' ? (
              <View className=" px-2 ">
                <DropdownTag
                  option={field.options}
                  value={fieldResponses[field.id] || ''}
                  onValueChange={value => handleResponseChange(field.id, value)}
                />
              </View>
            ) : null}
            {['checkbox', 'multipleChoice'].includes(field.type) && (
              <View className=" px-2 mt-2">
                {field.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleMultipleChoiceChange(field.id, option)}
                    className=" flex-row items-center gap-x-3 mt-6">
                    <VectorIcon
                      iconName={
                        (fieldResponses[field.id] || []).includes(option)
                          ? 'check-square'
                          : 'square-o'
                      }
                      size={24}
                    />
                    <Text className="  font-normal  placeholder:text-gray-400 text-xl ">
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {['checkboxGrid', 'multipleChoiceGrid'].includes(field.type) ? (
              <View>
                {/* Render Table Header */}
                <View className="flex-row justify-between items-center my-2">
                  <Text className=" flex-1 text-start"></Text>
                  {field.columns.map((column, columnIndex) => (
                    <Text
                      key={`column-${columnIndex}`}
                      className="flex-1 text-center  font-normal  text-xl ">
                      {column}
                    </Text>
                  ))}
                </View>

                {/* Render Table Rows */}
                {field.rows.map((row, rowIndex) => (
                  <View
                    key={rowIndex}
                    className="flex-row items-center mt-2 p-4 bg-gray-50">
                    <Text className="flex-1   font-normal  text-xl ">
                      {row}
                    </Text>

                    {/* Render Checkboxes for Each Column */}
                    {field.columns.map((_, colIndex) => (
                      <TouchableOpacity
                        key={colIndex}
                        onPress={() =>
                          handleGridChange(field.id, rowIndex, colIndex)
                        }
                        className="flex-1 items-center justify-center  ">
                        <VectorIcon
                          iconName={
                            (fieldResponses[field.id] || []).includes(
                              `${rowIndex}-${colIndex}`,
                            )
                              ? 'circle-with-minus'
                              : 'circle'
                          }
                          iconPack="Entypo"
                          size={24}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ) : null}

            {field.type == 'image' ? (
              <View className="mt-2 bg-gray-100 rounded-lg h-[200px] ">
                {field?.image && (
                  <Image
                    source={{uri: field.image}}
                    alt="no img"
                    width={200}
                    height={200}
                    className=" w-full h-full"
                  />
                )}
              </View>
            ) : null}
            {field.type == 'video' ? (
              <View>
                <Text className=" mt-3 border-b-[1px] border-gray-400">
                  Video title
                </Text>
                <View className="mt-2 bg-gray-200 rounded-md h-[200px] flex justify-center items-center">
                  <Text className=" mr-1">Tap to add youtube video url</Text>
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
                        handleUpdateField(field.id, 'settings', {
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
                        handleUpdateField(field.id, 'settings', {
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
          </View>
        ))}

        <View className="">
          <View className=" flex-row justify-between p-4">
            <TouchableOpacity
              onPress={submitAnswer}
              className=" bg-purple-700 py-2 px-6 rounded-md ">
              <Text className=" text-white font-medium ">Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClearForm}
              className="  py-2 px-4 rounded-md ">
              <Text className=" text-purple-700 font-medium ">Clear form</Text>
            </TouchableOpacity>
          </View>
          <Text className=" text-gray-700">
            Never submit passwords through Google Forms.
          </Text>

          <View className=" text-center flex items-center p-2">
            <Text className=" text-gray-700  mx-auto">
              This form was created inside solidauto.in
            </Text>
            <Text className=" text-gray-700">
              Does this form look suspicious?{' '}
              <Text className=" underline">Report</Text>
            </Text>
            <Text className=" text-gray-700 mt-5 text-3xl">Google Forms</Text>
          </View>
        </View>
      </ScrollView>

      {showAddItem && (
        <AddOptions
          addField={handleAddAnswer}
          onRequestClose={() => setShowAddItem(false)}
        />
      )}
    </View>
  );
}
