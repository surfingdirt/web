/* eslint-disable import/prefer-default-export */

import Header from 'Components/Header';
import HeadMetaData from 'Components/HeadMetaData';
import PageContainer from 'Components/PageContainer';
import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';

const PrivacyPolicyPage = ({ match, t }) => {
  const DESCRIPTION = t('description');
  const PICTURE = 'picture';
  const NAME = t('name');
  const { url } = match;

  return (
    <PageContainer className="limitedWidthContent">
      <HeadMetaData description={DESCRIPTION} image={PICTURE} title={NAME} url={url} />
      <Header type="main">{t('privacyPolicy')}</Header>
    </PageContainer>
  );
};

PrivacyPolicyPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export const PrivacyPolicy = Translate(messages)(PrivacyPolicyPage);
