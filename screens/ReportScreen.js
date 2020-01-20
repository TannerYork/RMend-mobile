import React from 'react';
import { View, Text, Button } from 'react-native';

import { signOut } from '../config/FirebaseApp';
import styles from '../styles/StyleSheet';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report</Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  );
}

ReportScreen.navigationOptions = {
  title: 'Report',
};
