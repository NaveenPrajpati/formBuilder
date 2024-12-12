import {View, Text} from 'react-native';
import React from 'react';
import Routes from './src/Routes';
import './global.css';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
