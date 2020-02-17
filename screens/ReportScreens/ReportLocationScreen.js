import React from 'react';
import { StyleSheet, Image, TextInput, View, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Header from '../../components/Header';
import mapStyle from '../../constants/MapStyle';
import { updateLocation } from '../../redux/actions';
import { object } from 'yup';

class ReportLocationScreen extends React.Component {
  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    } else {
      let location = Location.getCurrentPositionAsync({});
      console.log(location);
      const { latitude, longitude } = location.coords;
      this.props.updateLocation({ latitude, longitude });
    }
  };

  updateRegion = region => {
    const { latitude, longitude } = region;
    this.props.updateLocation({ latitude, longitude });
  };

  render() {
    const { navigation, location } = this.props;
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
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{ ...location, latitudeDelta: 0.09, longitudeDelta: 0.09 }}
          showsUserLocation={true}
          onRegionChange={region => this.updateRegion(region)}
          style={styles.map}
        >
          <Marker coordinate={location} image={require('../../assets/images/location_icon.jpg')} />
        </MapView>
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
    height: hp('73%'),
    width: wp('100%'),
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

const mapStateToProps = ({ report }) => {
  return {
    location: report.location
  };
};

export default connect(mapStateToProps, { updateLocation })(ReportLocationScreen);
