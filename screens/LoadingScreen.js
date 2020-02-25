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
      this.props.navigation.navigate('Home');
    });
  }

  render() {
    return <View style={styles.container}></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    flex: 1
  }
});
