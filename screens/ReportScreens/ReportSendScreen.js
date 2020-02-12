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
            <TextInput style={styles.input} placeholder="Optional" />
          </View>
          <View style={styles.inputWrapperSmall}>
            <Text style={styles.inputLabelSmall}>Address</Text>
            <TextInput style={styles.input} placeholder="Optional" />
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
    width: wp('90%'),
    fontSize: wp('8%'),
    color: Colors.mainText,
    fontFamily: 'Arial-BoldMT',
    padding: wp('1%'),
    marginTop: hp('2%')
  },
  subHeader: {
    width: wp('90%'),
    fontSize: wp('4%'),
    color: '#444',
    marginBottom: hp('1%'),
    fontFamily: 'Arial'
  },
  authInfoWrapper: {
    width: wp('90%'),
    height: hp('10%'),
    marginBottom: hp('3%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('1%')
  },
  authInfo: {
    width: wp('90%'),
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20
  },
  authInfoImage: {
    width: hp('10%'),
    height: hp('10%'),
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
    color: '#444',
    alignSelf: 'flex-start',
    marginLeft: wp('5%')
  },
  inputWrapper: {
    width: wp('90%'),
    height: hp('8%'),
    marginBottom: hp('2%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('1%')
  },
  input: {
    width: wp('50%'),
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabel: {
    width: wp('20%'),
    fontSize: wp('5%'),
    color: '#666'
  },
  inputSmall: {
    width: wp('50%'),
    fontSize: wp('4%'),
    color: 'white',
    textAlign: 'right'
  },
  inputLabelSmall: {
    width: wp('20%'),
    fontSize: wp('4%'),
    color: '#666'
  },
  inputWrapperSmall: {
    width: wp('90%'),
    height: hp('7%'),
    marginBottom: hp('2%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('1%')
  }
});

ReportSendScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <View
      style={{
        width: 55,
        height: 55,
        borderRadius: 42,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: focused ? '#33C7FF' : '#FFE633'
      }}
    >
      <MaterialIcons name="send" size={30} color={focused ? '#FFF' : '#666'} />
    </View>
  ),
  tabBarLabel: () => {
    return null;
  }
};

export default ReportSendScreen;
