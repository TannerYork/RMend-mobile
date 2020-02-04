import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, 
        Dimensions, TextInput, View, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header';

export default class ReportLocationScreen extends React.Component {
  
    render() {
      const { navigation } = this.props
      return (
        <SafeAreaView style={styles.scrollContainer}>
          <Header title="Location" {...this.props} 
            navTitleOne="Home" navTitleTwo="Next"
            navActionOne={() => navigation.navigate('Home')}
            navActionTwo={() => navigation.navigate('Details')}/>
          <TextInput style={styles.textInput} placeholder="Enter a location close to you"
                placeholderTextColor="#888"/>
          <TouchableOpacity style={styles.map}/>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#000'
    },
    map: {
      height: Dimensions.get('window').height, width: Dimensions.get('window').width,
      backgroundColor: '#545454', marginTop: 10
    },
    textInput: {
      width: Dimensions.get('window').width - 50,
      backgroundColor: '#545454',
      borderRadius: 20, padding: 10, paddingLeft: 20
    }
  });

ReportLocationScreen.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <View style={{width: 55, height: 55, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#33C7FF':'#FFE633'}}>
        <MaterialIcons name="location-on" size={30} color={focused?"#FFF":'#666'} />
    </View>
  ),
  tabBarLabel:() => {return null},
};
