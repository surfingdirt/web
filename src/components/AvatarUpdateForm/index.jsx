import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import Button from 'Components/Button';
import FileField from 'Components/Form/FileField';
import Translate from 'Hocs/Translate';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import messages from './messages';
import styles from './styles.scss';

const { AVATAR_UPDATE } = actions;

class AvatarUpdateForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFileChange(e) {
    console.log('onFileChange', e);
    // TODO: resize and possibly rotate the image on the fly.
  }

  onSubmit(e) {
    console.log('onSubmit', e);
    // TODO: add validation in some other method.
  }

  render() {
    const { t } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, submitting, submitError, errors }) => (
          <form
            onSubmit={handleSubmit}
            action={actionRoute(AVATAR_UPDATE)}
            method="POST"
            encType="multipart/form-data"
          >
            <FileField id="avatar" name="file" label={t('avatar')} onChange={this.onFileChange} />

            <Button
              buttonType="submit"
              label={t('update')}
              disabled={submitting}
              loading={submitting}
            />
          </form>
        )}
      />
    );
  }
}

export default Translate(messages)(AvatarUpdateForm);
