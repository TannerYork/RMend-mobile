import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../components/Header';

export default class ReportSendScreen extends React.Component {
  
    render() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Header title="Send" navTitleOne="Home" navTitleTwo="Prev" {...this.props}/>
          <Text style={styles.header}>Send</Text>
          {/* <TouchableOpacity style={styles.map}/>
          <ErrorMessage errorValue={touched.Send && errors.Send} /> */}
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
      padding: 20,
      alignItems: 'center'
    },
    button: {
      width: 300, height: 60,
      marginTop: 10,
  
      borderRadius: 42,
      borderWidth: 2,
      borderColor: '#E9E9E9',
  
      justifyContent: 'center',
      alignItems: 'center'
    }
});

ReportSendScreen.navigationOptions = {
  tabBarIcon: ({focused}) => (
    <View style={{width: 50, height: 50, borderRadius: 42, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? '#33C7FF':'#FFE633'}}>
        <FontAwesome name="send" size={30} color={focused?"#777":'#666'} />
    </View>
  ),
  tabBarLabel: () => {return null},
};
