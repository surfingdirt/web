import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import AlbumCreationForm from 'Components/Album/CreationForm';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

class NewAlbumRaw extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <Card title={t('albumCreationPage')} type={STANDARD} className={styles.page}>
        <AlbumCreationForm />
      </Card>
    );
  }
}

export const NewAlbum = Translate(messages)(NewAlbumRaw);
