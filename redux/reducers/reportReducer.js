import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_LOCATION,
  UPDATE_DETAILS,
  UPDATE_INFO,
  RESET_REPORT,
  START_UPLOAD
} from '../actions/types';
import typeGroups from '../types';

const INITIAL_STATE = {
  images: [],
  location: { latitude: 37.78825, longitude: -122.4324 },
  details: { type: null, details: null, iconName: '' },
  typeGroups: typeGroups,
  info: { name: null, email: null, phoneNumber: null },
  isLoading: false
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
        details: action.payload
      };
    case UPDATE_INFO:
      return {
        ...state,
        info: action.payload
      };
    case START_UPLOAD:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default reportReducer;
