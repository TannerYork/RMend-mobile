import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CameraScreen</Text>
    </View>
  );
}

CameraScreen.navigationOptions = {
  title: 'Camera',
};
