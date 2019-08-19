import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import VIDEO from 'Apollo/queries/video.gql';
import DataRenderer from 'Components/DataRenderer';
import Card, { cardTypes } from 'Components/Card';
import Translate from 'Hocs/Translate';

import { albumRoute, userRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';
import Paragraph from 'Components/Paragraph';

const { HERO } = cardTypes;

const VideoRaw = ({ match, t }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={VIDEO}
      variables={{ id }}
      render={(data) => {
        const {
          video: {
            description,
            embedUrl,
            title,
            submitter: { userId, username },
            width,
            height,
          },
        } = data;

        const wrapperStyle = {
          paddingTop: `${(100 * height) / width}%`,
        };
        const videoStyle = {};

        const heroContent = (
          <div className={styles.videoWrapper} style={wrapperStyle}>
            <iframe
              className={styles.video}
              style={videoStyle}
              title={t('videoContent')}
              src={embedUrl}
            />
          </div>
        );

        return (
          <Card title={title} type={HERO} heroContent={heroContent}>
            <div>
              {description && <Paragraph>{description}</Paragraph>}
              <span>Posted by:</span>
              <Link to={userRoute(userId)}>{username}</Link>
            </div>
          </Card>
        );
      }}
    />
  );
};

VideoRaw.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const Video = Translate(messages)(VideoRaw);
