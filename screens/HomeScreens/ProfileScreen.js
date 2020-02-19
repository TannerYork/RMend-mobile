import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { firebaseApp, signOut } from '../../config/FirebaseApp';

export default class ProfileScreen extends React.Component {
  componentWillMount() {
    const { displayName, email, phoneNumber } = firebaseApp.auth().currentUser;
    this.setState({ name: displayName, email: email, phone: phoneNumber });
  }

  updateProfile = () => {
    const { currentUser } = firebaseApp.auth();
    const { name, email, phone } = this.state;
    let errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (Object.values(errors).length > 0) {
      Alert.alert(
        'A Required Field Is Missing',
        'Check that your have filled out the name and email, and that you hav eentered a valid email.',
        [{ text: 'Ok', style: 'cancel' }]
      );
    } else {
      currentUser.updateProfile({
        displayName: name,
        email: email,
        phoneNumber: phone
      });
    }
  };

  render() {
    const { name, email, phone } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => this.setState({ name: text })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={text => this.setState({ phone: text })}
            />
          </View>
          {/* <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput style={styles.input} />
          </View> */}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                'Are you sure you want to make these changes?',
                'Changes can be made latter.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Ok', onPress: () => this.updateProfile() }
                ]
              );
            }}
          >
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
              Save Changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signOut();
              navigate('SignIn');
            }}
          >
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black'
  },
  headerWrapper: {
    width: wp('100%'),
    height: hp('12%'),
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: wp('1%')
  },
  headerText: {
    color: 'white',
    fontSize: wp('10%'),
    fontWeight: 'bold'
  },
  inputs: {
    marginTop: hp('5%'),
    alignItems: 'center'
  },
  inputWrapper: {
    width: wp('90%'),
    height: hp('7%'),
    marginBottom: hp('3%'),
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 20,
    padding: wp('2%')
  },
  input: {
    width: wp('65%'),
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabel: {
    width: wp('20%'),
    fontSize: wp('5%'),
    color: '#666'
  },
  buttons: {
    marginTop: hp('20%'),
    alignItems: 'center'
  },
  button: {
    width: wp('70%'),
    height: hp('7%'),
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#ff6a30'
  }
});
