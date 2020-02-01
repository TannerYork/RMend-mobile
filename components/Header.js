import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <Button title={this.props.navTitleOne} 
                    style={styles.headerButton}
                    onPress={this.props.navActionOne}/>
                <Text style={styles.title}>{this.props.title}</Text>
                <Button title={this.props.navTitleTwo} 
                    style={styles.headerButton}
                    onPress={this.props.navActionTwo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width, height: 50,
        backgroundColor: '#222',
        flexDirection: "row", justifyContent: "space-around",
        alignItems: 'center', marginTop: 11
    },
    title: {
        width: 200,
        fontSize: 20, color: '#EEE',
        textAlign: "center"
    },
    headerButton: {
        fontSize: 25, 
        color: Colors.mainText
    }
})