import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SignInScreen</Text>
    </View>
  );
}

SignInScreen.navigationOptions = {
  title: 'SignIn',
};
