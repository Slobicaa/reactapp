import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CameraExample from '../media/Camera';
//import Audio from '../media/Microphone';
import ImageGallery from '../media/ImageGallery';
import VideoGallery from '../media/VideoGallery';
import AudioGallery from '../media/AudioGallery';

const HomeStack = createStackNavigator({
  Home: VideoGallery,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Video',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? ios-videocam
          : 'md-videocam'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: ImageGallery,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: AudioGallery,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Audio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-microphone' : 'md-microphone'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});