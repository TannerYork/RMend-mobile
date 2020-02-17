import React from 'react';
import { View } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import NearbyScreen from '../screens/HomeScreens/NearbyScreen';
import PhotoScreen from '../screens/HomeScreens/PhotoScreen';
import ProfileScreen from '../screens/HomeScreens/ProfileScreen';

const HomeNavigator = createBottomTabNavigator(
  {
    Nearby: {
      screen: NearbyScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('8%'),
              height: wp('8%'),
              borderRadius: 42,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="filetext1" size={wp('5%')} color={focused ? '#FFF' : '#666'} />
          </View>
        ),
        tabBarLabel: () => {
          return null;
        }
      }
    },
    Photo: {
      screen: PhotoScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('12%'),
              height: wp('12%'),
              borderRadius: wp('6%'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: focused ? '#ff6a30' : '#111'
            }}
          >
            <Entypo name="camera" size={wp('7%')} color={focused ? '#FFF' : '#666'} />
          </View>
        ),
        tabBarLabel: () => {
          return null;
        }
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('8%'),
              height: wp('8%'),
              borderRadius: 42,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="smileo" size={wp('5%')} color={focused ? '#FFF' : '#666'} />
          </View>
        ),
        tabBarLabel: () => {
          return null;
        }
      }
    }
  },
  {
    initialRouteName: 'Photo',
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopWidth: 0.3,
        height: hp('7%'),
        backgroundColor: '#111'
      }
    }
  }
);

export default HomeNavigator;
