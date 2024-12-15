import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedFAB, BottomNavigation, Text} from 'react-native-paper';
import VectorIcon from '../../components/VectorIcon';
import Summary from './responses/Summary';
import ListResponse from './responses/ListResponse';
import Responses from './responses/Responses';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const ResponseTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'summary',
      title: 'Summary',
      focusedIcon: 'chart-pie',
      unfocusedIcon: 'chart-pie',
    },
    {key: 'list', title: 'List', focusedIcon: 'format-list-bulleted'},
    {key: 'user', title: 'Individual', focusedIcon: 'human-male-boy'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    summary: Summary,
    list: ListResponse,
    user: Responses,
  });

  return (
    <View className=" flex-1">
      <View className=" flex-row p-5 items-center gap-x-10 ">
        <VectorIcon iconName="filter" size={25} />
        <VectorIcon iconName="filter" size={25} />
        <VectorIcon iconName="filter" size={25} />
        <VectorIcon iconName="filter" size={25} />
      </View>
      <View className=" flex-1 bg-white">
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
        <AnimatedFAB
          icon={'reload'}
          label={'Label'}
          extended={false}
          onPress={() => console.log('Pressed')}
          visible={true}
          color="white"
          iconMode={'static'}
          style={[styles.fabStyle]}
          className=""
        />
      </View>
    </View>
  );
};

export default ResponseTabs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 100,
    right: 10,

    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'red',
  },
});
