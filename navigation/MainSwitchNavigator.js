import { createSwitchNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import CameraScreen from '../screens/CameraScreen';
import NearbyScreen from '../screens/NearbyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingScreen from '../screens//LoadingScreen';
import ReportNavigator from './ReportNavigator';

const MainAppNavigator = createSwitchNavigator({
    Loading: {screen: LoadingScreen},
    SignIn: {screen: SignInScreen},
    CreateUser: {screen: CreateUserScreen},
    Camera: {screen: CameraScreen},
    Report: ReportNavigator,
    Profile: {screen: ProfileScreen},
    Nearby: {screen: NearbyScreen},
  });

export default MainAppNavigator;