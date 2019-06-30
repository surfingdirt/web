/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import Header, { headerTypes } from 'Components/Header';
import Paragraph from 'Components/Paragraph';
import Logo, { logoTypes } from 'Components/Logo';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { PRIMARY } = headerTypes;
const { BIG_VERTICAL } = logoTypes;

class AboutRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const { title } = this.context;

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logo title={title} type={BIG_VERTICAL} />
        </header>

        <div className={styles.content}>
          <Header type={PRIMARY} className={styles.title}>
            {t('title')}
          </Header>

          <section className={styles.section1}>
            <Paragraph widthDropCap>{t('paragraph1')}</Paragraph>
            <Paragraph>{t('paragraph2')}</Paragraph>
            <Paragraph>{t('paragraph3')}</Paragraph>
          </section>

          <section className={styles.section2}>
            <Paragraph widthDropCap>{t('paragraph4')}</Paragraph>
            <Paragraph>{t('paragraph5')}</Paragraph>
            <Paragraph>{t('paragraph6')}</Paragraph>
          </section>
        </div>
      </div>
    );
  }
}

export const About = Translate(messages)(AboutRaw);
