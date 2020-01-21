import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'react-native-elements'
import { SafeAreaView, View, Text } from 'react-native';


import styles from '../styles/StyleSheet';
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage';
import { signInWithEmailAndPassword } from '../config/FirebaseApp';

export default class SignInScreen extends React.Component {
  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      signInWithEmailAndPassword(values.email, values.password).then(() => {
        this.props.navigation.navigate('Camera');
      }).catch((err) => {
        alert(err.message);
      })
    }
  }

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Sign In</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => { this.handleSubmit(values)}}
            validationSchema={validationSchema}>
            {({ handleBlur, handleChange, handleSubmit, values, isValid, errors, touched }) => (
              <View>
                <FormInput
                  name="email"
                  value={values.email}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email"
                  autoCapitalize="none" />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="password"
                  value={values.password}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  placeholder="Enter password"
                  secureTextEntry />
                <ErrorMessage errorValue={touched.confirmPass && errors.confrimPass} />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="outline"
                    onPress={handleSubmit}
                    title="LOGIN"
                    buttonColor="#039BE5" 
                    disabled={!isValid} />
                </View>
              </View>
            )}
          </Formik>
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('CreateUser')}
            titleStyle={{ color: '#F57C00' }}
            type="clear"
          />
        </SafeAreaView>
    );
  }
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
})

SignInScreen.navigationOptions = {
  title: 'SignIn',
};
