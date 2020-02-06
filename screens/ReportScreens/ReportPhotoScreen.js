import React from 'react';
import {  StyleSheet, Text, Image, View, ScrollView, Alert, SafeAreaView,
         ActionSheetIOS, Dimensions, TouchableOpacity, Permissions, Platform } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'
import Header from '../../components/Header';
import InfoMessage from '../../components/InfoMessage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';

export default class ReportScreen extends React.Component {
  state = { images: [], imageCount: 0 }

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
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      this.setState((state) => {
        const images = state.images.concat(result['base64'])
        return {
          images: images
        }
      });
    }
  };

  _takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      this.setState((state) => {
        const images = state.images.concat(result['base64'])
        return {
          images: images
        }
      });
    }
  }

  photoAlert = () => {
    if (Platform.OS == 'android') {
      Alert.alert('Get a photo from...','', [
        {text: 'Camera', onPress: () => this._takePhoto()},
        {text: 'Take from Libary', onPress: () => this._pickImage()},
        {text: 'Cancel', style: 'cancel',}
      ])
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Take from Libaray'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            this._takePhoto()
          } else if (buttonIndex === 2) {
            this._pickImage()
          }
        },
      );
    }
  }

  removeImage = (index) => {
    this.setState((state) => {
      const images = state.images.filter((item, j) => index !== j);
      return {
        images: images
      }
    })
  }

  createReport = ({ location, details, magisterialDistrict, priority }) => {
    createReport(location, details, magisterialDistrict, priority);
  }
  
  handleSubmit = (values) => {
     console.log(values);
  }

  renderImages = () => {
    if (this.state.images.length > 0) {
      return this.state.images.map((photo, index) => {
        return (
          <View style={styles.imageWrapper}>
            <Image source={{ isStatic: true, uri: 'data:image/jpeg;base64,'+photo, }} style={styles.image}/>
            <View style={styles.imageDeleteContainer}>
                <TouchableOpacity style={styles.imageDelete} onPress={() => this.removeImage(index)}>
                  <AntDesign name="delete" size={25} color={'white'}/>
                </TouchableOpacity>
              </View>
          </View>
        )
      });
    } else {
      return (
        <View>
          <Image 
            style={styles.imagesPlaceholder} 
            source={require("../../assets/images/placeholder-dark.jpg")} />
        </View>
      )
    }
  }

  render() {
    const { navigation } = this.props
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Photos" {...this.props}
              navTitleOne="Home" navTitleTwo="Next"
              navActionOne={() => navigation.navigate('Home')} 
              navActionTwo={() => navigation.navigate('Location')}/>
            <InfoMessage message="Include a photo of the incident"/>
            <ScrollView 
              contentContainerStyle={styles.images} 
              horizontal={true} decelerationRate={0}
              snapToInterval={310} snapToAlignment={"center"}>
              {this.renderImages()}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={this.photoAlert}>
              <Text style={{fontSize: 25, color: 'white'}}>Add Photo</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    paddingTop: 20, paddingBottom: 80,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  images: {
    height: hp('55%'),
    minWidth: Dimensions.get('window').width,
    marginTop: hp('1%'),
    alignItems: 'center', justifyContent: 'center',
  },
  imageWrapper: {
    height: 400, width: 350,
    backgroundColor: '#333',
    borderRadius: 20, margin: 10,
    position: 'relative'
  },
  image: {
    height: 400, width: 350,
    borderRadius: 20,
  },
  imageDelete: {
    width: 40, height: 40,
    backgroundColor: '#FF5733',
    borderRadius: 42,
    justifyContent: "center", alignItems: "center"
  },
  imageDeleteContainer: {
    position: 'absolute', right: -6, top: -6, zIndex: 10
  },
  button: {
    width: 350, height: 50,
    borderRadius: 42, borderWidth: 2, borderColor: '#E9E9E9',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: hp('15%')
  },
  imagesPlaceholder: {
    height: 400, width: 350,
    backgroundColor: '#999',
    borderRadius: 20, margin: 10,
    justifyContent: 'center', alignItems: 'center'
  }
});

ReportScreen.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <View style={{width: 55, height: 55, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#33C7FF':'#FFE633'}}>
      <Entypo name="camera" size={30} color={focused ? '#FFF': '#777'}/>
    </View>
  ),
  tabBarLabel:() => {return null},
};
