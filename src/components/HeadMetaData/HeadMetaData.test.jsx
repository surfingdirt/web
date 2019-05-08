import React from 'react';

import HeadMetaData from './HeadMetaData';

const props = {
  title: 'Title',
  description: 'Description',
  image: 'Image',
  url: 'https://toto',
};

const typeVideo = {
  title: 'Title',
  description: 'Description',
  image: 'Image',
  type: 'video',
  url: 'https://toto',
  videoHeight: 720,
  videoSecureURL: 'videoSecureURL',
  videoURL: 'videoURL',
  videoWidth: 1280,
};

describe('HeadMetaData', () => {
  it('<meta> & <title> should be equal at passed props', () => {
    const wrapper = shallow(<HeadMetaData {...props} />).dive();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('title').text()).toBe(props.title);
    expect(wrapper.find("meta[name='description']").props().content).toBe(props.description);
    expect(wrapper.find("meta[property='og:image']").props().content).toBe(props.image);
    expect(wrapper.find("meta[property='og:type']").props().content).toBe('website');
  });

  it('Type: video => <meta> & <title> should be equal at passed props', () => {
    const wrapper = shallow(<HeadMetaData {...typeVideo} />).dive();
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('title').text()).toBe(typeVideo.title);
    expect(wrapper.find("meta[name='description']").props().content).toBe(typeVideo.description);
    expect(wrapper.find("meta[property='og:image']").props().content).toBe(typeVideo.image);
    expect(wrapper.find("meta[property='og:type']").props().content).toBe('video');
    expect(wrapper.find("meta[property='og:video:height']").props().content).toBe(
      typeVideo.videoHeight,
    );
    expect(wrapper.find("meta[property='og:video:secure_url']").props().content).toBe(
      typeVideo.videoURL,
    );
    expect(wrapper.find("meta[property='og:video:width']").props().content).toBe(
      typeVideo.videoWidth,
    );
  });
});
