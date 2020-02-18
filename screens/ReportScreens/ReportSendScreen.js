import React from 'react';
import { Text, StyleSheet, ScrollView, View, Alert, Image, SafeAreaView } from 'react-native';
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { updateInfo, resetReport } from '../../redux/actions';
import { firebaseApp, createReport } from '../../config/FirebaseApp';
import validate from '../../redux/validate';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

class ReportSendScreen extends React.Component {
  componentWillMount() {
    const user = firebaseApp.auth().currentUser;
    this.props.updateInfo({
      authority: 'Barren County Road Department',
      name: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
    this.setState({ name: user.displayName, email: user.email, phoneNumber: user.phoneNumber });
  }

  sendReport = () => {
    const { report, navigation, resetReport } = this.props;
    const errors = validate(report);
    if (Object.values(errors).length > 0) {
      Alert.alert(
        'A Required Field Is Missing',
        'Check that all the required fields have been provided.',
        [{ text: 'Ok', style: 'cancel' }]
      );
    } else {
      createReport(report);
      resetReport();
      navigation.navigate('Home');
    }
  };

  render() {
    const { navigation, report, updateInfo, resetReport } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Send"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Send"
          navActionOne={() => {
            resetReport();
            navigation.navigate('Home');
          }}
          navActionTwo={() => {
            Alert.alert(
              "Are you sure you're ready to submit this report?",
              'Make sure all fields are filled with as accurately as possible.',
              [
                { text: 'Yes', onPress: this.sendReport },
                { text: 'Cancel', style: 'cancel' }
              ]
            );
          }}
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
            <TextInput
              style={styles.input}
              value={this.state.name}
              onChangeText={text => updateInfo({ ...report.info, name: text })}
              placeholder="Required"
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={this.state.email}
              onChangeText={text => updateInfo({ ...report.info, email: text })}
              placeholder="Required"
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={this.state.phoneNumber}
              onChangeText={text => updateInfo({ ...report.info, phoneNumber: text })}
              placeholder="Optional"
              editable={false}
            />
          </View>
          <View style={{ height: 30 }}></View>
          {/* <Text style={styles.subHeader}>Optional</Text>
          <View style={styles.inputWrapperSmall}>
            <Text style={styles.inputLabelSmall}>Telephone</Text>
            <TextInput
              style={styles.inputSmall}
              onChangeText={text => updateInfo({ ...report.info, phoneNumber: text })}
              placeholder="Optional"
              editable={false}
            />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ report }) => {
  return {
    report: report
  };
};
export default connect(mapStateToProps, { updateInfo, resetReport })(ReportSendScreen);

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
