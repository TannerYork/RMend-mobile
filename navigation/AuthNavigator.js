import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../screens/AuthScreens/AuthScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import CreateUserScreen from '../screens/AuthScreens/CreateUserScreen';

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerShown: true
      }
    },
    CreateUser: {
      screen: CreateUserScreen,
      navigationOptions: {
        headerShown: true
      }
    }
  },
  {
    initialRoute: 'SignIn',
    mode: 'card',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
        borderBottomColor: 'black'
      },
      headerShown: false
    }
  }
);

export default AuthNavigator;
