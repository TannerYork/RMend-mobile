import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_INFO,
  RESET_REPORT,
  START_UPLOAD,
  SIGN_IN,
  SIGN_OUT,
  GET_USER_INFO
} from './types';
import { firebaseApp } from '../../config/FirebaseApp.js';

export const addImage = base64 => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    payload: base64
  });
};

export const removeImage = imageIndex => dispatch => {
  dispatch({
    type: REMOVE_IMAGE,
    payload: imageIndex
  });
};

export const updateLocation = location => dispatch => {
  dispatch({
    type: UPDATE_LOCATION,
    payload: location
  });
};

export const updateDetails = details => dispatch => {
  dispatch({
    type: UPDATE_DETAILS,
    payload: details
  });
};

export const updateInfo = info => dispatch => {
  dispatch({
    type: UPDATE_INFO,
    payload: info
  });
};

export const resetReport = () => dispatch => {
  dispatch({
    type: RESET_REPORT,
    payload: null
  });
};

export const startUpload = () => dispatch => {
  dispatch({ type: START_UPLOAD });
};

export const getUserInfo = () => async dispatch => {
  const { displayName, email } = firebaseApp.auth().currentUser;
  const idTokenResult = await firebaseApp.auth().currentUser.getIdTokenResult(true);
  const authCode = await idTokenResult.claims.authCode;
  dispatch({ type: GET_USER_INFO, payload: { displayName, email, authCode } });
};

export const userSignedIn = () => async dispatch => {
  dispatch({ type: SIGN_IN });
  dispatch(getUserInfo());
};

export const userSignedOut = () => dispatch => {
  dispatch({ type: SIGN_OUT });
};
