import React from 'react';
import { Text, StyleSheet, ScrollView, View, Dimensions, Image, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class ReportSendScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Send"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Send"
          navActionOne={() => navigation.navigate('Home')}
          navActionTwo={() => print('Send')}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>Authority</Text>
          <Text style={styles.subHeader}>This report will be sent to:</Text>
          <TouchableHighlight style={styles.authInfoWrapper}>
            <View style={styles.authInfo}>
              <Image
                source={require('../../assets/images/placeholder-dark.jpg')}
                style={styles.authInfoImage}
              />
              <View>
                <Text style={styles.authInfoText}>Barren County Road Department</Text>
                <Text style={styles.authInfoType}>Council</Text>
              </View>
            </View>
          </TouchableHighlight>
          <Text style={styles.warring}>
            If this is an emergency, please call emergency services.
          </Text>
          <Text style={styles.header}>My Details</Text>
          <Text style={styles.subHeader}>Required</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput style={styles.input} placeholder="Required" />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.input} placeholder="Required" />
          </View>
          <View style={{ height: 30 }}></View>
          <Text style={styles.subHeader}>Optional</Text>
          <View style={styles.inputWrapperSmall}>
            <Text style={styles.inputLabelSmall}>Telephone</Text>
            <TextInput style={styles.inputSmall} placeholder="Optional" />
          </View>
          <View style={styles.inputWrapperSmall}>
            <Text style={styles.inputLabelSmall}>Address</Text>
            <TextInput style={styles.inputSmall} placeholder="Optional" />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: hp('100%')
  },
  content: {
    height: hp('100%'),
    alignItems: 'center'
  },
  header: {
    width: wp('100%'),
    fontSize: wp('5%'),
    color: Colors.mainText,
    fontFamily: 'Arial-BoldMT',
    marginLeft: wp('5%'),
    marginTop: hp('2%')
  },
  subHeader: {
    width: wp('100%'),
    fontSize: wp('3%'),
    color: '#444',
    marginBottom: hp('1%'),
    marginLeft: wp('5%'),
    fontFamily: 'Arial'
  },
  authInfoWrapper: {
    width: wp('100%'),
    height: hp('10%'),
    marginBottom: hp('3%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: wp('1%')
  },
  authInfo: {
    width: wp('90%'),
    height: hp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20
  },
  authInfoImage: {
    width: hp('8%'),
    height: hp('8%'),
    marginRight: wp('1%'),
    borderRadius: 20
  },
  authInfoText: {
    fontSize: wp('4%'),
    color: 'white'
  },
  authInfoType: {
    color: '#666'
  },
  warring: {
    width: wp('50%'),
    fontSize: wp('3%'),
    color: '#444',
    alignSelf: 'flex-start',
    marginLeft: wp('5%')
  },
  inputWrapper: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: wp('1%')
  },
  input: {
    width: wp('70%'),
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabel: {
    width: wp('20%'),
    fontSize: wp('4%'),
    color: '#666'
  },
  inputSmall: {
    width: wp('70%'),
    fontSize: wp('3%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabelSmall: {
    width: wp('20%'),
    fontSize: wp('3%'),
    color: '#666'
  },
  inputWrapperSmall: {
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: wp('1%')
  }
});

export default ReportSendScreen;
