import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import InputField from 'Components/Form/InputField';

const FileField = (props) => {
  const { allowNull, id, label, name, onChange } = props;
  const attrs = { id, label, name, onChange };
  return <Field allowNull={allowNull} component={InputField} type="file" {...attrs} />;
};

FileField.propTypes = {
  allowNull: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

FileField.defaultProps = {
  allowNull: false,
  onChange: null,
};

export default FileField;
