import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const KeepOnTrucking = ({ t }) => {
  const { baseUrl } = useContext(AppContext);
  const title = t('title');
  const description = t('description');
  const image = '';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:description" content={description} />
        <meta property="description" content={description} />
        <meta property="og:image" content={`${baseUrl}${image}`} />
      </Helmet>

      <Card type={STANDARD} title={title}>
        <p>Static content</p>
      </Card>
    </>
  );
};
KeepOnTrucking.propTypes = { t: PropTypes.func.isRequired };
export default Translate(messages)(KeepOnTrucking);
