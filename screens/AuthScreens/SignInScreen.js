import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors';
import { signInWithEmailAndPassword } from '../../config/FirebaseApp';

export default class SignInScreen extends React.Component {
  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      signInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          alert(err.message);
        });
    }
  };

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>RMend</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            this.handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleBlur, handleChange, handleSubmit, values, isValid, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  name="email"
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  placeholder={touched.email && errors.email ? 'Email is required' : 'Enter Email'}
                  placeholderTextColor={touched.email && errors.email ? Colors.mainText : '#555'}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  name="password"
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  placeholder={
                    touched.password && errors.password ? 'Password is required' : 'Enter Password'
                  }
                  placeholderTextColor={
                    touched.password && errors.password ? Colors.mainText : '#555'
                  }
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('CreateUser')}
          titleStyle={{ color: Colors.mainText }}
          style={{ marginTop: hp('2%') }}
          type="clear"
        />
      </SafeAreaView>
    );
  };
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have at least 4 characters ')
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignContent: 'center'
  },
  title: {
    color: Colors.mainText,
    textAlign: 'center',
    fontSize: 80,
    fontWeight: 'bold',
    paddingTop: 130,
    justifyContent: 'center'
  },
  header: {
    color: Colors.mainText,
    textAlign: 'center',
    fontSize: wp('20%'),
    fontWeight: 'bold',
    paddingTop: hp('20%'),
    paddingBottom: hp('5%'),
    justifyContent: 'center'
  },
  form: {
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
    width: wp('62%'),
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'right'
  },
  inputLabel: {
    width: wp('23%'),
    fontSize: wp('5%'),
    color: '#666'
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

SignInScreen.navigationOptions = {
  title: 'SignIn'
};
