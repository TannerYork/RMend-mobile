import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_INFO,
  REST_FORM
} from '../actions/types';

const INITIAL_STATE = {
  images: [],
  location: '',
  details: { type: '', details: '' },
  info: { name: '', email: '', phoneNumber: '' }
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case REST_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reportReducer;
