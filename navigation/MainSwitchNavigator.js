import { createSwitchNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import CameraScreen from '../screens/CameraScreen';
import ReportScreen from '../screens/ReportScreen';
import NearbyScreen from '../screens/NearbyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingScreen from '../screens//LoadingScreen';

const MainAppNavigator = createSwitchNavigator({
    Loading: {screen: LoadingScreen},
    SignIn: {screen: SignInScreen},
    CreateUser: {screen: CreateUserScreen},
    Camera: {screen: CameraScreen},
    Report: {screen: ReportScreen},
    Profile: {screen: ProfileScreen},
    Nearby: {screen: NearbyScreen}
  });

export default MainAppNavigator;