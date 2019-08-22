import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Userbox from 'Components/User/Userbox';

const user = {
  userId: '123-456',
  username: 'Some cool username',
  thumbs: [
    {
      url: 'http://api.ridedb.wrk/files/d46cc010-7435-4c60-ab86-f93e3decbf8a/img_ts.jpg',
    },
  ],
};

storiesOf('Userbox', module).add('Userbox', () => (
  <BrowserRouter>
    <Userbox user={user} />
  </BrowserRouter>
));
