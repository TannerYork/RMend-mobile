import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'react-native-elements'
import { SafeAreaView, View, Text } from 'react-native';


import styles from '../styles/StyleSheet';
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage';
import { createUserWithEmailAndPassword } from '../config/FirebaseApp';

export default class SignInScreen extends React.Component {
  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      createUserWithEmailAndPassword(values.email, values.password).then((results) => {
        if (results.error) alert(results.error);
        if (!results.error) this.props.navigation.navigate('Camera');
      }).catch((err) => { alert(err.message); })
    }
  }

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Sign Up</Text>
          <Formik
            initialValues={{ email: '', password: '', confirmPass: '' }}
            onSubmit={values => { this.handleSubmit(values)}}
            validationSchema={validationSchema}>
            {({ handleBlur, handleChange, handleSubmit, values, isValid, errors, touched }) => (
              <View>
                <FormInput
                  name="name"
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  placeholder="Enter Name"
                  autoCapitalize="none" />
                <ErrorMessage errorValue={touched.name && errors.name} />
                <FormInput
                  name="email"
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  placeholder="Enter email"
                  autoCapitalize="none" />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="password"
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  placeholder="Enter password"
                  secureTextEntry />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormInput
                  name="confirmPass"
                  value={values.confirmPass}
                  onBlur={handleBlur('confirmPass')}
                  onChangeText={handleChange('confirmPass')}
                  placeholder="Confrim Password"
                  secureTextEntry />
                <ErrorMessage errorValue={touched.confirmPass && errors.confirmPass} />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="CREATE"
                    buttonColor="#039BE5" 
                    disabled={!isValid} />
                </View>
              </View>
            )}
          </Formik>
          <Button
            title="Already have an account? Sign In"
            onPress={() => this.props.navigation.navigate('SignIn')}
            titleStyle={{ color: '#F57C00' }}
            type="clear"
          />
        </SafeAreaView>
    );
  }
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
})

SignInScreen.navigationOptions = {
  title: 'SignIn',
};
