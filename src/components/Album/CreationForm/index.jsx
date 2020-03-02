import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router';

import CREATE_ALBUM_MUTATION from 'Apollo/mutations/createAlbum3.gql';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import { actionRoute, albumRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';
import classnames from 'classnames';

const { ALBUM_NEW } = actions;
const { ACTION } = buttonTypes;

class AlbumCreationForm extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      displayError: null,
      redirectTo: null,
    };

    this.formRef = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  async onSubmit(mutate, rawInput) {
    const { locale } = this.context;

    const input = Object.assign({}, rawInput, {
      albumContributions: rawInput.albumContributions,
      albumVisibility: rawInput.albumVisibility,
      description: { text: rawInput.description.text, locale },
      title: { text: rawInput.title.text, locale },
    });
    const response = await mutate({ variables: { input } });
    const { id } = response.data.createAlbum;

    this.setState({
      redirectTo: albumRoute(id),
    });
  }

  async validate(values) {
    const { t } = this.props;

    const errors = {};
    if (!values.title) {
      errors.title = t('required');
    }

    return errors;
  }

  render() {
    const { redirectTo } = this.state;
    const { t } = this.props;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Mutation
        mutation={CREATE_ALBUM_MUTATION}
        onCompleted={() => {
          this.setState({ displayError: null });
        }}
        onError={({ ...rest }) => {
          console.error('Error', rest);
          this.setState({ displayError: t('backendError') });
        }}
      >
        {(mutate) => (
          <Form
            onSubmit={(values) => {
              return this.onSubmit(mutate, values);
            }}
            validate={this.validate}
            render={({ handleSubmit, invalid, submitting, submitError }) => {
              const { displayError } = this.state;
              const errorMessage = submitError || displayError;
              return (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  action={actionRoute(ALBUM_NEW)}
                  method="POST"
                  encType="multipart/form-data"
                  ref={this.formRef}
                >
                  <p
                    className={classnames(styles.error, { [styles.visibleError]: !!errorMessage })}
                  >
                    {errorMessage}
                  </p>
                  <Field
                    name="title[text]"
                    id="title"
                    component={InputField}
                    type="text"
                    label={t('title')}
                    placeholder={t('titlePlaceholder')}
                  />
                  <Field
                    className={styles.description}
                    name="description[text]"
                    id="description"
                    component={InputField}
                    type="textarea"
                    label={t('description')}
                    placeholder={t('descriptionPlaceholder')}
                    required={false}
                  />

                  <details className={styles.advancedWrapper}>
                    <summary className={styles.advancedSummary}>{t('advanced')}</summary>
                    <div>
                      <Field
                        name="albumVisibility"
                        id="albumVisibility"
                        component={InputField}
                        type="albumVisibility"
                        label={t('albumVisibility')}
                        required
                      />
                      <p>{t('albumVisibilityNote')}</p>
                      <ul>
                        <li>{t('albumVisibilityNote1')}</li>
                        <li>{t('albumVisibilityNote2')}</li>
                        <li>{t('albumVisibilityNote3')}</li>
                      </ul>
                      <Field
                        name="albumContributions"
                        id="albumContributions"
                        component={InputField}
                        type="albumContributions"
                        label={t('albumContributions')}
                        required
                      />
                      <p>{t('albumContributionsNote')}</p>
                    </div>
                  </details>

                  <div className={styles.buttons}>
                    <Button
                      buttonType="submit"
                      label={t('create')}
                      disabled={submitting || invalid}
                      loading={submitting}
                      type={ACTION}
                    />
                  </div>
                </form>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}

export default Translate(messages)(AlbumCreationForm);
