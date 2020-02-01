import React from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Button, View, Text, ActivityIndicator,
         TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons'

export default class HomeScreen extends React.Component {
    state = { hasPermission: null, type: Camera.Constants.Type.back};
    camera = null

    async componentDidMount() {
        this.askForPermission()
    }

    askForPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    handlePicturePress = async () => {
        const { swiper } = this.refs
        const { index } = this.refs.swiper.state
        if (index == 1 && this.camera) {
            const photo = await this.camera.takePictureAsync({ quality: 1, base64: true, exif: true});
            this.props.navigation.navigate('Report', {photo: photo});
        } else if (index == 2) {
            swiper.scrollBy(-1)
        } else if (index == 0) {
            swiper.scrollBy(1);
        }
    }
    
    renderCamera = () => {
        const { hasPermission, type } = this.state;
        const { navigation } = this.props;
        if (hasPermission == null) return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
        if (hasPermission == false) return (
            <View stlye={styles.container}>
                <Text style={styles.header}>Access to camera denied.</Text>
                <Text style={{textAlign: "center"}}>Would you like to give camera access?</Text>
                <Button title="Click Here" onPress={this.askForPermission}/>
            </View>
        );
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={type} ref={camera => this.camera = camera}/>
            </View>
          );
    }

    renderProfile = () => {
        return (
            <View style={styles.container}>
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
            </View>
        )
    }

    renderNearby = () => {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Nearby</Text>
                </View>
            </View>
        )
    }

    render() {
        const { swiper } = this.refs
        return (
            <View style={{flex:1}}>
                <Swiper loop={false} index={1} ref="swiper">
                    {this.renderNearby()}
                    {this.renderCamera()}
                    {this.renderProfile()}
                </Swiper>
                <View style={styles.swipeNav}>
                        <TouchableOpacity style={styles.navButton} 
                            onPress={() => {
                                    if (swiper.state.index == 2) {
                                        swiper.scrollBy(-2)
                                    } else if (swiper.state.index != 0) {
                                        swiper.scrollBy(-1)
                                    }
                                }}>
                                <AntDesign name='copy1' size={40} color={'#FFF'}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.captureButton} 
                            onPress={this.handlePicturePress} />
                        <TouchableOpacity 
                            style={styles.navButton} 
                            onPress={() => {
                                if (swiper.state.index == 0) {
                                    swiper.scrollBy(2)
                                } else if (swiper.state.index != 2) {
                                    swiper.scrollBy(1)
                                }
                            }}>
                                <AntDesign name='smileo' size={40} color={'#FFF'}/>
                        </TouchableOpacity>
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
    captureButton: {
        width: 70, height: 70,
        backgroundColor: '#F1F1F1', opacity: .8,
        borderWidth: 5, borderRadius: 42,
        borderColor: 'white', alignSelf: 'flex-end', 
     },
     homeNavButton: {
        width: 50, height: 50,
        backgroundColor: '#F1F1F1', opacity: .8,
        borderWidth: 5, borderRadius: 42,
        borderColor: 'white', alignSelf: 'flex-end', 
     },
    swipeNav: {
        width: Dimensions.get('window').width, height: 50,
        flexDirection: 'row', justifyContent: 'space-around', 
        alignSelf: 'flex-end', position: 'absolute', bottom: 50,
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
        width: 350, height: 75, marginBottom: 20,
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