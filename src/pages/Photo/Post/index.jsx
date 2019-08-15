import React from 'react';
import PropTypes from 'prop-types';

import { actionRoute } from 'Utils/links';
import actions from '~/actions';
import AppContext from '~/contexts';

import styles from './styles.scss';

const { PHOTO_NEW } = actions;

export class NewPhoto extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match } = this.props;
    const { galleryAlbumId } = this.context;
    const { id: albumId } = match.params;

    return (
      <div className={styles.page}>
        <p>This is the Photo Post page.</p>
        <form action={actionRoute(PHOTO_NEW)} method="POST" encType="multipart/form-data">
          <input type="file" name="file" />
          <input type="text" name="title" defaultValue="Some title" />
          <input type="hidden" name="albumId" defaultValue={albumId || galleryAlbumId} />
          <input type="hidden" name="mediaSubType" defaultValue="IMG" />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}
