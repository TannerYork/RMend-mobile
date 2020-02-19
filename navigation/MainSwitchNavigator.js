import { createSwitchNavigator } from 'react-navigation';
import LoadingScreen from '../screens/LoadingScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import CreateUserScreen from '../screens/AuthScreens/CreateUserScreen';
import ReportInfoScreen from '../screens/HomeScreens/ReportInfoScreen';
import HomeNavigator from './HomeNavigator';
import ReportNavigator from './ReportNavigator';

const MainAppNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },
  SignIn: { screen: SignInScreen },
  CreateUser: { screen: CreateUserScreen },
  Home: HomeNavigator,
  Report: ReportNavigator,
  ReportInfo: ReportInfoScreen
});

export default MainAppNavigator;
