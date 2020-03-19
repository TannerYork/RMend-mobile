import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import AuthScreen from '../screens/AuthScreens/AuthScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import CreateUserScreen from '../screens/AuthScreens/CreateUserScreen';

const AuthNavigator = createSwitchNavigator(
  {
    // Only used for stack navigaton when auth is promted from profile screen
    // Auth: {
    //   screen: AuthScreen
    // },
    SignIn: {
      screen: SignInScreen
      // Only used for stack navigaton when auth is promted from profile screen
      // navigationOptions: {
      //   headerShown: true
      // }
    },
    CreateUser: {
      screen: CreateUserScreen
      // Only used for stack navigaton when auth is promted from profile screen
      // navigationOptions: {
      //   headerShown: true
      // }
    }
  },
  {
    initialRoute: 'SignIn',
    mode: 'card',
    defaultNavigationOptions: {
      // Only used for stack navigaton when auth is promted from profile screen
      // headerStyle: {
      //   backgroundColor: 'black',
      //   borderBottomColor: 'black'
      // },
      // headerShown: false
    }
  }
);

export default AuthNavigator;
