import React from 'react';
import { StyleSheet, View, Text, Dimensions,
        TouchableOpacity, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class PhotoScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>RMend</Text>
                </View>
                <Image source={require('../../assets/images/smiley_sun.png')} style={styles.image}/>
                <TouchableOpacity style={styles.button} onPress={() => navigate('Report')}>
                    <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>Take Photo</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', 
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column'
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
    image: {
        width: wp('90%'), height: hp('50%'),
        borderRadius: 20,
        marginTop: 20
    },
    button: {
        width: 350, height: 60,
        borderRadius: 42,
        justifyContent: 'center', alignItems: 'center',
        marginTop: hp('5%'), backgroundColor: '#ff6a30',
    }
});