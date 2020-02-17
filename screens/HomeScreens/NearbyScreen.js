import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class NearbyScreen extends React.Component {
  state = { reports: [] };

  renderReports() {
    return this.state.reports.forEach(report => {
      return <View style={styles.report}></View>;
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        <ScrollView styles={styles.content}>{this.renderReports()}</ScrollView>
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
  content: {
    height: hp('100%'),
    marginTop: 140
  }
});
