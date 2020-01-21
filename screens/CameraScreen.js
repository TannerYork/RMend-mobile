import React from 'react';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Button, View, Text, 
        ActivityIndicator, TouchableOpacity } from 'react-native';

export default class CameraScreen extends React.Component {
    state = { hasPermission: null, type: Camera.Constants.Type.back };
    camera = null

    async componentDidMount() {
        this.askForPermission()
    }

    askForPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    takePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync({ quality: 1, base64: true, exif: true});
            console.log(photo)
            this.props.navigation.navigate('Report', {photo: photo});
        } else {
            alert("Camera is not connected yet. Please give the camera a moment to connect")
        }
    }
    
    render() {
        const { hasPermission, type } = this.state;
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
                <Camera style={{ flex: 1 }} type={type} ref={camera => this.camera = camera}>
                    <View style={styles.container}>
                        <TouchableOpacity 
                            style={styles.captureButton} 
                            onPress={this.takePhoto} />
                    </View>
              </Camera>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "center"
    },
    captureButton: {
        width: 70, height: 70,
        backgroundColor: '#F1F1F1',
        opacity: .8,

        borderWidth: 5,
        borderColor: 'white',
        
        alignSelf: 'flex-end',
        marginBottom: 50,
        borderRadius: 42,
    }
});