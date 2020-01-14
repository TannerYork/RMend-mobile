import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainSwitchNavigator from './MainSwitchNavigator';

const switchNavigator = createSwitchNavigator({
  Main: MainSwitchNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
