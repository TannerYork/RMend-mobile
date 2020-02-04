import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/LoadingScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import CreateUserScreen from '../screens/AuthScreens/CreateUserScreen';
import HomeNavigator from './HomeNavigator';
import ReportNavigator from './ReportNavigator';

const MainAppNavigator = createSwitchNavigator({
    Loading: {screen: LoadingScreen},
    SignIn: {screen: SignInScreen},
    CreateUser: {screen: CreateUserScreen},
    Home: HomeNavigator,
    Report: ReportNavigator,
});

export default MainAppNavigator;