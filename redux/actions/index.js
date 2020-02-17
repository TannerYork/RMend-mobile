import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_INFO,
  RESET_REPORT
} from './types';

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
