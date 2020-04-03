import React from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const { type, name, size } = props;
  return type == 'ant-design' ? (
    <AntDesign
      name={name}
      size={size ? size : 26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ) : (
    <Ionicons
      name={props.name}
      size={size ? size : 26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
