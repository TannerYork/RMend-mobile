import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';

export default function InfoMessage(props) {
    return (
        <View style={styles.infoMessage}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    infoMessage: {
        width: Dimensions.get('window').width, height: 50,
        backgroundColor: '#E4E4E4',
        alignItems: 'center', justifyContent: 'center'
    },
    text: {
        fontSize:20, color: '#888'
    }
})