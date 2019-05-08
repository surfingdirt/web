import { storiesOf } from '@storybook/react';
import TextRenderer from 'Components/VideoRenderers/TextVideo';
import TextVideo from 'Components/VideoRenderers/TextVideo';
import React from 'react';

storiesOf('TextRenderer', module).add('Standard', () => (
  <div style={{ margin: '20px', width: '300px' }}>
    <TextRenderer
      label="Everything is fine"
      item={{ title: 'A video title', id: '1234567' }}
    />
  </div>
));
