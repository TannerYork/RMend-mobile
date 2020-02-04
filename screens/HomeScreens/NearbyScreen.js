import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

export default class NearbyScreen extends React.Component {
    state = {reports: []}
    
    renderReports() {
        return this.state.reports.forEach((report) => {
            return (
                <View style={styles.report}>
                    
                </View>
            );
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Reports</Text>
                </View>
                <View style={styles.reportList}>
                    {this.renderReports()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', 
        backgroundColor: 'black'
    },
    headerWrapper: {
        width: Dimensions.get('window').width, 
        height: 140, justifyContent: 'flex-end',
        backgroundColor: 'black', padding: 15
    },
    headerText: {
        color: 'white', fontSize: 50,
        fontWeight: 'bold'
    },
});