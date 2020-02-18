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
            contentContainerStyle={styles.list}
            data={reports}
            renderItem={item => {
              const { details, images } = item.item;
              return (
                <TouchableOpacity style={styles.reportInfo}>
                  <Image source={{ uri: images[0].imageUrl }} style={styles.reportImage} />
                  <View>
                    <Text style={styles.reportType}>{details.type}</Text>
                    <Text style={styles.reportAuth}>{details.authority}</Text>
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
    backgroundColor: '#EEEE'
  },
  headerWrapper: {
    width: wp('100%'),
    height: hp('14%'),
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: wp('1%'),
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0
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
    alignItems: 'center',
    marginTop: hp('14%')
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
  list: {
    marginTop: hp('12%'),
    width: wp('100%'),
    alignItems: 'center'
  },
  reportWrapper: {
    width: wp('90%'),
    height: hp('11%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    marginTop: hp('1%'),
    padding: wp('1%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
    elevation: 1
  },
  reportInfo: {
    width: wp('70%'),
    height: hp('13%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    marginTop: hp('2%'),
    paddingLeft: wp('15%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    position: 'relative'
  },
  reportImage: {
    width: hp('10%'),
    height: hp('10%'),
    marginRight: wp('5%'),
    borderRadius: wp('3%'),
    position: 'absolute',
    left: wp('-5%')
  },
  reportType: {
    fontSize: wp('5%'),
    color: '#222'
  },
  reportAuth: {
    fontSize: wp('3%'),
    color: '#666'
  }
});
