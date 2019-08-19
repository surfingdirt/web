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
          <div className={styles.input}>
            <label>
              Title
              <input type="text" name="title" defaultValue="Some title" />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              Description
              <input type="text" name="description" defaultValue="" />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              Vendor key
              <input type="text" name="vendorKey" defaultValue="" />
            </label>
          </div>
          <div className={styles.input}>
            <label>
              mediaSubType
              <select name="mediaSubType">
                <option />
                <option value="YOUTUBE">youtube</option>
                <option value="VIMEO">vimeo</option>
                <option value="DAILYMOTION">dailymotion</option>
                <option value="FACEBOOK">facebook</option>
                <option value="INSTAGRAM">Instagram</option>
              </select>
            </label>
          </div>
          <input type="hidden" name="albumId" defaultValue={albumId || galleryAlbumId} />
          <button type="submit">Post</button>
        </form>
      </Card>
    );
  }
}
