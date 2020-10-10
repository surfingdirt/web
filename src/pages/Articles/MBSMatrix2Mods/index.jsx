import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Paragraph from 'Components/Widgets/Paragraph';
import Date from 'Components/Widgets/Date';
import Translate from 'Hocs/Translate';
import Cover from 'Images/articles/mbs-matrix-2-mods/cover.jpg';
import MBSTopPlate from 'Images/articles/mbs-matrix-2-mods/mbs-top-plate.jpg';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { HERO, STANDARD } = cardTypes;
const NAV = {
  ALBUM: 'article-album',
  INSTRUCTIONS: 'article-instructions',
  INTERVIEW: 'article-interview',
};

const MBSMatrix2Mods = ({ locale, t }) => {
  const { baseUrl } = useContext(AppContext);
  const coverImgSrc = `${baseUrl}/${Cover}`;
  const MBSTopPlateSrc = `${baseUrl}/${MBSTopPlate}`;
  const title = t('title');
  const description = t('description');
  const date = '2020-10-10';
  const albumId = '22325bb5-259c-44fd-9a3c-773833851346';
  const interviewer = 'Surfing Dirt';
  const interviewee = 'Leon';
  const items = [['qa1', 'qa2'], ['qa3', 'qa4'], ['qa5', 'qa6'], ['qa7', 'qa8'], ['qa9', 'qa10']];
  const tips = ['tip1', 'tip2', 'tip3', 'tip4'];

  const { data, error, loading } = useQuery(ALBUM_WITH_MEDIA, {
    variables: {
      id: albumId,
      startItem: 0,
      countItems: 10,
    },
  });
  let albumContent;
  if (loading || error) {
    albumContent = null;
  } else {
    const { album } = data;
    albumContent = <AlbumPreview id={NAV.ALBUM} album={album} className={styles.card} />;
  }

  const cover = <img src={coverImgSrc} alt={t('coverAlt')} className={styles.coverImage} />;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:description" content={description} />
        <meta property="description" content={description} />
        <meta property="og:image" content={coverImgSrc} />
      </Helmet>

      <Card type={HERO} heroContent={cover} className={styles.card}>
        <div className={styles.intro}>
          <div className={styles.metadata}>
            <Paragraph className={styles.description}>{description}</Paragraph>
            <Paragraph withDropCap>{t('articleIntro1')}</Paragraph>
            <Paragraph>{t('articleIntro2')}</Paragraph>
          </div>
          <div className={styles.navWrapper}>
            <Date className={styles.date} date={date} locale={locale} />
            <p>{t('tableOfContents')}</p>
            <nav>
              <ol>
                <li>
                  <a href={`#${NAV.ALBUM}`}>Photos & videos</a>
                </li>
                <li>
                  <a href={`#${NAV.INSTRUCTIONS}`}>Instructions</a>
                </li>
                <li>
                  <a href={`#${NAV.INTERVIEW}`}>The full story</a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </Card>

      {albumContent}

      <Card
        type={STANDARD}
        id={NAV.INSTRUCTIONS}
        title={t('instructionsTitle')}
        className={styles.card}
      >
        <ol>
          <li>
            <Paragraph>{t('step1')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step2')}</Paragraph>
            <img src={MBSTopPlateSrc} alt={t('topPlate')} />
          </li>
          <li>
            <Paragraph>{t('step3')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step4')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step5')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step6')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step7')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step8')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step9')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step10')}</Paragraph>
          </li>
          <li>
            <Paragraph>{t('step11')}</Paragraph>
          </li>
        </ol>

        <Paragraph>{t('tipsIntro')}</Paragraph>
        <ul>
          {tips.map((tip) => (
            <li key={tip}>
              <Paragraph>{t(tip)}</Paragraph>
            </li>
          ))}
        </ul>

        <Paragraph>
          <span className={styles.important}>
            {t('important')}
            {': '}
          </span>
          <span>{t('importantMsg')}</span>
        </Paragraph>
      </Card>

      <Card type={STANDARD} id={NAV.INTERVIEW} title={t('qaTitle')} className={styles.card}>
        <Paragraph className={styles.firstParagraph}>{t('qaIntro1')}</Paragraph>
        <dl className={classnames(styles.paragraph, styles.limited, styles.qa)}>
          {items.map(([question, answer], index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              <dt className={styles.message}>
                <span className={styles.attribution}>{interviewer}</span>
                <span className={styles.content}>{t(question)}</span>
              </dt>
              <dd className={styles.message}>
                <span className={styles.attribution}>{interviewee}</span>
                <span className={styles.content}>{t(answer)}</span>
              </dd>
            </Fragment>
          ))}
        </dl>
      </Card>
    </>
  );
};

MBSMatrix2Mods.propTypes = {
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MBSMatrix2Mods);
