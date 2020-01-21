import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button, Image } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default class ReportScreen extends React.Component {
  
  render() {
    const { photo } = this.props.navigation.state.params;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{ isStatic: true, uri: 'data:image/jpeg;base64,'+photo.base64, }}
          style={styles.image}/>
        <Text style={styles.header}>Location</Text>
        <TouchableOpacity style={styles.map}/>
        <Text style={styles.header}>Details</Text>
        <TextInput style={styles.textInput} placeholder="Description of issue" multiline/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    color: Colors.mainText,
    textAlign: 'left',
    width: 300
  },
  image: {
    height: 300, width: 300,
    borderRadius: 20,
  },
  map: {
    height: 150, width: 300,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    marginTop: 10
  },
  textInput: {
    flexWrap: 'wrap',
    width: 300,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 70
  }
})

ReportScreen.navigationOptions = {
  title: 'Report',
};
