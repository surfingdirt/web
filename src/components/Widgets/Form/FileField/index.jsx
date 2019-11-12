import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import InputField from 'Components/Widgets/Form/InputField';

const FileField = (props) => {
  const { allowNull, className, id, label, name, onChange } = props;
  const attrs = { className, id, label, name, onChange };
  return <Field allowNull={allowNull} component={InputField} type="file" {...attrs} />;
};

FileField.propTypes = {
  allowNull: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

FileField.defaultProps = {
  allowNull: false,
  className: null,
  label: null,
  onChange: null,
};

export default FileField;
