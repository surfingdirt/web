import { MEDIA_SUBTYPES_VIDEO } from './media';

const { DAILYMOTION, FACEBOOK, INSTAGRAM, VIMEO, YOUTUBE } = MEDIA_SUBTYPES_VIDEO;

export const extractKeyAndSubType = (url) => {
  let mediaSubType;
  let vendorKey;

  const tests = [
    {
      regex: /www\.dailymotion\.com\/(embed\/)?video\/([0-9a-zA-Z]+)/,
      mediaSubType: DAILYMOTION,
      vendorKeyIndex: 2,
    },
    {
      regex: /dai\.ly\/([0-9a-zA-Z]+)/,
      mediaSubType: DAILYMOTION,
      vendorKeyIndex: 1,
    },

    {
      regex: /www\.facebook\.com\/watch\?v=(\d+)/,
      mediaSubType: FACEBOOK,
      vendorKeyIndex: 1,
    },

    {
      regex: /www\.facebook\.com\/(([a-zA-z0-9.]+)\/videos\/(\d+))/,
      mediaSubType: FACEBOOK,
      vendorKeyIndex: 3,
    },

    {
      regex: /www\.instagram\.com\/p\/([0-9a-zA-Z]+)/,
      mediaSubType: INSTAGRAM,
      vendorKeyIndex: 1,
    },

    {
      regex: /vimeo\.com\/(\d+)/,
      mediaSubType: VIMEO,
      vendorKeyIndex: 1,
    },
    {
      regex: /player\.vimeo\.com\/video\/(\d+)/,
      mediaSubType: VIMEO,
      vendorKeyIndex: 1,
    },

    {
      regex: /www\.youtube\.com\/watch\?v=([0-9a-zA-Z_-]{11})/,
      mediaSubType: YOUTUBE,
      vendorKeyIndex: 1,
    },
    {
      regex: /www\.youtube\.com\/embed\/([0-9a-zA-Z_-]{11})/,
      mediaSubType: YOUTUBE,
      vendorKeyIndex: 1,
    },
    {
      regex: /youtu\.be\/([0-9a-zA-Z_-]{11})/,
      mediaSubType: YOUTUBE,
      vendorKeyIndex: 1,
    },
    {
      regex: /m\.youtube\.com\/details\?v=([0-9a-zA-Z_-]{11})/,
      mediaSubType: YOUTUBE,
      vendorKeyIndex: 1,
    },
  ];

  for (let i = 0; i < tests.length; i++) {
    const { regex, mediaSubType: currentMediaSubType, vendorKeyIndex } = tests[i];
    const match = url.match(regex);
    if (match && match.length >= vendorKeyIndex + 1) {
      mediaSubType = currentMediaSubType;
      vendorKey = match[vendorKeyIndex];
      break;
    }
  }

  return { mediaSubType, vendorKey };
};

export const buildEmbedUrl = (mediaSubType, vendorKey) => {
  let url;
  switch (mediaSubType) {
    case DAILYMOTION:
      url = `https://www.dailymotion.com/embed/video/${vendorKey}`;
      break;
    case FACEBOOK:
      url = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F${vendorKey}%2F`;
      break;
    case INSTAGRAM:
      url = `https://www.instagram.com/p/${vendorKey}/embed`;
      break;
    case VIMEO:
      url = `https://player.vimeo.com/video/${vendorKey}`;
      break;
    case YOUTUBE:
      url = `https://www.youtube.com/embed/${vendorKey}`;
      break;
    default:
      throw new Error('Unsupported video url');
  }
  return url;
};
