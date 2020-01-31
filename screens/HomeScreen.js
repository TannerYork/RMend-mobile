import React from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Button, View, Text, 
        ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons'

export default class HomeScreen extends React.Component {
    state = { hasPermission: null, type: Camera.Constants.Type.back, index: 1 };
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                <Text style={{fontSize: 60, color: 'white'}}>Profile</Text>
            </View>
        )
    }

    renderNearby = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
                <Text style={{fontSize: 60, color: 'white'}}>Nearby</Text>
            </View>
        )
    }

    render() {
        const { swiper } = this.refs
        return (
            <View style={{flex:1}}>
                <Swiper loop={false} index={this.state.index} ref="swiper">
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
        flex: 1, flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: 'center'
    },
    captureButton: {
        width: 70, height: 70,
        backgroundColor: '#F1F1F1', opacity: .8,
        borderWidth: 5, borderRadius: 42,
        borderColor: 'white', alignSelf: 'flex-end', 
     },
    swipeNav: {
        width: Dimensions.get('window').width, height: 50,
        flexDirection: 'row', justifyContent: 'space-around', 
        alignSelf: 'flex-end', position: 'absolute', bottom: 50,
    }
});