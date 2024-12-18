import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Header from './components/Header';
import FormList from './pages/FormList';
import Home from './pages/Home';
import Settings from './pages/Settings';
import CreateForm from './pages/Tabs/CreateForm';
import FormPreview from './pages/Tabs/FormPreview';
import FormSetting from './pages/Tabs/FormSetting';
import Templates from './pages/Templates';
import ResponseTabs from './pages/Tabs/ResponseTabs';

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
    <SafeAreaView className=" flex-1">
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Stack.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: 'black',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FormList"
          component={FormList}
          options={{
            header: ({navigation, route, options, back}) => (
              <Header
                navigation={navigation}
                route={route}
                options={options}
                back={back}
              />
            ),
          }}
        />
        <Stack.Screen
          options={{headerShown: true}}
          name="Tabs"
          component={MyTabs}
          options={{
            header: ({navigation, route, options, back}) => (
              <Header
                navigation={navigation}
                route={route}
                options={options}
                back={back}
              />
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
    </SafeAreaView>
  );
}
