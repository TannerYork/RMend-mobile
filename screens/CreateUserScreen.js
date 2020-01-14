import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function CreateUserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CreateUserScreen</Text>
    </View>
  );
}

CreateUserScreen.navigationOptions = {
  title: 'CreateUser',
};
