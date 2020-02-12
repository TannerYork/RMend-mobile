import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';

class ReportDetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Details"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Next"
          navActionOne={() => navigation.navigate('Home')}
          navActionTwo={() => navigation.navigate('Send')}
        />
        <Text style={styles.header}>Incident Type</Text>
        <TouchableOpacity style={styles.selector}>
          <Text style={styles.selectorText}>Select the incident type</Text>
          <MaterialIcons name="navigate-next" size={25} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Details</Text>
        <TextInput
          style={styles.details}
          placeholder="Enter a description of the incident"
          placeholderTextColor="#666"
          multiline
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    height: hp('100%')
  },
  header: {
    width: wp('90%'),
    fontSize: wp('8%'),
    color: Colors.mainText,
    fontFamily: 'Arial-BoldMT',
    padding: wp('1%'),
    marginTop: hp('2%')
  },
  selector: {
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
  selectorText: {
    fontSize: wp('6%'),
    color: '#FFF'
  },
  details: {
    width: wp('90%'),
    height: hp('15%'),
    marginBottom: hp('2%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('5%'),
    fontSize: wp('5%'),
    color: '#666'
  }
});

ReportDetailsScreen.navigationOptions = {
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
      <AntDesign name="profile" size={30} color={focused ? '#FFF' : '#666'} />
    </View>
  ),
  tabBarLabel: () => {
    return null;
  }
};

export default ReportDetailsScreen;
