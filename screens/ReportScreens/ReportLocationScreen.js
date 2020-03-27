import React from 'react';
import { StyleSheet, Image, TextInput, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { featureEach, booleanContains, point, distance } from '@turf/turf';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Header from '../../components/Header';
import mapStyle from '../../constants/MapStyle';
import { updateLocation, updateCounty, resetReport } from '../../redux/actions';
import currentAuthJSON from '../../constants/json/current_rmend_counties.json';

class ReportLocationScreen extends React.Component {
    state = { loaded: false, latitude: null, longitude: null };

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            this.updateRegion(location.coords);
        }
        this.setState({ loaded: true });
    };

    updateRegion = region => {
        const { latitude, longitude } = region;
        this.props.updateLocation({ latitude, longitude });
        this.updateReportsCounty(latitude, longitude);
    };

    updateReportsCounty = async (latitude, longitude) => {
        const coordinate = point([longitude, latitude]);
        var found = false;
        await featureEach(currentAuthJSON, feature => {
            if (booleanContains(feature, coordinate)) {
                found = true;
                const county = feature.properties.NAME;
                this.props.updateCounty(county);
            }
        });
        if (!found) {
            this.props.updateCounty('');
        }
    };

    render() {
        const { navigation, location, resetReport, isLoading } = this.props;
        const { loaded } = this.state;
        return (
            <SafeAreaView style={styles.scrollContainer}>
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                <Header
                    title="Location"
                    {...this.props}
                    navTitleOne="Home"
                    navTitleTwo="Next"
                    navActionOne={() => {
                        resetReport();
                        navigation.navigate('Home');
                    }}
                    navActionTwo={() => navigation.navigate('Details')}
                />
                {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter a location near you"
            placeholderTextColor="#666"
          />
        </View> */}
                {loaded && (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}
                        initialRegion={{ ...location, latitudeDelta: 0.09, longitudeDelta: 0.09 }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        onRegionChange={({ latitude, longitude }) =>
                            this.setState({ latitude, longitude })
                        }
                        onRegionChangeComplete={region => this.updateRegion(region)}
                        style={styles.map}
                    >
                        <Marker
                            coordinate={
                                this.state.longitude
                                    ? {
                                          latitude: this.state.latitude,
                                          longitude: this.state.longitude
                                      }
                                    : location
                            }
                            image={require('../../assets/images/location_icon.jpg')}
                        />
                    </MapView>
                )}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ report }) => {
    return {
        location: report.location,
        isLoading: report.isLoading
    };
};
export default connect(mapStateToProps, { updateLocation, resetReport, updateCounty })(
    ReportLocationScreen
);

const styles = StyleSheet.create({
    loadingOverlay: {
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center',
        opacity: 0.5,
        position: 'absolute',
        zIndex: 1000
    },
    loadingIcon: {
        width: wp('50%'),
        height: wp('50%')
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    map: {
        height: hp('78%'),
        width: wp('100%'),
        backgroundColor: '#545454',
        position: 'relative'
    },
    mapMarker: {
        height: hp('5.5%'),
        width: hp('5.5%'),

        position: 'absolute',
        top: hp('32.5%'),
        left: wp('45%')
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
