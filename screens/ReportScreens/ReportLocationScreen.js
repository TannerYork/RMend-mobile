import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  View,
  SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';

class ReportLocationScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.scrollContainer}>
        <Header
          title="Location"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Next"
          navActionOne={() => navigation.navigate('Home')}
          navActionTwo={() => navigation.navigate('Details')}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter a location near you"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.map} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#545454',
    marginTop: 10
  },
  inputWrapper: {
    width: wp('95%'),
    height: hp('5%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 42,
    padding: wp('1%')
  },
  input: {
    width: wp('90%'),
    fontSize: wp('3%'),
    color: '#666'
  }
});

ReportLocationScreen.navigationOptions = {
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
      <MaterialIcons name="location-on" size={30} color={focused ? '#FFF' : '#666'} />
    </View>
  ),
  tabBarLabel: () => {
    return null;
  }
};

export default ReportLocationScreen;
