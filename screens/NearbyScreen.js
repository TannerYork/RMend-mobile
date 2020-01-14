import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function NearbyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>NearbyScreen</Text>
    </View>
  );
}

NearbyScreen.navigationOptions = {
  title: 'Nearby',
};
