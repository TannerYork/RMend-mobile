import { StyleSheet, Text, Image, View, ScrollView, Alert, SafeAreaView } from 'react-native';
import { ActionSheetIOS, Dimensions, TouchableOpacity, Permissions, Platform } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Header from '../../components/Header';
import InfoMessage from '../../components/InfoMessage';
import { addImage, removeImage, resetReport } from '../../redux/actions';
const imagesPlaceholder = '../../assets/images/placeholder-dark.jpg';

class ReportScreen extends React.Component {
  state = { images: [], imageCount: 0, ready: false };

  async componentWillUnmount() {
    console.log('Unmount Report');
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    const { addImage } = this.props;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!result.cancelled) {
      addImage(result.uri);
    }
  };

  _takePhoto = async () => {
    const { addImage } = this.props;
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      // addImage(result.base64);
    }
  };

  photoAlert = () => {
    if (Platform.OS == 'android') {
      Alert.alert('Get a photo from...', '', [
        { text: 'Camera', onPress: () => this._takePhoto() },
        { text: 'Take from Libary', onPress: () => this._pickImage() },
        { text: 'Cancel', style: 'cancel' }
      ]);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Take from Libaray'],
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this._takePhoto();
          } else if (buttonIndex === 2) {
            this._pickImage();
          }
        }
      );
    }
  };

  render() {
    const { navigation, images, removeImage } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Photos"
          {...this.props}
          navTitleOne="Home"
          navTitleTwo="Next"
          navActionOne={() => {
            this.props.resetReport();
            navigation.navigate('Home');
          }}
          navActionTwo={() => navigation.navigate('Location')}
        />
        <InfoMessage message="Include a photo of the incident" />
        <ScrollView
          contentContainerStyle={styles.images}
          horizontal={true}
          directionalLockEnabled={false}
          decelerationRate={0}
          snapToAlignment={'center'}
        >
          {images.length < 1 && (
            <View>
              <Image style={styles.image} source={require(imagesPlaceholder)} />
            </View>
          )}
          {images.map((image, index) => {
            return (
              <View style={styles.imageWrapper} key={index}>
                <Image source={{ isStatic: true, uri: image }} style={styles.image} />
                <View style={styles.imageDeleteContainer}>
                  <TouchableOpacity style={styles.imageDelete} onPress={() => removeImage(index)}>
                    <AntDesign name="delete" size={wp('5%')} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={this.photoAlert}>
          <Text style={{ fontSize: wp('8%'), color: 'white' }}>Add Photo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    paddingTop: 20,
    paddingBottom: 80,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  images: {
    height: hp('50%'),
    minWidth: wp('100%'),
    marginTop: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrapper: {
    height: hp('50%'),
    width: wp('70%'),
    backgroundColor: '#333',
    borderRadius: 20,
    margin: 10,
    position: 'relative'
  },
  image: {
    height: hp('50%'),
    width: wp('70%'),
    borderRadius: 20
  },
  imageDelete: {
    width: wp('10%'),
    height: wp('10%'),
    backgroundColor: '#FF5733',
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageDeleteContainer: {
    position: 'absolute',
    right: wp('-2%'),
    top: wp('-2%'),
    zIndex: 10
  },
  button: {
    width: wp('70%'),
    height: hp('8%'),
    borderRadius: 42,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('15%')
  }
});

const mapStateToProps = ({ report }) => {
  return {
    images: report.images
  };
};
export default connect(mapStateToProps, { addImage, removeImage, resetReport })(ReportScreen);
