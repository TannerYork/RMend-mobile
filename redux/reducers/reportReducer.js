import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_INFO,
  RESET_REPORT
} from '../actions/types';
import { actionTypes } from 'redux-form';

const INITIAL_STATE = {
  images: [],
  location: '',
  details: { type: '', details: '' },
  info: { name: '', email: '', phoneNumber: '' }
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_REPORT:
      return {
        ...INITIAL_STATE
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    case REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter((image, index) => index != action.payload)
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case UPDATE_DETAILS:
      return {
        ...state,
        detials: action.payload
      };
    case UPDATE_INFO:
      return {
        ...state,
        info: action.payload
      };
    default:
      return state;
  }
};

export default reportReducer;
