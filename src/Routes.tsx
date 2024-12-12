import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Settings from './components/Settings';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/CreateForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FormPreview from './pages/FormPreview';
import Templates from './pages/Templates';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CreateForm"
        options={{tabBarLabel: 'QUESTIONS'}}
        component={CreateForm}
      />
      <Tab.Screen
        name="FormPreview"
        options={{tabBarLabel: 'PREVIEW'}}
        component={FormPreview}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <View className=" flex-1">
      <Stack.Navigator screenOptions={{header: ({}) => <Header />}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          options={{headerShown: true}}
          name="CreateForm"
          component={MyTabs}
        />
        <Stack.Screen name="Templates" component={Templates} />
      </Stack.Navigator>
    </View>
  );
}
