import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Heading, { headingTypes } from 'Components/Widgets/Heading';
import Logo, { logoTypes } from 'Components/Widgets/Logo';
import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const { PRIMARY, SECONDARY } = headingTypes;
const { NO_TEXT } = logoTypes;

const DiscoverHeader = ({ t }) => (
  <Fragment>
    <div className={styles.coverCard}>
      <Heading type={PRIMARY} className={styles.title}>
        {t('title')}
      </Heading>
      <Logo type={NO_TEXT} className={styles.splashLogo} title="" />
      <div className={styles.coverImage} />
    </div>
    <div>
      <details className={styles.intro}>
        <summary className={styles.introSummary}>
          <Paragraph className={styles.introParagraph} dataContent={t('more')}>
            {t('paragraph1a')}
          </Paragraph>
        </summary>

        <Paragraph withDropCap className={styles.columns}>
          {t('paragraph1b')}
        </Paragraph>

        <Heading type={SECONDARY} className={styles.title2}>
          {t('title2')}
        </Heading>
        <Paragraph className={styles.columns}>{t('paragraph2')}</Paragraph>

        <Heading type={SECONDARY}>{t('title3')}</Heading>
        <Paragraph className={styles.columns}>{t('paragraph3')}</Paragraph>
      </details>
    </div>
  </Fragment>
);

DiscoverHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(DiscoverHeader);
