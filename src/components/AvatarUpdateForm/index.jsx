import React from 'react';

import actions from '~/actions';
import { actionRoute } from 'Utils/links';

const { AVATAR_UPDATE } = actions;

const AvatarUpdateForm = () => (
  <form action={actionRoute(AVATAR_UPDATE)} method="POST" encType="multipart/form-data">
    <p>Avatar:</p>
    <input type="file" name="file" />
    <button type="submit">Update</button>
  </form>
);

export default AvatarUpdateForm;