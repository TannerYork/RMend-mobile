import React from 'react';
import { StyleSheet, View, Text, TextInput,
         Dimensions, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Phone</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Postcode</Text>
                    <TextInput style={styles.input}/>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize: 25, color: 'white'}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize: 25, color: 'white'}}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
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
    inputWrapper: {
        width: 350, height: 65, marginBottom: 20,
        backgroundColor: '#222', flexDirection: 'row', 
        justifyContent: 'space-around', alignItems: 'center',
        borderColor: '#555', borderWidth: 1, borderRadius: 20,
        padding: 20
    },
    input: {
        width: 200, fontSize: 22, 
        color: '#666', textAlign: 'right',
    },
    inputLabel: {
        width: 100 , fontSize: 22, 
        color: '#666',
    },
    button: {
        width: 350, height: 50,
        borderRadius: 42, borderWidth: 2, borderColor: '#E9E9E9',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 20
    }
});