import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Colors from '../../constants/Colors';
import { createUserWithEmailAndPassword } from '../../config/FirebaseApp';

export default class SignInScreen extends React.Component {
  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      createUserWithEmailAndPassword(values.email, values.password)
        .then(results => {
          if (results.error) alert(results.error);
          if (!results.error) this.props.navigation.navigate('Home');
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
          initialValues={{ email: '', password: '', confirmPass: '' }}
          onSubmit={values => {
            this.handleSubmit(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleBlur, handleChange, handleSubmit, values, isValid, errors, touched }) => (
            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  name="name"
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  placeholder={touched.name && errors.name ? 'Name is required' : 'Enter Name'}
                  placeholderTextColor={touched.name && errors.name ? Colors.mainText : '#555'}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
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
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  name="confirmPass"
                  value={values.confirmPass}
                  onBlur={handleBlur('confirmPass')}
                  onChangeText={handleChange('confirmPass')}
                  placeholder={
                    touched.confirmPass && errors.confirmPass
                      ? 'Passwords must match'
                      : 'Confrim Password'
                  }
                  placeholderTextColor={
                    touched.confirmPass && errors.confirmPass ? Colors.mainText : '#555'
                  }
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={{ fontSize: wp('6%'), color: 'white', fontWeight: 'bold' }}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignIn')}
          style={styles.link}
        >
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Please enter your full name'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have at least 4 characters '),
  confirmPass: Yup.string()
    .label('Confirm Password')
    .required()
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    })
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
    fontSize: wp('30%'),
    fontFamily: 'passion-one-regular',
    marginTop: hp('7%'),
    marginBottom: hp('5%'),
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
  },
  link: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: hp('3%')
  },
  linkText: {
    fontSize: wp('5%'),
    color: Colors.mainText
  }
});

SignInScreen.navigationOptions = {
  title: 'SignIn'
};
