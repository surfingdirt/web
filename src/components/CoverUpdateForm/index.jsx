import React from 'react';

import actions from '~/actions';
import { actionRoute } from 'Utils/links';

const { COVER_UPDATE } = actions;

const CoverUpdateForm = () => (
  <form action={actionRoute(COVER_UPDATE)} method="POST" encType="multipart/form-data">
    <p>Cover:</p>
    <input type="file" name="file" />
    <button type="submit">Update</button>
  </form>
);

export default CoverUpdateForm;