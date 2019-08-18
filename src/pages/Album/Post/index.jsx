import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import { actionRoute } from 'Utils/links';
import actions from '~/actions';

import styles from './styles.scss';

const { ALBUM_NEW } = actions;
const { STANDARD } = cardTypes;

export class NewAlbum extends React.Component {
  render() {
    return (
      <Card title="Album post page" type={STANDARD} className={styles.page}>
        <form action={actionRoute(ALBUM_NEW)} method="POST" encType="multipart/form-data">
          <input type="text" name="title" defaultValue="Some album title" />
          <button type="submit">Post</button>
        </form>
      </Card>
    );
  }
}
