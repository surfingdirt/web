/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Card, { cardTypes } from 'Components/Widgets/Card';
import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

const FORUM_URL = 'https://www.surfingdirt.com/forum';

class OldForumRaw extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>{t('title')}</title>
        </Helmet>

        <Card type={STANDARD} title={t('title')}>
          <div className={styles.content}>
            <Paragraph withDropCap>{t('paragraph1')}</Paragraph>
            <Paragraph>{t('paragraph2')}</Paragraph>
            <Paragraph>{t('paragraph3')}</Paragraph>

            <a href={FORUM_URL} target="_blank">
              {t('go')}
            </a>
          </div>
        </Card>
      </Fragment>
    );
  }
}

export const OldForum = Translate(messages)(OldForumRaw);
