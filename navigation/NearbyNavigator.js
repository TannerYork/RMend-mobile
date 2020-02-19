import { createStackNavigator } from 'react-navigation-stack';
import NearbyScreen from '../screens/HomeScreens/NearbyScreen';
import ReportInfoScreen from '../screens/HomeScreens/ReportInfoScreen';

const NearbyNavigator = createStackNavigator(
  {
    Nearby: {
      screen: NearbyScreen
    },
    ReportInfo: {
      screen: ReportInfoScreen
    }
  },
  {
    initialRoute: 'Nearby',
    mode: 'modal',
    headerStyle: {
      height: 80 // Specify the height of your custom header
    },
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default NearbyNavigator;
