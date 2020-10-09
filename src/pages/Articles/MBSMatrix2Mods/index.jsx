import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import AlbumGrid from 'Components/Media/Layouts/AlbumGrid';
import Card, { cardTypes } from 'Components/Widgets/Card';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Date from 'Components/Widgets/Date';
import Translate from 'Hocs/Translate';
import Leon from 'Images/articles/keep-on-trucking/leon-dove.jpg';
import Cover from 'Images/articles/keep-on-trucking/cover.jpg';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { HERO, STANDARD } = cardTypes;

const MBSMatrix2Mods = ({ locale, t }) => {
  const { baseUrl } = useContext(AppContext);
  const title = t('title');
  const description = t('description');
  const date = '2020-10-04';
  const albumId = '22325bb5-259c-44fd-9a3c-773833851346';

  const interviewer = 'Surfing Dirt';
  const interviewee = 'Leon';
  const items = [['qa1', 'qa2'], ['qa3', 'qa4'], ['qa5', 'qa6'], ['qa7', 'qa8'], ['qa9', 'qa10']];

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
    albumContent = <AlbumPreview album={album} className={styles.card} />;
  }

  const cover = (
    <img src={`${baseUrl}${Cover}`} alt={t('coverAlt')} className={styles.coverImage} />
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:description" content={description} />
        <meta property="description" content={description} />
        <meta property="og:image" content={Cover} />
      </Helmet>

      <Card type={HERO} heroContent={cover} className={styles.card}>
        <div className={styles.intro}>
          <Date className={styles.date} date={date} locale={locale} />
          <p className={styles.description}>{description}</p>
          <p>{t('articleIntro1')}</p>
          <p>{t('articleIntro2')}</p>
        </div>
      </Card>

      {albumContent}

      <Card type={STANDARD} title={t('qaTitle')} className={styles.card}>
        <p className={styles.firstParagraph}>{t('qaIntro1')}</p>

        <details>
          <summary className={styles.summary}>{t('qaMore')}</summary>
          <dl className={styles.qa}>
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
        </details>
      </Card>

      <Card type={STANDARD} title={t('instructionsTitle')} className={styles.card}>
        <p className={styles.firstParagraph}>{t('instructionsIntro')}</p>
      </Card>
    </>
  );
};

MBSMatrix2Mods.propTypes = {
  locale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MBSMatrix2Mods);
