import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { firebaseApp } from '../config/FirebaseApp';

export default class Loading extends React.Component {
    componentDidMount() {
        const listener = firebaseApp.auth().onAuthStateChanged(user => {
          listener()
          this.props.navigation.navigate(user ? 'Report' : 'SignIn')
        })
      }

    render() {
        return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})