import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Header from './components/Header';
import FormList from './pages/FormList';
import CreateForm from './pages/tabs/CreateForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FormPreview from './pages/tabs/FormPreview';
import Templates from './pages/Templates';
import Responses from './pages/tabs/responses/Responses';
import {DarkTheme} from '@react-navigation/native';
import FormSetting from './pages/tabs/FormSetting';
import Settings from './pages/Settings';
import ResponseTabs from './pages/tabs/ResponseTabs';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#7c3aed',
        },
      }}>
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
      <Tab.Screen
        name="Responses"
        options={{tabBarLabel: 'RESPONSES'}}
        component={ResponseTabs}
      />
      <Tab.Screen
        name="FormSetting"
        options={{tabBarLabel: 'SETTINGS'}}
        component={FormSetting}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <View className=" flex-1">
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
        <Stack.Screen
          name="FormList"
          component={FormList}
          options={{
            header: ({navigation, route}) => (
              <Header navigation={navigation} title="FormList" />
            ),
          }}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="Tabs"
          component={MyTabs}
          options={{
            header: ({navigation, route}) => (
              <Header navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Templates"
          component={Templates}
          options={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#7c3aed'},
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
