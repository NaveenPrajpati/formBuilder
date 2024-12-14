import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Settings from './pages/Tabs/Settings';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/Tabs/CreateForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FormPreview from './pages/Tabs/FormPreview';
import Templates from './pages/Templates';
import Responses from './pages/Tabs/Responses';
import {DarkTheme} from '@react-navigation/native';
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
        component={Responses}
      />
      <Tab.Screen
        name="Settings"
        options={{tabBarLabel: 'SETTINGS'}}
        component={Settings}
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
          name="Dashboard"
          component={Dashboard}
          options={{
            header: ({navigation, route}) => (
              <Header navigation={navigation} title="Dashboard" />
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
      </Stack.Navigator>
    </View>
  );
}
