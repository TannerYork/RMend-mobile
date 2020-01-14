import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/StyleSheet';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReportScreen</Text>
    </View>
  );
}

ReportScreen.navigationOptions = {
  title: 'Report',
};
