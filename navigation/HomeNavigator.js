import React from 'react'
import { View } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import NearbyScreen from '../screens/HomeScreens/NearbyScreen';
import PhotoScreen from '../screens/HomeScreens/PhotoScreen';
import ProfileScreen from '../screens/HomeScreens/ProfileScreen';

const HomeNavigator = createBottomTabNavigator({ 
    Nearby: {
        screen: NearbyScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <AntDesign name="filetext1" size={30} color={focused?"#FFF":'#666'} />
            ),
            tabBarLabel:() => {return null}
        }
    },
    Photo: {
        screen: PhotoScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <View style={{width: 75, height: 75, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#ff6a30' : '#111'}}>
                    <Entypo name="camera" size={40} color={focused?"#FFF":'#666'} />
                </View>
            ),
            tabBarLabel:() => {return null}
        }
    }, 
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <AntDesign name="smileo" size={30} color={focused?"#FFF":'#666'} />
            ),
            tabBarLabel:() => {return null}
        }
    }, 
},
{
    initialRouteName: 'Photo',
    tabBarOptions: {
        showLabel: false,
        style: {
            borderColor: '#222',
            borderTopWidth: 0.3,
            height: 50,
            backgroundColor: '#111'
        }
    }
});

export default HomeNavigator