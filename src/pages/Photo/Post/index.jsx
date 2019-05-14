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
      <button type="submit">Post</button>
    </form>
  </div>
);
