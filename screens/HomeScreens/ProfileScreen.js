import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={this.photoAlert}>
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
              Save Changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.photoAlert}>
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  headerWrapper: {
    width: wp('100%'),
    height: hp('12%'),
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: wp('1%')
  },
  headerText: {
    color: 'white',
    fontSize: wp('10%'),
    fontWeight: 'bold'
  },
  inputs: {
    marginTop: hp('5%'),
    alignItems: 'center'
  },
  inputWrapper: {
    width: wp('90%'),
    height: hp('7%'),
    marginBottom: hp('3%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('2%')
  },
  input: {
    width: wp('65%'),
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabel: {
    width: wp('20%'),
    fontSize: wp('5%'),
    color: '#666'
  },
  buttons: {
    marginTop: hp('8%'),
    alignItems: 'center'
  },
  button: {
    width: wp('70%'),
    height: hp('7%'),
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#ff6a30'
  }
});
