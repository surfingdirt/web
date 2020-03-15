import React from 'react';
import PropTypes from 'prop-types';

import ALBUM from 'Apollo/queries/album2.gql';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';
import AlbumEditForm from 'Components/Album/EditForm';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const AlbumEdit = (props) => {
  const { match, t } = props;
  const { id } = match.params;

  return (
    <DataRenderer
      query={ALBUM}
      variables={{ id }}
      render={(data) => {
        const { album } = data;

        return (
          <Card title={t('albumEditPage')} type={STANDARD} className={styles.page}>
            <AlbumEditForm album={album} />
          </Card>
        );
      }}
    />
  );
};

AlbumEdit.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumEdit);
