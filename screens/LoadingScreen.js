import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { firebaseApp } from '../config/FirebaseApp';

export default class Loading extends React.Component {
  componentDidMount() {
    const listener = firebaseApp.auth().onAuthStateChanged(user => {
      listener();
      this.props.navigation.navigate(user ? 'Home' : 'SignIn');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/splash.png')} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1
  }
});
