const validate = values => {
  const errors = {};
  if (values.images && values.images.length < 1) {
    errors.photos = 'One Photo is Required';
  }
  if (!values.location) {
    errors.location = 'Required';
  }
  if (!values.details.type) {
    errors.type = 'Required';
  }
  if (!values.info.authority) {
    errors.authority = 'Required';
  }
  if (!values.info.name) {
    errors.name = 'Required';
  }
  if (!values.info.email) {
    errors.email = 'Required';
  }
  return errors;
};

export default validate;
