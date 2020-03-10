import React from 'react';
import { View } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { createStackNavigator } from 'react-navigation-stack';

import { firebaseApp } from '../config/FirebaseApp';
import NearbyScreen from '../screens/HomeScreens/NearbyScreen';
import PhotoScreen from '../screens/HomeScreens/PhotoScreen';
import ProfileScreen from '../screens/HomeScreens/ProfileScreen';
import ReportInfoScreen from '../screens/HomeScreens/ReportInfoScreen';
import AuthNavigator from './AuthNavigator';

const HomeNavigator = createBottomTabNavigator(
  {
    Nearby: {
      screen: NearbyScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('10%'),
              height: wp('10%'),
              borderRadius: 42,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="filetext1" size={wp('6%')} color={focused ? '#FFF' : '#666'} />
          </View>
        )
      }
    },
    Photo: {
      screen: PhotoScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('15%'),
              height: wp('15%'),
              borderRadius: wp('8%'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: focused ? '#ff6a30' : '#111'
            }}
          >
            <Entypo name="camera" size={wp('7%')} color={focused ? '#FFF' : '#666'} />
          </View>
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              width: wp('10%'),
              height: wp('10%'),
              borderRadius: 42,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="smileo" size={wp('6%')} color={focused ? '#FFF' : '#666'} />
          </View>
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          defaultHandler();
          if (firebaseApp.auth().currentUser === null) {
            navigation.navigate('Auth');
          }
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
        height: hp('6%'),
        backgroundColor: '#111'
      }
    },
    defaultNavigationOptions: {
      tabBarLabel: () => {
        return null;
      }
    }
  }
);

const MainHomeNavigator = createStackNavigator(
  {
    Home: HomeNavigator,
    Auth: AuthNavigator,
    ReportInfo: ReportInfoScreen
  },
  {
    initialRoute: 'Home',
    mode: 'modal',
    defaultNavigationOptions: {
      headerShown: false,
      gesturesEnabled: false
    }
  }
);

export default MainHomeNavigator;
