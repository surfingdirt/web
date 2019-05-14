import React from 'react';

import actions from '~/actions';
import { actionRoute } from 'Utils/links';
import styles from './styles.scss';

const { PHOTO_NEW } = actions;

export const NewPhoto = () => (
  <div className={styles.page}>
    <p>This is the Photo Post page.</p>
    <form action={actionRoute(PHOTO_NEW)} method="POST" encType="multipart/form-data">
      <input type="file" name="file" />
      <input type="text" name="title" defaultValue="Some title" />
      <input type="hidden" name="albumId" defaultValue="a3833b1c-1db0-4a93-9efc-b6659400ce9f" />
      <input type="hidden" name="mediaSubType" defaultValue="IMG" />
      <button type="submit">Post</button>
    </form>
  </div>
);
