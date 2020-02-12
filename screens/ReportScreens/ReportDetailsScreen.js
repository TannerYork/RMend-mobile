import React from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, 
        TouchableOpacity, TextInput, View, SafeAreaView} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
 
class ReportDetailsScreen extends React.Component {
  
    render() {
      const { navigation } = this.props;
      return (
        <SafeAreaView style={styles.container}>
          <Header title="Details" {...this.props}
            navTitleOne="Home" navTitleTwo="Next"
            navActionOne={() => navigation.navigate('Home')}
            navActionTwo={() => navigation.navigate('Send')}/>
          <Text style={styles.header}>Incident Type</Text>
          <TouchableOpacity style={styles.selector}>
              <Text style={styles.selectorText}>Select the incident type</Text>
              <MaterialIcons name="navigate-next" size={25} color="#FFF"/>
          </TouchableOpacity>
          <Text style={styles.header}>Details</Text>
          <TextInput style={styles.details} placeholder="Enter a description of the incident" placeholderTextColor = "#EEE" multiline/>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: '#000',
      height: Dimensions.get('window').height
    },
    header: {
        width: Dimensions.get('window').width, 
        fontSize: 25, color: Colors.mainText,
        paddingLeft: 10, paddingBottom: 5,
        marginTop: 30, fontWeight: 'bold'
    },
    selector: {
        width: Dimensions.get('window').width, height: 75,
        backgroundColor: '#333',
        flexDirection: 'row', justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectorText: {
        fontSize: 25, color: '#FFF'
    },
    details: {
        width: Dimensions.get('window').width, height: 100,
        backgroundColor: '#333', padding: 10,
        color: '#FFF', fontSize: 20
    }
});

ReportDetailsScreen.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <View style={{width: 55, height: 55, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#33C7FF':'#FFE633'}}>
            <AntDesign name="profile" size={30} color={focused?"#FFF":'#666'} />
        </View>
    ),
    tabBarLabel:() => {return null},
};

export default ReportDetailsScreen;