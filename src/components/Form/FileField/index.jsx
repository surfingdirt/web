import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import InputField from 'Components/Form/InputField';

const FileField = ({ id, label, name, onChange }) => {
  const attrs = { id, label, name, onChange };
  return <Field allowNull={false} component={InputField} type="file" {...attrs} />;
};

FileField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

FileField.defaultProps = {
  onChange: null,
};

export default FileField;
