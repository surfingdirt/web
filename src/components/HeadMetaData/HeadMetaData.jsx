import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Translate from 'Hocs/Translate';
import { Helmet } from 'react-helmet';
import contexts from '~/contexts';

import messages from './messages';

const { AppContext } = contexts;
const VIDEO = 'video';

class HeadMetaData extends PureComponent {
  static contextType = AppContext;

  static propTypes = {
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    url: PropTypes.string.isRequired,
    videoHeight: PropTypes.number,
    videoURL: PropTypes.string,
    videoWidth: PropTypes.number,
  };

  static defaultProps = {
    type: 'website',
    videoHeight: null,
    videoURL: '',
    videoWidth: null,
  };

  render() {
    const {
      props: { description, image, t, title, type, url, videoHeight, videoURL, videoWidth },
      context: { baseUrl, facebookAppId, twitterUsername },
    } = this;
    let newBaseUrl = '';

    if (baseUrl) {
      newBaseUrl = baseUrl.slice(0, -5);
    }

    return (
      <Helmet titleTemplate={`%s | ${t('titleTemplate')}`}>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="fb:app_id" content={facebookAppId} />

        <meta property="og:url" content={`${newBaseUrl}${url}`} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:site" content={twitterUsername} />

        {type === VIDEO && <meta property="og:video" content={videoURL} />}
        {type === VIDEO && <meta property="og:video:secure_url" content={videoURL} />}
        {type === VIDEO && <meta property="og:video:type" content="video/mp4" />}
        {type === VIDEO && <meta property="og:video:width" content={videoWidth} />}
        {type === VIDEO && <meta property="og:video:height" content={videoHeight} />}

        {type === VIDEO && <meta name="twitter:card" content="player" />}
        {type === VIDEO && <meta name="twitter:player" content={videoURL} />}
        {type === VIDEO && <meta name="twitter:player:width" content={videoWidth} />}
        {type === VIDEO && <meta name="twitter:player:height" content={videoHeight} />}
      </Helmet>
    );
  }
}

export default Translate(messages)(HeadMetaData);
