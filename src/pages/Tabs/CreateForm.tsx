import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import CreateFromMenu from '../../components/CreateFromMenu';
import FormFooter from '../../components/FormFooter';
import AddOptions from '../../components/modals/AddOptions';
import ModalLayout from '../../components/modals/ModalLayout';
import SwitchTag from '../../components/tags/SwitchTag';
import VectorIcon from '../../components/VectorIcon';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  addField,
  addHeader,
  deleteField,
  resetField,
  resetHeader,
  updateField,
} from '../../redux/slices/formSlice';
import {uploadImage} from '../../utils/utilityFunctions';
import {axiosInstance} from '../../service/interceptor';
import {FormByIdApi} from '../../service/endPoints';
import InputTag from '../../components/elements/InputTag';

export default function CreateForm({route}) {
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddVideo, setShowAddVideo] = useState(false);

  const dispatch = useAppDispatch();
  const {formFields, headerImg, header, description, formSaving, selectedForm} =
    useAppSelector(state => state.form);
  const [loadingImage, setLoadingImage] = useState(false);
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
    image: 'Image',
    video: 'Video',
    section: 'Section',
  };

  const handleAddField = (type: string) => {
    const newField = {
      id: Date.now().toString(),
      type,
      question: '',
      required: false,
      other: false,
      image: null,
      video: null,
      multipleChoice: false,
      options:
        type === 'multipleChoice' || type === 'dropdown' || type === 'checkbox'
          ? ['']
          : [],
      rows:
        type === 'checkboxGrid' || type === 'multipleChoiceGrid' ? [''] : [],
      columns:
        type === 'checkboxGrid' || type === 'multipleChoiceGrid' ? [''] : [],
      settings:
        type === 'date' || type === 'time'
          ? {includeYear: false, includeTime: false}
          : {},
    };

    if (type == 'multipleChoice' || type == 'multipleChoiceGrid') {
      newField.multipleChoice = true;
    }

    dispatch(addField(newField));
  };

  console.log(formFields);

  useEffect(() => {
    return () => {
      dispatch(resetField({}));
      dispatch(resetHeader({}));
    };
  }, []);

  const handleUpdateField = (
    id: any,
    key: string,
    value: string | any[] | undefined,
  ) => {
    dispatch(updateField({id, key, value}));
  };

  const handleDeleteField = (id: any) => {
    dispatch(deleteField(id));
  };

  async function pickImage(field: never) {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setLoadingImage(true);
    const uploadedUrl = await uploadImage(result.assets[0]);
    setLoadingImage(false);
    handleUpdateField(field.id, 'image', uploadedUrl);
  }
  async function pickHeaderImage() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setLoadingImage(true);
    const uploadedUrl = await uploadImage(result.assets[0]);
    setLoadingImage(false);
    dispatch(addHeader({field: 'headerImg', data: uploadedUrl}));
  }

  useEffect(() => {
    axiosInstance.get(FormByIdApi());
  }, []);

  return (
    <View className="bg-purple-100 flex justify-between  flex-1 ">
      <View className="flex-1 p-4">
        <CreateFromMenu />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" p-4 border-t-4 border-l-4 border-purple-700 rounded-2xl bg-white ">
            <InputTag
              value={selectedForm?.header}
              placeholder="Form title"
              onChangeText={text =>
                dispatch(addHeader({field: 'header', data: text}))
              }
              className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-gray-400"
            />
            <TextInput
              value={selectedForm?.description}
              placeholder="This is my first form"
              onChangeText={text =>
                dispatch(addHeader({field: 'description', data: text}))
              }
              className=" border-b-[1px] border-gray-200"
            />
            <View className=" ">
              <Text className=" mt-3 border-b-[1px] border-gray-200 text-lg">
                Image title
              </Text>
              <TouchableOpacity
                onPress={() => pickHeaderImage()}
                className="mt-2 bg-gray-100 rounded-lg h-[200px] flex justify-center items-center">
                {selectedForm?.headerImg ? (
                  <Image
                    source={{uri: selectedForm?.headerImg}}
                    alt="no img"
                    width={200}
                    height={200}
                    className=" w-full h-full"
                  />
                ) : loadingImage ? (
                  <ActivityIndicator />
                ) : (
                  <Text className=" mr-1">Tap to add header image</Text>
                )}
              </TouchableOpacity>
              {selectedForm?.headerImg.length != 0 && (
                <View className=" flex-row items-center gap-x-2  mt-2">
                  (
                  <TouchableOpacity
                    className=" mr-1"
                    onPress={() => pickHeaderImage()}>
                    <Text className=" text-blue-500 font-semibold">Change</Text>
                  </TouchableOpacity>
                  )
                  <VectorIcon
                    iconName="delete"
                    iconPack="AntDesign"
                    size={25}
                    onPress={() =>
                      dispatch(addHeader({field: 'headerImg', data: ''}))
                    }
                  />
                </View>
              )}
            </View>
          </View>

          {selectedForm?.fields.map(field => (
            <View key={field.id} className="p-4  rounded-lg bg-white mt-4">
              <View className=" flex-row gap-x-2 bg-gray-100 rounded-md p-2 items-center">
                <VectorIcon iconName="list" color="black" />
                <Text className=" text-lg text-gray-600">
                  {names[field.type]}
                </Text>
              </View>
              {field.type != 'image' && (
                <TextInput
                  placeholder="Question"
                  value={field.question}
                  onChangeText={text =>
                    handleUpdateField(field.id, 'question', text)
                  }
                  className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl mt-2"
                />
              )}

              {/* Type-Specific Inputs */}
              {field.type === 'checkbox' ||
              field.type === 'multipleChoice' ||
              field.type === 'dropdown' ? (
                <View>
                  {field.options.map(
                    (
                      option: string | undefined,
                      index: React.Key | null | undefined,
                    ) => (
                      <View
                        key={index}
                        className=" mt-2 flex-row items-center justify-between gap-x-2">
                        <View className=" flex-row items-center gap-x-1">
                          {field?.type === 'dropdown' && (
                            <Text>{index + 1}</Text>
                          )}
                          {field?.type === 'checkbox' && (
                            <VectorIcon iconName="square-o" size={20} />
                          )}
                          {field?.type === 'multipleChoice' && (
                            <VectorIcon
                              iconName="circle"
                              iconPack="Entypo"
                              size={20}
                            />
                          )}
                          <TextInput
                            key={index}
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChangeText={text => {
                              const updatedOptions = [...field.options];
                              updatedOptions[index] = text;
                              handleUpdateField(
                                field.id,
                                'options',
                                updatedOptions,
                              );
                            }}
                            className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-gray-400 text-xl "
                          />
                        </View>
                        <VectorIcon
                          iconName="close"
                          iconPack="AntDesign"
                          size={20}
                        />
                      </View>
                    ),
                  )}
                  <View className=" flex-row justify-between items-center mt-2">
                    <TouchableOpacity
                      onPress={() => {
                        handleUpdateField(field.id, 'options', [
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
                    <SwitchTag
                      label={'other...'}
                      isEnabled={field.required}
                      onValueChange={(value: any) =>
                        handleUpdateField(field.id, 'other', value)
                      }
                    />
                  )}
                </View>
              ) : null}

              {field.type === 'checkboxGrid' ||
              field.type === 'multipleChoiceGrid' ? (
                <View>
                  {/* Rows */}
                  {field.rows.map(
                    (
                      row: string | undefined,
                      index: React.Key | null | undefined,
                    ) => (
                      <View
                        key={index}
                        className=" mt-2 flex-row items-center justify-between gap-x-2">
                        <View className=" flex-row items-center gap-x-1">
                          <Text>{index + 1}.</Text>
                          <TextInput
                            key={`row-${index}`}
                            placeholder={`Row ${index + 1}`}
                            value={row}
                            onChangeText={text => {
                              const updatedRows = [...field.rows];
                              updatedRows[index] = text;
                              handleUpdateField(field.id, 'rows', updatedRows);
                            }}
                            className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl "
                          />
                        </View>
                        <VectorIcon
                          iconName="close"
                          iconPack="AntDesign"
                          size={20}
                        />
                      </View>
                    ),
                  )}

                  <View className=" flex-row justify-between items-center mt-2">
                    <TouchableOpacity
                      onPress={() => {
                        handleUpdateField(field.id, 'rows', [
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
                  {field.columns.map(
                    (
                      column: string | undefined,
                      index: React.Key | null | undefined,
                    ) => (
                      <View
                        key={index}
                        className=" mt-2 flex-row items-center justify-between gap-x-2">
                        <View className=" flex-row items-center gap-x-1">
                          <Text>{index + 1}.</Text>
                          <TextInput
                            key={`column-${index}`}
                            placeholder={`Column ${index + 1}`}
                            value={column}
                            onChangeText={text => {
                              const updatedColumns = [...field.columns];
                              updatedColumns[index] = text;
                              handleUpdateField(
                                field.id,
                                'columns',
                                updatedColumns,
                              );
                            }}
                            className=" border-b-[1px] border-gray-200 font-semibold  placeholder:text-black text-xl "
                          />
                        </View>
                        <VectorIcon
                          iconName="close"
                          iconPack="AntDesign"
                          size={20}
                        />
                      </View>
                    ),
                  )}

                  <View className=" flex-row justify-between items-center mt-2">
                    <TouchableOpacity
                      onPress={() => {
                        handleUpdateField(field.id, 'columns', [
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

              {field.type == 'image' ? (
                <View>
                  <Text className=" mt-3 border-b-[1px] border-gray-200 text-lg">
                    Image title
                  </Text>
                  <TouchableOpacity
                    onPress={() => pickImage(field)}
                    className="mt-2 bg-gray-100 rounded-lg h-[200px] flex justify-center items-center">
                    {field?.image ? (
                      <Image
                        source={{uri: field?.image}}
                        alt="no img"
                        width={200}
                        height={200}
                        className=" w-full h-full"
                      />
                    ) : (
                      <Text className=" mr-1">Tap to add image</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : null}
              {field.type == 'video' ? (
                <View>
                  <Text className=" mt-3 border-b-[1px] border-gray-400">
                    Video title
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowAddVideo(true)}
                    className="mt-2 bg-gray-200 rounded-md h-[200px] flex justify-center items-center">
                    <Text className=" mr-1">Tap to add youtube video url</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {showAddVideo && (
                <ModalLayout onRequestClose={() => setShowAddVideo(false)}>
                  <View>
                    <TextInput
                      placeholder={`Enter youtube video url`}
                      value={field.video}
                      onChangeText={text => {
                        handleUpdateField(field.id, 'video', text);
                      }}
                    />
                  </View>
                </ModalLayout>
              )}

              {field.type === 'date' || field.type === 'time' ? (
                <View>
                  <Text>Settings:</Text>
                  {field.type === 'date' && (
                    <View>
                      <SwitchTag
                        isEnabled={field.settings.includeYear}
                        onValueChange={(value: any) =>
                          handleUpdateField(field.id, 'required', value)
                        }
                      />
                      <Text>Include Year</Text>
                    </View>
                  )}
                  {field.type === 'time' && (
                    <View>
                      <SwitchTag
                        value={field.settings.includeTime}
                        onValueChange={(value: any) =>
                          handleUpdateField(field.id, 'required', value)
                        }
                      />
                      <Text>Include Time</Text>
                    </View>
                  )}
                </View>
              ) : null}

              <View className=" flex-row items-center gap-x-2 justify-end mt-2">
                {field.type != 'info' &&
                  field.type != 'image' &&
                  field.type != 'video' && (
                    <SwitchTag
                      label={'Required'}
                      isEnabled={field.required}
                      onValueChange={(value: any) =>
                        handleUpdateField(field.id, 'required', value)
                      }
                    />
                  )}
                {field.type == 'image' && field.type != 'video' && (
                  <TouchableOpacity onPress={() => pickImage(field)}>
                    <Text className=" text-blue-500 font-semibold">Change</Text>
                  </TouchableOpacity>
                )}
                <VectorIcon
                  iconName="copy-outline"
                  iconPack="Ionicons"
                  size={25}
                  onPress={() => handleAddField(field?.type)}
                />
                <VectorIcon
                  iconName="delete"
                  iconPack="AntDesign"
                  size={25}
                  onPress={() => handleDeleteField(field.id)}
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
      </View>
      <FormFooter
        setShowAddItem={setShowAddItem}
        handleAddField={handleAddField}
      />
      {showAddItem && (
        <AddOptions
          addField={handleAddField}
          onRequestClose={() => setShowAddItem(false)}
        />
      )}
    </View>
  );
}
