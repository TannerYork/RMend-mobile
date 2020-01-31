import { createSwitchNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens//LoadingScreen';
import ReportNavigator from './ReportNavigator';

const MainAppNavigator = createSwitchNavigator({
    Loading: {screen: LoadingScreen},
    SignIn: {screen: SignInScreen},
    CreateUser: {screen: CreateUserScreen},
    Home: {screen: HomeScreen},
    Report: ReportNavigator,
});

export default MainAppNavigator;