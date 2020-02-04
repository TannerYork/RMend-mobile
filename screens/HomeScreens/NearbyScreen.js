import React from 'react';
import { StyleSheet, View, Text, Dimensions,
        SafeAreaView, ScrollView } from 'react-native';

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
            <SafeAreaView style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Reports</Text>
                </View>
                <ScrollView styles={styles.content}>
                    {this.renderReports()}
                </ScrollView>
            </SafeAreaView>
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
        backgroundColor: 'black', padding: 15,
        position: 'absolute', top: 0, left: 0,
        zIndex: 100
    },
    headerText: {
        color: 'white', fontSize: 50,
        fontWeight: 'bold'
    },
    content: {
        height: Dimensions.get('window').height,
        marginTop: 140,
    },
});