/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Heading, { headingTypes } from 'Components/Widgets/Heading/index';
import Logo, { logoTypes } from 'Components/Widgets/Logo';
import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PRIMARY } = headingTypes;
const { BIG_VERTICAL } = logoTypes;
const { BARE } = cardTypes;

class About extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const { title } = this.context;

    return (
      <Card type={BARE} negative>
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Logo title={title} type={BIG_VERTICAL} />
          </header>

          <div className={styles.content}>
            <Heading type={PRIMARY} className={styles.title}>
              {t('title')}
            </Heading>

            <section className={styles.section1}>
              <Paragraph withDropCap>{t('paragraph1')}</Paragraph>
              <Paragraph>{t('paragraph2')}</Paragraph>
              <Paragraph>{t('paragraph3')}</Paragraph>
            </section>

            <section className={styles.section2}>
              <Paragraph withDropCap>{t('paragraph4')}</Paragraph>
              <Paragraph>{t('paragraph5')}</Paragraph>
              <Paragraph>{t('paragraph6')}</Paragraph>
            </section>
          </div>
        </div>
      </Card>
    );
  }
}

export default Translate(messages)(About);
