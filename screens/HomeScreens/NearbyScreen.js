import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { firebaseApp } from '../../config/FirebaseApp';

export default class NearbyScreen extends React.Component {
  state = { lisenter: null, reports: [] };

  componentWillMount() {
    var lisenter = firebaseApp
      .firestore()
      .collection('reports')
      .onSnapshot(snapShot => {
        const reports = [];
        snapShot.forEach(report => reports.push(report.data()));
        this.setState({ reports });
      });
    this.setState({ lisenter });
  }

  componentWillUnmount() {
    this.state.lisenter();
  }

  renderReports = () => {
    const reports = this.state.reports;
    return reports.map(report => {
      const { details, images, senderInfo } = report;
      return (
        <TouchableOpacity style={styles.reportWrapper}>
          <View style={styles.reportInfo}>
            <Image source={images[0].imageUrl} style={styles.reportImage} />
            <View>
              <Text style={styles.reportType}>{details.type}</Text>
              <Text style={styles.reportAuth}>{details.authority}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const reports = this.state.reports;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        {reports.length == 0 && (
          <View style={styles.content}>
            <Image
              style={styles.emptyImage}
              source={require('../../assets/images/smiley_sun.png')}
            />
            <Text style={styles.emptyText}>Couldn't find any nearby reports at this time</Text>
          </View>
        )}
        {reports.length > 0 && (
          <FlatList
            data={reports}
            renderItem={item => {
              const { details, images } = item.item;
              return (
                <TouchableOpacity style={styles.reportWrapper}>
                  <View style={styles.reportInfo}>
                    <Image source={{ uri: images[0].imageUrl }} style={styles.reportImage} />
                    <View>
                      <Text style={styles.reportType}>{details.type}</Text>
                      <Text style={styles.reportAuth}>{details.authority}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
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
    height: hp('14%'),
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: wp('1%')
  },
  headerText: {
    color: 'white',
    fontSize: wp('10%'),
    fontWeight: 'bold'
  },
  content: {
    minHeight: hp('100%'),
    width: wp('97%'),
    backgroundColor: 'white',
    alignItems: 'center'
  },
  emptyImage: {
    height: hp('30%'),
    width: hp('30%'),
    borderRadius: wp('40%'),
    marginTop: hp('15%')
  },
  emptyText: {
    marginTop: hp('5%'),
    fontSize: wp('3%'),
    color: '#888'
  },
  emptyButton: {
    marginTop: hp('3%')
  },
  reportWrapper: {
    width: wp('100%'),
    height: hp('30%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: wp('1%')
  },
  reportInfo: {
    width: wp('90%'),
    height: hp('30%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20
  },
  reportImage: {
    width: hp('25%'),
    height: hp('25%'),
    marginRight: wp('1%'),
    borderRadius: hp('5%')
  },
  reportType: {
    fontSize: wp('10%'),
    color: 'white'
  },
  reportAuth: {
    fontSize: wp('4%'),
    color: '#666'
  }
});
