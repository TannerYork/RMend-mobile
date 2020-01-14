import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ProfileScreen</Text>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
