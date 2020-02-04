import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { Platform } from 'react-native';

import ReportPhotoScreen from '../screens/ReportScreens/ReportPhotoScreen';
import ReportLocationScreen from '../screens/ReportScreens/ReportLocationScreen';
import ReportDetailsScreen from '../screens/ReportScreens/ReportDetailsScreen';
import ReportSendScreen from '../screens/ReportScreens/ReportSendScreen';

const ReportNavigator = createBottomTabNavigator({ 
    Photo: ReportPhotoScreen, 
    Location: ReportLocationScreen, 
    Details: ReportDetailsScreen, 
    Send: ReportSendScreen
},{
    tabBarOptions: {
        style: {
            borderTopWidth: 0.3,
            height: 50,
            backgroundColor: '#111'
        }
    }
});

export default ReportNavigator