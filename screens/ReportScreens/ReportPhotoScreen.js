import React from 'react';
import {  StyleSheet, Text, Image, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'
import Header from '../../components/Header';
import InfoMessage from '../../components/InfoMessage';

export default class ReportScreen extends React.Component {

  createReport = ({ location, details, magisterialDistrict, priority }) => {
    createReport(location, details, magisterialDistrict, priority);
  }

  handleSubmit = (values) => {
    console.log(values);
  }

  renderImages = () => {
    const images = []
    if (images.length > 0) {
      return images.forEach(photo => {
        return (
          <Image source={{ isStatic: true, uri: 'data:image/jpeg;base64,'+ photo.base64, }} style={styles.image}>
              <View style={styles.imageDeleteContainer}>
                <TouchableOpacity style={styles.imageDelete}>
                  <AntDesign name="delete" size={25} color={'white'}/>
                </TouchableOpacity>
              </View>
          </Image>
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
        <View style={styles.scrollContainer}>
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
            <TouchableOpacity style={styles.button}>
              <Text style={{fontSize: 25, color: 'white'}}>Add Photo</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get('window').height,
    paddingTop: 20, paddingBottom: 80,
    alignItems: 'center',
    backgroundColor: '#222'
  },
  images: {
    height: 500, minWidth: Dimensions.get('window').width,
    marginTop: 50,
    alignItems: 'center', justifyContent: 'center'
  },
  image: {
    height: 400, width: 300,
    backgroundColor: '#333',
    borderRadius: 20, margin: 10,
    position: 'relative'
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
    marginBottom: 40
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
    <View style={{width: 45, height: 45, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#33C7FF':'#FFE633'}}>
      <Entypo name="camera" size={30} color={focused ? '#666': '#777'}/>
    </View>
  ),
  tabBarLabel:() => {return null},
};
