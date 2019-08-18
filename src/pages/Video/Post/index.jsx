import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import styles from './styles.scss';

const { VIDEO_NEW } = actions;
const { STANDARD } = cardTypes;

export class NewVideo extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match } = this.props;
    const { galleryAlbumId } = this.context;
    const { id: albumId } = match.params;

    return (
      <Card title="Video post page" type={STANDARD} className={styles.page}>
        <form action={actionRoute(VIDEO_NEW)} method="POST" encType="multipart/form-data">
          <input type="text" name="url" defaultValue="Some url" />
          <input type="text" name="title" defaultValue="Some title" />
          <input type="hidden" name="albumId" defaultValue={albumId || galleryAlbumId} />
          <button type="submit">Post</button>
        </form>
      </Card>
    );
  }
}
