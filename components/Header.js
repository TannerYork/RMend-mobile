import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class Header extends React.Component {
  render() {
    const { title, navTitleOne, navTitleTwo, navActionOne, navActionTwo } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={navActionOne}>
          <Text style={styles.headerButtonText}>{navTitleOne}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.headerButton} onPress={navActionTwo}>
          <Text style={styles.headerButtonText}>{navTitleTwo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    width: wp('40%'),
    fontSize: wp('5%'),
    color: '#EEE',
    textAlign: 'center'
  },
  headerButton: {
    width: wp('15%')
  },
  headerButtonText: {
    fontSize: wp('4%'),
    color: '#FFF',
    textAlign: 'center',
    color: Colors.mainText
  }
});
