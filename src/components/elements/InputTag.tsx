import React, {FC} from 'react';
import {StyleProp, TextInput, TextStyle, ViewStyle} from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
}
const InputTag: FC<Props> = ({
  value,
  placeholder,
  onChangeText,
  style,
  className,
}) => {
  return (
    <TextInput
      value={value}
      style={style}
      placeholder={placeholder}
      onChangeText={onChangeText}
      className={` border-b-[1px] border-gray-200 font-semibold  placeholder:text-gray-400 text-xl ${className}`}
    />
  );
};

export default InputTag;
