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
import { firebaseApp, signOut, updateProfile } from '../../config/FirebaseApp';
import { connect } from 'react-redux';
import { getUserInfo, userSignedOut } from '../../redux/actions';

class ProfileScreen extends React.Component {
  state = { displayName: null, email: null, phoneNumber: null, authCode: '' };
  navigationListener = null;

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    this.navigationListener = navigation.addListener('willFocus', async () => {
      if (firebaseApp.auth().currentUser !== null) {
        if (this.state.displayName === null) {
          await this.props.getUserInfo();
          this.setState(this.props.user);
        }
      }
    });
  }

  componentWillUnmount() {
    this.navigationListener.remove();
  }

  signUserOut = () => {
    signOut();
    this.props.userSignedOut();
    this.setState({ displayName: null, email: null, phoneNumber: null, authCode: '' });
    // Auth when authentication is prompted from profile screen
    // this.props.navigation.navigate('Auth')
    this.props.navigation.navigate('SignIn');
  };

  handleSignInOutPress = () => {
    const { navigate } = this.props.navigation;
    if (firebaseApp.auth().currentUser != null) {
      this.signUserOut();
    }
    navigate('Auth');
  };

  updateProfileAlert = () => {
    Alert.alert('Are you sure you want to make these changes?', 'Changes can be made latter.', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => this.setState(this.props.user)
      },
      { text: 'Ok', onPress: () => this.updateProfile() }
    ]);
  };

  updateProfile = async () => {
    if (firebaseApp.auth().currentUser != null) {
      const { displayName, email } = this.state;
      const validEmailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const shouldUpdateAuthCode = this.props.user.authCode == this.state.authCode ? false : true;
      let errors = {};
      if (!displayName) {
        errors.displayName = 'Name is required';
      }
      if (!email || email.match(validEmailReg) == null) {
        errors.email = 'Email is required';
      }
      if (Object.values(errors).length > 0) {
        Alert.alert(
          'A Required Field Is Missing',
          'Check that your have filled out the name and email, and that you have entered a valid email.',
          [{ text: 'Ok', style: 'cancel' }]
        );
      } else {
        if (shouldUpdateAuthCode) {
          await Alert.alert(
            'Sign Out Required',
            'Updating your authority code requires you to sign out.',
            [
              { text: 'Cancel', style: 'cancel', onPress: () => this.setState(this.props.user) },
              {
                text: 'Ok',
                onPress: async () => {
                  await updateProfile(this.state, true);
                  this.signUserOut();
                }
              }
            ]
          );
        } else {
          await updateProfile(this.state, false);
          await this.props.getUserInfo();
          this.setState(this.props.user);
        }
      }
    } else {
      Alert.alert('You need to be signed in to update information', '', [{ text: 'Okay' }]);
    }
  };

  render() {
    const { displayName, email, phoneNumber, authCode } = this.state;
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
              value={displayName}
              onChangeText={text => this.setState({ displayName: text })}
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
          {/* <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={text => this.setState({ phoneNumber: text })}
              placeholder="Optional"
              placeholderTextColor="#555"
            />
          </View> */}
          <View style={styles.inputWrapper}>
            <Text style={{ ...styles.inputLabel, width: wp('35%') }}>Authority Code</Text>
            <TextInput
              style={{ ...styles.input, width: wp('45%') }}
              value={authCode}
              onChangeText={text => this.setState({ authCode: text })}
              placeholder="Optional"
              placeholderTextColor="#555"
            />
          </View>
          {/* <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput style={styles.input} />
          </View> */}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => this.updateProfileAlert()}>
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
              Save Changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.handleSignInOutPress()}>
            <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
              {firebaseApp.auth().currentUser != null ? 'Sign Out' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { getUserInfo, userSignedOut })(ProfileScreen);

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
    marginTop: hp('10%'),
    alignItems: 'center'
  },
  button: {
    width: wp('90%'),
    height: hp('7%'),
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#ff6a30'
  }
});
