import React from 'react';
import { View } from 'react-native';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import ReportPhotoScreen from '../screens/ReportScreens/ReportPhotoScreen';
import ReportLocationScreen from '../screens/ReportScreens/ReportLocationScreen';
import ReportDetailsScreen from '../screens/ReportScreens/ReportDetailsScreen';
import ReportSendScreen from '../screens/ReportScreens/ReportSendScreen';
import ReportTypesScreen from '../screens/ReportScreens/ReportTypesScreen';
import ReportTypeGroupsScreen from '../screens/ReportScreens/ReportTypeGroupsScreen';

const ReportNavigator = createMaterialTopTabNavigator(
  {
    Photo: {
      screen: ReportPhotoScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={tabBarIcon(focused)}>
            <Entypo name="camera" size={wp('5%')} color={focused ? '#FFF' : '#777'} />
          </View>
        )
      }
    },
    Location: {
      screen: ReportLocationScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={tabBarIcon(focused)}>
            <MaterialIcons name="location-on" size={wp('5%')} color={focused ? '#FFF' : '#666'} />
          </View>
        )
      }
    },
    Details: {
      screen: ReportDetailsScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={tabBarIcon(focused)}>
            <AntDesign name="profile" size={wp('5%')} color={focused ? '#FFF' : '#666'} />
          </View>
        )
      }
    },
    Send: {
      screen: ReportSendScreen,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={tabBarIcon(focused)}>
            <MaterialIcons name="send" size={wp('5%')} color={focused ? '#FFF' : '#666'} />
          </View>
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      indicatorStyle: {
        display: 'none'
      },
      style: {
        borderTopWidth: 0.3,
        height: hp('10%'),
        backgroundColor: '#111',
        zIndex: 1000
      }
    }
  }
);

const MainReportNavigator = createStackNavigator(
  {
    Report: {
      screen: ReportNavigator,
      navigationOptions: {
        headerShown: false
      }
    },
    ReportTypeGroups: {
      screen: ReportTypeGroupsScreen,
      navigationOptions: {
        headerShown: true
      }
    },
    ReportTypes: {
      screen: ReportTypesScreen,
      navigationOptions: {
        headerShown: true,
        headerTitle: 'Types'
      }
    }
  },
  {
    backBehavior: 'order',
    initialRoute: 'Report',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: '#ff6a30'
    }
  }
);

const tabBarIcon = focused => {
  return {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: focused ? '#33C7FF' : '#FFE633'
  };
};

export default MainReportNavigator;
