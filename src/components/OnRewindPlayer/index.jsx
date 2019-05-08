import PropTypes from 'prop-types';
import React from 'react';
import contexts from '~/contexts';

import styles from './styles.scss';

const { AppContext } = contexts;

export default class OnRewindPlayer extends React.PureComponent {
  static contextType = AppContext;

  static propTypes = {
    autoPlay: PropTypes.bool,
    height: PropTypes.number,
    id: PropTypes.string.isRequired,
    mute: PropTypes.bool,
    width: PropTypes.number,
  };

  static defaultProps = {
    autoPlay: false,
    height: 480,
    mute: false,
    width: 640,
  };

  render() {
    const {
      sportPlayer: { iframe, script },
    } = this.context;
    const { autoPlay, height, id, mute, width } = this.props;

    const title = `event-${id}`;
    const iframeAttrs = {
      autoPlay,
      id,
      height,
      mute: mute ? 'true' : 'false',
      src: `${iframe}${id}`,
      width,
    };

    return (
      <div className={styles.wrapper}>
        <iframe
          {...iframeAttrs}
          title={title}
          allowFullScreen
          frameBorder="0"
          data-playertype="sport-players"
          className={styles.player}
        />
        <script src={script} />
      </div>
    );
  }
}
